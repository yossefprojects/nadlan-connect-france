import { Layout } from "@/components/layout";
import { useLang } from "@/lib/i18n";
import { ArrowRight, CheckCircle2, Users, Building2, Euro, Handshake, FileText, BarChart3, Shield, Star, ChevronRight } from "lucide-react";

const content = {
  fr: {
    hero: {
      badgeShort: "ESPACE AGENCES",
      badgeFull: "ESPACE AGENCES IMMOBILIÈRES — NADLANCONNECT FRANCE",
      titleLine1: "Agences, accédez aux",
      titleLine2: "meilleurs programmes",
      titleGold: "neuf de France.",
      subtitle: "Élargissez votre offre immobilière avec les programmes neufs de nos promoteurs partenaires. Commissions attractives, formation incluse et outils IA pour vos clients.",
      ctaPrimary: "Rejoindre le réseau",
      ctaSecondary: "Découvrir les programmes",
      stats: [
        { value: "380+", label: "Agences" },
        { value: "3–5%", label: "Commissions" },
        { value: "48h", label: "Paiement" },
      ],
    },
    why: {
      eyebrow: "Votre avantage concurrentiel",
      title: "Pourquoi rejoindre le réseau NadlanConnect France ?",
      intro: "Le marché de l'immobilier neuf représente une opportunité considérable pour les agences. Avec NadlanConnect France, accédez à un catalogue complet de programmes et des outils pour convaincre vos clients investisseurs.",
      benefits: [
        { title: "Commissions transparentes de 3 à 5%", desc: "Commissions versées sous 48h après signature de l'acte authentique. Aucune surprise, aucune retenue." },
        { title: "Accès à 2 400+ programmes exclusifs", desc: "Catalogue complet des résidences neuves de nos promoteurs partenaires en France. Recherche par ville, dispositif, prix." },
        { title: "Simulateur IA pour vos clients", desc: "Proposez à vos clients une simulation personnalisée Jeanbrun/LMNP en temps réel. Argument de vente décisif." },
        { title: "Formation certifiante loi Alur", desc: "Formation gratuite à l'immobilier neuf, aux dispositifs fiscaux et à nos outils. Heures validées pour votre obligation de formation continue." },
      ],
    },
    commission: {
      title: "Exemple de commission",
      subtitle: "Pour un bien à 250 000€",
      rows: [
        { label: "Prix du bien", value: "250 000€", accent: false },
        { label: "Taux de commission", value: "4%", accent: false },
        { label: "Commission brute", value: "10 000€", accent: true },
        { label: "Délai de versement", value: "48h après acte", accent: false },
      ],
      note: "Aucun investissement de stock requis. Vous touchez votre commission sans acheter de biens.",
    },
    how: {
      eyebrow: "Processus simple",
      title: "Comment ça marche ?",
      steps: [
        { n: "01", title: "Inscription & vérification", desc: "Créez votre compte agence avec votre numéro de carte professionnelle. Vérification en moins de 24h par notre équipe.", badge: "Gratuit" },
        { n: "02", title: "Accès au catalogue", desc: "Parcourez les 2 400+ programmes disponibles. Filtres par ville, type (VEFA, résidence services, LMNP), dispositif fiscal, prix/lot.", badge: "" },
        { n: "03", title: "Présentez à vos clients", desc: "Utilisez notre simulateur IA pour calculer le rendement et le gain fiscal du programme sous les yeux du client. Envoyez le rapport personnalisé.", badge: "" },
        { n: "04", title: "Réservation & commission", desc: "Le client signe le contrat de réservation. Vous percevez votre commission sous 48h après l'acte authentique. Suivi en temps réel dans votre espace.", badge: "" },
      ],
    },
    tools: {
      eyebrow: "Votre boîte à outils",
      title: "Des outils professionnels à votre disposition",
      items: [
        { title: "Simulateur IA avancé", desc: "Calculez rendement, cash-flow, gain fiscal Jeanbrun/LMNP en temps réel. Générez un rapport PDF personnalisé à l'image de votre agence." },
        { title: "Analyse documentaire", desc: "Uploadez un contrat de réservation ou une brochure promoteur. Notre IA extrait automatiquement les informations clés pour votre client." },
        { title: "CRM Clients", desc: "Gérez vos contacts acheteurs, suivez l'avancement des dossiers, recevez des alertes sur les programmes correspondant à leurs critères." },
        { title: "Formation continue", desc: "Accédez à notre bibliothèque de formations : VEFA, RE2020, Jeanbrun, LMNP, gestion des copropriétés neuves. Certifiées loi Alur." },
      ],
    },
    testimonials: {
      eyebrow: "Ils ont rejoint le réseau",
      title: "380+ agences nous font confiance",
      items: [
        { quote: "Grâce au simulateur IA, je convertis maintenant 1 client sur 3 en investisseur neuf. Avant c'était 1 sur 10. Les chiffres parlent d'eux-mêmes.", name: "Isabelle Fontaine", agency: "Fontaine Immobilier, Lyon" },
        { quote: "Les programmes sont de qualité, les commissions sont honnêtes et le paiement est rapide. C'est tout ce qu'on demande. Je recommande sans hésiter.", name: "Thomas Blanchard", agency: "TB Conseil Immobilier, Bordeaux" },
        { quote: "La formation LMNP que NadlanConnect France nous a dispensée a transformé notre façon de conseiller les clients. C'est un vrai avantage concurrentiel.", name: "Marie-Claire Dupont", agency: "Agence du Patrimoine, Nantes" },
      ],
    },
    cta: {
      title: "Prêt à développer votre activité ?",
      text: "Rejoignez 380+ agences qui diversifient leurs revenus avec l'immobilier neuf. Inscription gratuite, formation offerte, commissions dès la première vente.",
      primary: "Créer mon compte agence",
      secondary: "Parler à un conseiller",
    },
  },
  en: {
    hero: {
      badgeShort: "AGENCIES HUB",
      badgeFull: "REAL-ESTATE AGENCIES HUB — NADLANCONNECT FRANCE",
      titleLine1: "Agencies, access the",
      titleLine2: "best new-build projects",
      titleGold: "across France.",
      subtitle: "Expand your property offering with new-build projects from our partner developers. Attractive commissions, training included and AI tools for your clients.",
      ctaPrimary: "Join the network",
      ctaSecondary: "Explore the projects",
      stats: [
        { value: "380+", label: "Agencies" },
        { value: "3–5%", label: "Commission" },
        { value: "48h", label: "Payout" },
      ],
    },
    why: {
      eyebrow: "Your competitive edge",
      title: "Why join the NadlanConnect France network?",
      intro: "The new-build property market is a major opportunity for agencies. With NadlanConnect France, you gain access to a complete catalogue of projects and the tools to win over your investor clients.",
      benefits: [
        { title: "Transparent commissions of 3 to 5%", desc: "Commissions paid within 48h of signing the deed of sale (acte authentique). No surprises, no deductions." },
        { title: "Access to 2 400+ exclusive projects", desc: "A complete catalogue of new-build residences from our partner developers across France. Search by city, scheme and price." },
        { title: "AI simulator for your clients", desc: "Offer your clients a personalised Jeanbrun/LMNP simulation in real time. A decisive selling point." },
        { title: "Certified loi Alur training", desc: "Free training on new-build property, tax schemes and our tools. Hours validated towards your continuing-education requirement." },
      ],
    },
    commission: {
      title: "Commission example",
      subtitle: "For a property at 250 000€",
      rows: [
        { label: "Property price", value: "250 000€", accent: false },
        { label: "Commission rate", value: "4%", accent: false },
        { label: "Gross commission", value: "10 000€", accent: true },
        { label: "Payout time", value: "48h after deed", accent: false },
      ],
      note: "No stock investment required. You earn your commission without ever buying a property.",
    },
    how: {
      eyebrow: "A simple process",
      title: "How does it work?",
      steps: [
        { n: "01", title: "Sign-up & verification", desc: "Create your agency account with your professional licence number (carte professionnelle). Verified in under 24h by our team.", badge: "Free" },
        { n: "02", title: "Access the catalogue", desc: "Browse the 2 400+ available projects. Filter by city, type (VEFA, serviced residence, LMNP), tax scheme and price per unit.", badge: "" },
        { n: "03", title: "Present to your clients", desc: "Use our AI simulator to calculate a project's yield and tax savings right in front of your client. Send the personalised report.", badge: "" },
        { n: "04", title: "Reservation & commission", desc: "The client signs the reservation contract. You receive your commission within 48h of the deed of sale. Real-time tracking in your dashboard.", badge: "" },
      ],
    },
    tools: {
      eyebrow: "Your toolkit",
      title: "Professional tools at your fingertips",
      items: [
        { title: "Advanced AI simulator", desc: "Calculate yield, cash flow and Jeanbrun/LMNP tax savings in real time. Generate a personalised PDF report branded with your agency." },
        { title: "Document analysis", desc: "Upload a reservation contract or a developer brochure. Our AI automatically extracts the key information for your client." },
        { title: "Client CRM", desc: "Manage your buyer contacts, track the progress of each file and get alerts on projects matching their criteria." },
        { title: "Continuing education", desc: "Access our training library: VEFA, RE2020, Jeanbrun, LMNP, managing new-build co-ownerships. Certified under loi Alur." },
      ],
    },
    testimonials: {
      eyebrow: "They've joined the network",
      title: "380+ agencies trust us",
      items: [
        { quote: "Thanks to the AI simulator, I now convert 1 in 3 clients into new-build investors. It used to be 1 in 10. The numbers speak for themselves.", name: "Isabelle Fontaine", agency: "Fontaine Immobilier, Lyon" },
        { quote: "The projects are high quality, the commissions are fair and payment is fast. That's all we ask for. I recommend them without hesitation.", name: "Thomas Blanchard", agency: "TB Conseil Immobilier, Bordeaux" },
        { quote: "The LMNP training NadlanConnect France gave us transformed the way we advise our clients. It's a genuine competitive edge.", name: "Marie-Claire Dupont", agency: "Agence du Patrimoine, Nantes" },
      ],
    },
    cta: {
      title: "Ready to grow your business?",
      text: "Join 380+ agencies diversifying their income with new-build property. Free sign-up, training included, commissions from your very first sale.",
      primary: "Create my agency account",
      secondary: "Talk to an advisor",
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

function BenefitRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-gray-100 last:border-0">
      <div className="w-10 h-10 bg-foreground/8 rounded-xl flex items-center justify-center text-sea shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-foreground mb-1 text-sm">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function Agences() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=85&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1B2A]/85 via-[#0E1B2A]/75 to-[#0E1B2A]/92" />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-[10px] md:text-xs font-medium tracking-wide mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="sm:hidden">{t.hero.badgeShort}</span>
            <span className="hidden sm:inline">{t.hero.badgeFull}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] sm:leading-[1.05] max-w-4xl mx-auto mb-3 md:mb-4">
            {t.hero.titleLine1}<br className="hidden sm:block" /> {t.hero.titleLine2}
          </h1>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.1] sm:leading-[1.05] mb-6 md:mb-8">
            <span className="text-sea">{t.hero.titleGold}</span>
          </h2>

          <p className="text-white/60 text-base md:text-lg max-w-md md:max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto mx-auto">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-sea text-white font-bold text-sm md:text-[15px] hover:bg-sea transition-colors shadow-lg">
              {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm md:text-[15px] hover:bg-white/10 transition-colors">
              {t.hero.ctaSecondary}
            </button>
          </div>

          <div className="mt-10 md:mt-20 grid grid-cols-3 gap-3 md:gap-20 border-t border-white/10 pt-6 md:pt-8 w-full max-w-xs md:max-w-2xl mx-auto">
            <StatCard value={t.hero.stats[0].value} label={t.hero.stats[0].label} />
            <StatCard value={t.hero.stats[1].value} label={t.hero.stats[1].label} />
            <StatCard value={t.hero.stats[2].value} label={t.hero.stats[2].label} />
          </div>
        </div>
      </section>

      {/* Pourquoi rejoindre */}
      <section className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-sea uppercase tracking-widest mb-3">{t.why.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">{t.why.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {t.why.intro}
              </p>
              <div className="space-y-0">
                <BenefitRow
                  icon={<Euro className="w-4 h-4" />}
                  title={t.why.benefits[0].title}
                  desc={t.why.benefits[0].desc}
                />
                <BenefitRow
                  icon={<Building2 className="w-4 h-4" />}
                  title={t.why.benefits[1].title}
                  desc={t.why.benefits[1].desc}
                />
                <BenefitRow
                  icon={<BarChart3 className="w-4 h-4" />}
                  title={t.why.benefits[2].title}
                  desc={t.why.benefits[2].desc}
                />
                <BenefitRow
                  icon={<Shield className="w-4 h-4" />}
                  title={t.why.benefits[3].title}
                  desc={t.why.benefits[3].desc}
                />
              </div>
            </div>

            <div className="bg-foreground rounded-2xl p-8 text-white">
              <h3 className="font-bold text-lg mb-2">{t.commission.title}</h3>
              <p className="text-white/50 text-sm mb-6">{t.commission.subtitle}</p>
              <div className="space-y-4 mb-6">
                {t.commission.rows.map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-sm text-white/60">{row.label}</span>
                    <span className={`font-bold text-sm ${row.accent ? "text-sea text-xl" : "text-white"}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-sm text-white/60">
                <span className="text-sea font-semibold">✓</span> {t.commission.note}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-14 md:py-24 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-sea uppercase tracking-widest mb-3">{t.how.eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">{t.how.title}</h2>
          </div>

          <div className="space-y-4">
            {t.how.steps.map((step, i) => (
              <div key={step.n} className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center text-sea font-black text-sm shrink-0">{step.n}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-bold text-foreground">{step.title}</h3>
                    {step.badge && <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">{step.badge}</span>}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && <ChevronRight className="w-5 h-5 text-gray-200 shrink-0 mt-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outils */}
      <section className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-sea uppercase tracking-widest mb-3">{t.tools.eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">{t.tools.title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {[
              { icon: <BarChart3 className="w-5 h-5" />, ...t.tools.items[0] },
              { icon: <FileText className="w-5 h-5" />, ...t.tools.items[1] },
              { icon: <Users className="w-5 h-5" />, ...t.tools.items[2] },
              { icon: <Handshake className="w-5 h-5" />, ...t.tools.items[3] },
            ].map((tool) => (
              <div key={tool.title} className="flex items-start gap-4 p-6 bg-muted rounded-2xl border border-gray-100 hover:border-sea/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center text-sea shrink-0">{tool.icon}</div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">{tool.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-14 md:py-24 bg-foreground">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-sea uppercase tracking-widest mb-3">{t.testimonials.eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">{t.testimonials.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {t.testimonials.items.map((item) => (
              <div key={item.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 text-sea fill-sea" />)}</div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{item.quote}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{item.name}</div>
                  <div className="text-white/40 text-xs">{item.agency}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="w-14 h-14 bg-sea/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-sea/20">
            <Handshake className="w-7 h-7 text-sea" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-4">{t.cta.title}</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            {t.cta.text}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3.5 rounded-full bg-sea text-white font-bold hover:bg-sea transition-colors">
              {t.cta.primary} <ArrowRight className="inline w-4 h-4 ml-1" />
            </button>
            <button className="px-8 py-3.5 rounded-full border-2 border-foreground text-foreground font-semibold hover:bg-foreground hover:text-white transition-colors">
              {t.cta.secondary}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
