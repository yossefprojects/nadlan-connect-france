import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ArrowRight, CheckCircle2, BarChart3, Users, Building2, Zap, Globe, Star, TrendingUp, FileText } from "lucide-react";
import { useLang } from "@/lib/i18n";

const content = {
  fr: {
    hero: {
      eyebrowShort: "ESPACE PROMOTEURS",
      eyebrowLong: "ESPACE PROMOTEURS — NADLANCONNECT FRANCE",
      title1a: "Promoteurs,",
      title1b: "diffusez vos",
      title2: "programmes neuf.",
      desc: "Rejoignez la plateforme qui connecte promoteurs immobiliers et investisseurs qualifiés. Diffusez vos projets, gérez vos mandats et accédez à des leads chauds.",
      ctaPartner: "Devenir partenaire",
      ctaDemo: "Voir une démo",
    },
    stats: [
      { value: "120+", label: "Partenaires" },
      { value: "2 400", label: "Programmes" },
      { value: "15 000", label: "Leads / mois" },
    ],
    features: {
      eyebrow: "Plateforme complète",
      title: "Tout ce dont vous avez besoin",
      subtitle: "De la publication de vos programmes à la gestion des leads et des ventes.",
      cards: [
        { title: "Publication de programmes", desc: "Publiez vos résidences neuves avec photos HD, plans, descriptifs complets, lots disponibles et prix. Interface intuitive, mise en ligne en moins de 30 minutes." },
        { title: "Leads acheteurs qualifiés", desc: "Accédez à des contacts d'investisseurs ayant déjà effectué une simulation sur votre type de programme. Leads scorés et prêts à l'achat." },
        { title: "Analytics en temps réel", desc: "Suivez les vues, contacts, taux de conversion par programme. Comparez vos performances aux moyennes du marché. Exportez vos rapports." },
        { title: "Gestion des mandats", desc: "Centralisez tous vos mandats de vente sur la plateforme. Suivez le statut de chaque lot, les réservations en cours et les actes signés." },
        { title: "Simulateur intégré", desc: "Chaque programme dispose d'un simulateur IA personnalisé. Vos prospects calculent leur rendement directement sur votre fiche programme." },
        { title: "Réseau d'agences partenaires", desc: "Connectez-vous au réseau NadlanConnect France d'agences immobilières partenaires pour démultiplier votre distribution commerciale." },
      ],
    },
    steps: {
      eyebrow: "Démarrage rapide",
      title: "Comment ça fonctionne ?",
      items: [
        { step: "01", title: "Créez votre compte", desc: "Inscription en 5 minutes. Renseignez votre société, votre numéro SIRET et vos coordonnées. Votre compte est validé sous 24h." },
        { step: "02", title: "Publiez vos programmes", desc: "Importez vos programmes avec nos outils de publication. Ajoutez photos, plans, tableau des lots, dispositifs fiscaux éligibles." },
        { step: "03", title: "Recevez des leads", desc: "Les investisseurs qualifiés découvrent vos programmes. Vous recevez leurs coordonnées directement dans votre espace. Contactez-les sous 2h." },
      ],
    },
    pricing: {
      eyebrow: "Tarification",
      title: "Formules promoteurs",
      plans: [
        {
          plan: "Essentiel",
          price: "299€/mois",
          desc: "Pour les petits promoteurs",
          features: ["Jusqu'à 5 programmes actifs", "50 leads qualifiés/mois", "Analytics de base", "Support par email", "Simulateur intégré"],
          cta: "Commencer",
        },
        {
          plan: "Professionnel",
          price: "699€/mois",
          desc: "Pour les promoteurs régionaux",
          features: ["Jusqu'à 20 programmes actifs", "200 leads qualifiés/mois", "Analytics avancés + export", "Réseau agences partenaires", "Gestion mandats complète", "Support prioritaire"],
          cta: "Devenir partenaire",
        },
        {
          plan: "Entreprise",
          price: "Sur devis",
          desc: "Pour les grands groupes",
          features: ["Programmes illimités", "Leads illimités", "API & intégration CRM", "Account manager dédié", "Formation équipes", "SLA garanti"],
          cta: "Nous contacter",
        },
      ],
    },
    testimonials: {
      eyebrow: "Ils nous font confiance",
      title: "Ce que disent nos partenaires",
      items: [
        { quote: "NadlanConnect France nous a permis de trouver 45 investisseurs qualifiés en 3 mois. Le retour sur investissement est exceptionnel.", name: "Marc Delacroix", role: "Directeur commercial, Groupe Horizon" },
        { quote: "La qualité des leads est incomparable. Les prospects ont déjà simulé leur rendement — ils arrivent à la réunion avec leur décision presque prise.", name: "Sophie Moreau", role: "Responsable ventes, Bâtisseur 21" },
        { quote: "L'interface de publication est tellement intuitive. On met un programme en ligne en 20 minutes. Les analytics nous aident à optimiser notre communication.", name: "Julien Perret", role: "Fondateur, PM Innovation" },
      ],
    },
    cta: {
      title: "Prêt à booster vos ventes ?",
      desc: "Rejoignez les 120+ promoteurs qui font confiance à NadlanConnect France pour distribuer leurs programmes. Premier mois offert, sans engagement.",
      ctaCreate: "Créer mon compte promoteur",
      ctaAdvisor: "Parler à un conseiller",
    },
  },
  en: {
    hero: {
      eyebrowShort: "DEVELOPERS HUB",
      eyebrowLong: "DEVELOPERS HUB — NADLANCONNECT FRANCE",
      title1a: "Developers,",
      title1b: "showcase your",
      title2: "new-build projects.",
      desc: "Join the platform that connects property developers with qualified investors. Showcase your projects, manage your sales mandates and tap into a stream of hot leads.",
      ctaPartner: "Become a partner",
      ctaDemo: "Watch a demo",
    },
    stats: [
      { value: "120+", label: "Partners" },
      { value: "2 400", label: "Projects" },
      { value: "15 000", label: "Leads / month" },
    ],
    features: {
      eyebrow: "Complete platform",
      title: "Everything you need",
      subtitle: "From publishing your projects to managing leads and closing sales.",
      cards: [
        { title: "Project publishing", desc: "Publish your new-build developments with HD photos, floor plans, full descriptions, available units and prices. An intuitive interface gets you live in under 30 minutes." },
        { title: "Qualified buyer leads", desc: "Tap into investor contacts who have already run a simulation on your type of project. Scored leads, ready to buy." },
        { title: "Real-time analytics", desc: "Track views, enquiries and conversion rates for each project. Benchmark your performance against market averages. Export your reports." },
        { title: "Mandate management", desc: "Centralise all your sales mandates on the platform. Track the status of every unit, ongoing reservations and signed deeds." },
        { title: "Built-in simulator", desc: "Every project comes with a personalised AI simulator. Your prospects calculate their returns directly on your project page." },
        { title: "Partner agency network", desc: "Plug into the NadlanConnect France network of partner real-estate agencies to multiply your sales distribution." },
      ],
    },
    steps: {
      eyebrow: "Quick start",
      title: "How does it work?",
      items: [
        { step: "01", title: "Create your account", desc: "Sign up in 5 minutes. Enter your company, your SIRET number (French business registration) and your contact details. Your account is approved within 24 hours." },
        { step: "02", title: "Publish your projects", desc: "Upload your projects with our publishing tools. Add photos, floor plans, unit tables and eligible tax schemes." },
        { step: "03", title: "Receive leads", desc: "Qualified investors discover your projects. Their contact details land straight in your dashboard. Reach out within 2 hours." },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Developer plans",
      plans: [
        {
          plan: "Essential",
          price: "299€/month",
          desc: "For small developers",
          features: ["Up to 5 active projects", "50 qualified leads/month", "Basic analytics", "Email support", "Built-in simulator"],
          cta: "Get started",
        },
        {
          plan: "Professional",
          price: "699€/month",
          desc: "For regional developers",
          features: ["Up to 20 active projects", "200 qualified leads/month", "Advanced analytics + export", "Partner agency network", "Full mandate management", "Priority support"],
          cta: "Become a partner",
        },
        {
          plan: "Enterprise",
          price: "Custom quote",
          desc: "For large groups",
          features: ["Unlimited projects", "Unlimited leads", "API & CRM integration", "Dedicated account manager", "Team training", "Guaranteed SLA"],
          cta: "Contact us",
        },
      ],
    },
    testimonials: {
      eyebrow: "They trust us",
      title: "What our partners say",
      items: [
        { quote: "NadlanConnect France helped us find 45 qualified investors in just 3 months. The return on investment has been outstanding.", name: "Marc Delacroix", role: "Sales Director, Groupe Horizon" },
        { quote: "The lead quality is second to none. Prospects have already simulated their returns — they walk into the meeting with their decision all but made.", name: "Sophie Moreau", role: "Head of Sales, Bâtisseur 21" },
        { quote: "The publishing interface is so intuitive. We put a project online in 20 minutes. The analytics help us fine-tune our communication.", name: "Julien Perret", role: "Founder, PM Innovation" },
      ],
    },
    cta: {
      title: "Ready to boost your sales?",
      desc: "Join the 120+ developers who trust NadlanConnect France to distribute their projects. First month free, no commitment.",
      ctaCreate: "Create my developer account",
      ctaAdvisor: "Talk to an advisor",
    },
  },
} as const;

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-black text-white mb-1">{value}</div>
      <div className="text-xs text-white/40 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-7 hover:border-[#C9A84C]/30 hover:shadow-xl transition-all duration-300 group">
      <div className="w-12 h-12 bg-[#1E3A5F] rounded-xl flex items-center justify-center text-[#C9A84C] mb-5 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-[#1E3A5F] text-base mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ plan, price, desc, features, cta, highlight }: {
  plan: string; price: string; desc: string; features: string[]; cta: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-8 border ${highlight ? "bg-[#1E3A5F] border-[#C9A84C]/30 shadow-2xl shadow-[#1E3A5F]/20" : "bg-white border-gray-100"}`}>
      <div className="mb-6">
        <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${highlight ? "text-[#C9A84C]" : "text-gray-400"}`}>{plan}</p>
        <div className={`text-4xl font-black mb-1 ${highlight ? "text-white" : "text-[#1E3A5F]"}`}>{price}</div>
        <p className={`text-sm ${highlight ? "text-white/50" : "text-gray-400"}`}>{desc}</p>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${highlight ? "text-[#C9A84C]" : "text-[#C9A84C]"}`} />
            <span className={`text-sm ${highlight ? "text-white/80" : "text-gray-600"}`}>{f}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-full font-semibold text-sm transition-colors ${highlight ? "bg-[#C9A84C] text-white hover:bg-[#b8963e]" : "border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white"}`}>
        {cta}
      </button>
    </div>
  );
}

