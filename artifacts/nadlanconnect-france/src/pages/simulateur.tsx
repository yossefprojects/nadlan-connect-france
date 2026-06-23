import { useState } from "react";
import { Layout } from "@/components/layout";
import { useLang } from "@/lib/i18n";
import { Loader2, Download, TrendingUp, Euro, Shield, BarChart3, AlertTriangle, Lightbulb, ChevronRight, CheckCircle2, Info } from "lucide-react";

type Tab = "bien" | "revenus" | "fiscalite" | "resultats";

type TabDef = { id: Tab; label: string; short: string; icon: string };

const TMI_OPTIONS = [0, 11, 30, 41, 45];

const frContent = {
  tabs: [
    { id: "bien", label: "Bien & Financement", short: "Bien", icon: "🏠" },
    { id: "revenus", label: "Revenus & Charges", short: "Revenus", icon: "💰" },
    { id: "fiscalite", label: "Fiscalité", short: "Fiscalité", icon: "📊" },
    { id: "resultats", label: "Analyse IA", short: "Analyse", icon: "🤖" },
  ] as TabDef[],
  dispositifs: [
    { value: "jeanbrun", label: "Dispositif Jeanbrun", desc: "Location nue — déficit foncier" },
    { value: "lmnp_reel", label: "LMNP Réel", desc: "Location meublée — amortissements" },
    { value: "micro_foncier", label: "Micro-foncier", desc: "Abattement 30% — revenus < 15 000€" },
    { value: "micro_bic", label: "Micro-BIC", desc: "Abattement 50% — revenus < 77 700€" },
  ],
  typeBienOptions: [
    { value: "Studio", label: "Studio" },
    { value: "T2", label: "T2" },
    { value: "T3", label: "T3" },
    { value: "T4", label: "T4" },
    { value: "T5+", label: "T5+" },
    { value: "Maison", label: "Maison" },
  ],
  typeLocationOptions: [
    { value: "nu", label: "Location nue" },
    { value: "meuble", label: "Location meublée" },
  ],
  units: { euro: "€", m2: "m²", years: "ans", percent: "%", euroMonth: "€/mois", euroYear: "€/an" },
  hero: {
    badge: "Simulateur IA — Droits français",
    title: "Simulez votre investissement immobilier neuf",
    subtitle: "Analyse complète : financement, rendement, cash-flow, fiscalité Jeanbrun/LMNP, TRI.",
  },
  bien: {
    heading: "🏠 Caractéristiques du bien",
    prixLabel: "Prix d'acquisition",
    prixHint: "hors frais de notaire",
    surfaceLabel: "Surface",
    typeBienLabel: "Type de bien",
    villeLabel: "Ville / Zone géographique",
    villeHint: "ex: Paris 15e, Lyon 69003",
    villePlaceholder: "ex: Bordeaux, Nantes...",
    prixM2: "Prix/m²",
    fraisNotaire: "Frais notaire (2,5%)",
    coutTotal: "Coût total",
    financementHeading: "🏦 Plan de financement",
    apportLabel: "Apport personnel",
    apportHintSuffix: "% du prix",
    montantEmprunte: "Montant emprunté",
    dureeLabel: "Durée du crédit",
    tauxLabel: "Taux d'intérêt nominal",
    tauxHint: "hors assurance",
    assuranceLabel: "Taux assurance emprunteur",
    assuranceHint: "annuel sur capital",
    teg: "TEG estimé",
  },
  revenus: {
    heading: "💰 Revenus locatifs",
    loyerLabel: "Loyer mensuel estimé",
    loyerHint: "charges locataire non incluses",
    typeLocationLabel: "Type de location",
    vacanceLabel: "Taux de vacance locative",
    vacanceHint: "moyenne France: 3-8%",
    revalorisationLabel: "Revalorisation annuelle loyer",
    revalorisationHint: "indice IRL: ~2%/an",
    detentionLabel: "Durée de détention",
    loyerAnnuel: "Loyer annuel brut",
    apresVacance: (v: string) => `Après vacance (${v}%)`,
    rendementBrut: "Rendement brut",
    chargesHeading: "🧾 Charges annuelles",
    chargesCoproLabel: "Charges de copropriété",
    chargesCoproHint: "part propriétaire",
    taxeFonciereLabel: "Taxe foncière",
    taxeFonciereHint: "sans ordures ménagères",
    assurancePnoLabel: "Assurance PNO",
    assurancePnoHint: "propriétaire non occupant",
    fraisGestionLabel: "Frais de gestion locative",
    fraisGestionHint: "si agence: 7-10%",
    entretienLabel: "Budget entretien / travaux",
    entretienHint: "provision annuelle",
    totalCharges: "Total charges annuelles",
    dontGestion: (v: string) => `Dont frais de gestion (${v}%)`,
  },
  fiscalite: {
    heading: "📊 Dispositif fiscal",
    tmiFieldLabel: "Tranche marginale d'imposition",
    revenusExistantsLabel: "Revenus fonciers existants",
    revenusExistantsHint: "pour calcul plafond déficit",
    pressionHeading: "Pression fiscale sur vos revenus locatifs",
    tmi: "TMI",
    prelevements: "Prélèvements sociaux",
    pressionTotale: "Pression fiscale totale",
    jeanbrunLabel: "Jeanbrun :",
    jeanbrunText1: "Le déficit foncier est imputable sur votre revenu global dans la limite de ",
    jeanbrunBold: "10 700€/an",
    jeanbrunText2: ". L'excédent est reportable sur les revenus fonciers des 10 années suivantes.",
    lmnpLabel: "LMNP Réel :",
    lmnpText1: "L'amortissement du bien (bâti + mobilier) couvre généralement l'intégralité des loyers perçus pendant ",
    lmnpBold: "15 à 25 ans",
    lmnpText2: ", ramenant votre imposition à 0€.",
    lancerComplet: "Lancer l'analyse IA complète →",
  },
  resultats: {
    loadingTitle: "Analyse IA en cours...",
    loadingSub: "Claude calcule vos rendements, cash-flows, gains fiscaux et TRI avec précision.",
    errorTitle: "Erreur lors de l'analyse",
    retry: "Réessayer",
    emptyTitle: "Aucune analyse effectuée",
    emptySub: "Complétez les 3 onglets précédents puis lancez l'analyse.",
    goFiscalite: "Aller à la fiscalité →",
    scoreGlobalHeading: "Score global de l'investissement",
    scoreGlobal: "Score global",
    scoreRendement: "Rendement",
    scoreFiscalite: "Fiscalité",
    scoreFinancement: "Financement",
    financementHeading: "Financement",
    mensualiteLabel: "Mensualité crédit",
    mensualiteSub: "assurance incluse",
    effortLabel: "Effort d'épargne",
    effortSub: "par mois",
    coutCreditLabel: "Coût total crédit",
    coutCreditSub: "capital + intérêts",
    rendementsHeading: "Rendements",
    rendBrut: "Rendement brut",
    rendNetCharges: "Rendement net charges",
    rendNetNet: "Rendement net-net",
    cashflowHeading: "Cash-flow mensuel",
    avantImpots: "Avant impôts",
    apresImpots: "Après impôts & dispositif",
    perAn: " / an",
    analyseFiscaleHeading: "Analyse fiscale",
    gainAnnuel: "Gain fiscal annuel",
    gainTotal: (n: string) => `Gain total (${n} ans)`,
    impotLoyersLabel: "Impôt sur loyers",
    impotLoyersSub: "/an",
    triEstime: "TRI estimé",
    syntheseFiscale: "Synthèse fiscale",
    recommandation: "Recommandation IA",
    pointsVigilance: "Points de vigilance",
    optimisations: "Pistes d'optimisation",
    telechargerPdf: "Télécharger le rapport PDF complet",
  },
  nav: { precedent: "← Précédent", suivant: "Suivant →", lancer: "Lancer l'analyse IA →" },
  recap: {
    rapideHeading: "Récapitulatif rapide",
    loyerMois: "Loyer/mois",
    rdtBrut: "Rdt brut",
    emprunt: "Emprunt",
    lancerMobile: "Lancer l'analyse IA",
    heading: "Récapitulatif",
    prixAchat: "Prix d'achat",
    fraisNotaire: "Frais notaire (2,5%)",
    apport: "Apport",
    loyerMensuel: "Loyer mensuel",
    rendementBrut: "Rendement brut",
    chargesAn: "Charges/an",
    dispositif: "Dispositif",
    tmi: "TMI",
    dureeDetention: "Durée détention",
    analyserMaintenant: "Analyser maintenant",
    scoreGlobal: "Score global",
    triPrefix: "TRI estimé : ",
  },
  errors: { generic: "Une erreur est survenue. Vérifiez vos données et réessayez." },
};

