import { Router } from "express";
import multer from "multer";
import { anthropic } from "@workspace/integrations-anthropic-ai";
import { PDFDocument } from "pdf-lib";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const pdfDoc = await PDFDocument.load(buffer);
    const pages = pdfDoc.getPages();
    const pageCount = pages.length;
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

    const prompt = `Tu es un expert immobilier français. Analyse ce document PDF : "${filename}".
Informations extraites : ${extractedText}

Basé sur le type de document (contrat VEFA, notice descriptive promoteur, bail commercial LMNP, etc.), retourne UNIQUEMENT un JSON strict :
{
  "prix": "montant en € ou null si non trouvé",
  "surface": "surface en m² ou null si non trouvée",
  "clauses": ["clause importante 1", "clause importante 2", "clause importante 3"],
  "risques": ["risque identifié 1", "risque identifié 2"],
  "resume": "Résumé professionnel du document en 2-3 phrases"
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

    const result = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    res.json(result);
  } catch (err) {
    console.error("Erreur analyse PDF:", err);
    res.status(500).json({ error: "Erreur lors de l'analyse du document" });
  }
});

router.get("/pdf/generate-guide", async (_req, res) => {
  try {
    const pdfContent = generateGuidePdf();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="Guide-Investissement-Immobilier-Neuf-2026.pdf"');
    res.send(Buffer.from(pdfContent));
  } catch (err) {
    console.error("Erreur génération guide PDF:", err);
    res.status(500).json({ error: "Erreur lors de la génération du PDF" });
  }
});

router.get("/pdf/brochure", async (_req, res) => {
  try {
    const pdfContent = generateBrochurePdf();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="Brochure-Comparative-Jeanbrun-LMNP.pdf"');
    res.send(Buffer.from(pdfContent));
  } catch (err) {
    console.error("Erreur génération brochure PDF:", err);
    res.status(500).json({ error: "Erreur lors de la génération de la brochure" });
  }
});

router.post("/pdf/report", async (req, res) => {
  try {
    const { inputs, results } = req.body;
    const pdfContent = generateReportPdf(inputs, results);
    const date = new Date().toISOString().split("T")[0];
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="rapport-simulation-${date}.pdf"`);
    res.send(Buffer.from(pdfContent));
  } catch (err) {
    console.error("Erreur génération rapport PDF:", err);
    res.status(500).json({ error: "Erreur lors de la génération du rapport" });
  }
});

function generateGuidePdf(): Uint8Array {
  const content = buildPdfBytes([
    { type: "title", text: "NadlanConnect France" },
    { type: "subtitle", text: "Guide Investissement Immobilier Neuf 2026" },
    { type: "spacer" },
    { type: "heading", text: "DISPOSITIFS FISCAUX" },
    { type: "spacer" },
    { type: "subheading", text: "1. Dispositif Jeanbrun (Location Nue)" },
    { type: "text", text: "• Engagement : 9 ans minimum, résidence principale" },
    { type: "text", text: "• Amortissement : 3,5% du prix par an déduit des revenus fonciers" },
    { type: "text", text: "• Déficit foncier imputable sur revenu global : max 10 700€/an" },
    { type: "text", text: "• Idéal pour : contribuables avec salaires importants" },
    { type: "spacer" },
    { type: "subheading", text: "2. LMNP Réel (Location Meublée Non Professionnelle)" },
    { type: "text", text: "• Amortissement du mobilier : 5 à 10 ans" },
    { type: "text", text: "• Amortissement du bâti hors terrain : 25 à 40 ans" },
    { type: "text", text: "• Loyers nets d'impôt sur très longue période" },
    { type: "text", text: "• Idéal pour : rentabilité nette maximale" },
    { type: "spacer" },
    { type: "heading", text: "TABLEAU COMPARATIF" },
    { type: "text", text: "Critère              | Jeanbrun (Nu)      | LMNP Réel" },
    { type: "text", text: "Loyer annuel estimé  | 7 200€ (plafonné)  | 8 640€ (marché)" },
    { type: "text", text: "Amortissement annuel | 7 000€ (3,5%)      | 6 000€" },
    { type: "text", text: "Résultat fiscal      | -3 800€ déficit    | -1 360€ déficit" },
    { type: "text", text: "Gain fiscal net      | +1 140€/an         | 0€ impôt sur loyers" },
    { type: "spacer" },
    { type: "heading", text: "ACTEURS CLÉS DU MARCHÉ" },
    { type: "text", text: "Promoteurs : Nexity, Altarea Cogedim, Bouygues Immobilier, Kaufman & Broad, Icade" },
    { type: "text", text: "Gestionnaires : Domitys, Pierre & Vacances, Nexity Studéa" },
    { type: "spacer" },
    { type: "footer", text: "NadlanConnect France — Une extension de NadlanConnect.com" },
  ]);
  return content;
}

