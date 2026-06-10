import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2, Users, TrendingUp, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";

function PageHero({ badge, title, sub, img, actions }: { badge: string; title: string; sub: string; img: string; actions?: React.ReactNode }) {
  return (
    <section className="relative h-[42vh] min-h-[280px] flex items-end overflow-hidden">
      <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/70 to-[#0d1117]/30" />
      <div className="relative z-10 container mx-auto px-4 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium tracking-wide mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          {badge}
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{title}</h1>
        <p className="text-white/55 max-w-xl mb-5">{sub}</p>
        {actions}
      </div>
    </section>
  );
}

function downloadPdf(url: string, filename: string) {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  fetch(`${baseUrl}${url}`)
    .then((r) => r.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    });
}

const content = {
  fr: {
    hero: {
      badge: "Défiscalisation",
      title: "Optimisez votre fiscalité immobilière",
      sub: "Jeanbrun et LMNP Réel — deux dispositifs complémentaires pour réduire vos impôts et maximiser la rentabilité nette.",
      guidePdf: "Guide complet PDF",
      comparePdf: "Comparer en PDF",
    },
    tabs: { jeanbrun: "Dispositif Jeanbrun", lmnp: "LMNP Réel" },
    jeanbrun: {
      title: "Dispositif Jeanbrun",
      subtitle: "Location nue — déficit foncier",
      items: [
        { label: "Engagement", value: "9 ans minimum, résidence principale" },
        { label: "Amortissement", value: "3,5% du prix par an déduit des revenus fonciers" },
        { label: "Déficit foncier", value: "Imputable sur revenu global jusqu'à 10 700€/an" },
      ],
      idealLabel: "Idéal pour",
      idealText: "Les contribuables avec des salaires importants souhaitant imputer un déficit foncier sur leurs revenus globaux.",
      calcTitle: "Calcul du gain fiscal",
      rows: [
        { label: "Loyer annuel (plafonné)", value: "+ 7 200€", color: "text-emerald-600" },
        { label: "Charges", value: "− 4 000€", color: "text-red-500" },
        { label: "Amortissement (3,5%)", value: "− 7 000€", color: "text-red-500" },
      ],
      resultLabel: "Résultat fiscal",
      resultValue: "−3 800€",
      gainLabel: "Gain fiscal net (TMI 30%)",
      gainValue: "+1 140€",
      perYear: "/an",
      gainFormula: "3 800€ × 30% = 1 140€",
    },
    lmnp: {
      title: "LMNP Réel",
      subtitle: "Location meublée non professionnelle",
      items: [
        { label: "Mobilier", value: "Amortissement sur 5 à 10 ans" },
        { label: "Bâti hors terrain", value: "Amortissement sur 25 à 40 ans" },
        { label: "Avantage fiscal", value: "Loyers nets d'impôt sur très longue période" },
      ],
      idealLabel: "Idéal pour",
      idealText: "Les investisseurs qui recherchent une rentabilité nette maximale avec des loyers exempts d'imposition pendant de nombreuses années.",
      calcTitle: "Calcul du résultat fiscal",
      rows: [
        { label: "Loyer annuel (marché)", value: "+ 8 640€", color: "text-emerald-600" },
        { label: "Charges", value: "− 4 000€", color: "text-red-500" },
        { label: "Amortissement bâti + mobilier", value: "− 6 000€", color: "text-red-500" },
      ],
      resultLabel: "Résultat fiscal",
      resultValue: "−1 360€",
      taxLabel: "Imposition sur les loyers",
      taxValue: "0€",
      perYear: "/an",
      taxNote: "Loyers intégralement couverts par l'amortissement",
    },
    table: {
      eyebrow: "Synthèse",
      title: "Tableau comparatif",
      headers: { critere: "Critère", jeanbrun: "Jeanbrun", lmnp: "LMNP Réel" },
      rows: [
        { critere: "Type de bail", jeanbrun: "Location nue", lmnp: "Location meublée" },
        { critere: "Loyer annuel estimé", jeanbrun: "7 200€ (plafonné)", lmnp: "8 640€ (marché)" },
        { critere: "Amortissement annuel", jeanbrun: "7 000€ (3,5%)", lmnp: "6 000€ (bâti + mobilier)" },
        { critere: "Résultat fiscal", jeanbrun: "−3 800€ déficit", lmnp: "−1 360€ déficit" },
        { critere: "Gain fiscal net", jeanbrun: "+1 140€/an", lmnp: "0€ impôt sur loyers" },
      ],
      formulaTitle: "Formule Jeanbrun",
      formulaPrefix: "7 200€ − 4 000€ − 7 000€ = ",
      formulaResult: "−3 800€",
      formulaMid: " → Gain = 3 800€ × 30% = ",
      formulaGain: "1 140€/an",
    },
  },
  en: {
    hero: {
      badge: "Tax Optimization",
      title: "Optimize your property taxation",
      sub: "Jeanbrun and LMNP Réel — two complementary schemes to reduce your taxes and maximize your net yield.",
      guidePdf: "Full guide (PDF)",
      comparePdf: "Compare in PDF",
    },
    tabs: { jeanbrun: "Jeanbrun Scheme", lmnp: "LMNP Réel" },
    jeanbrun: {
      title: "Jeanbrun Scheme",
      subtitle: "Unfurnished rental — property deficit (déficit foncier)",
      items: [
        { label: "Commitment", value: "9 years minimum, primary residence" },
        { label: "Depreciation", value: "3,5% of the price per year deducted from rental income" },
        { label: "Property deficit", value: "Deductible from your overall income up to 10 700€/year" },
      ],
      idealLabel: "Ideal for",
      idealText: "High-income taxpayers looking to offset a property deficit against their overall income.",
      calcTitle: "Tax saving calculation",
      rows: [
        { label: "Annual rent (capped)", value: "+ 7 200€", color: "text-emerald-600" },
        { label: "Expenses", value: "− 4 000€", color: "text-red-500" },
        { label: "Depreciation (3,5%)", value: "− 7 000€", color: "text-red-500" },
      ],
      resultLabel: "Taxable result",
      resultValue: "−3 800€",
      gainLabel: "Net tax saving (TMI 30%)",
      gainValue: "+1 140€",
      perYear: "/yr",
      gainFormula: "3 800€ × 30% = 1 140€",
    },
    lmnp: {
      title: "LMNP Réel",
      subtitle: "Non-professional furnished rental (LMNP)",
      items: [
        { label: "Furniture", value: "Depreciation over 5 to 10 years" },
        { label: "Building excl. land", value: "Depreciation over 25 to 40 years" },
        { label: "Tax advantage", value: "Tax-free rental income over a very long period" },
      ],
      idealLabel: "Ideal for",
      idealText: "Investors seeking maximum net yield, with rental income exempt from tax for many years.",
      calcTitle: "Taxable result calculation",
      rows: [
        { label: "Annual rent (market)", value: "+ 8 640€", color: "text-emerald-600" },
        { label: "Expenses", value: "− 4 000€", color: "text-red-500" },
        { label: "Building + furniture depreciation", value: "− 6 000€", color: "text-red-500" },
      ],
      resultLabel: "Taxable result",
      resultValue: "−1 360€",
      taxLabel: "Tax on rental income",
      taxValue: "0€",
      perYear: "/yr",
      taxNote: "Rental income fully offset by depreciation",
    },
    table: {
      eyebrow: "Summary",
      title: "Comparison table",
      headers: { critere: "Criterion", jeanbrun: "Jeanbrun", lmnp: "LMNP Réel" },
      rows: [
        { critere: "Lease type", jeanbrun: "Unfurnished rental", lmnp: "Furnished rental" },
        { critere: "Estimated annual rent", jeanbrun: "7 200€ (capped)", lmnp: "8 640€ (market)" },
        { critere: "Annual depreciation", jeanbrun: "7 000€ (3,5%)", lmnp: "6 000€ (building + furniture)" },
        { critere: "Taxable result", jeanbrun: "−3 800€ deficit", lmnp: "−1 360€ deficit" },
        { critere: "Net tax saving", jeanbrun: "+1 140€/yr", lmnp: "0€ tax on rents" },
      ],
      formulaTitle: "Jeanbrun formula",
      formulaPrefix: "7 200€ − 4 000€ − 7 000€ = ",
      formulaResult: "−3 800€",
      formulaMid: " → Saving = 3 800€ × 30% = ",
      formulaGain: "1 140€/yr",
    },
  },
} as const;

