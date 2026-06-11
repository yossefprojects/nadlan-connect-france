import { Router } from "express";
import multer from "multer";
import { anthropic } from "@workspace/integrations-anthropic-ai";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const pdfDoc = await PDFDocument.load(buffer);
    const pageCount = pdfDoc.getPages().length;
    return `Document PDF — ${pageCount} page(s). (Extraction de texte brute limitée — analyse basée sur la structure du document.)`;
  } catch {
    return "Impossible d'extraire le texte du PDF.";
  }
}

router.post("/pdf/analyze", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Aucun fichier fourni" });
    return;
  }
  if (req.file.mimetype !== "application/pdf") {
    res.status(400).json({ error: "Le fichier doit être un PDF" });
    return;
  }

  try {
    const extractedText = await extractTextFromPdf(req.file.buffer);
    const filename = req.file.originalname;
    const lang = req.body?.lang === "en" ? "en" : "fr";
    const outLang = lang === "en" ? "English" : "French";

    const prompt = `Tu es un expert immobilier français. Analyse ce document PDF : "${filename}".
Informations extraites : ${extractedText}

All textual values (clauses, risques, resume) MUST be written in ${outLang}. Keep French regulatory proper nouns (VEFA, LMNP, notaire) as-is.
Basé sur le type de document (contrat VEFA, notice descriptive promoteur, bail commercial LMNP, etc.), retourne UNIQUEMENT un JSON strict :
{
  "prix": "montant en € ou null si non trouvé",
  "surface": "surface en m² ou null si non trouvée",
  "clauses": ["important clause 1", "important clause 2", "important clause 3"],
  "risques": ["identified risk 1", "identified risk 2"],
  "resume": "professional summary of the document in 2-3 sentences in ${outLang}"
}`;

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

    res.json(JSON.parse(text.slice(jsonStart, jsonEnd + 1)));
  } catch (err) {
    console.error("Erreur analyse PDF:", err);
    res.status(500).json({ error: "Erreur lors de l'analyse du document" });
  }
});

router.get("/pdf/generate-guide", async (_req, res) => {
  try {
    const bytes = await renderPdf(buildGuideDoc());
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="Guide-Investissement-Immobilier-Neuf-2026.pdf"');
    res.send(Buffer.from(bytes));
  } catch (err) {
    console.error("Erreur génération guide PDF:", err);
    res.status(500).json({ error: "Erreur lors de la génération du PDF" });
  }
});

router.get("/pdf/brochure", async (_req, res) => {
  try {
    const bytes = await renderPdf(buildBrochureDoc());
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="Brochure-Comparative-Jeanbrun-LMNP.pdf"');
    res.send(Buffer.from(bytes));
  } catch (err) {
    console.error("Erreur génération brochure PDF:", err);
    res.status(500).json({ error: "Erreur lors de la génération de la brochure" });
  }
});

