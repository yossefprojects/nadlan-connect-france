import { useState } from "react";
import { Layout } from "@/components/layout";
import { Loader2, Download, TrendingUp, Euro, Shield, BarChart3, AlertTriangle, Lightbulb, ChevronRight, CheckCircle2, Info } from "lucide-react";

type Tab = "bien" | "revenus" | "fiscalite" | "resultats";

const TABS: { id: Tab; label: string; short: string; icon: string }[] = [
  { id: "bien", label: "Bien & Financement", short: "Bien", icon: "🏠" },
  { id: "revenus", label: "Revenus & Charges", short: "Revenus", icon: "💰" },
  { id: "fiscalite", label: "Fiscalité", short: "Fiscalité", icon: "📊" },
  { id: "resultats", label: "Analyse IA", short: "Analyse", icon: "🤖" },
];

const DISPOSITIFS = [
  { value: "jeanbrun", label: "Dispositif Jeanbrun", desc: "Location nue — déficit foncier" },
  { value: "lmnp_reel", label: "LMNP Réel", desc: "Location meublée — amortissements" },
  { value: "micro_foncier", label: "Micro-foncier", desc: "Abattement 30% — revenus < 15 000€" },
  { value: "micro_bic", label: "Micro-BIC", desc: "Abattement 50% — revenus < 77 700€" },
];