function generateBrochurePdf(): Uint8Array {
  const content = buildPdfBytes([
    { type: "title", text: "NadlanConnect France" },
    { type: "subtitle", text: "Comparaison des Dispositifs Fiscaux" },
    { type: "spacer" },
    { type: "heading", text: "JEANBRUN (Location Nue)" },
    { type: "text", text: "Loyer annuel plafonné : 7 200€" },
    { type: "text", text: "Amortissement : 7 000€/an (3,5%)" },
    { type: "text", text: "Résultat fiscal : -3 800€ de déficit" },
    { type: "text", text: "Gain fiscal net : +1 140€/an" },
    { type: "text", text: "Formule : 7 200€ - 4 000€ - 7 000€ = -3 800€" },
    { type: "text", text: "Économie d'impôt : 3 800€ x 30% TMI = 1 140€/an" },
    { type: "spacer" },
    { type: "heading", text: "LMNP RÉEL (Location Meublée)" },
    { type: "text", text: "Loyer annuel marché : 8 640€" },
    { type: "text", text: "Amortissement : 6 000€/an (bâti + mobilier)" },
    { type: "text", text: "Résultat fiscal : -1 360€ de déficit" },
    { type: "text", text: "Gain fiscal : 0€ d'impôt sur les loyers" },
    { type: "spacer" },
    { type: "footer", text: "NadlanConnect France — Une extension de NadlanConnect.com" },
  ]);
  return content;
}

function generateReportPdf(inputs: Record<string, unknown>, results: Record<string, unknown>): Uint8Array {
  const date = new Date().toLocaleDateString("fr-FR");
  const lines: Array<{ type: string; text?: string }> = [
    { type: "title", text: "NadlanConnect France" },
    { type: "subtitle", text: `Rapport de Simulation — ${date}` },
    { type: "spacer" },
    { type: "heading", text: "PARAMÈTRES DE L'INVESTISSEMENT" },
  ];

  if (inputs) {
    if (inputs.prix) lines.push({ type: "text", text: `Prix du bien : ${inputs.prix}€` });
    if (inputs.loyer) lines.push({ type: "text", text: `Loyer mensuel : ${inputs.loyer}€` });
    if (inputs.tmi) lines.push({ type: "text", text: `Tranche marginale : ${inputs.tmi}%` });
    if (inputs.type) lines.push({ type: "text", text: `Type : ${inputs.type === "nu" ? "Location nue (Jeanbrun)" : "LMNP Réel (Meublé)"}` });
    if (inputs.charges) lines.push({ type: "text", text: `Charges annuelles : ${inputs.charges}€` });
    if (inputs.duree) lines.push({ type: "text", text: `Durée de détention : ${inputs.duree} ans` });
  }

  lines.push({ type: "spacer" });
  lines.push({ type: "heading", text: "RÉSULTATS DE LA SIMULATION" });

  if (results) {
    if (results.rendement_brut) lines.push({ type: "text", text: `Rendement brut : ${results.rendement_brut}` });
    if (results.rendement_net) lines.push({ type: "text", text: `Rendement net : ${results.rendement_net}` });
    if (results.gain_fiscal_annuel !== undefined) lines.push({ type: "text", text: `Gain fiscal annuel : ${results.gain_fiscal_annuel}€` });
    if (results.economies_totales !== undefined) lines.push({ type: "text", text: `Économies totales : ${results.economies_totales}€` });
    if (results.score_investissement !== undefined) lines.push({ type: "text", text: `Score investissement : ${results.score_investissement}/100` });
    if (results.recommandation) lines.push({ type: "text", text: `Recommandation : ${results.recommandation}` });
    if (Array.isArray(results.points_vigilance)) {
      lines.push({ type: "subheading", text: "Points de vigilance :" });
      for (const p of results.points_vigilance as string[]) {
        lines.push({ type: "text", text: `• ${p}` });
      }
    }
  }

  lines.push({ type: "spacer" });
  lines.push({ type: "footer", text: "NadlanConnect France — Une extension de NadlanConnect.com" });

  return buildPdfBytes(lines);
}