export default function Promoteurs() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/85 via-[#0d1117]/75 to-[#0d1117]/95" />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-[10px] md:text-xs font-medium tracking-wide mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
            <span className="sm:hidden">{t.hero.eyebrowShort}</span>
            <span className="hidden sm:inline">{t.hero.eyebrowLong}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] max-w-4xl mx-auto mb-3 md:mb-4">
            {t.hero.title1a}<br />{t.hero.title1b}
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 md:mb-8">
            <span className="text-[#C9A84C]">{t.hero.title2}</span>
          </h2>

          <p className="text-white/60 text-base md:text-lg max-w-md md:max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto mx-auto">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold text-sm md:text-[15px] hover:bg-[#b8963e] transition-colors shadow-lg">
              {t.hero.ctaPartner} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm md:text-[15px] hover:bg-white/10 transition-colors">
              {t.hero.ctaDemo}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 md:mt-20 grid grid-cols-3 gap-3 md:gap-20 border-t border-white/10 pt-6 md:pt-8 w-full max-w-xs md:max-w-2xl mx-auto">
            <StatCard value={t.stats[0].value} label={t.stats[0].label} />
            <StatCard value={t.stats[1].value} label={t.stats[1].label} />
            <StatCard value={t.stats[2].value} label={t.stats[2].label} />
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">{t.features.eyebrow}</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">{t.features.title}</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">{t.features.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <FeatureCard
              icon={<Building2 className="w-6 h-6" />}
              title={t.features.cards[0].title}
              desc={t.features.cards[0].desc}
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title={t.features.cards[1].title}
              desc={t.features.cards[1].desc}
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title={t.features.cards[2].title}
              desc={t.features.cards[2].desc}
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title={t.features.cards[3].title}
              desc={t.features.cards[3].desc}
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title={t.features.cards[4].title}
              desc={t.features.cards[4].desc}
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title={t.features.cards[5].title}
              desc={t.features.cards[5].desc}
            />
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-14 md:py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">{t.steps.eyebrow}</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">{t.steps.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.items.map((item) => (
              <div key={item.step} className="relative">
                <div className="text-7xl font-black text-[#1E3A5F]/8 mb-2 leading-none">{item.step}</div>
                <h3 className="font-bold text-[#1E3A5F] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">{t.pricing.eyebrow}</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">{t.pricing.title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <PricingCard
              plan={t.pricing.plans[0].plan}
              price={t.pricing.plans[0].price}
              desc={t.pricing.plans[0].desc}
              features={[...t.pricing.plans[0].features]}
              cta={t.pricing.plans[0].cta}
            />
            <PricingCard
              plan={t.pricing.plans[1].plan}
              price={t.pricing.plans[1].price}
              desc={t.pricing.plans[1].desc}
              features={[...t.pricing.plans[1].features]}
              cta={t.pricing.plans[1].cta}
              highlight
            />
            <PricingCard
              plan={t.pricing.plans[2].plan}
              price={t.pricing.plans[2].price}
              desc={t.pricing.plans[2].desc}
              features={[...t.pricing.plans[2].features]}
              cta={t.pricing.plans[2].cta}
            />
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-14 md:py-24 bg-[#1E3A5F]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">{t.testimonials.eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">{t.testimonials.title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {t.testimonials.items.map((item) => (
              <div key={item.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{item.quote}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{item.name}</div>
                  <div className="text-white/40 text-xs">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="w-14 h-14 bg-[#1E3A5F] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-7 h-7 text-[#C9A84C]" />
          </div>
          <h2 className="text-3xl font-black text-[#1E3A5F] mb-4">{t.cta.title}</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            {t.cta.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold hover:bg-[#b8963e] transition-colors">
              {t.cta.ctaCreate} <ArrowRight className="inline w-4 h-4 ml-1" />
            </button>
            <button className="px-8 py-3.5 rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] font-semibold hover:bg-[#1E3A5F] hover:text-white transition-colors">
              {t.cta.ctaAdvisor}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
