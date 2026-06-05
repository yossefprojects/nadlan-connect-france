import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout";
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
  const color = score >= 70 ? "bg-emerald-500" : score >= 40 ? "bg-amber-400" : "bg-red-500";
  const label = score >= 70 ? "Excellent" : score >= 40 ? "Correct" : "Risqué";
  const labelColor = score >= 70 ? "text-emerald-600" : score >= 40 ? "text-amber-600" : "text-red-600";
  const bgLabel = score >= 70 ? "bg-emerald-50 border-emerald-200" : score >= 40 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-500">Score investissement</span>
        <div className="flex items-center gap-2">
          <span className={`text-3xl font-black ${labelColor}`}>{score}</span>
          <span className="text-gray-300 font-light">/100</span>
          <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${bgLabel} ${labelColor}`}>{label}</span>
        </div>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-[#1E3A5F]/8 rounded-lg flex items-center justify-center text-[#C9A84C]">{icon}</div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-2xl font-black text-[#1E3A5F]">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

export default function Simulateur() {
  const [results, setResults] = useState<any>(null);
  const [lastInputs, setLastInputs] = useState<FormValues | null>(null);
  const simulate = useSimulate();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { prix: 200000, loyer: 700, tmi: 30, type: "nu", charges: 2000, duree: 9 },
  });

  const onSubmit = (values: FormValues) => {
    setLastInputs(values);
    simulate.mutate({ data: values }, { onSuccess: (data) => setResults(data) });
  };

  const exportPdf = () => {
    if (!results || !lastInputs) return;
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    const date = new Date().toISOString().split("T")[0];
    fetch(`${baseUrl}/api/pdf/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: lastInputs, results }),
    }).then((r) => r.blob()).then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `rapport-simulation-${date}.pdf`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  const fmt = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[38vh] min-h-[260px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/70 to-[#0d1117]/30" />
        <div className="relative z-10 container mx-auto px-4 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            Simulateur IA
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Simulez votre investissement</h1>
          <p className="text-white/55 max-w-xl">Renseignez votre projet pour obtenir une analyse IA personnalisée : rendement, gain fiscal et recommandations.</p>
        </div>
      </section>

      <section className="py-20 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-base font-bold text-[#1E3A5F] mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3A5F] text-white text-xs flex items-center justify-center font-black">1</span>
                Paramètres de l'investissement
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {[
                    { name: "prix" as const, label: "Prix du bien (€)", placeholder: "200000", testid: "input-prix" },
                    { name: "loyer" as const, label: "Loyer mensuel estimé (€)", placeholder: "700", testid: "input-loyer" },
                    { name: "charges" as const, label: "Charges annuelles (€)", placeholder: "2000", testid: "input-charges" },
                    { name: "duree" as const, label: "Durée de détention (années)", placeholder: "9", testid: "input-duree" },
                  ].map((f) => (
                    <FormField key={f.name} control={form.control} name={f.name} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{f.label}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder={f.placeholder} data-testid={f.testid}
                            className="rounded-xl border-gray-200 focus:border-[#1E3A5F] focus:ring-[#1E3A5F]/10 h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  ))}

                  <FormField control={form.control} name="tmi" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tranche marginale d'imposition</FormLabel>
                      <Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={String(field.value)}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl border-gray-200 h-11" data-testid="select-tmi">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[11, 30, 41, 45].map((v) => <SelectItem key={v} value={String(v)}>{v}%</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type de location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl border-gray-200 h-11" data-testid="select-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="nu">Location nue (Dispositif Jeanbrun)</SelectItem>
                          <SelectItem value="meuble">Location meublée (LMNP Réel)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                  <button type="submit" disabled={simulate.isPending} data-testid="button-simulate"
                    className="w-full py-3.5 rounded-xl bg-[#1E3A5F] text-white font-bold text-sm hover:bg-[#152d4a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                    {simulate.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyse IA en cours...</> : "Lancer la simulation →"}
                  </button>

                  {simulate.isError && <p className="text-xs text-red-500 text-center">Une erreur est survenue. Veuillez réessayer.</p>}
                </form>
              </Form>
            </div>

            {/* Résultats */}
            <div>
              {!results && !simulate.isPending && (
                <div className="h-full min-h-[400px] bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center p-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#f8f9fb] flex items-center justify-center mb-5">
                    <BarChart3 className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="font-semibold text-gray-300 mb-1">Résultats de la simulation</p>
                  <p className="text-sm text-gray-300">Remplissez le formulaire et lancez l'analyse.</p>
                </div>
              )}

              {simulate.isPending && (
                <div className="h-full min-h-[400px] bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center p-10">
                  <Loader2 className="w-12 h-12 text-[#1E3A5F] animate-spin mb-4" />
                  <p className="font-semibold text-[#1E3A5F] mb-1">Analyse IA en cours...</p>
                  <p className="text-sm text-gray-400">Notre IA calcule vos rendements et gains fiscaux.</p>
                </div>
              )}

              {results && !simulate.isPending && (
                <div className="space-y-4" data-testid="results-dashboard">
                  <ScoreBar score={results.score_investissement} />

                  <div className="grid grid-cols-2 gap-3">
                    <MetricCard icon={<TrendingUp className="w-4 h-4" />} label="Rendement brut" value={results.rendement_brut} />
                    <MetricCard icon={<TrendingUp className="w-4 h-4" />} label="Rendement net" value={results.rendement_net} />
                    <MetricCard icon={<Euro className="w-4 h-4" />} label="Gain fiscal annuel" value={fmt(results.gain_fiscal_annuel)} />
                    <MetricCard icon={<Shield className="w-4 h-4" />} label="Économies totales" value={fmt(results.economies_totales)} sub={`sur ${lastInputs?.duree || ""} ans`} />
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <p className="text-xs font-semibold text-[#1E3A5F] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-[#C9A84C]" /> Recommandation IA
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">{results.recommandation}</p>
                  </div>

                  {results.points_vigilance?.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5" /> Points de vigilance
                      </p>
                      <ul className="space-y-2">
                        {results.points_vigilance.map((pt: string, i: number) => (
                          <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />{pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button onClick={exportPdf} data-testid="button-export-pdf"
                    className="w-full py-3 rounded-xl border-2 border-[#C9A84C] text-[#C9A84C] font-semibold text-sm hover:bg-[#C9A84C] hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Exporter mon rapport PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
