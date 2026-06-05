import { Router } from "express";
import { anthropic } from "@workspace/integrations-anthropic-ai";
import { db, conversations, messages } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  CreateAnthropicConversationBody,
  GetAnthropicConversationParams,
  DeleteAnthropicConversationParams,
  ListAnthropicMessagesParams,
  SendAnthropicMessageParams,
  SendAnthropicMessageBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/anthropic/conversations", async (_req, res) => {
  try {
    const conversations = await db
      .select()
      .from(conversations)
      .orderBy(conversations.createdAt);
    res.json(
      conversations.map((c) => ({
        id: c.id,
        title: c.title,
        createdAt: c.createdAt,
      }))
    );
  } catch (err) {
    console.error("Erreur liste conversations:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/anthropic/conversations", async (req, res) => {
  const parsed = CreateAnthropicConversationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Données invalides" });
    return;
  }
  try {
    const [conv] = await db
      .insert(conversations)
      .values({ title: parsed.data.title })
      .returning();
    res.status(201).json({ id: conv.id, title: conv.title, createdAt: conv.createdAt });
  } catch (err) {
    console.error("Erreur création conversation:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/anthropic/conversations/:id", async (req, res) => {
  const parsed = GetAnthropicConversationParams.safeParse({ id: parseInt(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "ID invalide" });
    return;
  }
  try {
    const [conv] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, parsed.data.id));
    if (!conv) {
      res.status(404).json({ error: "Conversation non trouvée" });
      return;
    }
    const messages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, parsed.data.id))
      .orderBy(messages.createdAt);
    res.json({
      id: conv.id,
      title: conv.title,
      createdAt: conv.createdAt,
      messages: messages.map((m) => ({
        id: m.id,
        conversationId: m.conversationId,
        role: m.role,
        content: m.content,
        createdAt: m.createdAt,
      })),
    });
  } catch (err) {
    console.error("Erreur récupération conversation:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/anthropic/conversations/:id", async (req, res) => {
  const parsed = DeleteAnthropicConversationParams.safeParse({ id: parseInt(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "ID invalide" });
    return;
  }
  try {
    await db.delete(messages).where(eq(messages.conversationId, parsed.data.id));
    const deleted = await db
      .delete(conversations)
      .where(eq(conversations.id, parsed.data.id))
      .returning();
    if (!deleted.length) {
      res.status(404).json({ error: "Conversation non trouvée" });
      return;
    }
    res.status(204).end();
  } catch (err) {
    console.error("Erreur suppression conversation:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/anthropic/conversations/:id/messages", async (req, res) => {
  const parsed = ListAnthropicMessagesParams.safeParse({ id: parseInt(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "ID invalide" });
    return;
  }
  try {
    const messages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, parsed.data.id))
      .orderBy(messages.createdAt);
    res.json(
      messages.map((m) => ({
        id: m.id,
        conversationId: m.conversationId,
        role: m.role,
        content: m.content,
        createdAt: m.createdAt,
      }))
    );
  } catch (err) {
    console.error("Erreur liste messages:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/anthropic/conversations/:id/messages", async (req, res) => {
  const paramsParsed = SendAnthropicMessageParams.safeParse({ id: parseInt(req.params.id) });
  const bodyParsed = SendAnthropicMessageBody.safeParse(req.body);
  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Données invalides" });
    return;
  }

  const convId = paramsParsed.data.id;
  const userContent = bodyParsed.data.content;

  try {
    const [conv] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, convId));
    if (!conv) {
      res.status(404).json({ error: "Conversation non trouvée" });
      return;
    }

    await db.insert(messages).values({
      conversationId: convId,
      role: "user",
      content: userContent,
    });

    const existingMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, convId))
      .orderBy(messages.createdAt);

    const chatMessages = existingMessages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullResponse = "";

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: "Tu es un expert en immobilier neuf français, spécialisé dans la défiscalisation (Jeanbrun, LMNP) et la VEFA. Réponds uniquement en français.",
      messages: chatMessages,
    });

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        fullResponse += event.delta.text;
        res.write(`data: ${JSON.stringify({ content: event.delta.text })}\n\n`);
      }
    }

    await db.insert(messages).values({
      conversationId: convId,
      role: "assistant",
      content: fullResponse,
    });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error("Erreur envoi message:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Erreur serveur" })}\n\n`);
      res.end();
    }
  }
});

export default router;
