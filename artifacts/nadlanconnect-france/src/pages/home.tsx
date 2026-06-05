import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ArrowRight, CheckCircle2, ExternalLink, Shield, Leaf, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=85&auto=format&fit=crop"
            alt="Paris"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/80 via-[#0d1117]/70 to-[#0d1117]/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur text-white/80 text-xs font-medium tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            PLATEFORME IMMOBILIER NEUF — FRANCE
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] max-w-4xl mb-4">
            Investissez dans<br />
            l'immobilier neuf
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] max-w-4xl mb-8">
            <span className="text-[#C9A84C]">en France.</span>
          </h2>

          <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Simulez, défiscalisez et analysez vos projets grâce aux dispositifs Jeanbrun et LMNP — le tout assisté par IA.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/simulateur"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold text-[15px] hover:bg-[#b8963e] transition-colors shadow-lg shadow-amber-900/30">
              Simuler mon investissement <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/defiscalisation"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-[15px] hover:bg-white/10 transition-colors backdrop-blur">
              Découvrir les dispositifs
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-8 w-full max-w-xl">
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

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20" />
        </div>
      </section>

      {/* ── 3 AVANTAGES ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Pourquoi le neuf ?</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F]">Trois avantages immédiats</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "Frais de notaire réduits",
                desc: "2 à 3% dans le neuf contre 7 à 8% dans l'ancien. Sur 200 000€, l'économie est de 8 000 à 10 000€ — réinvestissables.",
                tag: "Économies directes",
              },
              {
                icon: <Leaf className="w-5 h-5" />,
                title: "Norme RE2020",
                desc: "DPE A ou B garanti, charges locatives réduites et valeur verte protégée face aux futures interdictions de location.",
                tag: "Valeur long terme",
              },
              {
                icon: <Shield className="w-5 h-5" />,
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
      <section className="py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">La plateforme</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F]">Tout ce qu'il vous faut</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { href: "/marche-neuf", title: "Marché Neuf", desc: "VEFA, RE2020 et frais de notaire expliqués clairement.", emoji: "🏗️" },
              { href: "/defiscalisation", title: "Défiscalisation", desc: "Jeanbrun et LMNP : comparatif complet et guide PDF.", emoji: "📊" },
              { href: "/simulateur", title: "Simulateur IA", desc: "Rendement et gain fiscal calculés en quelques secondes.", emoji: "🤖" },
              { href: "/acteurs", title: "Les Acteurs", desc: "Promoteurs, gestionnaires et conseillers du marché.", emoji: "🏢" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1E3A5F]/20 hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
                  <div className="text-3xl mb-4">{item.emoji}</div>
                  <h3 className="font-bold text-[#1E3A5F] mb-2 group-hover:text-[#C9A84C] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-[#C9A84C] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Découvrir <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#1E3A5F]">
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
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white font-semibold transition-colors text-sm">
              Visiter NadlanConnect.com <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