export default function Defiscalisation() {
  const { lang } = useLang();
  const t = content[lang];
  const [activeTab, setActiveTab] = useState<"jeanbrun" | "lmnp">("jeanbrun");

  return (
    <Layout>
      <PageHero
        badge={t.hero.badge}
        title={t.hero.title}
        sub={t.hero.sub}
        img="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1600&q=80&auto=format&fit=crop"
        actions={
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadPdf("/api/pdf/generate-guide", "Guide-Investissement-Neuf-2026.pdf")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A84C] text-white text-sm font-semibold hover:bg-[#b8963e] transition-colors"
            >
              <Download className="w-4 h-4" /> {t.hero.guidePdf}
            </button>
            <button
              onClick={() => downloadPdf("/api/pdf/brochure", "Brochure-Jeanbrun-LMNP.pdf")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <FileText className="w-4 h-4" /> {t.hero.comparePdf}
            </button>
          </div>
        }
      />

      {/* Dispositifs */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-12">
            {(["jeanbrun", "lmnp"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? "bg-[#1E3A5F] text-white shadow-sm" : "text-gray-500 hover:text-[#1E3A5F]"}`}>
                {tab === "jeanbrun" ? t.tabs.jeanbrun : t.tabs.lmnp}
              </button>
            ))}
          </div>

          {activeTab === "jeanbrun" && (
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#1E3A5F] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1E3A5F]">{t.jeanbrun.title}</h2>
                    <p className="text-xs text-gray-400">{t.jeanbrun.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {t.jeanbrun.items.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                      <div className="text-sm"><span className="font-semibold text-[#1E3A5F]">{item.label} : </span><span className="text-gray-500">{item.value}</span></div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-xl p-4 flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#1E3A5F] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#1E3A5F] mb-1">{t.jeanbrun.idealLabel}</div>
                    <p className="text-sm text-gray-500">{t.jeanbrun.idealText}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f8f9fb] rounded-2xl p-7 border border-gray-100">
                <h3 className="font-bold text-[#1E3A5F] mb-5 flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-[#C9A84C]" /> {t.jeanbrun.calcTitle}
                </h3>
                <div className="space-y-0 font-mono text-sm mb-5">
                  {t.jeanbrun.rows.map((row, i, arr) => (
                    <div key={row.label} className={`flex justify-between py-2.5 ${i < arr.length - 1 ? "border-b border-gray-200" : ""}`}>
                      <span className="text-gray-400">{row.label}</span>
                      <span className={`font-bold ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-3 bg-[#1E3A5F]/5 rounded-lg px-3 mt-2 font-bold">
                    <span className="text-[#1E3A5F]">{t.jeanbrun.resultLabel}</span>
                    <span className="text-[#1E3A5F]">{t.jeanbrun.resultValue}</span>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-5 text-center">
                  <div className="text-xs text-gray-400 mb-1">{t.jeanbrun.gainLabel}</div>
                  <div className="text-4xl font-black text-[#C9A84C]">{t.jeanbrun.gainValue}<span className="text-lg font-semibold">{t.jeanbrun.perYear}</span></div>
                  <div className="text-xs text-gray-400 mt-1">{t.jeanbrun.gainFormula}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "lmnp" && (
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#C9A84C] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1E3A5F]">{t.lmnp.title}</h2>
                    <p className="text-xs text-gray-400">{t.lmnp.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {t.lmnp.items.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                      <div className="text-sm"><span className="font-semibold text-[#1E3A5F]">{item.label} : </span><span className="text-gray-500">{item.value}</span></div>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#1E3A5F] mb-1">{t.lmnp.idealLabel}</div>
                    <p className="text-sm text-gray-500">{t.lmnp.idealText}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f8f9fb] rounded-2xl p-7 border border-gray-100">
                <h3 className="font-bold text-[#1E3A5F] mb-5 flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-[#C9A84C]" /> {t.lmnp.calcTitle}
                </h3>
                <div className="space-y-0 font-mono text-sm mb-5">
                  {t.lmnp.rows.map((row, i, arr) => (
                    <div key={row.label} className={`flex justify-between py-2.5 ${i < arr.length - 1 ? "border-b border-gray-200" : ""}`}>
                      <span className="text-gray-400">{row.label}</span>
                      <span className={`font-bold ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-3 bg-[#1E3A5F]/5 rounded-lg px-3 mt-2 font-bold">
                    <span className="text-[#1E3A5F]">{t.lmnp.resultLabel}</span>
                    <span className="text-[#1E3A5F]">{t.lmnp.resultValue}</span>
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200/50 rounded-xl p-5 text-center">
                  <div className="text-xs text-gray-400 mb-1">{t.lmnp.taxLabel}</div>
                  <div className="text-4xl font-black text-emerald-700">{t.lmnp.taxValue}<span className="text-lg font-semibold">{t.lmnp.perYear}</span></div>
                  <div className="text-xs text-gray-400 mt-1">{t.lmnp.taxNote}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-12 md:py-20 bg-[#f8f9fb] border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">{t.table.eyebrow}</p>
            <h2 className="text-2xl font-black text-[#1E3A5F]">{t.table.title}</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="grid grid-cols-3 bg-[#1E3A5F]">
              <div className="p-4 text-xs font-semibold text-white/60 uppercase tracking-widest">{t.table.headers.critere}</div>
              <div className="p-4 text-xs font-semibold text-white text-center border-l border-white/10 uppercase tracking-widest">{t.table.headers.jeanbrun}</div>
              <div className="p-4 text-xs font-semibold text-[#C9A84C] text-center border-l border-white/10 uppercase tracking-widest">{t.table.headers.lmnp}</div>
            </div>
            {t.table.rows.map((row, i) => (
              <div key={row.critere} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="p-4 text-sm font-medium text-[#1E3A5F] border-r border-gray-100">{row.critere}</div>
                <div className="p-4 text-sm text-center text-gray-600 border-r border-gray-100">{row.jeanbrun}</div>
                <div className="p-4 text-sm text-center font-semibold text-[#C9A84C]">{row.lmnp}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-2xl p-6">
            <h3 className="font-bold text-[#1E3A5F] mb-3 flex items-center gap-2 text-sm">
              <Info className="w-4 h-4 text-[#C9A84C]" /> {t.table.formulaTitle}
            </h3>
            <p className="font-mono text-sm text-gray-600">{t.table.formulaPrefix}<strong className="text-[#1E3A5F]">{t.table.formulaResult}</strong>{t.table.formulaMid}<strong className="text-[#C9A84C]">{t.table.formulaGain}</strong></p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
