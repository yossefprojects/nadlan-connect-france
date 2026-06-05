import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FileUp, Home, Calculator, Building, Landmark, Upload, CheckCircle2, ShieldAlert, FileText, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function PdfUploadModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Veuillez uploader un fichier PDF valide.");
      return;
    }
    
    setError(null);
    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/pdf/analyze`, {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error("Erreur lors de l'analyse du document.");
      }
      
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de l'analyse.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileUp className="w-5 h-5 text-primary" />
            Analyser mon document
          </DialogTitle>
          <DialogDescription>
            Importez votre contrat de réservation, VEFA ou brochure pour une analyse rapide par notre IA.
          </DialogDescription>
        </DialogHeader>

        {!isAnalyzing && !result && (
          <div 
            className={`mt-4 border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors ${
              isDragging ? "border-accent bg-accent/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Glissez-déposez votre PDF ici</h3>
            <p className="text-sm text-muted-foreground mb-6">ou cliquez pour parcourir vos fichiers</p>
            
            <input 
              type="file" 
              id="file-upload" 
              accept=".pdf" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Sélectionner un fichier
              </label>
            </Button>
            
            {error && (
              <div className="mt-4 text-sm text-destructive font-medium flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        )}

        {isAnalyzing && (
          <div className="mt-8 mb-8 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium">Analyse en cours...</h3>
            <p className="text-sm text-muted-foreground mt-2">Notre IA lit et extrait les informations clés de votre document.</p>
          </div>
        )}

        {result && !isAnalyzing && (
          <div className="mt-4 space-y-6">
            <div className="flex justify-between items-start">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">Analysé par IA</Badge>
              <Button variant="ghost" size="sm" onClick={() => setResult(null)}>Nouvelle analyse</Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {result.prix && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground font-medium">Prix détecté</p>
                  <p className="text-lg font-bold text-primary mt-1">{result.prix}</p>
                </div>
              )}
              {result.surface && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground font-medium">Surface</p>
                  <p className="text-lg font-bold text-primary mt-1">{result.surface}</p>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Résumé
              </h4>
              <p className="text-sm leading-relaxed">{result.resume}</p>
            </div>
            
            {result.clauses && result.clauses.length > 0 && (
              <div>
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Clauses importantes
                </h4>
                <ul className="space-y-2">
                  {result.clauses.map((clause: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="min-w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                      <span>{clause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {result.risques && result.risques.length > 0 && (
              <div>
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-destructive" /> Points de vigilance
                </h4>
                <ul className="space-y-2">
                  {result.risques.map((risque: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="min-w-1.5 h-1.5 rounded-full bg-destructive mt-1.5"></span>
                      <span>{risque}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/marche-neuf", label: "Marché Neuf", icon: Building },
    { href: "/defiscalisation", label: "Défiscalisation", icon: Landmark },
    { href: "/simulateur", label: "Simulateur", icon: Calculator },
    { href: "/acteurs", label: "Acteurs", icon: FileText },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
              <span className="text-accent">NadlanConnect</span> France 🇫🇷
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-xs text-muted-foreground italic mr-2 border-r pr-4">
              Extension de NadlanConnect.com
            </div>
            <Button 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setModalOpen(true)}
            >
              <FileUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Analyser un document</span>
              <span className="sm:hidden">Analyser</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full bg-slate-50/50">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground py-12 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-bold text-xl tracking-tight mb-2">
              <span className="text-accent">NadlanConnect</span> France
            </div>
            <p className="text-primary-foreground/70 text-sm">
              L'expertise immobilière neuve, pour des investissements optimisés.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-accent mb-1">
              NadlanConnect France — Une extension de NadlanConnect.com
            </p>
            <p className="text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      <PdfUploadModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
