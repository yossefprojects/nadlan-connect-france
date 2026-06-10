import { Layout } from "@/components/layout";
import { Building2, GraduationCap, Briefcase } from "lucide-react";
import { useLang } from "@/lib/i18n";

const content = {
  fr: {
    hero: {
      badge: "Les Acteurs",
      title: "Cartographie du marché immobilier neuf",
      subtitle: "Promoteurs, gestionnaires LMNP et conseillers — tous les acteurs clés pour identifier les bons partenaires.",
    },
    promoteurs: {
      eyebrow: "Construction neuve en France",
      title: "Promoteurs Immobiliers",
      cards: [
        { name: "Nexity", desc: "Leader national multi-métiers : promotion résidentielle, gestion et services immobiliers. Présent sur tout le territoire avec une offre diversifiée.", badge: "Leader national" },
        { name: "Altarea Cogedim", desc: "Développeur urbain spécialisé dans les projets mixtes alliant logements, commerces et bureaux au cœur des villes.", badge: "Développement urbain" },
        { name: "Bouygues Immobilier", desc: "Filiale du groupe Bouygues, reconnu pour la qualité de construction et son engagement en matière de développement durable.", badge: "Qualité constructeur" },
        { name: "Kaufman & Broad", desc: "Promoteur indépendant coté en bourse, spécialisé dans le résidentiel et le tertiaire avec plus de 50 ans d'expérience.", badge: "Coté en bourse" },
        { name: "Icade", desc: "Foncière et promoteur à capitaux publics (CDC), acteur incontournable des quartiers de santé et des grands projets institutionnels.", badge: "Acteur institutionnel" },
      ],
    },
    lmnp: {
      eyebrow: "Résidences services",
      title: "Gestionnaires LMNP par secteur",
      students: {
        heading: "Résidences étudiantes",
        cards: [
          { name: "Nexity Studéa", sector: "Résidences étudiantes", icon: "🎓" },
          { name: "Réside Études", sector: "Résidences étudiantes", icon: "🎓" },
          { name: "Nemea Student", sector: "Résidences étudiantes", icon: "🎓" },
        ],
      },
      seniors: {
        heading: "Résidences seniors",
        cards: [
          { name: "Domitys", sector: "Résidences seniors", icon: "🏡" },
          { name: "Les Girandières", sector: "Résidences seniors", icon: "🏡" },
          { name: "Ovelia", sector: "Résidences seniors", icon: "🏡" },
        ],
      },
      tourism: {
        heading: "Tourisme & affaires",
        cards: [
          { name: "Pierre & Vacances", sector: "Tourisme & loisirs", icon: "🌊" },
          { name: "Adagio", sector: "Appart'hôtels d'affaires", icon: "🏢" },
        ],
      },
    },
    conseillers: {
      eyebrow: "Accompagnement personnalisé",
      title: "Conseillers & Intermédiaires",
      cgp: {
        title: "CGP — Cabinets de Gestion de Patrimoine",
        desc: "Les CGP indépendants sont des professionnels réglementés (CIF, ORIAS) qui analysent votre situation patrimoniale globale pour recommander les meilleures solutions, y compris la défiscalisation immobilière.",
        tags: ["Conseil personnalisé", "Indépendant", "Tous produits"],
      },
      platforms: {
        title: "Courtiers & Plateformes digitales",
        desc: "Les plateformes digitales spécialisées en immobilier neuf offrent une comparaison rapide des programmes et une mise en relation directe avec les promoteurs.",
        items: [
          { name: "Gridky", desc: "Plateforme d'investissement locatif neuf" },
          { name: "Stellium", desc: "Conseil en investissement immobilier" },
          { name: "Primonial", desc: "Gestion de patrimoine et pierre papier" },
        ],
      },
    },
  },
  en: {
    hero: {
      badge: "Key Players",
      title: "Mapping the new-build property market",
      subtitle: "Developers, LMNP operators and advisors — all the key players to help you find the right partners.",
    },
    promoteurs: {
      eyebrow: "New-build construction in France",
      title: "Property Developers",
      cards: [
        { name: "Nexity", desc: "Nationwide multi-disciplinary leader: residential development, property management and real-estate services. Active across the country with a diversified offering.", badge: "National leader" },
        { name: "Altarea Cogedim", desc: "Urban developer specializing in mixed-use projects that combine housing, retail and offices in the heart of cities.", badge: "Urban development" },
        { name: "Bouygues Immobilier", desc: "A subsidiary of the Bouygues group, recognized for its build quality and its commitment to sustainable development.", badge: "Build quality" },
        { name: "Kaufman & Broad", desc: "An independent, publicly listed developer specializing in residential and commercial property, with over 50 years of experience.", badge: "Publicly listed" },
        { name: "Icade", desc: "A REIT and developer backed by public capital (CDC), a key player in healthcare districts and major institutional projects.", badge: "Institutional player" },
      ],
    },
    lmnp: {
      eyebrow: "Serviced residences",
      title: "LMNP operators by sector",
      students: {
        heading: "Student residences",
        cards: [
          { name: "Nexity Studéa", sector: "Student residences", icon: "🎓" },
          { name: "Réside Études", sector: "Student residences", icon: "🎓" },
          { name: "Nemea Student", sector: "Student residences", icon: "🎓" },
        ],
      },
      seniors: {
        heading: "Senior residences",
        cards: [
          { name: "Domitys", sector: "Senior residences", icon: "🏡" },
          { name: "Les Girandières", sector: "Senior residences", icon: "🏡" },
          { name: "Ovelia", sector: "Senior residences", icon: "🏡" },
        ],
      },
      tourism: {
        heading: "Tourism & business",
        cards: [
          { name: "Pierre & Vacances", sector: "Tourism & leisure", icon: "🌊" },
          { name: "Adagio", sector: "Business aparthotels", icon: "🏢" },
        ],
      },
    },
    conseillers: {
      eyebrow: "Personalized guidance",
      title: "Advisors & Intermediaries",
      cgp: {
        title: "CGP — Wealth Management Firms",
        desc: "Independent CGPs (wealth managers) are regulated professionals (CIF, ORIAS) who assess your overall financial situation to recommend the best solutions, including property tax optimization.",
        tags: ["Personalized advice", "Independent", "All products"],
      },
      platforms: {
        title: "Brokers & Digital platforms",
        desc: "Digital platforms specializing in new-build property offer quick comparison of projects and direct connection with developers.",
        items: [
          { name: "Gridky", desc: "New-build buy-to-let investment platform" },
          { name: "Stellium", desc: "Real-estate investment advisory" },
          { name: "Primonial", desc: "Wealth management and paper property (SCPI)" },
        ],
      },
    },
  },
} as const;

