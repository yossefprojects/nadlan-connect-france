import { Layout } from "@/components/layout";
import { Building2, GraduationCap, Briefcase } from "lucide-react";

function PageHero() {
  return (
    <section className="relative h-[38vh] min-h-[260px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/70 to-[#0d1117]/30" />
      <div className="relative z-10 container mx-auto px-4 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium tracking-wide mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          Les Acteurs
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Cartographie du marché immobilier neuf</h1>
        <p className="text-white/55 max-w-xl">Promoteurs, gestionnaires LMNP et conseillers — tous les acteurs clés pour identifier les bons partenaires.</p>
      </div>
    </section>
  );
}

function ActorCard({ name, desc, badge }: { name: string; desc: string; badge?: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#C9A84C]/30 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-[#1E3A5F]/8 rounded-xl flex items-center justify-center">
          <span className="text-[#1E3A5F] font-black text-sm">{name.slice(0, 1)}</span>
        </div>
        {badge && <span className="px-2.5 py-0.5 rounded-full border border-[#C9A84C]/30 bg-amber-50 text-[#b8963e] text-[10px] font-semibold">{badge}</span>}
      </div>
      <h3 className="font-bold text-[#1E3A5F] text-sm mb-1.5">{name}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function LmnpCard({ name, sector, icon }: { name: string; sector: string; icon: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#1E3A5F]/20 hover:shadow-sm transition-all flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">{sector}</div>
        <div className="font-semibold text-[#1E3A5F] text-sm">{name}</div>
      </div>
    </div>
  );
}

export default function Acteurs() {
  return (
    <Layout>
      <PageHero />

      {/* Promoteurs */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-[#1E3A5F] rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Construction neuve en France</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">Promoteurs Immobiliers</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActorCard name="Nexity" desc="Leader national multi-métiers : promotion résidentielle, gestion et services immobiliers. Présent sur tout le territoire avec une offre diversifiée." badge="Leader national" />
            <ActorCard name="Altarea Cogedim" desc="Développeur urbain spécialisé dans les projets mixtes alliant logements, commerces et bureaux au cœur des villes." badge="Développement urbain" />
            <ActorCard name="Bouygues Immobilier" desc="Filiale du groupe Bouygues, reconnu pour la qualité de construction et son engagement en matière de développement durable." badge="Qualité constructeur" />
            <ActorCard name="Kaufman & Broad" desc="Promoteur indépendant coté en bourse, spécialisé dans le résidentiel et le tertiaire avec plus de 50 ans d'expérience." badge="Coté en bourse" />
            <ActorCard name="Icade" desc="Foncière et promoteur à capitaux publics (CDC), acteur incontournable des quartiers de santé et des grands projets institutionnels." badge="Acteur institutionnel" />
          </div>
        </div>
      </section>

      {/* Gestionnaires LMNP */}
      <section className="py-12 md:py-20 bg-[#f8f9fb] border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-[#C9A84C] rounded-xl flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Résidences services</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">Gestionnaires LMNP par secteur</h2>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-[#1E3A5F] flex items-center gap-2 mb-4">
                <span className="text-lg">🎓</span> Résidences étudiantes
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <LmnpCard name="Nexity Studéa" sector="Résidences étudiantes" icon="🎓" />
                <LmnpCard name="Réside Études" sector="Résidences étudiantes" icon="🎓" />
                <LmnpCard name="Nemea Student" sector="Résidences étudiantes" icon="🎓" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1E3A5F] flex items-center gap-2 mb-4">
                <span className="text-lg">🏡</span> Résidences seniors
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <LmnpCard name="Domitys" sector="Résidences seniors" icon="🏡" />
                <LmnpCard name="Les Girandières" sector="Résidences seniors" icon="🏡" />
                <LmnpCard name="Ovelia" sector="Résidences seniors" icon="🏡" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1E3A5F] flex items-center gap-2 mb-4">
                <span className="text-lg">🌊</span> Tourisme & affaires
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <LmnpCard name="Pierre & Vacances" sector="Tourisme & loisirs" icon="🌊" />
                <LmnpCard name="Adagio" sector="Appart'hôtels d'affaires" icon="🏢" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conseillers */}
      <section className="py-12 md:py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-[#1E3A5F]/15 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-[#1E3A5F]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Accompagnement personnalisé</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">Conseillers & Intermédiaires</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1E3A5F] rounded-2xl p-8 text-white">
              <h3 className="font-bold text-white mb-3">CGP — Cabinets de Gestion de Patrimoine</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Les CGP indépendants sont des professionnels réglementés (CIF, ORIAS) qui analysent votre situation patrimoniale globale pour recommander les meilleures solutions, y compris la défiscalisation immobilière.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Conseil personnalisé", "Indépendant", "Tous produits"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-white/20 text-white/70 text-xs">{tag}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fb] rounded-2xl p-8 border border-gray-100">
              <h3 className="font-bold text-[#1E3A5F] mb-3">Courtiers & Plateformes digitales</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Les plateformes digitales spécialisées en immobilier neuf offrent une comparaison rapide des programmes et une mise en relation directe avec les promoteurs.
              </p>
              <div className="space-y-3">
                {[
                  { name: "Gridky", desc: "Plateforme d'investissement locatif neuf" },
                  { name: "Stellium", desc: "Conseil en investissement immobilier" },
                  { name: "Primonial", desc: "Gestion de patrimoine et pierre papier" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                    <span className="text-sm font-bold text-[#1E3A5F]">{item.name}</span>
                    <span className="text-xs text-gray-400">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