router.post("/pdf/report", async (req, res) => {
  try {
    const { inputs, results } = req.body ?? {};
    const bytes = await renderPdf(buildReportDoc(inputs ?? {}, results ?? {}));
    const date = new Date().toISOString().split("T")[0];
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="rapport-simulation-${date}.pdf"`);
    res.send(Buffer.from(bytes));
  } catch (err) {
    console.error("Erreur génération rapport PDF:", err);
    res.status(500).json({ error: "Erreur lors de la génération du rapport" });
  }
});

// ── Document model ───────────────────────────────────────────────────────────

type Column = { header: string; width: number; align?: "left" | "right" };
type Block =
  | { kind: "p"; text: string }
  | { kind: "h1"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "kv"; label: string; value: string }
  | { kind: "callout"; text: string }
  | { kind: "table"; columns: Column[]; rows: string[][] }
  | { kind: "space"; size?: number };

interface DocModel {
  title: string;
  subtitle: string;
  blocks: Block[];
}

const A4_W = 595.28;
const A4_H = 841.89;
const M = 56;
const CONTENT_W = A4_W - M * 2;
const FOOTER_TOP = 66;

// ── Content ──────────────────────────────────────────────────────────────────

function buildGuideDoc(): DocModel {
  return {
    title: "Guide de l'investissement immobilier neuf",
    subtitle: "Optimisation fiscale 2026 — Jeanbrun & LMNP Réel",
    blocks: [
      { kind: "p", text: "Ce guide compare les deux dispositifs phares pour investir dans l'immobilier neuf en France et réduire votre fiscalité : le dispositif Jeanbrun (location nue) et le statut LMNP au régime réel (location meublée)." },
      { kind: "space", size: 6 },
      { kind: "h1", text: "Les dispositifs fiscaux" },
      { kind: "h2", text: "1. Dispositif Jeanbrun — location nue" },
      { kind: "bullet", text: "Engagement de location de 9 ans minimum, en résidence principale du locataire." },
      { kind: "bullet", text: "Amortissement de 3,5 % du prix du bien déduit chaque année des revenus fonciers." },
      { kind: "bullet", text: "Déficit foncier imputable sur le revenu global, plafonné à 10 700 € par an." },
      { kind: "bullet", text: "Idéal pour les contribuables fortement imposés (TMI de 30 % et plus)." },
      { kind: "h2", text: "2. LMNP au régime réel — location meublée" },
      { kind: "bullet", text: "Amortissement du mobilier sur 5 à 10 ans." },
      { kind: "bullet", text: "Amortissement du bâti (hors terrain) sur 25 à 40 ans." },
      { kind: "bullet", text: "Loyers perçus nets d'impôt sur une très longue période." },
      { kind: "bullet", text: "Idéal pour viser la rentabilité nette maximale." },
      { kind: "space", size: 8 },
      { kind: "h1", text: "Tableau comparatif" },
      {
        kind: "table",
        columns: [
          { header: "Critère", width: CONTENT_W * 0.40 },
          { header: "Jeanbrun (nu)", width: CONTENT_W * 0.30, align: "right" },
          { header: "LMNP Réel", width: CONTENT_W * 0.30, align: "right" },
        ],
        rows: [
          ["Loyer annuel estimé", "7 200 € (plafonné)", "8 640 € (marché)"],
          ["Amortissement annuel", "7 000 € (3,5 %)", "6 000 €"],
          ["Résultat fiscal", "-3 800 € (déficit)", "-1 360 € (déficit)"],
          ["Gain fiscal net", "+1 140 € / an", "0 € d'impôt sur loyers"],
        ],
      },
      { kind: "space", size: 8 },
      { kind: "h1", text: "Acteurs clés du marché" },
      { kind: "h2", text: "Promoteurs" },
      { kind: "p", text: "Nexity, Altarea Cogedim, Bouygues Immobilier, Kaufman & Broad, Icade." },
      { kind: "h2", text: "Gestionnaires" },
      { kind: "p", text: "Domitys, Pierre & Vacances, Nexity Studéa." },
      { kind: "space", size: 10 },
      { kind: "callout", text: "Besoin d'un accompagnement sur mesure ? NadlanConnect France vous aide à choisir le dispositif adapté à votre situation et à sélectionner le bon programme neuf. Simulez votre projet sur nadlanconnect.fr." },
    ],
  };
}

function buildBrochureDoc(): DocModel {
  return {
    title: "Comparaison des dispositifs fiscaux",
    subtitle: "Jeanbrun (location nue) vs LMNP Réel (meublé)",
    blocks: [
      { kind: "p", text: "Synthèse chiffrée des deux dispositifs sur un même bien, pour visualiser rapidement l'impact fiscal de chaque option." },
      { kind: "space", size: 6 },
      { kind: "h1", text: "Jeanbrun — location nue" },
      { kind: "kv", label: "Loyer annuel plafonné", value: "7 200 €" },
      { kind: "kv", label: "Amortissement annuel (3,5 %)", value: "7 000 €" },
      { kind: "kv", label: "Résultat fiscal", value: "-3 800 € (déficit)" },
      { kind: "kv", label: "Gain fiscal net", value: "+1 140 € / an" },
      { kind: "p", text: "Calcul : 7 200 € de loyers - 4 000 € de charges - 7 000 € d'amortissement = -3 800 € de déficit foncier. Économie d'impôt : 3 800 € x 30 % (TMI) = 1 140 € par an." },
      { kind: "space", size: 8 },
      { kind: "h1", text: "LMNP Réel — location meublée" },
      { kind: "kv", label: "Loyer annuel (marché)", value: "8 640 €" },
      { kind: "kv", label: "Amortissement annuel (bâti + mobilier)", value: "6 000 €" },
      { kind: "kv", label: "Résultat fiscal", value: "-1 360 € (déficit)" },
      { kind: "kv", label: "Imposition sur les loyers", value: "0 €" },
      { kind: "space", size: 10 },
      { kind: "h1", text: "En résumé" },
      {
        kind: "table",
        columns: [
          { header: "Critère", width: CONTENT_W * 0.40 },
          { header: "Jeanbrun (nu)", width: CONTENT_W * 0.30, align: "right" },
          { header: "LMNP Réel", width: CONTENT_W * 0.30, align: "right" },
        ],
        rows: [
          ["Loyer annuel", "7 200 €", "8 640 €"],
          ["Amortissement", "7 000 €", "6 000 €"],
          ["Résultat fiscal", "-3 800 €", "-1 360 €"],
          ["Avantage clé", "+1 140 € / an", "0 € d'impôt"],
        ],
      },
      { kind: "space", size: 10 },
      { kind: "callout", text: "Le bon choix dépend de votre TMI, de votre horizon de détention et de votre objectif (réduction d'impôt immédiate ou rentabilité nette sur le long terme). Faites votre simulation personnalisée sur nadlanconnect.fr." },
    ],
  };
}

function buildReportDoc(inputs: Record<string, unknown>, results: Record<string, unknown>): DocModel {
  const date = new Date().toLocaleDateString("fr-FR");
  const blocks: Block[] = [
    { kind: "p", text: `Rapport généré le ${date} à partir de vos paramètres de simulation.` },
    { kind: "space", size: 6 },
    { kind: "h1", text: "Paramètres de l'investissement" },
  ];

  const i = inputs ?? {};
  if (i.prix) blocks.push({ kind: "kv", label: "Prix du bien", value: `${i.prix} €` });
  if (i.loyer) blocks.push({ kind: "kv", label: "Loyer mensuel", value: `${i.loyer} €` });
  if (i.tmi) blocks.push({ kind: "kv", label: "Tranche marginale d'imposition", value: `${i.tmi} %` });
  if (i.type) blocks.push({ kind: "kv", label: "Dispositif", value: i.type === "nu" ? "Location nue (Jeanbrun)" : "LMNP Réel (meublé)" });
  if (i.charges) blocks.push({ kind: "kv", label: "Charges annuelles", value: `${i.charges} €` });
  if (i.duree) blocks.push({ kind: "kv", label: "Durée de détention", value: `${i.duree} ans` });

  blocks.push({ kind: "space", size: 8 }, { kind: "h1", text: "Résultats de la simulation" });

  const r = results ?? {};
  if (r.rendement_brut) blocks.push({ kind: "kv", label: "Rendement brut", value: String(r.rendement_brut) });
  if (r.rendement_net) blocks.push({ kind: "kv", label: "Rendement net", value: String(r.rendement_net) });
  if (r.gain_fiscal_annuel !== undefined) blocks.push({ kind: "kv", label: "Gain fiscal annuel", value: `${r.gain_fiscal_annuel} €` });
  if (r.economies_totales !== undefined) blocks.push({ kind: "kv", label: "Économies totales", value: `${r.economies_totales} €` });
  if (r.score_investissement !== undefined) blocks.push({ kind: "kv", label: "Score d'investissement", value: `${r.score_investissement} / 100` });
  if (r.recommandation) blocks.push({ kind: "callout", text: `Recommandation : ${r.recommandation}` });

  if (Array.isArray(r.points_vigilance) && r.points_vigilance.length) {
    blocks.push({ kind: "space", size: 4 }, { kind: "h2", text: "Points de vigilance" });
    for (const p of r.points_vigilance as string[]) blocks.push({ kind: "bullet", text: String(p) });
  }

  return { title: "Rapport de simulation", subtitle: `Investissement immobilier neuf — ${date}`, blocks };
}

// ── Renderer (pdf-lib) ───────────────────────────────────────────────────────

// WinAnsi-representable code points above U+00FF (so we keep €, smart quotes,
// dashes, bullets, ellipsis…) — anything else is dropped to avoid pdf-lib throwing.
const WINANSI_EXTRA = new Set([
  0x20ac, 0x201a, 0x0192, 0x201e, 0x2026, 0x2020, 0x2021, 0x02c6, 0x2030, 0x0160,
  0x2039, 0x0152, 0x017d, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2013, 0x2014,
  0x02dc, 0x2122, 0x0161, 0x203a, 0x0153, 0x017e, 0x0178,
]);

function sanitize(input: string): string {
  const s = (input ?? "")
    .normalize("NFC")
    .replace(/[      ]/g, " ")
    .replace(/‑/g, "-")
    .replace(/₪/g, "NIS");
  let out = "";
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    if ((cp >= 0x20 && cp <= 0x7e) || (cp >= 0xa0 && cp <= 0xff) || WINANSI_EXTRA.has(cp)) out += ch;
    else if (ch === "\n" || ch === "\t") out += " ";
  }
  return out;
}

async function renderPdf(doc: DocModel): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(doc.title);
  pdf.setAuthor("NadlanConnect France");
  pdf.setCreator("NadlanConnect France");

  const reg = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const NAVY = rgb(0.118, 0.227, 0.373);
  const GOLD = rgb(0.788, 0.659, 0.298);
  const GOLD_TINT = rgb(0.972, 0.945, 0.878);
  const INK = rgb(0.16, 0.19, 0.24);
  const MUTED = rgb(0.45, 0.48, 0.53);
  const LINE = rgb(0.85, 0.87, 0.90);
  const ROW = rgb(0.965, 0.972, 0.980);
  const WHITE = rgb(1, 1, 1);
  type Col = ReturnType<typeof rgb>;

  let page!: PDFPage;
  let y = 0;
  let pageNo = 0;

  const w = (t: string, f: PDFFont, s: number) => f.widthOfTextAtSize(sanitize(t), s);

  function header(first: boolean) {
    const bandH = first ? 126 : 52;
    page.drawRectangle({ x: 0, y: A4_H - bandH, width: A4_W, height: bandH, color: NAVY });
    page.drawRectangle({ x: 0, y: A4_H - bandH, width: A4_W, height: 3, color: GOLD });
    const wy = A4_H - 34;
    page.drawText("Nadlan", { x: M, y: wy, size: 16, font: bold, color: WHITE });
    const nw = w("Nadlan", bold, 16);
    page.drawText("Connect", { x: M + nw, y: wy, size: 16, font: bold, color: GOLD });
    page.drawText("France", { x: M + nw + w("Connect", bold, 16) + 7, y: wy, size: 11, font: reg, color: WHITE, opacity: 0.6 });
    if (first) {
      page.drawText(sanitize(doc.title), { x: M, y: A4_H - 76, size: 21, font: bold, color: WHITE });
      page.drawText(sanitize(doc.subtitle), { x: M, y: A4_H - 100, size: 11.5, font: reg, color: GOLD });
    }
    y = A4_H - bandH - 32;
  }

  function footer() {
    const fy = 46;
    page.drawLine({ start: { x: M, y: fy + 16 }, end: { x: A4_W - M, y: fy + 16 }, thickness: 0.75, color: GOLD });
    page.drawText("NadlanConnect France — nadlanconnect.fr", { x: M, y: fy, size: 8, font: reg, color: MUTED });
    const pg = `Page ${pageNo}`;
    page.drawText(pg, { x: A4_W - M - w(pg, reg, 8), y: fy, size: 8, font: reg, color: MUTED });
    page.drawText(sanitize("Document informatif — ne constitue pas un conseil fiscal ou financier personnalisé."), { x: M, y: fy - 12, size: 7, font: reg, color: MUTED });
  }

  function newPage(first = false) {
    if (page) footer();
    page = pdf.addPage([A4_W, A4_H]);
    pageNo++;
    header(first);
  }

  function need(h: number) {
    if (y - h < FOOTER_TOP) newPage(false);
  }

  function wrap(text: string, f: PDFFont, size: number, maxW: number): string[] {
    const words = sanitize(text).split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let cur = "";
    for (const word of words) {
      const test = cur ? `${cur} ${word}` : word;
      if (f.widthOfTextAtSize(test, size) > maxW && cur) {
        lines.push(cur);
        cur = word;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }

  function paragraph(text: string, f: PDFFont, size: number, color: Col, lh: number, x = M, maxW = CONTENT_W) {
    for (const ln of wrap(text, f, size, maxW)) {
      need(lh);
      page.drawText(ln, { x, y: y - size, size, font: f, color });
      y -= lh;
    }
  }

  function table(cols: Column[], rows: string[][]) {
    const colX: number[] = [];
    let cx = M;
    for (const c of cols) {
      colX.push(cx);
      cx += c.width;
    }
    const headH = 26;
    const rowH = 23;
    const pad = 9;

    need(headH + rowH);
    page.drawRectangle({ x: M, y: y - headH, width: CONTENT_W, height: headH, color: NAVY });
    cols.forEach((c, i) => {
      const tx = c.align === "right" ? colX[i] + c.width - pad - w(c.header, bold, 9.5) : colX[i] + pad;
      page.drawText(sanitize(c.header), { x: tx, y: y - headH + 9, size: 9.5, font: bold, color: WHITE });
    });
    y -= headH;

    rows.forEach((row, ri) => {
      need(rowH);
      if (ri % 2 === 1) page.drawRectangle({ x: M, y: y - rowH, width: CONTENT_W, height: rowH, color: ROW });
      row.forEach((cell, ci) => {
        const c = cols[ci];
        const f = ci === 0 ? bold : reg;
        const col = ci === 0 ? NAVY : INK;
        const tx = c.align === "right" ? colX[ci] + c.width - pad - w(cell, f, 9) : colX[ci] + pad;
        page.drawText(sanitize(cell), { x: tx, y: y - rowH + 8, size: 9, font: f, color: col });
      });
      page.drawLine({ start: { x: M, y: y - rowH }, end: { x: M + CONTENT_W, y: y - rowH }, thickness: 0.4, color: LINE });
      y -= rowH;
    });
    y -= 12;
  }

  newPage(true);

  for (const b of doc.blocks) {
    switch (b.kind) {
      case "space":
        y -= b.size ?? 10;
        break;
      case "h1":
        need(36);
        y -= 8;
        page.drawRectangle({ x: M, y: y - 16, width: 4, height: 18, color: GOLD });
        page.drawText(sanitize(b.text).toUpperCase(), { x: M + 13, y: y - 13, size: 13, font: bold, color: NAVY });
        y -= 30;
        break;
      case "h2":
        need(26);
        y -= 4;
        page.drawText(sanitize(b.text), { x: M, y: y - 12, size: 11.5, font: bold, color: NAVY });
        y -= 22;
        break;
      case "p":
        paragraph(b.text, reg, 10, INK, 15);
        y -= 4;
        break;
      case "bullet": {
        need(15);
        page.drawText("•", { x: M + 2, y: y - 10, size: 10, font: reg, color: GOLD });
        wrap(b.text, reg, 10, CONTENT_W - 18).forEach((ln, i) => {
          if (i > 0) need(14);
          page.drawText(ln, { x: M + 18, y: y - 10, size: 10, font: reg, color: INK });
          y -= 14;
        });
        y -= 2;
        break;
      }
      case "kv": {
        need(16);
        page.drawText(sanitize(b.label), { x: M, y: y - 11, size: 10, font: bold, color: NAVY });
        const v = sanitize(b.value);
        page.drawText(v, { x: A4_W - M - w(v, reg, 10), y: y - 11, size: 10, font: reg, color: INK });
        page.drawLine({ start: { x: M, y: y - 16 }, end: { x: A4_W - M, y: y - 16 }, thickness: 0.4, color: LINE });
        y -= 22;
        break;
      }
      case "callout": {
        const lines = wrap(b.text, reg, 10, CONTENT_W - 28);
        const h = 18 + lines.length * 14;
        need(h + 8);
        page.drawRectangle({ x: M, y: y - h, width: CONTENT_W, height: h, color: GOLD_TINT });
        page.drawRectangle({ x: M, y: y - h, width: 4, height: h, color: GOLD });
        let yy = y - 17;
        for (const ln of lines) {
          page.drawText(ln, { x: M + 16, y: yy, size: 10, font: reg, color: NAVY });
          yy -= 14;
        }
        y -= h + 10;
        break;
      }
      case "table":
        table(b.columns, b.rows);
        break;
    }
  }

  footer();
  return await pdf.save();
}

export default router;
