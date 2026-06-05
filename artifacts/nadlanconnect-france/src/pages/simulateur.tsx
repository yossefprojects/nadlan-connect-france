import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSimulate } from "@workspace/api-client-react";
import { Loader2, Download, TrendingUp, Euro, Shield, BarChart3, AlertTriangle } from "lucide-react";

const schema = z.object({
  prix: z.coerce.number().min(1, "Requis"),
  loyer: z.coerce.number().min(1, "Requis"),
  tmi: z.coerce.number(),
  type: z.enum(["nu", "meuble"]),
  charges: z.coerce.number().min(0),
  duree: z.coerce.number().min(1, "Requis"),
});

type FormValues = z.infer<typeof schema>;

function ScoreBar({ score }: { score: number }) {
  const color = score >= 70 ? "bg-green-500" : score >= 40 ? "bg-orange-400" : "bg-red-500";
  const label = score >= 70 ? "Excellent" : score >= 40 ? "Correct" : "Risqué";
  const labelColor = score >= 70 ? "text-green-700" : score >= 40 ? "text-orange-600" : "text-red-600";

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">Score investissement</span>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-black ${labelColor}`}>{score}/100</span>
          <Badge className={score >= 70 ? "bg-green-100 text-green-800" : score >= 40 ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}>
            {label}
          </Badge>
        </div>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function ResultCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-2xl font-black text-primary">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

export default function Simulateur() {
  const [results, setResults] = useState<any>(null);
  const [lastInputs, setLastInputs] = useState<FormValues | null>(null);
  const simulate = useSimulate();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      prix: 200000,
      loyer: 700,
      tmi: 30,
      type: "nu",
      charges: 2000,
      duree: 9,
    },
  });

  const onSubmit = (values: FormValues) => {
    setLastInputs(values);
    simulate.mutate(
      { data: values },
      {
        onSuccess: (data) => setResults(data),
        onError: () => setResults(null),
      }
    );
  };

  const exportPdf = () => {
    if (!results || !lastInputs) return;
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    const date = new Date().toISOString().split("T")[0];
    fetch(`${baseUrl}/api/pdf/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: lastInputs, results }),
    })
      .then((r) => r.blob())
      .then((blob) => {
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = `rapport-simulation-${date}.pdf`;
        a.click();
        window.URL.revokeObjectURL(a.href);
      })
      .catch(console.error);
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Simulateur IA</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Simulez votre investissement</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Renseignez les caractéristiques de votre projet pour obtenir une analyse personnalisée : rendement brut et net, gain fiscal annuel et recommandations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Formulaire */}
            <div className="bg-white rounded-2xl border border-border shadow-md p-8">
              <h2 className="text-lg font-bold text-primary mb-6">Paramètres de l'investissement</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="prix" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix du bien (€)</FormLabel>
                      <FormControl><Input type="number" placeholder="200000" {...field} data-testid="input-prix" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="loyer" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loyer mensuel estimé (€)</FormLabel>
                      <FormControl><Input type="number" placeholder="700" {...field} data-testid="input-loyer" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="tmi" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tranche marginale d'imposition</FormLabel>
                      <Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={String(field.value)}>
                        <FormControl>
                          <SelectTrigger data-testid="select-tmi">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[11, 30, 41, 45].map((v) => (
                            <SelectItem key={v} value={String(v)}>{v}%</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="nu">Location nue (Dispositif Jeanbrun)</SelectItem>
                          <SelectItem value="meuble">Location meublée (LMNP Réel)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="charges" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Charges annuelles (€)</FormLabel>
                      <FormControl><Input type="number" placeholder="2000" {...field} data-testid="input-charges" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="duree" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée de détention (années)</FormLabel>
                      <FormControl><Input type="number" placeholder="9" {...field} data-testid="input-duree" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                    disabled={simulate.isPending}
                    data-testid="button-simulate"
                  >
                    {simulate.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyse en cours...</>
                    ) : (
                      "Lancer la simulation IA"
                    )}
                  </Button>

                  {simulate.isError && (
                    <p className="text-sm text-destructive text-center">
                      Une erreur est survenue. Veuillez réessayer.
                    </p>
                  )}
                </form>
              </Form>
            </div>

            {/* Résultats */}
            <div>
              {!results && !simulate.isPending && (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground p-8">
                  <div>
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium mb-2">Résultats de la simulation</p>
                    <p className="text-sm">Remplissez le formulaire et lancez la simulation pour obtenir votre analyse personnalisée.</p>
                  </div>
                </div>
              )}

              {simulate.isPending && (
                <div className="h-full flex items-center justify-center text-center p-8">
                  <div>
                    <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
                    <p className="text-lg font-medium text-primary mb-2">Analyse IA en cours...</p>
                    <p className="text-sm text-muted-foreground">Notre IA calcule vos rendements et gains fiscaux.</p>
                  </div>
                </div>
              )}

              {results && (
                <div className="space-y-6" data-testid="results-dashboard">
                  <ScoreBar score={results.score_investissement} />

                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      icon={<TrendingUp className="w-4 h-4 text-accent" />}
                      label="Rendement brut"
                      value={results.rendement_brut}
                    />
                    <ResultCard
                      icon={<TrendingUp className="w-4 h-4 text-accent" />}
                      label="Rendement net"
                      value={results.rendement_net}
                    />
                    <ResultCard
                      icon={<Euro className="w-4 h-4 text-accent" />}
                      label="Gain fiscal annuel"
                      value={fmt(results.gain_fiscal_annuel)}
                    />
                    <ResultCard
                      icon={<Shield className="w-4 h-4 text-accent" />}
                      label="Économies totales"
                      value={fmt(results.economies_totales)}
                      sub={`sur ${lastInputs?.duree || ""} ans`}
                    />
                  </div>

                  {/* Recommandation */}
                  <div className="bg-primary/5 border border-primary/15 rounded-xl p-5">
                    <div className="text-xs uppercase tracking-wide font-semibold text-primary mb-2 flex items-center gap-2">
                      <BarChart3 className="w-3 h-3" /> Recommandation IA
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{results.recommandation}</p>
                  </div>

                  {/* Points de vigilance */}
                  {results.points_vigilance?.length > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                      <div className="text-xs uppercase tracking-wide font-semibold text-orange-700 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" /> Points de vigilance
                      </div>
                      <ul className="space-y-2">
                        {results.points_vigilance.map((pt: string, i: number) => (
                          <li key={i} className="text-sm text-orange-800 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    onClick={exportPdf}
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-white"
                    data-testid="button-export-pdf"
                  >
                    <Download className="w-4 h-4 mr-2" /> Exporter mon rapport PDF
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
