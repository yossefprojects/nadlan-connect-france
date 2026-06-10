import { Layout } from "@/components/layout";
import { CheckCircle2, Leaf, Receipt, HardHat, Building2, Droplets } from "lucide-react";
import { useLang } from "@/lib/i18n";

const content = {
  fr: {
    hero: {
      badge: "Marché Neuf",
      title: "Les 3 piliers de l'immobilier neuf",
      sub: "VEFA, RE2020 et frais de notaire réduits — tout ce qu'il faut savoir pour investir sereinement.",
    },
    vefa: {
      eyebrow: "Vente en l'État Futur d'Achèvement",
      title: "La VEFA",
      intro1: "La VEFA est le contrat par lequel vous achetez un bien immobilier ",
      introStrong: "sur plan",
      intro2: ", avant même que la construction soit terminée. Le promoteur s'engage sur les caractéristiques du logement, le prix et le délai de livraison.",
      guarantees: [
        "Achat sécurisé par la Garantie Financière d'Achèvement (GFA)",
        "Garantie de parfait achèvement — 1 an",
        "Garantie biennale — 2 ans sur les équipements",
        "Garantie décennale — 10 ans sur le gros œuvre",
      ],
      appelsTitle: "Appels de fonds légaux",
      appels: [
        { phase: "Réservation", pct: "5%", desc: "Dépôt de garantie" },
        { phase: "Fondations", pct: "35%", desc: "Achèvement des fondations" },
        { phase: "Hors d'eau", pct: "70%", desc: "Mise hors d'eau" },
        { phase: "Hors d'air", pct: "80%", desc: "Mise hors d'air" },
        { phase: "Achèvement", pct: "95%", desc: "Fin des travaux" },
        { phase: "Livraison", pct: "100%", desc: "Remise des clés" },
      ],
      timelineTitle: "Chronologie VEFA",
      timeline: [
        { n: "1", label: "Réservation", pct: "5%", color: "bg-white/20" },
        { n: "2", label: "Fondations", pct: "35%", color: "bg-white/30" },
        { n: "3", label: "Hors d'eau", pct: "70%", color: "bg-white/40" },
        { n: "4", label: "Achèvement", pct: "95%", color: "bg-[#C9A84C]/60" },
        { n: "5", label: "Livraison", pct: "100%", color: "bg-[#C9A84C]" },
      ],
    },
    re2020: {
      eyebrow: "Réglementation Environnementale 2020",
      title: "La RE2020",
      features: [
        { title: "Consommation quasi-nulle", desc: "Les bâtiments RE2020 consomment jusqu'à 30% d'énergie de moins que les constructions BBC précédentes." },
        { title: "Faible empreinte carbone", desc: "Matériaux biosourcés privilégiés, calcul de l'impact carbone sur l'ensemble du cycle de vie du bâtiment." },
        { title: "Charges locatives réduites", desc: "Factures énergétiques inférieures pour les locataires, facilitant la location et réduisant la vacance." },
      ],
      greenBadge: "Valeur verte garantie",
      greenText: "Un logement RE2020 obtient systématiquement un DPE A ou B, le protégeant des interdictions de location futures (passoires thermiques) et maintenant sa valeur sur le marché.",
    },
    notaire: {
      eyebrow: "Avantage immédiat et significatif",
      title: "Frais de notaire réduits",
      neufLabel: "Immobilier neuf",
      neufSub: "du prix d'acquisition",
      ancienLabel: "Immobilier ancien",
      ancienSub: "du prix d'acquisition",
      exampleTitle: "Exemple concret — Bien à 200 000€",
      fraisNeufLabel: "Frais neuf (2,5%)",
      vs: "vs",
      fraisAncienLabel: "Frais ancien (7,5%)",
      economieLabel: "Économie réalisée",
      economieSub: "directement réinvestissables",
    },
  },
  en: {
    hero: {
      badge: "New-Build Market",
      title: "The 3 pillars of new-build property",
      sub: "VEFA, RE2020 and reduced notaire fees — everything you need to know to invest with confidence.",
    },
    vefa: {
      eyebrow: "Off-plan purchase — Vente en l'État Futur d'Achèvement",
      title: "The VEFA",
      intro1: "The VEFA is the contract under which you buy a property ",
      introStrong: "off-plan",
      intro2: ", before construction is even finished. The developer commits to the home's specifications, the price and the delivery deadline.",
      guarantees: [
        "Purchase secured by the Financial Completion Guarantee (Garantie Financière d'Achèvement, GFA)",
        "Defects guarantee (garantie de parfait achèvement) — 1 year",
        "Two-year guarantee — 2 years on fittings and equipment",
        "Ten-year structural guarantee (garantie décennale) — 10 years on the main structure",
      ],
      appelsTitle: "Statutory staged payments",
      appels: [
        { phase: "Reservation", pct: "5%", desc: "Security deposit" },
        { phase: "Foundations", pct: "35%", desc: "Foundations completed" },
        { phase: "Weathertight", pct: "70%", desc: "Watertight stage reached" },
        { phase: "Wind-tight", pct: "80%", desc: "Wind-tight stage reached" },
        { phase: "Completion", pct: "95%", desc: "Works finished" },
        { phase: "Handover", pct: "100%", desc: "Keys handed over" },
      ],
      timelineTitle: "VEFA timeline",
      timeline: [
        { n: "1", label: "Reservation", pct: "5%", color: "bg-white/20" },
        { n: "2", label: "Foundations", pct: "35%", color: "bg-white/30" },
        { n: "3", label: "Weathertight", pct: "70%", color: "bg-white/40" },
        { n: "4", label: "Completion", pct: "95%", color: "bg-[#C9A84C]/60" },
        { n: "5", label: "Handover", pct: "100%", color: "bg-[#C9A84C]" },
      ],
    },
    re2020: {
      eyebrow: "2020 Environmental Regulation",
      title: "The RE2020",
      features: [
        { title: "Near-zero energy use", desc: "RE2020 buildings use up to 30% less energy than the previous BBC standard." },
        { title: "Low carbon footprint", desc: "Bio-sourced materials are prioritized, with carbon impact assessed across the building's entire life cycle." },
        { title: "Lower running costs for tenants", desc: "Lower energy bills for tenants make the property easier to let and reduce vacancy." },
      ],
      greenBadge: "Guaranteed green value",
      greenText: "An RE2020 home consistently achieves a DPE rating of A or B, shielding it from future rental bans (on energy-inefficient \"thermal sieve\" homes) and preserving its market value.",
    },
    notaire: {
      eyebrow: "An immediate, significant advantage",
      title: "Reduced notaire fees",
      neufLabel: "New-build property",
      neufSub: "of the purchase price",
      ancienLabel: "Resale property",
      ancienSub: "of the purchase price",
      exampleTitle: "A concrete example — a property at 200 000€",
      fraisNeufLabel: "New-build fees (2,5%)",
      vs: "vs",
      fraisAncienLabel: "Resale fees (7,5%)",
      economieLabel: "Total saving",
      economieSub: "ready to reinvest",
    },
  },
} as const;

