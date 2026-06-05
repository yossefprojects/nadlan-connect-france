import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Leaf, Receipt, HardHat, Building2, Droplets } from "lucide-react";

function StepItem({ step, label, pct, color }: { step: string; label: string; pct: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${color}`}>
        {step}
      </div>
      <div className="text-xs font-medium text-muted-foreground max-w-[80px]">{label}</div>
      <Badge variant="outline" className="text-xs border-accent text-accent">{pct}</Badge>
    </div>
  );
}

function StepConnector() {
  return (
    <div className="flex-1 flex items-center justify-center mt-[-24px]">
      <div className="h-0.5 w-full bg-border" />
    </div>
  );
}

export default function MarcheNeuf() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Marché Neuf</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Les 3 piliers de l'immobilier neuf</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            VEFA, RE2020 et frais de notaire réduits — tout ce qu'il faut savoir pour investir sereinement dans le neuf.
          </p>
        </div>
      </section>

      {/* Bloc 1 : VEFA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <HardHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">La VEFA</h2>
              <p className="text-muted-foreground text-sm">Vente en l'État Futur d'Achèvement</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-foreground/80 leading-relaxed mb-6">
                La VEFA est le contrat par lequel vous achetez un bien immobilier <strong>sur plan</strong>, avant même que la construction soit terminée. Le promoteur s'engage sur les caractéristiques du logement, le prix et le délai de livraison.
              </p>
              <div className="space-y-3">
                {[
                  "Achat sécurisé par la Garantie Financière d'Achèvement (GFA)",
                  "Garantie de parfait achèvement — 1 an",
                  "Garantie biennale — 2 ans sur les équipements",
                  "Garantie décennale — 10 ans sur le gros œuvre",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Receipt className="w-4 h-4" /> Appels de fonds légaux
              </h3>
              <div className="space-y-3">
                {[
                  { phase: "Signature", pct: "5%", desc: "Dépôt de garantie" },
                  { phase: "Fondations", pct: "35%", desc: "Achèvement des fondations" },
                  { phase: "Hors d'eau", pct: "70%", desc: "Mise hors d'eau" },
                  { phase: "Hors d'air", pct: "80%", desc: "Mise hors d'air" },
                  { phase: "Achèvement", pct: "95%", desc: "Achèvement des travaux" },
                  { phase: "Livraison", pct: "100%", desc: "Remise des clés" },
                ].map((item) => (
                  <div key={item.phase} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.phase}</span>
                      <span className="text-xs text-muted-foreground ml-2">{item.desc}</span>
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/30 font-bold">{item.pct}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Schéma visuel étapes VEFA */}
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="font-bold text-primary text-center mb-8">Schéma des étapes VEFA</h3>
            <div className="flex items-start gap-0 overflow-x-auto pb-2">
              <StepItem step="1" label="Réservation" pct="5%" color="bg-primary/70" />
              <StepConnector />
              <StepItem step="2" label="Fondations" pct="35%" color="bg-primary/80" />
              <StepConnector />
              <StepItem step="3" label="Hors d'eau" pct="70%" color="bg-primary" />
              <StepConnector />
              <StepItem step="4" label="Achèvement" pct="95%" color="bg-accent" />
              <StepConnector />
              <StepItem step="5" label="Livraison" pct="100%" color="bg-green-600" />
            </div>
            <p className="text-xs text-center text-muted-foreground mt-6">
              Chaque appel de fonds est encadré par la loi — vous ne payez qu'en fonction de l'avancement réel des travaux.
            </p>
          </div>
        </div>
      </section>

      {/* Bloc 2 : RE2020 */}
      <section className="py-16 bg-green-50/60 border-t border-green-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">La RE2020</h2>
              <p className="text-muted-foreground text-sm">Réglementation Environnementale 2020</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: <Droplets className="w-5 h-5 text-green-600" />, title: "Consommation quasi-nulle", desc: "Les bâtiments RE2020 consomment jusqu'à 30% d'énergie de moins que les constructions BBC précédentes." },
              { icon: <Leaf className="w-5 h-5 text-green-600" />, title: "Faible empreinte carbone", desc: "Matériaux biosourcés privilégiés, calcul de l'impact carbone sur l'ensemble du cycle de vie du bâtiment." },
              { icon: <Receipt className="w-5 h-5 text-green-600" />, title: "Charges réduites", desc: "Factures énergétiques significativement inférieures pour les locataires, ce qui facilite la location et réduit le risque de vacance." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-primary mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-700 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl font-black text-green-300">A</div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-300/20 text-green-100 border-green-300/30">Valeur verte garantie</Badge>
              </div>
              <p className="text-sm text-green-100 leading-relaxed">
                Un logement RE2020 obtient systématiquement un DPE A ou B, ce qui garantit sa valeur sur le marché immobilier à long terme et le protège des évolutions réglementaires futures (interdiction de location des passoires thermiques).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc 3 : Frais de notaire */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Frais de notaire réduits</h2>
              <p className="text-muted-foreground text-sm">Un avantage immédiat et significatif</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-primary rounded-2xl p-8 text-white text-center shadow-lg">
              <div className="text-sm text-primary-foreground/70 mb-2 uppercase tracking-wide font-medium">Immobilier neuf</div>
              <div className="text-7xl font-black text-accent mb-2">2–3%</div>
              <div className="text-sm text-primary-foreground/70">du prix d'acquisition</div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8 text-center border border-border">
              <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wide font-medium">Immobilier ancien</div>
              <div className="text-7xl font-black text-muted-foreground mb-2">7–8%</div>
              <div className="text-sm text-muted-foreground">du prix d'acquisition</div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8">
            <h3 className="font-bold text-primary mb-4 text-lg">Exemple concret — Bien à 200 000€</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Frais neuf (2,5%)</div>
                <div className="text-2xl font-bold text-primary">5 000€</div>
              </div>
              <div className="text-center flex items-center justify-center">
                <div className="text-2xl font-bold text-accent">vs</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Frais ancien (7,5%)</div>
                <div className="text-2xl font-bold text-muted-foreground">15 000€</div>
              </div>
            </div>
            <div className="text-center border-t border-accent/20 pt-4">
              <div className="text-sm text-muted-foreground mb-1">Économie réalisée</div>
              <div className="text-3xl font-black text-accent">8 000 à 10 000€</div>
              <div className="text-xs text-muted-foreground mt-1">directement disponibles pour votre investissement</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