const TMI_OPTIONS = [0, 11, 30, 41, 45];
const TYPE_BIEN_OPTIONS = ["Studio", "T2", "T3", "T4", "T5+", "Maison"];

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
          className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/10 transition-colors pr-10"
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
        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/10 transition-colors bg-white"
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
    <div className={`rounded-xl p-4 border ${accent ? "bg-[#1E3A5F] border-[#1E3A5F]" : "bg-white border-gray-100"}`}>
      <p className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${accent ? "text-white/50" : "text-gray-400"}`}>{label}</p>
      <p className={`text-xl font-black ${accent ? "text-[#C9A84C]" : "text-[#1E3A5F]"}`}>{value}</p>
      {sub && <p className={`text-[10px] mt-0.5 ${accent ? "text-white/40" : "text-gray-300"}`}>{sub}</p>}
    </div>
  );
}

const fmt = (n: number, decimals = 0) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: decimals }).format(n);

const fmtNum = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

export default function Simulateur() {
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
        }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setResults(await res.json());
    } catch (e) {
      setError("Une erreur est survenue. Vérifiez vos données et réessayez.");
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/70 to-[#0d1117]/30" />
        <div className="relative z-10 container mx-auto px-4 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Simulateur IA — Droits français
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">Simulez votre investissement immobilier neuf</h1>
          <p className="text-white/55 text-sm max-w-xl">Analyse complète : financement, rendement, cash-flow, fiscalité Jeanbrun/LMNP, TRI. Inspiré de simmoisrael.com.</p>
        </div>
      </section>

      <div className="bg-[#f8f9fb] min-h-screen">
        {/* Tab bar */}
        <div className="sticky top-[88px] z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto">
              {TABS.map((t, i) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-colors flex-1 sm:flex-none justify-center sm:justify-start ${tab === t.id ? "border-[#C9A84C] text-[#1E3A5F]" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
                  <span>{t.icon}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.short}</span>
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
                    <h2 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-widest mb-5 flex items-center gap-2">
                      🏠 Caractéristiques du bien
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <InputField label="Prix d'acquisition" hint="hors frais de notaire" value={prix} onChange={setPrix} unit="€" />
                      </div>
                      <InputField label="Surface" value={surface} onChange={setSurface} unit="m²" />
                      <SelectField label="Type de bien" value={typeBien} onChange={setTypeBien}
                        options={TYPE_BIEN_OPTIONS.map((v) => ({ value: v, label: v }))} />
                      <div className="col-span-2">
                        <InputField label="Ville / Zone géographique" hint="ex: Paris 15e, Lyon 69003" value={ville} onChange={setVille} type="text" placeholder="ex: Bordeaux, Nantes..." />
                      </div>
                    </div>
                    {Number(prix) > 0 && Number(surface) > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="bg-[#f8f9fb] rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">Prix/m²</p><p className="font-black text-[#1E3A5F] text-sm">{fmtNum(Math.round(Number(prix)/Number(surface)))}€</p></div>
                        <div className="bg-[#f8f9fb] rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">Frais notaire (2,5%)</p><p className="font-black text-[#1E3A5F] text-sm">{fmtNum(fraisNotaire)}€</p></div>
                        <div className="bg-[#f8f9fb] rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">Coût total</p><p className="font-black text-[#C9A84C] text-sm">{fmtNum(prixTotal)}€</p></div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-widest mb-5 flex items-center gap-2">
                      🏦 Plan de financement
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Apport personnel" hint={Number(prix) > 0 ? `${Math.round(Number(apport)/Number(prix)*100)}% du prix` : ""} value={apport} onChange={setApport} unit="€" />
                      <div className="bg-[#f8f9fb] rounded-xl p-3 flex flex-col justify-center">
                        <p className="text-[10px] text-gray-400 mb-0.5">Montant emprunté</p>
                        <p className="font-black text-[#1E3A5F]">{fmtNum(Math.max(0, montantEmprunte))}€</p>
                      </div>
                      <InputField label="Durée du crédit" value={dureCredit} onChange={setDureCredit} unit="ans" />
                      <InputField label="Taux d'intérêt nominal" hint="hors assurance" value={tauxCredit} onChange={setTauxCredit} unit="%" />
                      <InputField label="Taux assurance emprunteur" hint="annuel sur capital" value={tauxAssurance} onChange={setTauxAssurance} unit="%" />
                      <div className="bg-[#f8f9fb] rounded-xl p-3 flex flex-col justify-center">
                        <p className="text-[10px] text-gray-400 mb-0.5">TEG estimé</p>
                        <p className="font-black text-[#1E3A5F]">{(Number(tauxCredit) + Number(tauxAssurance)).toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Revenus & Charges */}
              {tab === "revenus" && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-widest mb-5">💰 Revenus locatifs</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <InputField label="Loyer mensuel estimé" hint="charges locataire non incluses" value={loyer} onChange={setLoyer} unit="€/mois" />
                      </div>
                      <SelectField label="Type de location" value={typeLocation} onChange={setTypeLocation}
                        options={[{ value: "nu", label: "Location nue" }, { value: "meuble", label: "Location meublée" }]} />
                      <InputField label="Taux de vacance locative" hint="moyenne France: 3-8%" value={tauxVacance} onChange={setTauxVacance} unit="%" />
                      <InputField label="Revalorisation annuelle loyer" hint="indice IRL: ~2%/an" value={revalorisation} onChange={setRevalorisation} unit="%" />
                      <InputField label="Durée de détention" value={dureeDetention} onChange={setDureeDetention} unit="ans" />
                    </div>
                    {Number(loyer) > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="bg-[#f8f9fb] rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">Loyer annuel brut</p><p className="font-black text-[#1E3A5F] text-sm">{fmtNum(loyerAnnuel)}€</p></div>
                        <div className="bg-[#f8f9fb] rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">Après vacance ({tauxVacance}%)</p><p className="font-black text-[#1E3A5F] text-sm">{fmtNum(Math.round(loyerAnnuel * (1 - Number(tauxVacance)/100)))}€</p></div>
                        <div className="bg-[#f8f9fb] rounded-xl p-3 text-center"><p className="text-[10px] text-gray-400 mb-0.5">Rendement brut</p><p className="font-black text-[#C9A84C] text-sm">{rendBrut}%</p></div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-widest mb-5">🧾 Charges annuelles</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Charges de copropriété" hint="part propriétaire" value={chargesCopro} onChange={setChargesCopro} unit="€/an" />
                      <InputField label="Taxe foncière" hint="sans ordures ménagères" value={taxeFonciere} onChange={setTaxeFonciere} unit="€/an" />
                      <InputField label="Assurance PNO" hint="propriétaire non occupant" value={assurancePno} onChange={setAssurancePno} unit="€/an" />
                      <InputField label="Frais de gestion locative" hint="si agence: 7-10%" value={fraisGestion} onChange={setFraisGestion} unit="%" />
                      <div className="col-span-2">
                        <InputField label="Budget entretien / travaux" hint="provision annuelle" value={entretien} onChange={setEntretien} unit="€/an" />
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-[#f8f9fb] rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total charges annuelles</span>
                        <span className="font-black text-[#1E3A5F]">{fmtNum(chargesTotal)}€/an</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-300">Dont frais de gestion ({fraisGestion}%)</span>
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
                    <h2 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-widest mb-5">📊 Dispositif fiscal</h2>
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {DISPOSITIFS.map((d) => (
                        <button key={d.value} onClick={() => { setDispositif(d.value); setTypeLocation(d.value.includes("foncier") || d.value === "jeanbrun" ? "nu" : "meuble"); }}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${dispositif === d.value ? "border-[#1E3A5F] bg-[#1E3A5F]/5" : "border-gray-100 hover:border-gray-200"}`}>
                          <div>
                            <p className={`font-bold text-sm ${dispositif === d.value ? "text-[#1E3A5F]" : "text-gray-700"}`}>{d.label}</p>
                            <p className="text-xs text-gray-400">{d.desc}</p>
                          </div>
                          {dispositif === d.value && <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0" />}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>Tranche marginale d'imposition</FieldLabel>
                        <div className="grid grid-cols-5 gap-1.5">
                          {TMI_OPTIONS.map((t) => (
                            <button key={t} onClick={() => setTmi(String(t))}
                              className={`py-2 rounded-xl text-xs font-bold border transition-all ${tmi === String(t) ? "bg-[#1E3A5F] text-white border-[#1E3A5F]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                              {t}%
                            </button>
                          ))}
                        </div>
                      </div>
                      <InputField label="Revenus fonciers existants" hint="pour calcul plafond déficit" value={revenusExistants} onChange={setRevenusExistants} unit="€/an" />
                    </div>
                  </div>

                  <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/15 rounded-2xl p-5">
                    <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-[#C9A84C]" /> Pression fiscale sur vos revenus locatifs
                    </h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div><p className="text-[10px] text-gray-400 mb-1">TMI</p><p className="font-black text-[#1E3A5F]">{tmi}%</p></div>
                      <div><p className="text-[10px] text-gray-400 mb-1">Prélèvements sociaux</p><p className="font-black text-[#1E3A5F]">17,2%</p></div>
                      <div><p className="text-[10px] text-gray-400 mb-1">Pression fiscale totale</p><p className="font-black text-red-500">{Number(tmi) + 17.2}%</p></div>
                    </div>
                    {dispositif === "jeanbrun" && (
                      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                        <strong className="text-[#1E3A5F]">Jeanbrun :</strong> Le déficit foncier est imputable sur votre revenu global dans la limite de <strong>10 700€/an</strong>. L'excédent est reportable sur les revenus fonciers des 10 années suivantes.
                      </p>
                    )}
                    {dispositif === "lmnp_reel" && (
                      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                        <strong className="text-[#1E3A5F]">LMNP Réel :</strong> L'amortissement du bien (bâti + mobilier) couvre généralement l'intégralité des loyers perçus pendant <strong>15 à 25 ans</strong>, ramenant votre imposition à 0€.
                      </p>
                    )}
                  </div>

                  <button onClick={simulate}
                    className="w-full py-4 rounded-xl bg-[#C9A84C] text-white font-bold text-base hover:bg-[#b8963e] transition-colors shadow-lg shadow-amber-200 flex items-center justify-center gap-2">
                    Lancer l'analyse IA complète →
                  </button>
                </div>
              )}

              {/* TAB: Résultats */}
              {tab === "resultats" && (
                <div>
                  {loading && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center text-center">
                      <Loader2 className="w-14 h-14 text-[#1E3A5F] animate-spin mb-5" />
                      <p className="font-bold text-[#1E3A5F] text-lg mb-1">Analyse IA en cours...</p>
                      <p className="text-sm text-gray-400">Claude calcule vos rendements, cash-flows, gains fiscaux et TRI avec précision.</p>
                    </div>
                  )}

                  {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                      <p className="text-red-600 font-semibold mb-2">Erreur lors de l'analyse</p>
                      <p className="text-sm text-red-400">{error}</p>
                      <button onClick={() => setTab("fiscalite")} className="mt-4 px-5 py-2 rounded-full bg-[#1E3A5F] text-white text-sm font-semibold">
                        Réessayer
                      </button>
                    </div>
                  )}

                  {!loading && !error && !results && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center text-center">
                      <BarChart3 className="w-14 h-14 text-gray-200 mb-5" />
                      <p className="font-semibold text-gray-300 mb-1">Aucune analyse effectuée</p>
                      <p className="text-sm text-gray-300 mb-5">Complétez les 3 onglets précédents puis lancez l'analyse.</p>
                      <button onClick={() => setTab("fiscalite")} className="px-5 py-2.5 rounded-full bg-[#C9A84C] text-white text-sm font-semibold">
                        Aller à la fiscalité →
                      </button>
                    </div>
                  )}

                  {!loading && !error && results && (
                    <div className="space-y-5" data-testid="results-dashboard">
                      {/* Scores */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Score global de l'investissement</h3>
                        <div className="flex items-center justify-around">
                          <ScoreCircle score={results.score_global ?? 0} label="Score global" size="lg" />
                          <ScoreCircle score={results.score_rendement ?? 0} label="Rendement" size="sm" />
                          <ScoreCircle score={results.score_fiscalite ?? 0} label="Fiscalité" size="sm" />
                          <ScoreCircle score={results.score_financement ?? 0} label="Financement" size="sm" />
                        </div>
                      </div>

                      {/* Financement */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Financement</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <MetricBox label="Mensualité crédit" value={fmt(results.mensualite_credit ?? 0)} sub="assurance incluse" accent />
                          <MetricBox label="Effort d'épargne" value={fmt(Math.abs(results.effort_epargne_mensuel ?? 0))} sub="par mois" />
                          <MetricBox label="Coût total crédit" value={fmt(results.cout_total_credit ?? 0)} sub="capital + intérêts" />
                        </div>
                      </div>

                      {/* Rendements */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Rendements</h3>
                        <div className="grid grid-cols-3 gap-3">
                          <MetricBox label="Rendement brut" value={results.rendement_brut ?? "—"} />
                          <MetricBox label="Rendement net charges" value={results.rendement_net_charges ?? "—"} />
                          <MetricBox label="Rendement net-net" value={results.rendement_net_net ?? "—"} accent />
                        </div>
                      </div>

                      {/* Cash-flow */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Cash-flow mensuel</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className={`rounded-xl p-4 border ${(results.cashflow_mensuel_avant_impot ?? 0) >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">Avant impôts</p>
                            <p className={`text-2xl font-black ${(results.cashflow_mensuel_avant_impot ?? 0) >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                              {results.cashflow_mensuel_avant_impot >= 0 ? "+" : ""}{fmt(results.cashflow_mensuel_avant_impot ?? 0)}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">{fmt((results.cashflow_annuel_avant_impot ?? 0))} / an</p>
                          </div>
                          <div className={`rounded-xl p-4 border ${(results.cashflow_mensuel_apres_impot ?? 0) >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">Après impôts & dispositif</p>
                            <p className={`text-2xl font-black ${(results.cashflow_mensuel_apres_impot ?? 0) >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
                              {results.cashflow_mensuel_apres_impot >= 0 ? "+" : ""}{fmt(results.cashflow_mensuel_apres_impot ?? 0)}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">{fmt((results.cashflow_annuel_apres_impot ?? 0))} / an</p>
                          </div>
                        </div>
                      </div>

                      {/* Fiscalité */}
                      <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Analyse fiscale</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <MetricBox label="Gain fiscal annuel" value={fmt(results.gain_fiscal_annuel ?? 0)} accent />
                          <MetricBox label={`Gain total (${dureeDetention} ans)`} value={fmt(results.gain_fiscal_total ?? 0)} />
                          <MetricBox label="Impôt sur loyers" value={fmt(results.impots_sur_loyers_annuel ?? 0)} sub="/an" />
                          <MetricBox label="TRI estimé" value={results.tri_estime ?? "—"} />
                        </div>
                        {results.synthese_fiscale && (
                          <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-xl p-4">
                            <p className="text-xs font-semibold text-[#1E3A5F] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <BarChart3 className="w-3.5 h-3.5 text-[#C9A84C]" /> Synthèse fiscale
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">{results.synthese_fiscale}</p>
                          </div>
                        )}
                      </div>

                      {/* Recommandation */}
                      {results.recommandation && (
                        <div className="bg-[#1E3A5F] rounded-2xl p-6">
                          <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" /> Recommandation IA
                          </p>
                          <p className="text-sm text-white/80 leading-relaxed">{results.recommandation}</p>
                        </div>
                      )}

                      {/* Points de vigilance */}
                      {results.points_vigilance?.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5">
                          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5" /> Points de vigilance
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
                            <TrendingUp className="w-3.5 h-3.5" /> Pistes d'optimisation
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
                        className="w-full py-3.5 rounded-xl border-2 border-[#C9A84C] text-[#C9A84C] font-bold hover:bg-[#C9A84C] hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Télécharger le rapport PDF complet
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
                      ← Précédent
                    </button>
                  ) : <span />}
                  {tab !== "fiscalite" ? (
                    <button onClick={() => setTab(tab === "bien" ? "revenus" : "fiscalite")}
                      className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-sm font-semibold hover:bg-[#152d4a] transition-colors">
                      Suivant →
                    </button>
                  ) : (
                    <button onClick={simulate}
                      className="px-6 py-2.5 rounded-xl bg-[#C9A84C] text-white text-sm font-bold hover:bg-[#b8963e] transition-colors flex items-center gap-2">
                      Lancer l'analyse IA →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Mobile mini-summary bar */}
            <div className="lg:hidden bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Récapitulatif rapide</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Loyer/mois", value: Number(loyer) > 0 ? `${fmtNum(Number(loyer))}€` : "—" },
                  { label: "Rdt brut", value: Number(prix) > 0 && Number(loyer) > 0 ? `${rendBrut}%` : "—" },
                  { label: "Emprunt", value: montantEmprunte > 0 ? `${fmtNum(montantEmprunte)}€` : "—" },
                ].map((row) => (
                  <div key={row.label} className="text-center bg-gray-50 rounded-xl p-2.5">
                    <div className="text-sm font-black text-[#1E3A5F]">{row.value}</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-wide mt-0.5">{row.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={simulate}
                className="w-full py-3 rounded-xl bg-[#C9A84C] text-white font-bold text-sm hover:bg-[#b8963e] transition-colors flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4" /> Lancer l'analyse IA
              </button>
            </div>

            {/* Right panel — live summary */}
            <div className="hidden lg:block">
              <div className="sticky top-[148px] space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Récapitulatif</h3>
                  <div className="space-y-2.5 text-sm">
                    {[
                      { label: "Prix d'achat", value: Number(prix) > 0 ? `${fmtNum(Number(prix))}€` : "—" },
                      { label: "Frais notaire (2,5%)", value: Number(prix) > 0 ? `${fmtNum(fraisNotaire)}€` : "—" },
                      { label: "Apport", value: Number(apport) > 0 ? `${fmtNum(Number(apport))}€` : "—" },
                      { label: "Emprunt", value: montantEmprunte > 0 ? `${fmtNum(montantEmprunte)}€` : "—" },
                      { label: "Loyer mensuel", value: Number(loyer) > 0 ? `${fmtNum(Number(loyer))}€` : "—" },
                      { label: "Rendement brut", value: Number(prix) > 0 && Number(loyer) > 0 ? `${rendBrut}%` : "—" },
                      { label: "Charges/an", value: chargesTotal > 0 ? `${fmtNum(chargesTotal)}€` : "—" },
                      { label: "Dispositif", value: DISPOSITIFS.find(d => d.value === dispositif)?.label ?? "—" },
                      { label: "TMI", value: `${tmi}%` },
                      { label: "Durée détention", value: `${dureeDetention} ans` },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                        <span className="text-gray-400 text-xs">{row.label}</span>
                        <span className="font-semibold text-[#1E3A5F] text-xs">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={simulate}
                  className="w-full py-3.5 rounded-xl bg-[#C9A84C] text-white font-bold text-sm hover:bg-[#b8963e] transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-200">
                  <BarChart3 className="w-4 h-4" /> Analyser maintenant
                </button>

                {results && (
                  <div className="bg-[#1E3A5F] rounded-2xl p-5 text-white text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-wide mb-2">Score global</p>
                    <p className="text-5xl font-black text-[#C9A84C]">{results.score_global}</p>
                    <p className="text-white/40 text-xs">/100</p>
                    <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/60">{results.tri_estime ? `TRI estimé : ${results.tri_estime}` : ""}</div>
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