function PageHero({ badge, title, sub, img }: { badge: string; title: string; sub: string; img: string }) {
  return (
    <section className="relative h-[38vh] min-h-[260px] flex items-end overflow-hidden">
      <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/70 to-[#0d1117]/30" />
      <div className="relative z-10 container mx-auto px-4 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium tracking-wide mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          {badge}
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{title}</h1>
        <p className="text-white/55 max-w-xl">{sub}</p>
      </div>
    </section>
  );
}

export default function MarcheNeuf() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <Layout>
      <PageHero
        badge={t.hero.badge}
        title={t.hero.title}
        sub={t.hero.sub}
        img="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop"
      />

      {/* VEFA */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-[#1E3A5F] rounded-xl flex items-center justify-center shrink-0">
              <HardHat className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{t.vefa.eyebrow}</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">{t.vefa.title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div>
              <p className="text-gray-500 leading-relaxed mb-6">
                {t.vefa.intro1}<strong className="text-[#1E3A5F]">{t.vefa.introStrong}</strong>{t.vefa.intro2}
              </p>
              <div className="space-y-3">
                {t.vefa.guarantees.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fb] rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-[#1E3A5F] mb-4 flex items-center gap-2 text-sm">
                <Receipt className="w-4 h-4 text-[#C9A84C]" /> {t.vefa.appelsTitle}
              </h3>
              <div className="space-y-0">
                {t.vefa.appels.map((item, i, arr) => (
                  <div key={item.phase} className={`flex items-center justify-between py-3 ${i < arr.length - 1 ? "border-b border-gray-200" : ""}`}>
                    <div>
                      <span className="text-sm font-semibold text-[#1E3A5F]">{item.phase}</span>
                      <span className="text-xs text-gray-400 ml-2">{item.desc}</span>
                    </div>
                    <span className="text-sm font-black text-[#C9A84C]">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline visuelle */}
          <div className="bg-[#1E3A5F] rounded-2xl p-8">
            <h3 className="font-bold text-white text-center mb-8 text-sm uppercase tracking-widest">{t.vefa.timelineTitle}</h3>
            <div className="flex items-start gap-0 overflow-x-auto pb-2">
              {t.vefa.timeline.map((step, i, arr) => (
                <div key={step.n} className="flex items-center flex-1 min-w-[100px]">
                  <div className="flex flex-col items-center flex-1 gap-2 text-center">
                    <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-white font-black text-lg border-2 border-white/20`}>{step.n}</div>
                    <div className="text-white/70 text-[10px] font-medium">{step.label}</div>
                    <div className="text-[#C9A84C] text-xs font-bold">{step.pct}</div>
                  </div>
                  {i < arr.length - 1 && <div className="h-px w-full bg-white/15 mb-8 shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RE2020 */}
      <section className="py-12 md:py-20 bg-[#f8f9fb] border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{t.re2020.eyebrow}</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">{t.re2020.title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: <Droplets className="w-5 h-5 text-emerald-600" />, title: t.re2020.features[0].title, desc: t.re2020.features[0].desc },
              { icon: <Leaf className="w-5 h-5 text-emerald-600" />, title: t.re2020.features[1].title, desc: t.re2020.features[1].desc },
              { icon: <Receipt className="w-5 h-5 text-emerald-600" />, title: t.re2020.features[2].title, desc: t.re2020.features[2].desc },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#1E3A5F] mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-700 rounded-2xl p-6 flex items-center gap-6">
            <div className="text-6xl font-black text-emerald-200 shrink-0">A</div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-emerald-300/30 bg-emerald-300/10 text-emerald-200 text-xs font-semibold mb-2">{t.re2020.greenBadge}</span>
              <p className="text-sm text-emerald-100 leading-relaxed">
                {t.re2020.greenText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frais de notaire */}
      <section className="py-12 md:py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-[#C9A84C] rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{t.notaire.eyebrow}</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">{t.notaire.title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1E3A5F] rounded-2xl p-10 text-center">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">{t.notaire.neufLabel}</div>
              <div className="text-8xl font-black text-[#C9A84C] leading-none mb-2">2–3<span className="text-4xl">%</span></div>
              <div className="text-white/50 text-sm">{t.notaire.neufSub}</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t.notaire.ancienLabel}</div>
              <div className="text-8xl font-black text-gray-300 leading-none mb-2">7–8<span className="text-4xl">%</span></div>
              <div className="text-gray-400 text-sm">{t.notaire.ancienSub}</div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-8">
            <h3 className="font-bold text-[#1E3A5F] mb-5">{t.notaire.exampleTitle}</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-5">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">{t.notaire.fraisNeufLabel}</div>
                <div className="text-3xl font-black text-[#1E3A5F]">5 000€</div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-black text-[#C9A84C]">{t.notaire.vs}</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">{t.notaire.fraisAncienLabel}</div>
                <div className="text-3xl font-black text-gray-300">15 000€</div>
              </div>
            </div>
            <div className="text-center border-t border-amber-200/50 pt-5">
              <div className="text-xs text-gray-400 mb-1">{t.notaire.economieLabel}</div>
              <div className="text-4xl font-black text-[#C9A84C]">8 000 – 10 000€</div>
              <div className="text-xs text-gray-400 mt-1">{t.notaire.economieSub}</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