function buildPdfBytes(lines: Array<{ type: string; text?: string }>): Uint8Array {
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 60;
  const lineHeight = 20;
  let y = pageHeight - margin;
  const contentParts: string[] = [];

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}`;
  };

  const navyRgb = hexToRgb("#1E3A5F");
  const goldRgb = hexToRgb("#C9A84C");

  contentParts.push(`${navyRgb} rg`);

  for (const line of lines) {
    if (y < margin + 40) break;

    switch (line.type) {
      case "title":
        contentParts.push(`${navyRgb} rg`);
        contentParts.push(`BT /F1 22 Tf ${margin} ${y} Td (${escapePdf(line.text || "")}) Tj ET`);
        y -= lineHeight * 1.5;
        break;
      case "subtitle":
        contentParts.push(`${goldRgb} rg`);
        contentParts.push(`BT /F1 14 Tf ${margin} ${y} Td (${escapePdf(line.text || "")}) Tj ET`);
        contentParts.push(`${navyRgb} rg`);
        y -= lineHeight * 1.4;
        break;
      case "heading":
        contentParts.push(`${navyRgb} rg`);
        contentParts.push(`BT /F1 13 Tf ${margin} ${y} Td (${escapePdf(line.text || "")}) Tj ET`);
        y -= lineHeight * 1.3;
        break;
      case "subheading":
        contentParts.push(`${navyRgb} rg`);
        contentParts.push(`BT /F1 11 Tf ${margin} ${y} Td (${escapePdf(line.text || "")}) Tj ET`);
        y -= lineHeight * 1.1;
        break;
      case "text":
        contentParts.push(`0.2 0.2 0.2 rg`);
        contentParts.push(`BT /F1 10 Tf ${margin} ${y} Td (${escapePdf(line.text || "")}) Tj ET`);
        y -= lineHeight;
        break;
      case "footer":
        y = margin + 20;
        contentParts.push(`${goldRgb} rg`);
        contentParts.push(`BT /F1 9 Tf ${margin} ${y} Td (${escapePdf(line.text || "")}) Tj ET`);
        break;
      case "spacer":
        y -= lineHeight * 0.5;
        break;
    }
  }

  const contentStream = contentParts.join("\n");
  const streamBytes = new TextEncoder().encode(contentStream);
  const streamLength = streamBytes.length;

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj

2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj

3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}]
   /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj

4 0 obj
<< /Length ${streamLength} >>
stream
${contentStream}
endstream
endobj

5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000${(400 + streamLength).toString().padStart(9, "0")} 00000 n 

trailer
<< /Size 6 /Root 1 0 R >>
startxref
${500 + streamLength}
%%EOF`;

  return new TextEncoder().encode(pdf);
}

function escapePdf(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x00-\x7F]/g, (c) => {
      const code = c.charCodeAt(0);
      return code < 256 ? `\\${code.toString(8).padStart(3, "0")}` : "?";
    });
}

export default router;