type SimContent = typeof frContent;

const enContent: SimContent = {
  tabs: [
    { id: "bien", label: "Property & Financing", short: "Property", icon: "🏠" },
    { id: "revenus", label: "Income & Costs", short: "Income", icon: "💰" },
    { id: "fiscalite", label: "Taxation", short: "Tax", icon: "📊" },
    { id: "resultats", label: "AI Analysis", short: "Analysis", icon: "🤖" },
  ],
  dispositifs: [
    { value: "jeanbrun", label: "Jeanbrun scheme", desc: "Unfurnished rental — property deficit (déficit foncier)" },
    { value: "lmnp_reel", label: "LMNP Réel", desc: "Furnished rental — depreciation" },
    { value: "micro_foncier", label: "Micro-foncier", desc: "30% allowance — income < 15 000€" },
    { value: "micro_bic", label: "Micro-BIC", desc: "50% allowance — income < 77 700€" },
  ],
  typeBienOptions: [
    { value: "Studio", label: "Studio" },
    { value: "T2", label: "T2" },
    { value: "T3", label: "T3" },
    { value: "T4", label: "T4" },
    { value: "T5+", label: "T5+" },
    { value: "Maison", label: "House" },
  ],
  typeLocationOptions: [
    { value: "nu", label: "Unfurnished rental" },
    { value: "meuble", label: "Furnished rental" },
  ],
  units: { euro: "€", m2: "m²", years: "yrs", percent: "%", euroMonth: "€/mo", euroYear: "€/yr" },
  hero: {
    badge: "AI Simulator — French law",
    title: "Simulate your new-build property investment",
    subtitle: "Complete analysis: financing, yield, cash flow, Jeanbrun/LMNP taxation, IRR.",
  },
  bien: {
    heading: "🏠 Property details",
    prixLabel: "Purchase price",
    prixHint: "excl. notaire fees",
    surfaceLabel: "Surface area",
    typeBienLabel: "Property type",
    villeLabel: "City / Area",
    villeHint: "e.g. Paris 15e, Lyon 69003",
    villePlaceholder: "e.g. Bordeaux, Nantes...",
    prixM2: "Price/m²",
    fraisNotaire: "Notaire fees (2,5%)",
    coutTotal: "Total cost",
    financementHeading: "🏦 Financing plan",
    apportLabel: "Down payment",
    apportHintSuffix: "% of price",
    montantEmprunte: "Loan amount",
    dureeLabel: "Loan term",
    tauxLabel: "Nominal interest rate",
    tauxHint: "excl. insurance",
    assuranceLabel: "Borrower insurance rate",
    assuranceHint: "annual on capital",
    teg: "Est. APR (TEG)",
  },
  revenus: {
    heading: "💰 Rental income",
    loyerLabel: "Estimated monthly rent",
    loyerHint: "tenant charges excluded",
    typeLocationLabel: "Rental type",
    vacanceLabel: "Rental vacancy rate",
    vacanceHint: "France average: 3-8%",
    revalorisationLabel: "Annual rent increase",
    revalorisationHint: "IRL index: ~2%/yr",
    detentionLabel: "Holding period",
    loyerAnnuel: "Gross annual rent",
    apresVacance: (v: string) => `After vacancy (${v}%)`,
    rendementBrut: "Gross yield",
    chargesHeading: "🧾 Annual costs",
    chargesCoproLabel: "Service charges (copropriété)",
    chargesCoproHint: "owner's share",
    taxeFonciereLabel: "Property tax (taxe foncière)",
    taxeFonciereHint: "excl. waste collection",
    assurancePnoLabel: "PNO insurance",
    assurancePnoHint: "non-occupant landlord",
    fraisGestionLabel: "Rental management fees",
    fraisGestionHint: "if via agency: 7-10%",
    entretienLabel: "Maintenance / works budget",
    entretienHint: "annual provision",
    totalCharges: "Total annual costs",
    dontGestion: (v: string) => `Incl. management fees (${v}%)`,
  },
  fiscalite: {
    heading: "📊 Tax scheme",
    tmiFieldLabel: "Marginal tax bracket (TMI)",
    revenusExistantsLabel: "Existing property income",
    revenusExistantsHint: "for deficit cap calculation",
    pressionHeading: "Tax burden on your rental income",
    tmi: "TMI",
    prelevements: "Social levies",
    pressionTotale: "Total tax burden",
    jeanbrunLabel: "Jeanbrun:",
    jeanbrunText1: "The property deficit (déficit foncier) can be offset against your overall income up to ",
    jeanbrunBold: "10 700€/an",
    jeanbrunText2: ". Any excess can be carried forward against property income for the next 10 years.",
    lmnpLabel: "LMNP Réel:",
    lmnpText1: "Depreciation of the property (building + furniture) generally offsets all rental income received for ",
    lmnpBold: "15 to 25 years",
    lmnpText2: ", bringing your tax bill down to 0€.",
    lancerComplet: "Run the full AI analysis →",
  },
  resultats: {
    loadingTitle: "AI analysis in progress...",
    loadingSub: "Claude is precisely calculating your yields, cash flows, tax savings and IRR.",
    errorTitle: "Analysis error",
    retry: "Try again",
    emptyTitle: "No analysis yet",
    emptySub: "Complete the 3 previous tabs, then run the analysis.",
    goFiscalite: "Go to taxation →",
    scoreGlobalHeading: "Overall investment score",
    scoreGlobal: "Overall score",
    scoreRendement: "Yield",
    scoreFiscalite: "Taxation",
    scoreFinancement: "Financing",
    financementHeading: "Financing",
    mensualiteLabel: "Monthly payment",
    mensualiteSub: "insurance included",
    effortLabel: "Savings effort",
    effortSub: "per month",
    coutCreditLabel: "Total loan cost",
    coutCreditSub: "principal + interest",
    rendementsHeading: "Yields",
    rendBrut: "Gross yield",
    rendNetCharges: "Net yield (after costs)",
    rendNetNet: "Net-net yield",
    cashflowHeading: "Monthly cash flow",
    avantImpots: "Before tax",
    apresImpots: "After tax & scheme",
    perAn: " / yr",
    analyseFiscaleHeading: "Tax analysis",
    gainAnnuel: "Annual tax saving",
    gainTotal: (n: string) => `Total saving (${n} yrs)`,
    impotLoyersLabel: "Tax on rent",
    impotLoyersSub: "/yr",
    triEstime: "Est. IRR",
    syntheseFiscale: "Tax summary",
    recommandation: "AI recommendation",
    pointsVigilance: "Points of caution",
    optimisations: "Optimization tips",
    telechargerPdf: "Download the full PDF report",
  },
  nav: { precedent: "← Back", suivant: "Next →", lancer: "Run AI analysis →" },
  recap: {
    rapideHeading: "Quick summary",
    loyerMois: "Rent/mo",
    rdtBrut: "Gross yld",
    emprunt: "Loan",
    lancerMobile: "Run AI analysis",
    heading: "Summary",
    prixAchat: "Purchase price",
    fraisNotaire: "Notaire fees (2,5%)",
    apport: "Down payment",
    loyerMensuel: "Monthly rent",
    rendementBrut: "Gross yield",
    chargesAn: "Costs/yr",
    dispositif: "Scheme",
    tmi: "TMI",
    dureeDetention: "Holding period",
    analyserMaintenant: "Analyze now",
    scoreGlobal: "Overall score",
    triPrefix: "Est. IRR: ",
  },
  errors: { generic: "Something went wrong. Check your data and try again." },
};

