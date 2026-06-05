import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ArrowRight, CheckCircle2, BarChart3, Users, Building2, Zap, Globe, Star, TrendingUp, FileText } from "lucide-react";

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

        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 text-xs font-medium tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            ESPACE PROMOTEURS — NADLANCONNECT FRANCE
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] max-w-4xl mx-auto mb-4">
            Promoteurs,<br />diffusez vos
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-8">
            <span className="text-[#C9A84C]">programmes neuf.</span>
          </h2>

          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Rejoignez la plateforme qui connecte promoteurs immobiliers et investisseurs qualifiés. Diffusez vos projets, gérez vos mandats et accédez à des leads chauds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold text-[15px] hover:bg-[#b8963e] transition-colors shadow-lg">
              Devenir partenaire <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-[15px] hover:bg-white/10 transition-colors">
              Voir une démo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 md:gap-20 border-t border-white/10 pt-8 max-w-2xl mx-auto">
            <StatCard value="120+" label="Promoteurs partenaires" />
            <StatCard value="2 400" label="Programmes diffusés" />
            <StatCard value="15 000" label="Leads générés / mois" />
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Plateforme complète</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F]">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">De la publication de vos programmes à la gestion des leads et des ventes.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<Building2 className="w-6 h-6" />}
              title="Publication de programmes"
              desc="Publiez vos résidences neuves avec photos HD, plans, descriptifs complets, lots disponibles et prix. Interface intuitive, mise en ligne en moins de 30 minutes."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Leads acheteurs qualifiés"
              desc="Accédez à des contacts d'investisseurs ayant déjà effectué une simulation sur votre type de programme. Leads scorés et prêts à l'achat."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Analytics en temps réel"
              desc="Suivez les vues, contacts, taux de conversion par programme. Comparez vos performances aux moyennes du marché. Exportez vos rapports."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Gestion des mandats"
              desc="Centralisez tous vos mandats de vente sur la plateforme. Suivez le statut de chaque lot, les réservations en cours et les actes signés."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Simulateur intégré"
              desc="Chaque programme dispose d'un simulateur IA personnalisé. Vos prospects calculent leur rendement directement sur votre fiche programme."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Réseau d'agences partenaires"
              desc="Connectez-vous au réseau NadlanConnect France d'agences immobilières partenaires pour démultiplier votre distribution commerciale."
            />
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Démarrage rapide</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F]">Comment ça fonctionne ?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Créez votre compte", desc: "Inscription en 5 minutes. Renseignez votre société, votre numéro SIRET et vos coordonnées. Votre compte est validé sous 24h." },
              { step: "02", title: "Publiez vos programmes", desc: "Importez vos programmes avec nos outils de publication. Ajoutez photos, plans, tableau des lots, dispositifs fiscaux éligibles." },
              { step: "03", title: "Recevez des leads", desc: "Les investisseurs qualifiés découvrent vos programmes. Vous recevez leurs coordonnées directement dans votre espace. Contactez-les sous 2h." },
            ].map((item) => (
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Tarification</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F]">Formules promoteurs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard
              plan="Essentiel"
              price="299€/mois"
              desc="Pour les petits promoteurs"
              features={[
                "Jusqu'à 5 programmes actifs",
                "50 leads qualifiés/mois",
                "Analytics de base",
                "Support par email",
                "Simulateur intégré",
              ]}
              cta="Commencer"
            />
            <PricingCard
              plan="Professionnel"
              price="699€/mois"
              desc="Pour les promoteurs régionaux"
              features={[
                "Jusqu'à 20 programmes actifs",
                "200 leads qualifiés/mois",
                "Analytics avancés + export",
                "Réseau agences partenaires",
                "Gestion mandats complète",
                "Support prioritaire",
              ]}
              cta="Devenir partenaire"
              highlight
            />
            <PricingCard
              plan="Entreprise"
              price="Sur devis"
              desc="Pour les grands groupes"
              features={[
                "Programmes illimités",
                "Leads illimités",
                "API & intégration CRM",
                "Account manager dédié",
                "Formation équipes",
                "SLA garanti",
              ]}
              cta="Nous contacter"
            />
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-[#1E3A5F]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Ils nous font confiance</p>
            <h2 className="text-3xl font-black text-white">Ce que disent nos partenaires</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "NadlanConnect France nous a permis de trouver 45 investisseurs qualifiés en 3 mois. Le retour sur investissement est exceptionnel.", name: "Marc Delacroix", role: "Directeur commercial, Groupe Horizon" },
              { quote: "La qualité des leads est incomparable. Les prospects ont déjà simulé leur rendement — ils arrivent à la réunion avec leur décision presque prise.", name: "Sophie Moreau", role: "Responsable ventes, Bâtisseur 21" },
              { quote: "L'interface de publication est tellement intuitive. On met un programme en ligne en 20 minutes. Les analytics nous aident à optimiser notre communication.", name: "Julien Perret", role: "Fondateur, PM Innovation" },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
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
          <h2 className="text-3xl font-black text-[#1E3A5F] mb-4">Prêt à booster vos ventes ?</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Rejoignez les 120+ promoteurs qui font confiance à NadlanConnect France pour distribuer leurs programmes. Premier mois offert, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold hover:bg-[#b8963e] transition-colors">
              Créer mon compte promoteur <ArrowRight className="inline w-4 h-4 ml-1" />
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
