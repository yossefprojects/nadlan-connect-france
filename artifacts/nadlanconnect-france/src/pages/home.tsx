import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, ExternalLink, TrendingUp, Shield, Leaf } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 70% 50%, #C9A84C 0%, transparent 60%)"
        }} />
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 text-sm px-3 py-1">
            Extension de NadlanConnect.com
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight mb-6">
            Investissez dans l'immobilier neuf en <span className="text-accent">France</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10">
            Comprenez vos droits, optimisez votre fiscalité et simulez vos investissements grâce aux dispositifs Jeanbrun et LMNP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg">
              <Link href="/defiscalisation">
                Découvrir les dispositifs <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/simulateur">
                Simuler mon investissement
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3 avantages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-4">
            Pourquoi l'immobilier neuf ?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Des avantages concrets qui font la différence pour votre investissement
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">Frais de notaire réduits</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                2 à 3% dans le neuf contre 7 à 8% dans l'ancien. Sur un bien à 200 000€, c'est une économie immédiate de <strong className="text-primary">8 000 à 10 000€</strong>.
              </p>
              <Badge variant="outline" className="border-accent text-accent">Économies immédiates</Badge>
            </div>

            <div className="bg-white border border-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-5">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">Normes RE2020</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Performance énergétique garantie, faible empreinte carbone et charges réduites. Un logement construit pour durer avec une valeur verte reconnue.
              </p>
              <Badge variant="outline" className="border-green-600 text-green-700">Valeur verte garantie</Badge>
            </div>

            <div className="bg-white border border-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">Défiscalisation optimisée</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Dispositif Jeanbrun ou LMNP Réel — deux outils puissants pour réduire votre imposition et maximiser la rentabilité nette de votre investissement.
              </p>
              <Badge variant="outline" className="border-primary text-primary">Jeanbrun & LMNP</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation rapide des pages */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Explorez la plateforme
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: "/marche-neuf", title: "Marché Neuf", desc: "VEFA, RE2020 et frais de notaire expliqués clairement.", icon: "🏗️" },
              { href: "/defiscalisation", title: "Défiscalisation", desc: "Jeanbrun et LMNP : comparatif complet et téléchargement du guide.", icon: "📊" },
              { href: "/simulateur", title: "Simulateur IA", desc: "Estimez votre rendement et votre gain fiscal en quelques secondes.", icon: "🤖" },
              { href: "/acteurs", title: "Les Acteurs", desc: "Promoteurs, gestionnaires et conseillers du marché immobilier neuf.", icon: "🏢" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-accent/40 transition-all cursor-pointer group">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* À propos NadlanConnect */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Pourquoi <span className="text-accent">NadlanConnect France</span> ?
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              NadlanConnect France est l'extension française de <strong className="text-accent">NadlanConnect.com</strong>, la référence internationale en accompagnement immobilier. Nous vous apportons l'expertise du marché neuf français : droits, aides, défiscalisation, acteurs clés et simulation personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
              {["Informations fiables et à jour", "Outils de simulation gratuits", "Analyse IA de vos documents"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors">
              Visiter NadlanConnect.com <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