function PageHero({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
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
          {badge}
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{title}</h1>
        <p className="text-white/55 max-w-xl">{subtitle}</p>
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
  const { lang } = useLang();
  const t = content[lang];

  return (
    <Layout>
      <PageHero badge={t.hero.badge} title={t.hero.title} subtitle={t.hero.subtitle} />

      {/* Promoteurs */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-[#1E3A5F] rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{t.promoteurs.eyebrow}</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">{t.promoteurs.title}</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.promoteurs.cards.map((card) => (
              <ActorCard key={card.name} name={card.name} desc={card.desc} badge={card.badge} />
            ))}
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
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{t.lmnp.eyebrow}</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">{t.lmnp.title}</h2>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-[#1E3A5F] flex items-center gap-2 mb-4">
                <span className="text-lg">🎓</span> {t.lmnp.students.heading}
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {t.lmnp.students.cards.map((card) => (
                  <LmnpCard key={card.name} name={card.name} sector={card.sector} icon={card.icon} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1E3A5F] flex items-center gap-2 mb-4">
                <span className="text-lg">🏡</span> {t.lmnp.seniors.heading}
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {t.lmnp.seniors.cards.map((card) => (
                  <LmnpCard key={card.name} name={card.name} sector={card.sector} icon={card.icon} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1E3A5F] flex items-center gap-2 mb-4">
                <span className="text-lg">🌊</span> {t.lmnp.tourism.heading}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {t.lmnp.tourism.cards.map((card) => (
                  <LmnpCard key={card.name} name={card.name} sector={card.sector} icon={card.icon} />
                ))}
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
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{t.conseillers.eyebrow}</p>
              <h2 className="text-2xl font-black text-[#1E3A5F]">{t.conseillers.title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1E3A5F] rounded-2xl p-8 text-white">
              <h3 className="font-bold text-white mb-3">{t.conseillers.cgp.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {t.conseillers.cgp.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.conseillers.cgp.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-white/20 text-white/70 text-xs">{tag}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fb] rounded-2xl p-8 border border-gray-100">
              <h3 className="font-bold text-[#1E3A5F] mb-3">{t.conseillers.platforms.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {t.conseillers.platforms.desc}
              </p>
              <div className="space-y-3">
                {t.conseillers.platforms.items.map((item) => (
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
