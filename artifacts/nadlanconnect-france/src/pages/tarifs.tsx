import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { useLang } from "@/lib/i18n";
import { Check, Users, Eye, Megaphone, Handshake, ArrowRight } from "lucide-react";

const content = {
  fr: {
    hero: {
      badge: "Tarifs",
      title: "Nos offres & tarification",
      sub: "Tous nos outils sont gratuits pour les particuliers. Les professionnels accèdent à des solutions de visibilité et d'apport d'affaires pour capter des mandats qualifiés.",
    },
    model: {
      eyebrow: "Notre modèle",
      title: "Gratuit pour les particuliers, financé par les professionnels",
      desc: "NadlanConnect repose sur un modèle freemium : l'accès aux estimations, aux cartes des prix et aux simulateurs est entièrement gratuit. La monétisation s'effectue auprès des professionnels de l'immobilier, via des abonnements de visibilité et des commissions sur les transactions abouties.",
    },
    particuliers: {
      eyebrow: "Particuliers",
      title: "100% gratuit, sans frais cachés",
      price: "0 €",
      priceNote: "pour toujours",
      features: [
        "Estimation en ligne de votre bien",
        "Cartes des prix au m² par quartier",
        "Simulateurs IA (rentabilité, défiscalisation)",
        "Accès libre aux données de marché",
        "Aucun engagement, aucun frais caché",
      ],
    },
    pros: {
      eyebrow: "Professionnels",
      title: "Des solutions pour capter des mandats qualifiés",
      subtitle:
        "Promoteurs, agences et conseillers : gagnez en visibilité et recevez des contacts vendeurs qualifiés.",
      offers: [
        {
          name: "Abonnements Visibilité",
          tag: "Packs Start · Silver · Gold",
          desc: "Vitrine digitale, avis clients certifiés, référencement prioritaire sur le comparateur local et accès aux outils de prospection.",
          price: "150 € à 900 €+",
          unit: "HT / mois",
          note: "Contrats de 12 à 24 mois — varie selon la commune et la concurrence.",
        },
        {
          name: "Options publicitaires",
          tag: "Encart publicitaire ciblé",
          desc: "Emplacement exclusif pour cibler un code postal ou un quartier précis et capter l'attention de tous les propriétaires du secteur.",
          price: "Plusieurs centaines €",
          unit: "/ mois",
          note: "En supplément de l'abonnement de base.",
        },
        {
          name: "Apport d'affaires",
          tag: "Service « Rendez-vous »",
          desc: "Qualification téléphonique des projets vendeurs par nos conseillers, puis prise de rendez-vous qualifiés directement pour votre agence.",
          price: "~ 25 %",
          unit: "TTC de la commission",
          note: "Rémunération au succès : facturée uniquement si la transaction se concrétise.",
        },
      ],
    },
    keys: {
      title: "Points clés à retenir",
      particulier: {
        title: "Pour le particulier",
        desc: "Aucun frais caché. L'assurance d'accéder librement aux données immobilières de marché.",
      },
      pro: {
        title: "Pour le professionnel",
        desc: "Un investissement conséquent, mais l'un des principaux canaux de captation de mandats qualifiés sur le marché français.",
      },
    },
    cta: {
      title: "Vous êtes un professionnel de l'immobilier ?",
      desc: "Découvrez nos offres dédiées aux promoteurs et aux agences.",
      promoteurs: "Espace promoteurs",
      agences: "Espace agences",
    },
    free: "Gratuit",
  },
  en: {
    hero: {
      badge: "Pricing",
      title: "Our offers & pricing",
      sub: "All our tools are free for individuals. Professionals get visibility and lead-generation solutions to win qualified mandates.",
    },
    model: {
      eyebrow: "Our model",
      title: "Free for individuals, funded by professionals",
      desc: "NadlanConnect runs on a freemium model: access to estimates, price maps and simulators is entirely free. Monetization comes from real-estate professionals, through visibility subscriptions and commissions on completed transactions.",
    },
    particuliers: {
      eyebrow: "Individuals",
      title: "100% free, no hidden fees",
      price: "€0",
      priceNote: "forever",
      features: [
        "Online estimate of your property",
        "Price-per-m² maps by neighborhood",
        "AI simulators (yield, tax optimization)",
        "Free access to market data",
        "No commitment, no hidden fees",
      ],
    },
    pros: {
      eyebrow: "Professionals",
      title: "Solutions to win qualified mandates",
      subtitle:
        "Developers, agencies and advisors: gain visibility and receive qualified seller leads.",
      offers: [
        {
          name: "Visibility Subscriptions",
          tag: "Start · Silver · Gold packs",
          desc: "Digital storefront, certified client reviews, priority ranking on the local comparator and access to prospecting tools.",
          price: "€150 to €900+",
          unit: "excl. tax / month",
          note: "12 to 24-month contracts — varies by town and competition.",
        },
        {
          name: "Advertising Options",
          tag: "Targeted ad slot",
          desc: "Exclusive placement to target a specific postal code or neighborhood and capture the attention of every owner in the area.",
          price: "Several hundred €",
          unit: "/ month",
          note: "Added on top of the base subscription.",
        },
        {
          name: "Lead Generation",
          tag: '"Appointment" service',
          desc: "Phone qualification of seller projects by our advisors, then qualified appointments booked directly for your agency.",
          price: "~ 25 %",
          unit: "incl. tax of the commission",
          note: "Success-based: charged only if the transaction closes.",
        },
      ],
    },
    keys: {
      title: "Key takeaways",
      particulier: {
        title: "For individuals",
        desc: "No hidden fees. Guaranteed free access to real-estate market data.",
      },
      pro: {
        title: "For professionals",
        desc: "A significant investment, but one of the main channels for winning qualified mandates on the French market.",
      },
    },
    cta: {
      title: "Are you a real-estate professional?",
      desc: "Discover our offers for developers and agencies.",
      promoteurs: "Developers area",
      agences: "Agencies area",
    },
    free: "Free",
  },
} as const;

