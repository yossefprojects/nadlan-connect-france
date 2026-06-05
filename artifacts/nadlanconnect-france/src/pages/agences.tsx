import { Layout } from "@/components/layout";
import { ArrowRight, CheckCircle2, Users, Building2, Euro, Handshake, FileText, BarChart3, Shield, Star, ChevronRight } from "lucide-react";

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
      <div className="w-10 h-10 bg-[#1E3A5F]/8 rounded-xl flex items-center justify-center text-[#C9A84C] shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-[#1E3A5F] mb-1 text-sm">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function Agences() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=85&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/85 via-[#0d1117]/75 to-[#0d1117]/92" />

        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 text-xs font-medium tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ESPACE AGENCES IMMOBILIÈRES — NADLANCONNECT FRANCE
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] max-w-4xl mx-auto mb-4">
            Agences, accédez aux<br />meilleurs programmes
          </h1>
          <h2 className="text-5xl md:text-6xl font-black leading-[1.05] mb-8">
            <span className="text-[#C9A84C]">neuf de France.</span>
          </h2>

          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Élargissez votre offre immobilière avec les programmes neufs de nos promoteurs partenaires. Commissions attractives, formation incluse et outils IA pour vos clients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold text-[15px] hover:bg-[#b8963e] transition-colors shadow-lg">
              Rejoindre le réseau <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-[15px] hover:bg-white/10 transition-colors">
              Découvrir les programmes
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 md:gap-20 border-t border-white/10 pt-8 max-w-2xl mx-auto">
            <StatCard value="380+" label="Agences partenaires" />
            <StatCard value="3–5%" label="Commissions moyennes" />
            <StatCard value="48h" label="Délai de paiement" />
          </div>
        </div>
      </section>

      {/* Pourquoi rejoindre */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Votre avantage concurrentiel</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F] mb-6">Pourquoi rejoindre le réseau NadlanConnect France ?</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Le marché de l'immobilier neuf représente une opportunité considérable pour les agences. Avec NadlanConnect France, accédez à un catalogue complet de programmes et des outils pour convaincre vos clients investisseurs.
              </p>
              <div className="space-y-0">
                <BenefitRow
                  icon={<Euro className="w-4 h-4" />}
                  title="Commissions transparentes de 3 à 5%"
                  desc="Commissions versées sous 48h après signature de l'acte authentique. Aucune surprise, aucune retenue."
                />
                <BenefitRow
                  icon={<Building2 className="w-4 h-4" />}
                  title="Accès à 2 400+ programmes exclusifs"
                  desc="Catalogue complet des résidences neuves de nos promoteurs partenaires en France. Recherche par ville, dispositif, prix."
                />
                <BenefitRow
                  icon={<BarChart3 className="w-4 h-4" />}
                  title="Simulateur IA pour vos clients"
                  desc="Proposez à vos clients une simulation personnalisée Jeanbrun/LMNP en temps réel. Argument de vente décisif."
                />
                <BenefitRow
                  icon={<Shield className="w-4 h-4" />}
                  title="Formation certifiante loi Alur"
                  desc="Formation gratuite à l'immobilier neuf, aux dispositifs fiscaux et à nos outils. Heures validées pour votre obligation de formation continue."
                />
              </div>
            </div>

            <div className="bg-[#1E3A5F] rounded-2xl p-8 text-white">
              <h3 className="font-bold text-lg mb-2">Exemple de commission</h3>
              <p className="text-white/50 text-sm mb-6">Pour un bien à 250 000€</p>
              <div className="space-y-4 mb-6">
                {[
                  { label: "Prix du bien", value: "250 000€" },
                  { label: "Taux de commission", value: "4%" },
                  { label: "Commission brute", value: "10 000€", accent: true },
                  { label: "Délai de versement", value: "48h après acte" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-sm text-white/60">{row.label}</span>
                    <span className={`font-bold text-sm ${row.accent ? "text-[#C9A84C] text-xl" : "text-white"}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-sm text-white/60">
                <span className="text-[#C9A84C] font-semibold">✓</span> Aucun investissement de stock requis. Vous touchez votre commission sans acheter de biens.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Processus simple</p>
            <h2 className="text-3xl font-black text-[#1E3A5F]">Comment ça marche ?</h2>
          </div>

          <div className="space-y-4">
            {[
              { n: "01", title: "Inscription & vérification", desc: "Créez votre compte agence avec votre numéro de carte professionnelle. Vérification en moins de 24h par notre équipe.", badge: "Gratuit" },
              { n: "02", title: "Accès au catalogue", desc: "Parcourez les 2 400+ programmes disponibles. Filtres par ville, type (VEFA, résidence services, LMNP), dispositif fiscal, prix/lot." },
              { n: "03", title: "Présentez à vos clients", desc: "Utilisez notre simulateur IA pour calculer le rendement et le gain fiscal du programme sous les yeux du client. Envoyez le rapport personnalisé." },
              { n: "04", title: "Réservation & commission", desc: "Le client signe le contrat de réservation. Vous percevez votre commission sous 48h après l'acte authentique. Suivi en temps réel dans votre espace." },
            ].map((step, i) => (
              <div key={step.n} className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-[#1E3A5F] rounded-xl flex items-center justify-center text-[#C9A84C] font-black text-sm shrink-0">{step.n}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-bold text-[#1E3A5F]">{step.title}</h3>
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Votre boîte à outils</p>
            <h2 className="text-3xl font-black text-[#1E3A5F]">Des outils professionnels à votre disposition</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: <BarChart3 className="w-5 h-5" />, title: "Simulateur IA avancé", desc: "Calculez rendement, cash-flow, gain fiscal Jeanbrun/LMNP en temps réel. Générez un rapport PDF personnalisé à l'image de votre agence." },
              { icon: <FileText className="w-5 h-5" />, title: "Analyse documentaire", desc: "Uploadez un contrat de réservation ou une brochure promoteur. Notre IA extrait automatiquement les informations clés pour votre client." },
              { icon: <Users className="w-5 h-5" />, title: "CRM Clients", desc: "Gérez vos contacts acheteurs, suivez l'avancement des dossiers, recevez des alertes sur les programmes correspondant à leurs critères." },
              { icon: <Handshake className="w-5 h-5" />, title: "Formation continue", desc: "Accédez à notre bibliothèque de formations : VEFA, RE2020, Jeanbrun, LMNP, gestion des copropriétés neuves. Certifiées loi Alur." },
            ].map((t) => (
              <div key={t.title} className="flex items-start gap-4 p-6 bg-[#f8f9fb] rounded-2xl border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-[#1E3A5F] rounded-xl flex items-center justify-center text-[#C9A84C] shrink-0">{t.icon}</div>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] mb-1 text-sm">{t.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-[#1E3A5F]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Ils ont rejoint le réseau</p>
            <h2 className="text-3xl font-black text-white">380+ agences nous font confiance</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Grâce au simulateur IA, je convertis maintenant 1 client sur 3 en investisseur neuf. Avant c'était 1 sur 10. Les chiffres parlent d'eux-mêmes.", name: "Isabelle Fontaine", agency: "Fontaine Immobilier, Lyon" },
              { quote: "Les programmes sont de qualité, les commissions sont honnêtes et le paiement est rapide. C'est tout ce qu'on demande. Je recommande sans hésiter.", name: "Thomas Blanchard", agency: "TB Conseil Immobilier, Bordeaux" },
              { quote: "La formation LMNP que NadlanConnect France nous a dispensée a transformé notre façon de conseiller les clients. C'est un vrai avantage concurrentiel.", name: "Marie-Claire Dupont", agency: "Agence du Patrimoine, Nantes" },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />)}</div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.agency}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/20">
            <Handshake className="w-7 h-7 text-[#C9A84C]" />
          </div>
          <h2 className="text-3xl font-black text-[#1E3A5F] mb-4">Prêt à développer votre activité ?</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Rejoignez 380+ agences qui diversifient leurs revenus avec l'immobilier neuf. Inscription gratuite, formation offerte, commissions dès la première vente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold hover:bg-[#b8963e] transition-colors">
              Créer mon compte agence <ArrowRight className="inline w-4 h-4 ml-1" />
            </button>
            <button className="px-8 py-3.5 rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] font-semibold hover:bg-[#1E3A5F] hover:text-white transition-colors">
              Parler à un conseiller
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