const content = { fr: frContent, en: enContent };

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{children}</label>
      {hint && <span className="text-[10px] text-gray-300 italic">{hint}</span>}
    </div>
  );
}

function InputField({ label, hint, value, onChange, type = "number", placeholder = "", unit, min }: {
  label: string; hint?: string; value: string | number; onChange: (v: string) => void;
  type?: string; placeholder?: string; unit?: string; min?: number;
}) {
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10 transition-colors pr-10"
        />
        {unit && <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-medium">{unit}</span>}
      </div>
    </div>
  );
}

function SelectField({ label, hint, value, onChange, options }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string; desc?: string }[];
}) {
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10 transition-colors bg-white"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}{o.desc ? ` — ${o.desc}` : ""}</option>)}
      </select>
    </div>
  );
}

function ScoreCircle({ score, label, size = "lg" }: { score: number; label: string; size?: "sm" | "lg" }) {
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const isLg = size === "lg";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={isLg ? 80 : 56} height={isLg ? 80 : 56} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${2 * Math.PI * 34 * score / 100} ${2 * Math.PI * 34 * (1 - score / 100)}`}
          strokeDashoffset={2 * Math.PI * 34 * 0.25}
          strokeLinecap="round" />
        <text x="40" y="44" textAnchor="middle" fill={color} fontSize={isLg ? "18" : "13"} fontWeight="900">{score}</text>
      </svg>
      <span className="text-[10px] text-gray-400 uppercase tracking-wide text-center">{label}</span>
    </div>
  );
}

function MetricBox({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-4 border ${accent ? "bg-foreground border-foreground" : "bg-white border-gray-100"}`}>
      <p className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${accent ? "text-white/50" : "text-gray-400"}`}>{label}</p>
      <p className={`text-xl font-black ${accent ? "text-sea" : "text-foreground"}`}>{value}</p>
      {sub && <p className={`text-[10px] mt-0.5 ${accent ? "text-white/40" : "text-gray-300"}`}>{sub}</p>}
    </div>
  );
}

const fmt = (n: number, decimals = 0) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: decimals }).format(n);

const fmtNum = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

export default function Simulateur() {
  const { lang } = useLang();
  const t = content[lang];
  const [tab, setTab] = useState<Tab>("bien");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Bien & Financement
  const [prix, setPrix] = useState("250000");
  const [surface, setSurface] = useState("45");
  const [ville, setVille] = useState("");
  const [typeBien, setTypeBien] = useState("T2");
  const [apport, setApport] = useState("50000");
  const [dureCredit, setDureCredit] = useState("20");
  const [tauxCredit, setTauxCredit] = useState("3.20");
  const [tauxAssurance, setTauxAssurance] = useState("0.25");

  // Revenus & Charges
  const [loyer, setLoyer] = useState("850");
  const [typeLocation, setTypeLocation] = useState("nu");
  const [tauxVacance, setTauxVacance] = useState("5");
  const [revalorisation, setRevalorisation] = useState("1.5");
  const [chargesCopro, setChargesCopro] = useState("1200");
  const [taxeFonciere, setTaxeFonciere] = useState("800");
  const [assurancePno, setAssurancePno] = useState("200");
  const [fraisGestion, setFraisGestion] = useState("8");
  const [entretien, setEntretien] = useState("500");
  const [dureeDetention, setDureeDetention] = useState("15");

  // Fiscalité
  const [dispositif, setDispositif] = useState("jeanbrun");
  const [tmi, setTmi] = useState("30");
  const [revenusExistants, setRevenusExistants] = useState("0");

  const simulate = async () => {
    setLoading(true);
    setError(null);
    setTab("resultats");
    try {
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/simulate-advanced`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prix: Number(prix), surface: Number(surface), ville, type_bien: typeBien,
          apport: Number(apport), duree_credit: Number(dureCredit),
          taux_credit: Number(tauxCredit), taux_assurance: Number(tauxAssurance),
          loyer_mensuel: Number(loyer), type_location: typeLocation,
          dispositif, taux_vacance: Number(tauxVacance),
          revalorisation_loyer: Number(revalorisation),
          charges_copro: Number(chargesCopro), taxe_fonciere: Number(taxeFonciere),
          assurance_pno: Number(assurancePno), frais_gestion: Number(fraisGestion),
          budget_entretien: Number(entretien), tmi: Number(tmi),
          revenus_fonciers_existants: Number(revenusExistants),
          duree_detention: Number(dureeDetention),
          lang,
        }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setResults(await res.json());
    } catch (e) {
      setError(t.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  const exportPdf = () => {
    if (!results) return;
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    const date = new Date().toISOString().split("T")[0];
    fetch(`${baseUrl}/api/pdf/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: { prix, surface, ville, loyer, dispositif, tmi, duree_detention: dureeDetention }, results }),
    }).then((r) => r.blob()).then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `rapport-simulation-${date}.pdf`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  const fraisNotaire = Math.round(Number(prix) * 0.025);
  const prixTotal = Number(prix) + fraisNotaire;
  const montantEmprunte = Number(prix) - Number(apport);
  const loyerAnnuel = Number(loyer) * 12;
  const chargesTotal = Number(chargesCopro) + Number(taxeFonciere) + Number(assurancePno) + Math.round(loyerAnnuel * Number(fraisGestion) / 100) + Number(entretien);
  const rendBrut = Number(prix) > 0 ? (loyerAnnuel / Number(prix) * 100).toFixed(2) : "0";

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[36vh] min-h-[240px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2A] via-[#0E1B2A]/70 to-[#0E1B2A]/30" />
        <div className="relative z-10 container mx-auto px-4 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sea" /> {t.hero.badge}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">{t.hero.title}</h1>
          <p className="text-white/55 text-sm max-w-xl">{t.hero.subtitle}</p>
        </div>
      </section>

      <div className="bg-muted min-h-screen">
        {/* Tab bar */}
        <div className="sticky top-24 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto">
              {t.tabs.map((tabItem, i) => (
                <button key={tabItem.id} onClick={() => setTab(tabItem.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-colors flex-1 sm:flex-none justify-center sm:justify-start ${tab === tabItem.id ? "border-sea text-foreground" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
                  <span>{tabItem.icon}</span>
                  <span className="hidden sm:inline">{tabItem.label}</span>
                  <span className="sm:hidden">{tabItem.short}</span>
                  {i < 3 && <ChevronRight className="w-3.5 h-3.5 text-gray-200 ml-1 hidden sm:block" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left panel — form */}
            <div className="lg:col-span-2">

              {/* TAB: Bien & Financement */}
              {tab === "bien" && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
                      {t.bien.heading}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <InputField label={t.bien.prixLabel} hint={t.bien.prixHint} value={prix} onChange={setPrix} unit={t.units.euro} />
                      </div>
                      <InputField label={t.bien.surfaceLabel} value={surface} onChange={setSurface} unit={t.units.m2} />
                      <SelectField label={t.bien.typeBienLabel} value={typeBien} onChange={setTypeBien}
                        options={t.typeBienOptions} />
                      <div className="col-span-2">
                        <InputField label={t.bien.villeLabel} hint={t.bien.villeHint} value={ville} onChange={setVille} type="text" placeholder={t.bien.villePlaceholder} />
                      </div>
                    </div>
                    {Number(prix) > 0 && Number(surface) > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="bg-muted rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">{t.bien.prixM2}</p><p className="font-black text-foreground text-sm">{fmtNum(Math.round(Number(prix)/Number(surface)))}€</p></div>
                        <div className="bg-muted rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">{t.bien.fraisNotaire}</p><p className="font-black text-foreground text-sm">{fmtNum(fraisNotaire)}€</p></div>
                        <div className="bg-muted rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">{t.bien.coutTotal}</p><p className="font-black text-sea text-sm">{fmtNum(prixTotal)}€</p></div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
                      {t.bien.financementHeading}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label={t.bien.apportLabel} hint={Number(prix) > 0 ? `${Math.round(Number(apport)/Number(prix)*100)}${t.bien.apportHintSuffix}` : ""} value={apport} onChange={setApport} unit={t.units.euro} />
                      <div className="bg-muted rounded-xl p-3 flex flex-col justify-center">
                        <p className="text-[10px] text-gray-400 mb-0.5">{t.bien.montantEmprunte}</p>
                        <p className="font-black text-foreground">{fmtNum(Math.max(0, montantEmprunte))}€</p>
                      </div>
                      <InputField label={t.bien.dureeLabel} value={dureCredit} onChange={setDureCredit} unit={t.units.years} />
                      <InputField label={t.bien.tauxLabel} hint={t.bien.tauxHint} value={tauxCredit} onChange={setTauxCredit} unit={t.units.percent} />
                      <InputField label={t.bien.assuranceLabel} hint={t.bien.assuranceHint} value={tauxAssurance} onChange={setTauxAssurance} unit={t.units.percent} />
                      <div className="bg-muted rounded-xl p-3 flex flex-col justify-center">
                        <p className="text-[10px] text-gray-400 mb-0.5">{t.bien.teg}</p>
                        <p className="font-black text-foreground">{(Number(tauxCredit) + Number(tauxAssurance)).toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Revenus & Charges */}
              {tab === "revenus" && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-5">{t.revenus.heading}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <InputField label={t.revenus.loyerLabel} hint={t.revenus.loyerHint} value={loyer} onChange={setLoyer} unit={t.units.euroMonth} />
                      </div>
                      <SelectField label={t.revenus.typeLocationLabel} value={typeLocation} onChange={setTypeLocation}
                        options={t.typeLocationOptions} />
                      <InputField label={t.revenus.vacanceLabel} hint={t.revenus.vacanceHint} value={tauxVacance} onChange={setTauxVacance} unit={t.units.percent} />
                      <InputField label={t.revenus.revalorisationLabel} hint={t.revenus.revalorisationHint} value={revalorisation} onChange={setRevalorisation} unit={t.units.percent} />
                      <InputField label={t.revenus.detentionLabel} value={dureeDetention} onChange={setDureeDetention} unit={t.units.years} />
                    </div>
                    {Number(loyer) > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="bg-muted rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">{t.revenus.loyerAnnuel}</p><p className="font-black text-foreground text-sm">{fmtNum(loyerAnnuel)}€</p></div>
                        <div className="bg-muted rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">{t.revenus.apresVacance(tauxVacance)}</p><p className="font-black text-foreground text-sm">{fmtNum(Math.round(loyerAnnuel * (1 - Number(tauxVacance)/100)))}€</p></div>
                        <div className="bg-muted rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">{t.revenus.rendementBrut}</p><p className="font-black text-sea text-sm">{rendBrut}%</p></div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-5">{t.revenus.chargesHeading}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label={t.revenus.chargesCoproLabel} hint={t.revenus.chargesCoproHint} value={chargesCopro} onChange={setChargesCopro} unit={t.units.euroYear} />
                      <InputField label={t.revenus.taxeFonciereLabel} hint={t.revenus.taxeFonciereHint} value={taxeFonciere} onChange={setTaxeFonciere} unit={t.units.euroYear} />
                      <InputField label={t.revenus.assurancePnoLabel} hint={t.revenus.assurancePnoHint} value={assurancePno} onChange={setAssurancePno} unit={t.units.euroYear} />
                      <InputField label={t.revenus.fraisGestionLabel} hint={t.revenus.fraisGestionHint} value={fraisGestion} onChange={setFraisGestion} unit={t.units.percent} />
                      <div className="col-span-2">
                        <InputField label={t.revenus.entretienLabel} hint={t.revenus.entretienHint} value={entretien} onChange={setEntretien} unit={t.units.euroYear} />
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t.revenus.totalCharges}</span>
                        <span className="font-black text-foreground">{fmtNum(chargesTotal)}{t.units.euroYear}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-300">{t.revenus.dontGestion(fraisGestion)}</span>
                        <span className="text-xs text-gray-400 font-medium">{fmtNum(Math.round(loyerAnnuel * Number(fraisGestion)/100))}€</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Fiscalité */}
              {tab === "fiscalite" && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-5">{t.fiscalite.heading}</h2>
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {t.dispositifs.map((d) => (
                        <button key={d.value} onClick={() => { setDispositif(d.value); setTypeLocation(d.value.includes("foncier") || d.value === "jeanbrun" ? "nu" : "meuble"); }}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${dispositif === d.value ? "border-foreground bg-foreground/5" : "border-gray-100 hover:border-gray-200"}`}>
                          <div>
                            <p className={`font-bold text-sm ${dispositif === d.value ? "text-foreground" : "text-gray-700"}`}>{d.label}</p>
                            <p className="text-xs text-gray-400">{d.desc}</p>
                          </div>
                          {dispositif === d.value && <CheckCircle2 className="w-5 h-5 text-sea shrink-0" />}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>{t.fiscalite.tmiFieldLabel}</FieldLabel>
                        <div className="grid grid-cols-5 gap-1.5">
                          {TMI_OPTIONS.map((tmiOpt) => (
                            <button key={tmiOpt} onClick={() => setTmi(String(tmiOpt))}
                              className={`py-2 rounded-xl text-xs font-bold border transition-all ${tmi === String(tmiOpt) ? "bg-foreground text-white border-foreground" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                              {tmiOpt}%
                            </button>
                          ))}
                        </div>
                      </div>
                      <InputField label={t.fiscalite.revenusExistantsLabel} hint={t.fiscalite.revenusExistantsHint} value={revenusExistants} onChange={setRevenusExistants} unit={t.units.euroYear} />
                    </div>
                  </div>

                  <div className="bg-foreground/5 border border-foreground/15 rounded-2xl p-5">
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-sea" /> {t.fiscalite.pressionHeading}
                    </h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div><p className="text-[10px] text-gray-400 mb-1">{t.fiscalite.tmi}</p><p className="font-black text-foreground">{tmi}%</p></div>
                      <div><p className="text-[10px] text-gray-400 mb-1">{t.fiscalite.prelevements}</p><p className="font-black text-foreground">17,2%</p></div>
                      <div><p className="text-[10px] text-gray-400 mb-1">{t.fiscalite.pressionTotale}</p><p className="font-black text-red-500">{Number(tmi) + 17.2}%</p></div>
                    </div>
                    {dispositif === "jeanbrun" && (
                      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                        <strong className="text-foreground">{t.fiscalite.jeanbrunLabel}</strong> {t.fiscalite.jeanbrunText1}<strong>{t.fiscalite.jeanbrunBold}</strong>{t.fiscalite.jeanbrunText2}
                      </p>
                    )}
                    {dispositif === "lmnp_reel" && (
                      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                        <strong className="text-foreground">{t.fiscalite.lmnpLabel}</strong> {t.fiscalite.lmnpText1}<strong>{t.fiscalite.lmnpBold}</strong>{t.fiscalite.lmnpText2}
                      </p>
                    )}
                  </div>

                  <button onClick={simulate}
                    className="w-full py-4 rounded-xl bg-sea text-white font-bold text-base hover:bg-sea transition-colors shadow-lg shadow-amber-200 flex items-center justify-center gap-2">
                    {t.fiscalite.lancerComplet}
                  </button>
                </div>
              )}

              {/* TAB: Résultats */}
              {tab === "resultats" && (
                <div>
                  {loading && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center text-center">
                      <Loader2 className="w-14 h-14 text-foreground animate-spin mb-5" />
                      <p className="font-bold text-foreground text-lg mb-1">{t.resultats.loadingTitle}</p>
                      <p className="text-sm text-gray-400">{t.resultats.loadingSub}</p>
                    </div>
                  )}

                  {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                      <p className="text-red-600 font-semibold mb-2">{t.resultats.errorTitle}</p>
                      <p className="text-sm text-red-400">{error}</p>
                      <button onClick={() => setTab("fiscalite")} className="mt-4 px-5 py-2 rounded-full bg-foreground text-white text-sm font-semibold">
                        {t.resultats.retry}
                      </button>
                    </div>
                  )}

                  {!loading && !error && !results && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center text-center">
                      <BarChart3 className="w-14 h-14 text-gray-200 mb-5" />
                      <p className="font-semibold text-gray-300 mb-1">{t.resultats.emptyTitle}</p>
                      <p className="text-sm text-gray-300 mb-5">{t.resultats.emptySub}</p>
                      <button onClick={() => setTab("fiscalite")} className="px-5 py-2.5 rounded-full bg-sea text-white text-sm font-semibold">
                        {t.resultats.goFiscalite}
                      </button>
                    </div>
                  )}

                  {!loading && !error && results && (
                    <div className="space-y-5" data-testid="results-dashboard">
                      {/* Scores */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{t.resultats.scoreGlobalHeading}</h3>
                        <div className="flex items-center justify-around">
                          <ScoreCircle score={results.score_global ?? 0} label={t.resultats.scoreGlobal} size="lg" />
                          <ScoreCircle score={results.score_rendement ?? 0} label={t.resultats.scoreRendement} size="sm" />
                          <ScoreCircle score={results.score_fiscalite ?? 0} label={t.resultats.scoreFiscalite} size="sm" />
                          <ScoreCircle score={results.score_financement ?? 0} label={t.resultats.scoreFinancement} size="sm" />
                        </div>
                      </div>

                      {/* Financement */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.resultats.financementHeading}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <MetricBox label={t.resultats.mensualiteLabel} value={fmt(results.mensualite_credit ?? 0)} sub={t.resultats.mensualiteSub} accent />
                          <MetricBox label={t.resultats.effortLabel} value={fmt(Math.abs(results.effort_epargne_mensuel ?? 0))} sub={t.resultats.effortSub} />
                          <MetricBox label={t.resultats.coutCreditLabel} value={fmt(results.cout_total_credit ?? 0)} sub={t.resultats.coutCreditSub} />
                        </div>
                      </div>

                      {/* Rendements */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.resultats.rendementsHeading}</h3>
                        <div className="grid grid-cols-3 gap-3">
                          <MetricBox label={t.resultats.rendBrut} value={results.rendement_brut ?? "—"} />
                          <MetricBox label={t.resultats.rendNetCharges} value={results.rendement_net_charges ?? "—"} />
                          <MetricBox label={t.resultats.rendNetNet} value={results.rendement_net_net ?? "—"} accent />
                        </div>
                      </div>

                      {/* Cash-flow */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.resultats.cashflowHeading}</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className={`rounded-xl p-4 border ${(results.cashflow_mensuel_avant_impot ?? 0) >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">{t.resultats.avantImpots}</p>
                            <p className={`text-2xl font-black ${(results.cashflow_mensuel_avant_impot ?? 0) >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                              {results.cashflow_mensuel_avant_impot >= 0 ? "+" : ""}{fmt(results.cashflow_mensuel_avant_impot ?? 0)}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">{fmt((results.cashflow_annuel_avant_impot ?? 0))}{t.resultats.perAn}</p>
                          </div>
                          <div className={`rounded-xl p-4 border ${(results.cashflow_mensuel_apres_impot ?? 0) >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">{t.resultats.apresImpots}</p>
                            <p className={`text-2xl font-black ${(results.cashflow_mensuel_apres_impot ?? 0) >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
                              {results.cashflow_mensuel_apres_impot >= 0 ? "+" : ""}{fmt(results.cashflow_mensuel_apres_impot ?? 0)}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">{fmt((results.cashflow_annuel_apres_impot ?? 0))}{t.resultats.perAn}</p>
                          </div>
                        </div>
                      </div>

                      {/* Fiscalité */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.resultats.analyseFiscaleHeading}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <MetricBox label={t.resultats.gainAnnuel} value={fmt(results.gain_fiscal_annuel ?? 0)} accent />
                          <MetricBox label={t.resultats.gainTotal(dureeDetention)} value={fmt(results.gain_fiscal_total ?? 0)} />
                          <MetricBox label={t.resultats.impotLoyersLabel} value={fmt(results.impots_sur_loyers_annuel ?? 0)} sub={t.resultats.impotLoyersSub} />
                          <MetricBox label={t.resultats.triEstime} value={results.tri_estime ?? "—"} />
                        </div>
                        {results.synthese_fiscale && (
                          <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-4">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <BarChart3 className="w-3.5 h-3.5 text-sea" /> {t.resultats.syntheseFiscale}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">{results.synthese_fiscale}</p>
                          </div>
                        )}
                      </div>

                      {/* Recommandation */}
                      {results.recommandation && (
                        <div className="bg-foreground rounded-2xl p-6">
                          <p className="text-xs font-bold text-sea uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" /> {t.resultats.recommandation}
                          </p>
                          <p className="text-sm text-white/80 leading-relaxed">{results.recommandation}</p>
                        </div>
                      )}

                      {/* Points de vigilance */}
                      {results.points_vigilance?.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5">
                          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5" /> {t.resultats.pointsVigilance}
                          </p>
                          <ul className="space-y-2">
                            {results.points_vigilance.map((pt: string, i: number) => (
                              <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />{pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Optimisations */}
                      {results.optimisations?.length > 0 && (
                        <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-5">
                          <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5" /> {t.resultats.optimisations}
                          </p>
                          <ul className="space-y-2">
                            {results.optimisations.map((o: string, i: number) => (
                              <li key={i} className="text-sm text-emerald-800 flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />{o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <button onClick={exportPdf}
                        className="w-full py-3.5 rounded-xl border-2 border-sea text-sea font-bold hover:bg-sea hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> {t.resultats.telechargerPdf}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation entre onglets */}
              {tab !== "resultats" && (
                <div className="mt-5 flex justify-between">
                  {tab !== "bien" ? (
                    <button onClick={() => setTab(tab === "revenus" ? "bien" : tab === "fiscalite" ? "revenus" : "fiscalite")}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 font-medium">
                      {t.nav.precedent}
                    </button>
                  ) : <span />}
                  {tab !== "fiscalite" ? (
                    <button onClick={() => setTab(tab === "bien" ? "revenus" : "fiscalite")}
                      className="px-5 py-2.5 rounded-xl bg-foreground text-white text-sm font-semibold hover:bg-[#152d4a] transition-colors">
                      {t.nav.suivant}
                    </button>
                  ) : (
                    <button onClick={simulate}
                      className="px-6 py-2.5 rounded-xl bg-sea text-white text-sm font-bold hover:bg-sea transition-colors flex items-center gap-2">
                      {t.nav.lancer}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Mobile mini-summary bar */}
            <div className="lg:hidden bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.recap.rapideHeading}</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: t.recap.loyerMois, value: Number(loyer) > 0 ? `${fmtNum(Number(loyer))}€` : "—" },
                  { label: t.recap.rdtBrut, value: Number(prix) > 0 && Number(loyer) > 0 ? `${rendBrut}%` : "—" },
                  { label: t.recap.emprunt, value: montantEmprunte > 0 ? `${fmtNum(montantEmprunte)}€` : "—" },
                ].map((row) => (
                  <div key={row.label} className="text-center bg-gray-50 rounded-xl p-2.5">
                    <div className="text-sm font-black text-foreground">{row.value}</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-wide mt-0.5">{row.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={simulate}
                className="w-full py-3 rounded-xl bg-sea text-white font-bold text-sm hover:bg-sea transition-colors flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4" /> {t.recap.lancerMobile}
              </button>
            </div>

            {/* Right panel — live summary */}
            <div className="hidden lg:block">
              <div className="sticky top-[108px] space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.recap.heading}</h3>
                  <div className="space-y-2.5 text-sm">
                    {[
                      { label: t.recap.prixAchat, value: Number(prix) > 0 ? `${fmtNum(Number(prix))}€` : "—" },
                      { label: t.recap.fraisNotaire, value: Number(prix) > 0 ? `${fmtNum(fraisNotaire)}€` : "—" },
                      { label: t.recap.apport, value: Number(apport) > 0 ? `${fmtNum(Number(apport))}€` : "—" },
                      { label: t.recap.emprunt, value: montantEmprunte > 0 ? `${fmtNum(montantEmprunte)}€` : "—" },
                      { label: t.recap.loyerMensuel, value: Number(loyer) > 0 ? `${fmtNum(Number(loyer))}€` : "—" },
                      { label: t.recap.rendementBrut, value: Number(prix) > 0 && Number(loyer) > 0 ? `${rendBrut}%` : "—" },
                      { label: t.recap.chargesAn, value: chargesTotal > 0 ? `${fmtNum(chargesTotal)}€` : "—" },
                      { label: t.recap.dispositif, value: t.dispositifs.find(d => d.value === dispositif)?.label ?? "—" },
                      { label: t.recap.tmi, value: `${tmi}%` },
                      { label: t.recap.dureeDetention, value: `${dureeDetention} ${t.units.years}` },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                        <span className="text-gray-400 text-xs">{row.label}</span>
                        <span className="font-semibold text-foreground text-xs">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={simulate}
                  className="w-full py-3.5 rounded-xl bg-sea text-white font-bold text-sm hover:bg-sea transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-200">
                  <BarChart3 className="w-4 h-4" /> {t.recap.analyserMaintenant}
                </button>

                {results && (
                  <div className="bg-foreground rounded-2xl p-5 text-white text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-wide mb-2">{t.recap.scoreGlobal}</p>
                    <p className="text-5xl font-black text-sea">{results.score_global}</p>
                    <p className="text-white/40 text-xs">/100</p>
                    <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/60">{results.tri_estime ? `${t.recap.triPrefix}${results.tri_estime}` : ""}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
