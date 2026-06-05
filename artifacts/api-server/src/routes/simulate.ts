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

// Advanced simulation endpoint — full French real estate analysis
router.post("/simulate-advanced", async (req, res) => {
  const body = req.body;
  if (!body || typeof body !== "object") {
    res.status(400).json({ error: "Corps de requête invalide" });
    return;
  }

  const {
    // Bien
    prix = 0, surface = 0, ville = "", type_bien = "T2",
    // Financement
    apport = 0, duree_credit = 20, taux_credit = 3.2, taux_assurance = 0.25,
    // Revenus
    loyer_mensuel = 0, type_location = "nu", dispositif = "jeanbrun",
    taux_vacance = 5, revalorisation_loyer = 1.5,
    // Charges
    charges_copro = 0, taxe_fonciere = 0, assurance_pno = 0,
    frais_gestion = 0, budget_entretien = 0,
    // Fiscalité
    tmi = 30, revenus_fonciers_existants = 0,
    // Horizon
    duree_detention = 10,
  } = body;

  const montant_emprunte = prix - apport;
  const loyer_annuel = loyer_mensuel * 12;
  const prix_m2 = surface > 0 ? Math.round(prix / surface) : 0;
  const frais_notaire = Math.round(prix * 0.025);

  const prompt = `Tu es un expert-comptable spécialisé en fiscalité immobilière française (loi Jeanbrun, LMNP réel, micro-foncier, micro-BIC, plus-values immobilières, prélèvements sociaux 17,2%).

Analyse cet investissement immobilier locatif neuf en France avec précision maximale :

=== BIEN ===
- Prix d'acquisition : ${prix}€
- Surface : ${surface} m² (soit ${prix_m2}€/m²)
- Ville/Zone : ${ville || "non précisé"}
- Type : ${type_bien}
- Frais de notaire estimés (neuf) : ${frais_notaire}€ (2,5%)

=== FINANCEMENT ===
- Apport personnel : ${apport}€ (${prix > 0 ? Math.round(apport/prix*100) : 0}% du prix)
- Montant emprunté : ${montant_emprunte}€
- Durée du crédit : ${duree_credit} ans
- Taux d'intérêt nominal : ${taux_credit}%
- Taux assurance emprunteur : ${taux_assurance}%
- Taux effectif global estimé : ${(taux_credit + taux_assurance).toFixed(2)}%

=== REVENUS LOCATIFS ===
- Loyer mensuel : ${loyer_mensuel}€ (${loyer_annuel}€/an)
- Type de location : ${type_location === "nu" ? "Location nue" : "Location meublée (LMNP)"}
- Dispositif fiscal : ${dispositif === "jeanbrun" ? "Dispositif Jeanbrun (déficit foncier)" : dispositif === "lmnp_reel" ? "LMNP Réel (amortissements)" : dispositif === "micro_foncier" ? "Micro-foncier (abattement 30%)" : "Micro-BIC (abattement 50%)"}
- Taux de vacance locative : ${taux_vacance}%
- Revalorisation annuelle des loyers : ${revalorisation_loyer}%

=== CHARGES ANNUELLES ===
- Charges de copropriété : ${charges_copro}€/an
- Taxe foncière : ${taxe_fonciere}€/an
- Assurance PNO : ${assurance_pno}€/an
- Frais de gestion locative : ${frais_gestion}% du loyer brut = ${Math.round(loyer_annuel * frais_gestion / 100)}€/an
- Budget entretien/travaux : ${budget_entretien}€/an
- TOTAL charges : ${charges_copro + taxe_fonciere + assurance_pno + Math.round(loyer_annuel * frais_gestion / 100) + budget_entretien}€/an

=== FISCALITÉ ===
- TMI : ${tmi}%
- Prélèvements sociaux : 17,2%
- Revenus fonciers existants : ${revenus_fonciers_existants}€/an
- Pression fiscale globale sur revenus fonciers : ${tmi + 17.2}%

=== HORIZON ===
- Durée de détention prévue : ${duree_detention} ans

Calcule avec précision et retourne UNIQUEMENT ce JSON strict (sans markdown, sans texte autour) :
{
  "mensualite_credit": XXXX,
  "cout_total_credit": XXXX,
  "interets_totaux": XXXX,
  "effort_epargne_mensuel": XXXX,
  "rendement_brut": "X.XX%",
  "rendement_net_charges": "X.XX%",
  "rendement_net_net": "X.XX%",
  "cashflow_mensuel_avant_impot": XXXX,
  "cashflow_mensuel_apres_impot": XXXX,
  "cashflow_annuel_avant_impot": XXXX,
  "cashflow_annuel_apres_impot": XXXX,
  "resultat_fiscal_annuel": XXXX,
  "gain_fiscal_annuel": XXXX,
  "gain_fiscal_total": XXXX,
  "impots_sur_loyers_annuel": XXXX,
  "tri_estime": "X.X%",
  "patrimoine_net_fin": XXXX,
  "score_global": XX,
  "score_rendement": XX,
  "score_fiscalite": XX,
  "score_financement": XX,
  "recommandation": "analyse détaillée de 3-4 phrases en français sur la qualité de cet investissement, le dispositif recommandé, les optimisations possibles",
  "synthese_fiscale": "explication de 2-3 phrases sur le traitement fiscal précis de ce bien",
  "points_vigilance": ["point1", "point2", "point3", "point4"],
  "optimisations": ["optimisation1", "optimisation2", "optimisation3"]
}

Règles de calcul :
- Mensualité crédit = formule amortissement : M = C × (r/12) / (1 - (1 + r/12)^(-n)) où r = taux nominal + assurance, n = durée en mois
- Loyer effectif = loyer_annuel × (1 - taux_vacance/100)
- Effort épargne = mensualité_credit - cashflow_mensuel_avant_impot
- Cashflow avant impôt = loyer mensuel effectif - mensualité crédit - charges mensuelles
- Pour Jeanbrun : amortissement = prix × 3,5% + charges → déficit foncier imputable sur revenu global plafonné à 10700€/an → gain_fiscal = déficit × TMI%
- Pour LMNP réel : amortissement bâti (prix×0,85/30) + mobilier (prix×0,08/7) + frais → loyers souvent exonérés d'impôts pendant 15-20 ans
- Rendement brut = (loyer_annuel / prix) × 100
- Rendement net charges = ((loyer_annuel - charges_totales) / (prix + frais_notaire)) × 100
- Score sur 100 basé sur : rendement net-net ≥5%=excellent, cashflow positif, dispositif adapté au profil fiscal
`;

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
    console.error("Erreur simulation avancée:", err);
    res.status(500).json({ error: "Erreur lors de la simulation" });
  }
});

export default router;
