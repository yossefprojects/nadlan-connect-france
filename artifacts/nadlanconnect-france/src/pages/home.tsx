import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ArrowRight, CheckCircle2, ExternalLink, Shield, Leaf, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Comment investir dans l'immobilier neuf en France depuis l'étranger ?",
    a: "L'investissement à distance est possible avec un accompagnement adapté : procuration notariale, compte bancaire français, financement hypothécaire auprès de banques françaises. NadlanConnect France centralise toutes les étapes et vous met en relation avec les bons interlocuteurs."
  },
  {
    q: "Qu'est-ce que le dispositif Jeanbrun et comment en bénéficier ?",
    a: "Le dispositif Jeanbrun (anciennement Pinel+) permet une réduction d'impôt allant jusqu'à 21% du prix d'achat sur 12 ans, conditionnée à la mise en location nue dans une zone tendue. Notre simulateur calcule automatiquement votre gain fiscal selon votre TMI."
  },
  {
    q: "Quelle est la différence entre Jeanbrun et LMNP Réel ?",
    a: "Jeanbrun offre une réduction d'impôt directe sur la location nue. Le LMNP Réel (location meublée) permet d'amortir le bien et de créer un déficit comptable, souvent plus avantageux pour les TMI élevées. Notre comparatif détaillé est disponible sur la page Défiscalisation."
  },
  {
    q: "Quels sont les frais de notaire dans l'immobilier neuf ?",
    a: "Dans le neuf, les frais de notaire sont de 2 à 3% du prix d'achat contre 7 à 8% dans l'ancien. Sur un bien à 300 000€, l'économie peut atteindre 12 000 à 15 000€ — réinvestissables dans votre apport ou votre épargne."
  },
  {
    q: "Puis-je utiliser le simulateur IA sans avoir de projet précis ?",
    a: "Oui, le simulateur fonctionne avec des hypothèses types. Vous pouvez tester différents scénarios (ville, prix, dispositif, TMI) pour comparer les rentabilités avant même d'avoir identifié un bien. C'est un excellent outil de pré-étude gratuit."
  }
];

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
  return (
    <Layout>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=85&auto=format&fit=crop"
            alt="Paris, immobilier neuf en France"
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
            <span className="sm:hidden">IMMOBILIER NEUF — FRANCE</span>
            <span className="hidden sm:inline">PLATEFORME IMMOBILIER NEUF — FRANCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] max-w-4xl mb-3 md:mb-4">
            Investissez dans<br />
            l'immobilier neuf
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] max-w-4xl mb-4 md:mb-6">
            <span className="text-[#C9A84C]">en France.</span>
          </h2>

          <p className="text-white/60 text-base md:text-lg max-w-md md:max-w-xl mb-8 md:mb-10 leading-relaxed px-2">
            Sélection de biens rentables, simulateurs IA, défiscalisation Jeanbrun & LMNP — accompagnement complet franco-israélien.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/simulateur"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold text-sm md:text-[15px] hover:bg-[#b8963e] transition-all duration-200 shadow-lg shadow-amber-900/30">
              Simuler mon investissement <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/defiscalisation"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm md:text-[15px] hover:bg-white/10 transition-all duration-200 backdrop-blur">
              Découvrir les dispositifs
            </Link>
          </div>

          <div className="mt-10 md:mt-20 grid grid-cols-3 gap-4 md:gap-16 border-t border-white/10 pt-6 md:pt-8 w-full max-w-sm md:max-w-xl">
            {[
              { value: "2–3%", label: "Frais de notaire" },
              { value: "RE2020", label: "Norme environnementale" },
              { value: "IA", label: "Analyse assistée" },
            ].map((s) => (
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
            {[
              { icon: "🔒", label: "100% sécurisé" },
              { icon: "🏆", label: "+2 400 programmes" },
              { icon: "🌍", label: "Bilingue FR / HE" },
              { icon: "🤖", label: "Analyse IA" },
              { icon: "📞", label: "Accompagnement dédié" },
            ].map((item, i, arr) => (
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
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Pourquoi le neuf ?</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">Trois avantages immédiats</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,
                title: "Frais de notaire réduits",
                desc: "2 à 3% dans le neuf contre 7 à 8% dans l'ancien. Sur 200 000€, l'économie est de 8 000 à 10 000€ — réinvestissables.",
                tag: "Économies directes",
              },
              {
                icon: <Leaf className="w-5 h-5" aria-hidden="true" />,
                title: "Norme RE2020",
                desc: "DPE A ou B garanti, charges locatives réduites et valeur verte protégée face aux futures interdictions de location.",
                tag: "Valeur long terme",
              },
              {
                icon: <Shield className="w-5 h-5" aria-hidden="true" />,
                title: "Défiscalisation optimisée",
                desc: "Dispositif Jeanbrun ou LMNP Réel — deux leviers puissants pour réduire votre impôt et maximiser la rentabilité nette.",
                tag: "Jeanbrun & LMNP",
              },
            ].map((card) => (
              <div key={card.title} className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#C9A84C]/40 hover:shadow-xl hover:shadow-amber-50 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] flex items-center justify-center text-[#C9A84C] mb-6">
                  {card.icon}
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
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">La plateforme</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">Tout ce qu'il vous faut</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {[
              { href: "/marche-neuf", title: "Marché Neuf", desc: "VEFA, RE2020 et frais de notaire expliqués clairement.", emoji: "🏗️" },
              { href: "/defiscalisation", title: "Défiscalisation", desc: "Jeanbrun et LMNP : comparatif complet et guide PDF.", emoji: "📊" },
              { href: "/simulateur", title: "Simulateur IA", desc: "Rendement et gain fiscal calculés en quelques secondes.", emoji: "🤖" },
              { href: "/acteurs", title: "Les Acteurs", desc: "Promoteurs, gestionnaires et conseillers du marché.", emoji: "🏢" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1E3A5F]/20 hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
                  <div className="text-3xl mb-4" aria-hidden="true">{item.emoji}</div>
                  <h3 className="font-bold text-[#1E3A5F] mb-2 group-hover:text-[#C9A84C] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-[#C9A84C] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                    Découvrir <ArrowRight className="w-3 h-3" />
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
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-4">Notre mission</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Pourquoi <span className="text-[#C9A84C]">NadlanConnect France</span> ?
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              NadlanConnect France est l'extension française de <strong className="text-white">NadlanConnect.com</strong>, référence internationale en accompagnement immobilier. Nous vous apportons l'expertise du marché neuf français : droits, aides, défiscalisation, acteurs clés et simulation personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
              {["Informations fiables et à jour", "Outils de simulation gratuits", "Analyse IA de vos documents"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white font-semibold transition-colors text-sm">
              Visiter NadlanConnect.com <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Questions fréquentes</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#1E3A5F]">Tout ce que vous voulez savoir</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">Les questions les plus posées par les investisseurs qui découvrent l'immobilier neuf français.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm mb-4">Vous avez d'autres questions ?</p>
            <Link href="/simulateur"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold text-sm hover:bg-[#b8963e] transition-all duration-200 shadow-lg shadow-amber-900/20">
              Essayer le simulateur IA <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
