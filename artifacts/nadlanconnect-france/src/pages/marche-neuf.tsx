import { Layout } from "@/components/layout";
import { CheckCircle2, Leaf, Receipt, HardHat, Building2, Droplets } from "lucide-react";

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
  return (
    <Layout>
      <PageHero
        badge="Marché Neuf"
        title="Les 3 piliers de l'immobilier neuf"
        sub="VEFA, RE2020 et frais de notaire réduits — tout ce qu'il faut savoir pour investir sereinement."
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
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Vente en l'État Futur d'Achèvement</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">La VEFA</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div>
              <p className="text-gray-500 leading-relaxed mb-6">
                La VEFA est le contrat par lequel vous achetez un bien immobilier <strong className="text-[#1E3A5F]">sur plan</strong>, avant même que la construction soit terminée. Le promoteur s'engage sur les caractéristiques du logement, le prix et le délai de livraison.
              </p>
              <div className="space-y-3">
                {[
                  "Achat sécurisé par la Garantie Financière d'Achèvement (GFA)",
                  "Garantie de parfait achèvement — 1 an",
                  "Garantie biennale — 2 ans sur les équipements",
                  "Garantie décennale — 10 ans sur le gros œuvre",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fb] rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-[#1E3A5F] mb-4 flex items-center gap-2 text-sm">
                <Receipt className="w-4 h-4 text-[#C9A84C]" /> Appels de fonds légaux
              </h3>
              <div className="space-y-0">
                {[
                  { phase: "Réservation", pct: "5%", desc: "Dépôt de garantie" },
                  { phase: "Fondations", pct: "35%", desc: "Achèvement des fondations" },
                  { phase: "Hors d'eau", pct: "70%", desc: "Mise hors d'eau" },
                  { phase: "Hors d'air", pct: "80%", desc: "Mise hors d'air" },
                  { phase: "Achèvement", pct: "95%", desc: "Fin des travaux" },
                  { phase: "Livraison", pct: "100%", desc: "Remise des clés" },
                ].map((item, i, arr) => (
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
            <h3 className="font-bold text-white text-center mb-8 text-sm uppercase tracking-widest">Chronologie VEFA</h3>
            <div className="flex items-start gap-0 overflow-x-auto pb-2">
              {[
                { n: "1", label: "Réservation", pct: "5%", color: "bg-white/20" },
                { n: "2", label: "Fondations", pct: "35%", color: "bg-white/30" },
                { n: "3", label: "Hors d'eau", pct: "70%", color: "bg-white/40" },
                { n: "4", label: "Achèvement", pct: "95%", color: "bg-[#C9A84C]/60" },
                { n: "5", label: "Livraison", pct: "100%", color: "bg-[#C9A84C]" },
              ].map((step, i, arr) => (
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
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Réglementation Environnementale 2020</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">La RE2020</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: <Droplets className="w-5 h-5 text-emerald-600" />, title: "Consommation quasi-nulle", desc: "Les bâtiments RE2020 consomment jusqu'à 30% d'énergie de moins que les constructions BBC précédentes." },
              { icon: <Leaf className="w-5 h-5 text-emerald-600" />, title: "Faible empreinte carbone", desc: "Matériaux biosourcés privilégiés, calcul de l'impact carbone sur l'ensemble du cycle de vie du bâtiment." },
              { icon: <Receipt className="w-5 h-5 text-emerald-600" />, title: "Charges locatives réduites", desc: "Factures énergétiques inférieures pour les locataires, facilitant la location et réduisant la vacance." },
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
              <span className="inline-block px-3 py-1 rounded-full border border-emerald-300/30 bg-emerald-300/10 text-emerald-200 text-xs font-semibold mb-2">Valeur verte garantie</span>
              <p className="text-sm text-emerald-100 leading-relaxed">
                Un logement RE2020 obtient systématiquement un DPE A ou B, le protégeant des interdictions de location futures (passoires thermiques) et maintenant sa valeur sur le marché.
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
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Avantage immédiat et significatif</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">Frais de notaire réduits</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1E3A5F] rounded-2xl p-10 text-center">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Immobilier neuf</div>
              <div className="text-8xl font-black text-[#C9A84C] leading-none mb-2">2–3<span className="text-4xl">%</span></div>
              <div className="text-white/50 text-sm">du prix d'acquisition</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Immobilier ancien</div>
              <div className="text-8xl font-black text-gray-300 leading-none mb-2">7–8<span className="text-4xl">%</span></div>
              <div className="text-gray-400 text-sm">du prix d'acquisition</div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-8">
            <h3 className="font-bold text-[#1E3A5F] mb-5">Exemple concret — Bien à 200 000€</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-5">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Frais neuf (2,5%)</div>
                <div className="text-3xl font-black text-[#1E3A5F]">5 000€</div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-black text-[#C9A84C]">vs</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Frais ancien (7,5%)</div>
                <div className="text-3xl font-black text-gray-300">15 000€</div>
              </div>
            </div>
            <div className="text-center border-t border-amber-200/50 pt-5">
              <div className="text-xs text-gray-400 mb-1">Économie réalisée</div>
              <div className="text-4xl font-black text-[#C9A84C]">8 000 – 10 000€</div>
              <div className="text-xs text-gray-400 mt-1">directement réinvestissables</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
