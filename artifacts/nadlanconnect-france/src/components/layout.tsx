import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { FileUp, Upload, CheckCircle2, ShieldAlert, FileText, Loader2, Globe, X, Menu } from "lucide-react";

export function PdfUploadModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf") { setError("Veuillez uploader un fichier PDF valide."); return; }
    setError(null); setIsAnalyzing(true); setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/pdf/analyze`, { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      setResult(await res.json());
    } catch { setError("Une erreur est survenue lors de l'analyse."); }
    finally { setIsAnalyzing(false); }
  };

  const handleDrop = async (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) await processFile(e.dataTransfer.files[0]); };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) await processFile(e.target.files[0]); };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="bg-[#1E3A5F] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileUp className="w-5 h-5 text-[#C9A84C]" />
            <div>
              <h2 className="text-white font-bold">Analyser mon document</h2>
              <p className="text-white/50 text-xs">Contrat VEFA, bail ou brochure promoteur</p>
            </div>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {!isAnalyzing && !result && (
            <div
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center text-center transition-colors ${isDragging ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-gray-200 hover:border-[#1E3A5F]/40 hover:bg-gray-50"}`}
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            >
              <div className="w-16 h-16 rounded-full bg-[#1E3A5F]/8 flex items-center justify-center mb-4">
                <Upload className="w-7 h-7 text-[#1E3A5F]" />
              </div>
              <p className="font-semibold text-[#1E3A5F] mb-1">Glissez-déposez votre PDF ici</p>
              <p className="text-sm text-gray-400 mb-5">ou cliquez pour parcourir</p>
              <input type="file" id="file-upload" accept=".pdf" className="hidden" onChange={handleFileChange} />
              <label htmlFor="file-upload" className="px-6 py-2.5 rounded-full bg-[#1E3A5F] text-white text-sm font-semibold cursor-pointer hover:bg-[#152d4a] transition-colors">
                Sélectionner un fichier
              </label>
              {error && <p className="mt-4 text-sm text-red-500 flex items-center gap-1.5"><ShieldAlert className="w-4 h-4" />{error}</p>}
            </div>
          )}
          {isAnalyzing && (
            <div className="py-12 flex flex-col items-center text-center">
              <Loader2 className="w-12 h-12 text-[#1E3A5F] animate-spin mb-4" />
              <p className="font-semibold text-[#1E3A5F]">Analyse IA en cours...</p>
              <p className="text-sm text-gray-400 mt-1">Notre IA lit et extrait les informations clés.</p>
            </div>
          )}
          {result && !isAnalyzing && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#b8963e] text-xs font-semibold border border-[#C9A84C]/30">Analysé par IA</span>
                <button onClick={() => setResult(null)} className="ml-auto text-xs text-gray-400 hover:text-gray-600">Nouvelle analyse</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {result.prix && <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 mb-1">Prix détecté</p><p className="font-bold text-[#1E3A5F]">{result.prix}</p></div>}
                {result.surface && <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 mb-1">Surface</p><p className="font-bold text-[#1E3A5F]">{result.surface}</p></div>}
              </div>
              {result.resume && <div className="bg-gray-50 rounded-xl p-4"><p className="text-xs font-semibold text-[#1E3A5F] flex items-center gap-1.5 mb-2"><FileText className="w-3.5 h-3.5" />Résumé</p><p className="text-sm text-gray-600 leading-relaxed">{result.resume}</p></div>}
              {result.clauses?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-green-700 flex items-center gap-1.5 mb-2"><CheckCircle2 className="w-3.5 h-3.5" />Clauses importantes</p>
                  <ul className="space-y-1.5">{result.clauses.map((c: string, i: number) => <li key={i} className="text-sm text-gray-600 flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />{c}</li>)}</ul>
                </div>
              )}
              {result.risques?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-red-600 flex items-center gap-1.5 mb-2"><ShieldAlert className="w-3.5 h-3.5" />Points de vigilance</p>
                  <ul className="space-y-1.5">{result.risques.map((r: string, i: number) => <li key={i} className="text-sm text-gray-600 flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />{r}</li>)}</ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/marche-neuf", label: "Marché Neuf" },
  { href: "/defiscalisation", label: "Défiscalisation" },
  { href: "/simulateur", label: "Simulateur IA" },
  { href: "/acteurs", label: "Acteurs" },
];

const tickerItems = [
  { label: "Taux BCE", value: "2,65%" },
  { label: "Taux moyen crédit immo", value: "3,20%" },
  { label: "Indice notaires-INSEE", value: "▲ 1,8% / 12 mois", highlight: true },
  { label: "Mises en chantier 2025", value: "287 000 logements" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      {/* Market ticker */}
      <div className="bg-[#0d1117] text-white/60 text-xs border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 h-8 flex items-center gap-6 overflow-x-auto whitespace-nowrap">
          <span className="text-white/30 shrink-0">
            📅 Marché au {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
          </span>
          {tickerItems.map((t) => (
            <span key={t.label} className="shrink-0 flex items-center gap-1.5">
              <span className="text-white/30">{t.label}</span>
              <span className={t.highlight ? "text-emerald-400 font-semibold" : "text-white/80 font-semibold"}>{t.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-[#1E3A5F] rounded flex items-center justify-center">
              <span className="text-[#C9A84C] text-[10px] font-black leading-none">NC</span>
            </div>
            <span className="font-bold text-[#1E3A5F] text-[15px] tracking-tight">
              Nadlan<span className="text-[#C9A84C]">Connect</span>
              <span className="text-gray-300 font-light"> France</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}
                  className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors ${isActive ? "text-[#C9A84C] bg-amber-50" : "text-gray-500 hover:text-[#1E3A5F] hover:bg-gray-50"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-[11px] text-gray-300 hover:text-gray-500 transition-colors border-r border-gray-100 pr-4">
              <Globe className="w-3 h-3" /> nadlanconnect.com
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C] text-white text-[13px] font-semibold hover:bg-[#b8963e] transition-colors"
            >
              <FileUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Analyser un document</span>
              <span className="sm:hidden">Analyser</span>
            </button>
            <button className="md:hidden p-1.5 text-gray-400 hover:text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2 flex flex-col">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                className="px-3 py-3 text-sm text-gray-600 hover:text-[#1E3A5F] border-b border-gray-50 last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0d1117] text-white border-t border-white/5">
        <div className="container mx-auto px-4 py-14">
          <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-[#1E3A5F] rounded flex items-center justify-center">
                  <span className="text-[#C9A84C] text-xs font-black">NC</span>
                </div>
                <span className="font-bold">Nadlan<span className="text-[#C9A84C]">Connect</span> <span className="text-white/40 font-normal text-sm">France</span></span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Plateforme française d'investissement immobilier neuf. Simulateurs, défiscalisation et analyse IA pour investir intelligemment.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Navigation</h3>
              <ul className="space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-white/50 hover:text-[#C9A84C] transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">À propos</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                Extension française de NadlanConnect.com, référence internationale en accompagnement immobilier.
              </p>
              <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer"
                className="text-sm text-[#C9A84C] hover:underline">
                → Visiter NadlanConnect.com
              </a>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/25">
            <span>© {new Date().getFullYear()} NadlanConnect France. Tous droits réservés.</span>
            <span>Une extension de NadlanConnect.com</span>
          </div>
        </div>
      </footer>

      <PdfUploadModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
