import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ArrowRight, CheckCircle2, ExternalLink, Shield, Leaf, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const content = {
  fr: {
    hero: {
      alt: "Paris, immobilier neuf en France",
      badgeMobile: "IMMOBILIER NEUF — FRANCE",
      badgeDesktop: "PLATEFORME IMMOBILIER NEUF — FRANCE",
      titleLine1: "Investissez dans",
      titleLine2: "l'immobilier neuf",
      titleAccent: "en France.",
      subtitle: "Sélection de biens rentables, simulateurs IA, défiscalisation Jeanbrun & LMNP — accompagnement complet franco-israélien.",
      ctaPrimary: "Simuler mon investissement",
      ctaSecondary: "Découvrir les dispositifs",
      stats: [
        { value: "2–3%", label: "Frais de notaire" },
        { value: "RE2020", label: "Norme environnementale" },
        { value: "IA", label: "Analyse assistée" },
      ],
    },
    reassurance: [
      { icon: "🔒", label: "100% sécurisé" },
      { icon: "🏆", label: "+2 400 programmes" },
      { icon: "🌍", label: "Bilingue FR / EN" },
      { icon: "🤖", label: "Analyse IA" },
      { icon: "📞", label: "Accompagnement dédié" },
    ],
    advantages: {
      eyebrow: "Pourquoi le neuf ?",
      title: "Trois avantages immédiats",
      cards: [
        {
          title: "Frais de notaire réduits",
          desc: "2 à 3% dans le neuf contre 7 à 8% dans l'ancien. Sur 200 000€, l'économie est de 8 000 à 10 000€ — réinvestissables.",
          tag: "Économies directes",
        },
        {
          title: "Norme RE2020",
          desc: "DPE A ou B garanti, charges locatives réduites et valeur verte protégée face aux futures interdictions de location.",
          tag: "Valeur long terme",
        },
        {
          title: "Défiscalisation optimisée",
          desc: "Dispositif Jeanbrun ou LMNP Réel — deux leviers puissants pour réduire votre impôt et maximiser la rentabilité nette.",
          tag: "Jeanbrun & LMNP",
        },
      ],
    },
    quickPages: {
      eyebrow: "La plateforme",
      title: "Tout ce qu'il vous faut",
      discover: "Découvrir",
      items: [
        { href: "/marche-neuf", title: "Marché Neuf", desc: "VEFA, RE2020 et frais de notaire expliqués clairement.", emoji: "🏗️" },
        { href: "/defiscalisation", title: "Défiscalisation", desc: "Jeanbrun et LMNP : comparatif complet et guide PDF.", emoji: "📊" },
        { href: "/simulateur", title: "Simulateur IA", desc: "Rendement et gain fiscal calculés en quelques secondes.", emoji: "🤖" },
        { href: "/acteurs", title: "Les Acteurs", desc: "Promoteurs, gestionnaires et conseillers du marché.", emoji: "🏢" },
      ],
    },
    about: {
      eyebrow: "Notre mission",
      titleBefore: "Pourquoi ",
      titleBrand: "NadlanConnect France",
      titleAfter: " ?",
      descBefore: "NadlanConnect France est l'extension française de ",
      descBrand: "NadlanConnect.com",
      descAfter: ", référence internationale en accompagnement immobilier. Nous vous apportons l'expertise du marché neuf français : droits, aides, défiscalisation, acteurs clés et simulation personnalisée.",
      features: ["Informations fiables et à jour", "Outils de simulation gratuits", "Analyse IA de vos documents"],
      visit: "Visiter NadlanConnect.com",
    },
    faqSection: {
      eyebrow: "Questions fréquentes",
      title: "Tout ce que vous voulez savoir",
      subtitle: "Les questions les plus posées par les investisseurs qui découvrent l'immobilier neuf français.",
      moreQuestions: "Vous avez d'autres questions ?",
      cta: "Essayer le simulateur IA",
    },
    faqs: [
      {
        q: "Comment investir dans l'immobilier neuf en France depuis l'étranger ?",
        a: "L'investissement à distance est possible avec un accompagnement adapté : procuration notariale, compte bancaire français, financement hypothécaire auprès de banques françaises. NadlanConnect France centralise toutes les étapes et vous met en relation avec les bons interlocuteurs.",
      },
      {
        q: "Qu'est-ce que le dispositif Jeanbrun et comment en bénéficier ?",
        a: "Le dispositif Jeanbrun (anciennement Pinel+) permet une réduction d'impôt allant jusqu'à 21% du prix d'achat sur 12 ans, conditionnée à la mise en location nue dans une zone tendue. Notre simulateur calcule automatiquement votre gain fiscal selon votre TMI.",
      },
      {
        q: "Quelle est la différence entre Jeanbrun et LMNP Réel ?",
        a: "Jeanbrun offre une réduction d'impôt directe sur la location nue. Le LMNP Réel (location meublée) permet d'amortir le bien et de créer un déficit comptable, souvent plus avantageux pour les TMI élevées. Notre comparatif détaillé est disponible sur la page Défiscalisation.",
      },
      {
        q: "Quels sont les frais de notaire dans l'immobilier neuf ?",
        a: "Dans le neuf, les frais de notaire sont de 2 à 3% du prix d'achat contre 7 à 8% dans l'ancien. Sur un bien à 300 000€, l'économie peut atteindre 12 000 à 15 000€ — réinvestissables dans votre apport ou votre épargne.",
      },
      {
        q: "Puis-je utiliser le simulateur IA sans avoir de projet précis ?",
        a: "Oui, le simulateur fonctionne avec des hypothèses types. Vous pouvez tester différents scénarios (ville, prix, dispositif, TMI) pour comparer les rentabilités avant même d'avoir identifié un bien. C'est un excellent outil de pré-étude gratuit.",
      },
    ],
  },
  en: {
    hero: {
      alt: "Paris, new-build property in France",
      badgeMobile: "NEW-BUILD PROPERTY — FRANCE",
      badgeDesktop: "NEW-BUILD PROPERTY PLATFORM — FRANCE",
      titleLine1: "Invest in",
      titleLine2: "new-build property",
      titleAccent: "in France.",
      subtitle: "A curated selection of profitable properties, AI simulators, Jeanbrun & LMNP tax optimization — full French-Israeli support.",
      ctaPrimary: "Simulate my investment",
      ctaSecondary: "Explore the schemes",
      stats: [
        { value: "2–3%", label: "Notaire fees" },
        { value: "RE2020", label: "Environmental standard" },
        { value: "AI", label: "Assisted analysis" },
      ],
    },
    reassurance: [
      { icon: "🔒", label: "100% secure" },
      { icon: "🏆", label: "+2 400 programs" },
      { icon: "🌍", label: "Bilingual FR / EN" },
      { icon: "🤖", label: "AI analysis" },
      { icon: "📞", label: "Dedicated support" },
    ],
    advantages: {
      eyebrow: "Why new-build?",
      title: "Three immediate advantages",
      cards: [
        {
          title: "Reduced notaire fees",
          desc: "2 to 3% on new-build versus 7 to 8% on existing properties. On 200 000€, that's a saving of 8 000 to 10 000€ — ready to reinvest.",
          tag: "Direct savings",
        },
        {
          title: "RE2020 standard",
          desc: "Guaranteed DPE A or B rating, lower rental charges and protected green value against future rental bans.",
          tag: "Long-term value",
        },
        {
          title: "Optimized tax strategy",
          desc: "Jeanbrun scheme or LMNP Réel — two powerful levers to lower your tax and maximize your net return.",
          tag: "Jeanbrun & LMNP",
        },
      ],
    },
    quickPages: {
      eyebrow: "The platform",
      title: "Everything you need",
      discover: "Discover",
      items: [
        { href: "/marche-neuf", title: "New-Build Market", desc: "VEFA, RE2020 and notaire fees explained clearly.", emoji: "🏗️" },
        { href: "/defiscalisation", title: "Tax Optimization", desc: "Jeanbrun and LMNP: full comparison and PDF guide.", emoji: "📊" },
        { href: "/simulateur", title: "AI Simulator", desc: "Yield and tax savings calculated in seconds.", emoji: "🤖" },
        { href: "/acteurs", title: "Key Players", desc: "Developers, managers and market advisors.", emoji: "🏢" },
      ],
    },
    about: {
      eyebrow: "Our mission",
      titleBefore: "Why ",
      titleBrand: "NadlanConnect France",
      titleAfter: "?",
      descBefore: "NadlanConnect France is the French extension of ",
      descBrand: "NadlanConnect.com",
      descAfter: ", an international reference in real-estate guidance. We bring you genuine expertise in the French new-build market: regulations, incentives, tax optimization, key players and personalized simulations.",
      features: ["Reliable, up-to-date information", "Free simulation tools", "AI analysis of your documents"],
      visit: "Visit NadlanConnect.com",
    },
    faqSection: {
      eyebrow: "Frequently asked questions",
      title: "Everything you want to know",
      subtitle: "The questions most often asked by investors discovering the French new-build market.",
      moreQuestions: "Have more questions?",
      cta: "Try the AI simulator",
    },
    faqs: [
      {
        q: "How can you invest in new-build property in France from abroad?",
        a: "Investing remotely is entirely possible with the right support: a notarial power of attorney, a French bank account and mortgage financing from French banks. NadlanConnect France centralizes every step and connects you with the right people.",
      },
      {
        q: "What is the Jeanbrun scheme and how can you benefit from it?",
        a: "The Jeanbrun scheme (formerly Pinel+) provides a tax reduction of up to 21% of the purchase price over 12 years, conditional on renting the property unfurnished in a high-demand area (zone tendue). Our simulator automatically calculates your tax savings based on your TMI (marginal tax bracket).",
      },
      {
        q: "What is the difference between Jeanbrun and LMNP Réel?",
        a: "Jeanbrun offers a direct tax reduction on unfurnished rentals. LMNP Réel (furnished rental, actual-cost regime) lets you depreciate the property and create an accounting deficit, often more advantageous for higher TMI brackets. Our detailed comparison is available on the Défiscalisation (tax optimization) page.",
      },
      {
        q: "What are the notaire fees on new-build property?",
        a: "On new-build, notaire fees are 2 to 3% of the purchase price versus 7 to 8% on existing properties. On a 300 000€ property, the saving can reach 12 000 to 15 000€ — funds you can reinvest in your down payment or savings.",
      },
      {
        q: "Can I use the AI simulator without a specific project in mind?",
        a: "Yes, the simulator works with standard assumptions. You can test different scenarios (city, price, scheme, TMI) to compare returns before you've even identified a property. It's an excellent free pre-study tool.",
      },
    ],
  },
} as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#1E3A5F] text-sm md:text-base">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#C9A84C] shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-300 shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 pt-2 bg-white border-t border-gray-50">
          <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { lang } = useLang();
  const t = content[lang];

  const advantageIcons = [
    <TrendingUp className="w-5 h-5" aria-hidden="true" />,
    <Leaf className="w-5 h-5" aria-hidden="true" />,
    <Shield className="w-5 h-5" aria-hidden="true" />,
  ];

  return (
    <Layout>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=85&auto=format&fit=crop"
            alt={t.hero.alt}
            width={1920}
            height={1080}
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/80 via-[#0d1117]/70 to-[#0d1117]/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur text-white/70 text-[10px] md:text-xs font-medium tracking-wide mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" aria-hidden="true" />
            <span className="sm:hidden">{t.hero.badgeMobile}</span>
            <span className="hidden sm:inline">{t.hero.badgeDesktop}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] max-w-4xl mb-3 md:mb-4">
            {t.hero.titleLine1}<br />
            {t.hero.titleLine2}
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] max-w-4xl mb-4 md:mb-6">
            <span className="text-[#C9A84C]">{t.hero.titleAccent}</span>
          </h2>

          <p className="text-white/60 text-base md:text-lg max-w-md md:max-w-xl mb-8 md:mb-10 leading-relaxed px-2">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/simulateur"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold text-sm md:text-[15px] hover:bg-[#b8963e] transition-all duration-200 shadow-lg shadow-amber-900/30">
              {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/defiscalisation"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm md:text-[15px] hover:bg-white/10 transition-all duration-200 backdrop-blur">
              {t.hero.ctaSecondary}
            </Link>
          </div>

          <div className="mt-10 md:mt-20 grid grid-cols-3 gap-4 md:gap-16 border-t border-white/10 pt-6 md:pt-8 w-full max-w-sm md:max-w-xl">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25" aria-hidden="true">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20" />
        </div>
      </section>

      {/* ── BANDEAU RÉASSURANCE ───────────────────────────────────── */}
      <section className="bg-[#1E3A5F] py-0 border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-none">
            {t.reassurance.map((item, i, arr) => (
              <div key={item.label} className="flex items-center shrink-0">
                <div className="flex items-center gap-1.5 text-[12px] text-white/65 whitespace-nowrap py-3.5 px-3 md:px-5">
                  <span className="text-sm" aria-hidden="true">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <span className="w-px h-4 bg-white/10 shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 AVANTAGES ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">{t.advantages.eyebrow}</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">{t.advantages.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {t.advantages.cards.map((card, i) => (
              <div key={card.title} className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#C9A84C]/40 hover:shadow-xl hover:shadow-amber-50 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] flex items-center justify-center text-[#C9A84C] mb-6">
                  {advantageIcons[i]}
                </div>
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{card.desc}</p>
                <span className="inline-block px-3 py-1 rounded-full border border-[#C9A84C]/30 text-[#b8963e] text-xs font-semibold bg-amber-50">
                  {card.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAGES RAPIDES ───────────────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">{t.quickPages.eyebrow}</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">{t.quickPages.title}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {t.quickPages.items.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1E3A5F]/20 hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
                  <div className="text-3xl mb-4" aria-hidden="true">{item.emoji}</div>
                  <h3 className="font-bold text-[#1E3A5F] mb-2 group-hover:text-[#C9A84C] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-[#C9A84C] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                    {t.quickPages.discover} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-[#1E3A5F]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-4">{t.about.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              {t.about.titleBefore}<span className="text-[#C9A84C]">{t.about.titleBrand}</span>{t.about.titleAfter}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              {t.about.descBefore}<strong className="text-white">{t.about.descBrand}</strong>{t.about.descAfter}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
              {t.about.features.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white font-semibold transition-colors text-sm">
              {t.about.visit} <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">{t.faqSection.eyebrow}</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">{t.faqSection.title}</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">{t.faqSection.subtitle}</p>
          </div>

          <div className="space-y-3">
            {t.faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm mb-4">{t.faqSection.moreQuestions}</p>
            <Link href="/simulateur"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold text-sm hover:bg-[#b8963e] transition-all duration-200 shadow-lg shadow-amber-900/20">
              {t.faqSection.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
