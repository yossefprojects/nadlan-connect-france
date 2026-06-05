import { useState } from "react";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2, Users, TrendingUp, Info } from "lucide-react";

function downloadFile(url: string, filename: string) {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  fetch(`${baseUrl}${url}`)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(a.href);
    })
    .catch(console.error);
}

const tableData = [
  { critere: "Type de bail", jeanbrun: "Location nue", lmnp: "Location meublée" },
  { critere: "Loyer annuel estimé", jeanbrun: "7 200€ (plafonné)", lmnp: "8 640€ (marché)" },
  { critere: "Amortissement annuel", jeanbrun: "7 000€ (3,5%)", lmnp: "6 000€ (bâti + mobilier)" },
  { critere: "Résultat fiscal", jeanbrun: "-3 800€ déficit", lmnp: "-1 360€ déficit" },
  { critere: "Gain fiscal net", jeanbrun: "+1 140€/an", lmnp: "0€ impôt sur loyers" },
];

export default function Defiscalisation() {
  const [activeTab, setActiveTab] = useState<"jeanbrun" | "lmnp">("jeanbrun");

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Défiscalisation</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Optimisez votre fiscalité immobilière</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Deux dispositifs complémentaires — Jeanbrun et LMNP Réel — pour réduire vos impôts et maximiser la rentabilité nette de votre investissement.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => downloadFile("/api/pdf/generate-guide", "Guide-Investissement-Immobilier-Neuf-2026.pdf")}
            >
              <Download className="w-4 h-4 mr-2" /> Télécharger le guide complet
            </Button>
            <Button
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent/10"
              onClick={() => downloadFile("/api/pdf/brochure", "Brochure-Comparative-Jeanbrun-LMNP.pdf")}
            >
              <FileText className="w-4 h-4 mr-2" /> Comparer les 2 dispositifs en PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Dispositifs en détail */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-10 bg-slate-100 rounded-xl p-1 max-w-sm">
            <button
              onClick={() => setActiveTab("jeanbrun")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "jeanbrun" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Jeanbrun
            </button>
            <button
              onClick={() => setActiveTab("lmnp")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "lmnp" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              LMNP Réel
            </button>
          </div>

          {activeTab === "jeanbrun" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Dispositif Jeanbrun</h2>
                    <p className="text-sm text-muted-foreground">Location nue — déficit foncier</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  {[
                    { label: "Engagement", value: "9 ans minimum, résidence principale" },
                    { label: "Amortissement", value: "3,5% du prix par an déduit des revenus fonciers" },
                    { label: "Déficit foncier", value: "Imputable sur revenu global jusqu'à 10 700€/an" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-semibold text-primary">{item.label} : </span>
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-start gap-3">
                  <Users className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-primary mb-1">Idéal pour</div>
                    <p className="text-sm text-muted-foreground">Les contribuables avec des salaires importants souhaitant imputer un déficit foncier sur leurs revenus globaux.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-accent" /> Calcul du gain fiscal
                </h3>
                <div className="space-y-3 mb-6 font-mono text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Loyer annuel (plafonné)</span>
                    <span className="font-bold text-primary">+ 7 200€</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Charges</span>
                    <span className="font-bold text-red-600">- 4 000€</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Amortissement (3,5%)</span>
                    <span className="font-bold text-red-600">- 7 000€</span>
                  </div>
                  <div className="flex justify-between py-2 bg-primary/5 rounded-lg px-3 font-bold">
                    <span className="text-primary">Résultat fiscal</span>
                    <span className="text-primary">-3 800€</span>
                  </div>
                </div>
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Gain fiscal net (TMI 30%)</div>
                  <div className="text-3xl font-black text-accent">+1 140€/an</div>
                  <div className="text-xs text-muted-foreground mt-1">3 800€ × 30% = 1 140€</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "lmnp" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">LMNP Réel</h2>
                    <p className="text-sm text-muted-foreground">Location meublée non professionnelle</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  {[
                    { label: "Mobilier", value: "Amortissement sur 5 à 10 ans" },
                    { label: "Bâti hors terrain", value: "Amortissement sur 25 à 40 ans" },
                    { label: "Avantage fiscal", value: "Loyers nets d'impôt sur très longue période" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-semibold text-primary">{item.label} : </span>
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-accent/5 border border-accent/15 rounded-xl p-4 flex items-start gap-3">
                  <Users className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-primary mb-1">Idéal pour</div>
                    <p className="text-sm text-muted-foreground">Les investisseurs qui recherchent une rentabilité nette maximale sur le long terme avec des loyers exempts d'imposition pendant de nombreuses années.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-accent" /> Calcul du résultat fiscal
                </h3>
                <div className="space-y-3 mb-6 font-mono text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Loyer annuel (marché)</span>
                    <span className="font-bold text-primary">+ 8 640€</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Charges</span>
                    <span className="font-bold text-red-600">- 4 000€</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Amortissement bâti + mobilier</span>
                    <span className="font-bold text-red-600">- 6 000€</span>
                  </div>
                  <div className="flex justify-between py-2 bg-primary/5 rounded-lg px-3 font-bold">
                    <span className="text-primary">Résultat fiscal</span>
                    <span className="text-primary">-1 360€</span>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Imposition sur les loyers</div>
                  <div className="text-3xl font-black text-green-700">0€/an</div>
                  <div className="text-xs text-muted-foreground mt-1">Loyers intégralement couverts par l'amortissement</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-primary text-center mb-3">Tableau comparatif</h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">Données exactes issues de la documentation officielle</p>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-border">
            <div className="grid grid-cols-3 bg-primary text-white">
              <div className="p-4 font-semibold text-sm">Critère</div>
              <div className="p-4 font-semibold text-sm text-center border-l border-primary-foreground/20">Jeanbrun (Nu)</div>
              <div className="p-4 font-semibold text-sm text-center border-l border-primary-foreground/20 text-accent">LMNP Réel (Meublé)</div>
            </div>
            {tableData.map((row, i) => (
              <div key={row.critere} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/80"}`}>
                <div className="p-4 text-sm font-medium text-primary border-r border-border">{row.critere}</div>
                <div className="p-4 text-sm text-center text-foreground border-r border-border">{row.jeanbrun}</div>
                <div className="p-4 text-sm text-center font-medium text-accent">{row.lmnp}</div>
              </div>
            ))}
          </div>

          {/* Formule */}
          <div className="mt-8 bg-primary/5 border border-primary/15 rounded-2xl p-6">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-accent" /> Formule Jeanbrun
            </h3>
            <div className="font-mono text-sm space-y-2">
              <p className="text-foreground/80">
                Résultat Jeanbrun = 7 200€ - 4 000€ - 7 000€ = <strong className="text-primary">-3 800€</strong>
              </p>
              <p className="text-foreground/80">
                Gain impôt = 3 800€ × 30% (TMI) = <strong className="text-accent">1 140€/an</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
