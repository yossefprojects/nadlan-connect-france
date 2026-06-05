import { Router } from "express";
import { anthropic } from "@workspace/integrations-anthropic-ai";
import { SimulateBody } from "@workspace/api-zod";

const router = Router();

router.post("/simulate", async (req, res) => {
  const parsed = SimulateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Données invalides" });
    return;
  }

  const { prix, loyer, tmi, type, charges, duree } = parsed.data;

  const prompt = `Tu es un expert en fiscalité immobilière française.
Voici les données d'un investissement :
- Prix du bien : ${prix}€
- Loyer annuel : ${loyer * 12}€
- TMI : ${tmi}%
- Type : ${type} (${type === "nu" ? "Dispositif Jeanbrun" : "LMNP Réel"})
- Charges annuelles : ${charges}€
- Durée : ${duree} ans

Calcule et retourne UNIQUEMENT un JSON strict (pas de markdown, pas de texte autour) :
{
  "rendement_brut": "X.X%",
  "rendement_net": "X.X%",
  "gain_fiscal_annuel": XXXX,
  "economies_totales": XXXX,
  "resultat_fiscal": XXXX,
  "recommandation": "texte court en français",
  "score_investissement": XX,
  "points_vigilance": ["point1", "point2", "point3"]
}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      res.status(500).json({ error: "Réponse inattendue de l'IA" });
      return;
    }

    const text = block.text.trim();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      res.status(500).json({ error: "Format de réponse invalide" });
      return;
    }

    const jsonStr = text.slice(jsonStart, jsonEnd + 1);
    const result = JSON.parse(jsonStr);
    res.json(result);
  } catch (err) {
    console.error("Erreur simulation IA:", err);
    res.status(500).json({ error: "Erreur lors de la simulation" });
  }
});

export default router;