const offerIcons = [Eye, Megaphone, Handshake];

export default function Tarifs() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-[42vh] items-end overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#1A3A5C]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#C9A84C]/20 blur-[120px]" />
        <div className="container relative z-10 mx-auto px-4 pb-12 pt-24">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            {t.hero.badge}
          </div>
          <h1 className="mb-3 max-w-3xl font-serif text-3xl font-black text-white md:text-5xl">
            {t.hero.title}
          </h1>
          <p className="max-w-2xl text-white/55">{t.hero.sub}</p>
        </div>
      </section>

      <div className="bg-[#F8F7F4]">
        {/* Model intro */}
        <section className="container mx-auto px-4 py-16 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b8963e]">
            {t.model.eyebrow}
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl text-2xl font-bold text-[#1E3A5F] md:text-3xl">
            {t.model.title}
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-500">{t.model.desc}</p>
        </section>

        {/* Particuliers — free highlight */}
        <section className="container mx-auto px-4 pb-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#C9A84C]/40 bg-white p-8 shadow-xl shadow-amber-50 md:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-3 py-1 text-xs font-semibold text-[#C9A84C]">
                  <Users className="h-3.5 w-3.5" />
                  {t.particuliers.eyebrow}
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F] md:text-2xl">
                  {t.particuliers.title}
                </h3>
              </div>
              <div className="text-end">
                <div className="font-serif text-4xl font-black text-[#1E3A5F]">
                  {t.particuliers.price}
                </div>
                <div className="text-xs text-gray-400">{t.particuliers.priceNote}</div>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 border-t border-gray-100 pt-6 sm:grid-cols-2">
              {t.particuliers.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Professionnels — offers */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b8963e]">
              {t.pros.eyebrow}
            </p>
            <h2 className="mb-3 text-2xl font-bold text-[#1E3A5F] md:text-3xl">{t.pros.title}</h2>
            <p className="mx-auto max-w-2xl text-gray-500">{t.pros.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.pros.offers.map((offer, i) => {
              const Icon = offerIcons[i] ?? Eye;
              return (
                <div
                  key={offer.name}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:border-[#C9A84C]/40 hover:shadow-xl hover:shadow-amber-50"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A5F] text-[#C9A84C]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E3A5F]">{offer.name}</h3>
                  <span className="mt-1 inline-block w-fit rounded-full border border-[#C9A84C]/30 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#b8963e]">
                    {offer.tag}
                  </span>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-500">{offer.desc}</p>
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-[#1E3A5F]">{offer.price}</span>
                      <span className="text-xs text-gray-400">{offer.unit}</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{offer.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Key takeaways */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#1E3A5F]">{t.keys.title}</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {[t.keys.particulier, t.keys.pro].map((k) => (
              <div key={k.title} className="rounded-2xl border border-gray-100 bg-white p-7">
                <div className="mb-3 flex items-center gap-2 font-bold text-[#1E3A5F]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                  {k.title}
                </div>
                <p className="text-sm leading-relaxed text-gray-500">{k.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-20 pt-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1628] to-[#1A3A5C] p-10 text-center md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C9A84C]/20 blur-[100px]" />
            <h2 className="relative mb-3 font-serif text-2xl font-black text-white md:text-3xl">
              {t.cta.title}
            </h2>
            <p className="relative mx-auto mb-7 max-w-xl text-white/60">{t.cta.desc}</p>
            <div className="relative flex flex-wrap justify-center gap-3">
              <Link
                href="/promoteurs"
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-6 py-3 text-sm font-bold text-[#0A1628] transition-transform hover:-translate-y-0.5"
              >
                {t.cta.promoteurs}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/agences"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {t.cta.agences}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
