import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Building2, GraduationCap, Users, Briefcase } from "lucide-react";

function ActorCard({ name, desc, badge }: { name: string; desc: string; badge?: string }) {
  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-bold text-sm">{name.slice(0, 1)}</span>
        </div>
        {badge && <Badge variant="outline" className="text-xs border-accent text-accent">{badge}</Badge>}
      </div>
      <h3 className="font-bold text-primary text-sm mb-1">{name}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function LmnpCard({ name, sector, icon }: { name: string; sector: string; icon: string }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground mb-1">{sector}</div>
        <div className="font-semibold text-primary text-sm">{name}</div>
      </div>
    </div>
  );
}

export default function Acteurs() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Les Acteurs</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cartographie du marché immobilier neuf</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Promoteurs, gestionnaires LMNP et conseillers — tous les acteurs clés du secteur pour vous aider à identifier les bons partenaires.
          </p>
        </div>
      </section>

      {/* Promoteurs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Promoteurs Immobiliers</h2>
              <p className="text-sm text-muted-foreground">Les grands acteurs de la construction neuve en France</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActorCard
              name="Nexity"
              desc="Leader national multi-métiers : promotion résidentielle, gestion et services immobiliers. Présent sur tout le territoire avec une offre diversifiée."
              badge="Leader national"
            />
            <ActorCard
              name="Altarea Cogedim"
              desc="Développeur urbain spécialisé dans les projets mixtes alliant logements, commerces et bureaux au cœur des villes."
              badge="Développement urbain"
            />
            <ActorCard
              name="Bouygues Immobilier"
              desc="Filiale du groupe Bouygues, reconnu pour la qualité de construction et son engagement en matière de développement durable."
              badge="Qualité constructeur"
            />
            <ActorCard
              name="Kaufman & Broad"
              desc="Promoteur indépendant coté en bourse, spécialisé dans le résidentiel et le tertiaire avec plus de 50 ans d'expérience."
              badge="Coté en bourse"
            />
            <ActorCard
              name="Icade"
              desc="Foncière et promoteur à capitaux publics (CDC), acteur incontournable des quartiers de santé et des grands projets institutionnels."
              badge="Acteur institutionnel"
            />
          </div>
        </div>
      </section>

      {/* Gestionnaires LMNP */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Gestionnaires LMNP par secteur</h2>
              <p className="text-sm text-muted-foreground">Les opérateurs qui gèrent les résidences services</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Étudiants */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-primary">Résidences étudiantes</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <LmnpCard name="Nexity Studéa" sector="Résidences étudiantes" icon="🎓" />
                <LmnpCard name="Réside Études" sector="Résidences étudiantes" icon="🎓" />
                <LmnpCard name="Nemea Student" sector="Résidences étudiantes" icon="🎓" />
              </div>
            </div>

            {/* Seniors */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary text-lg">👴</span>
                <h3 className="font-semibold text-primary">Résidences seniors</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <LmnpCard name="Domitys" sector="Résidences seniors" icon="🏡" />
                <LmnpCard name="Les Girandières" sector="Résidences seniors" icon="🏡" />
                <LmnpCard name="Ovelia" sector="Résidences seniors" icon="🏡" />
              </div>
            </div>

            {/* Tourisme */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary text-lg">🏖️</span>
                <h3 className="font-semibold text-primary">Tourisme & affaires</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <LmnpCard name="Pierre & Vacances" sector="Tourisme & loisirs" icon="🌊" />
                <LmnpCard name="Adagio" sector="Appart'hôtels d'affaires" icon="🏢" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conseillers */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Conseillers & Intermédiaires</h2>
              <p className="text-sm text-muted-foreground">Les experts pour vous accompagner dans votre projet</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-primary mb-3">CGP — Cabinets de Gestion de Patrimoine</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Les CGP indépendants sont des professionnels réglementés (CIF, ORIAS) qui analysent votre situation patrimoniale globale pour recommander les meilleures solutions d'investissement, y compris la défiscalisation immobilière.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Conseil personnalisé", "Indépendant", "Tous produits"].map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/30 text-primary text-xs">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-primary mb-3">Courtiers digitaux</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Les plateformes digitales spécialisées en immobilier neuf offrent une comparaison rapide des programmes et une mise en relation directe avec les promoteurs.
              </p>
              <div className="space-y-2">
                {[
                  { name: "Gridky", desc: "Plateforme d'investissement locatif neuf" },
                  { name: "Stellium", desc: "Conseil en investissement immobilier" },
                  { name: "Primonial", desc: "Gestion de patrimoine et pierre papier" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
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
