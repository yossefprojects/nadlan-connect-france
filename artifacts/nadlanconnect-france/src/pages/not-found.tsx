import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";

const content = {
  fr: {
    eyebrow: "Erreur 404",
    title: "Page introuvable",
    description:
      "La page que vous recherchez n'existe pas ou a été déplacée. Revenez à l'accueil pour explorer la plateforme.",
    backHome: "Retour à l'accueil",
    previous: "Page précédente",
    links: [
      { href: "/simulateur", label: "Simulateur IA" },
      { href: "/defiscalisation", label: "Défiscalisation" },
      { href: "/marche-neuf", label: "Marché Neuf" },
    ],
  },
  en: {
    eyebrow: "Error 404",
    title: "Page not found",
    description:
      "The page you're looking for doesn't exist or has been moved. Head back home to explore the platform.",
    backHome: "Back to home",
    previous: "Previous page",
    links: [
      { href: "/simulateur", label: "AI Simulator" },
      { href: "/defiscalisation", label: "Tax Optimization" },
      { href: "/marche-neuf", label: "New-Build Market" },
    ],
  },
} as const;

export default function NotFound() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center mb-8">
        <span className="text-sea-bright text-xl font-black leading-none">NC</span>
      </div>

      <p className="text-sea text-sm font-semibold uppercase tracking-widest mb-4">{t.eyebrow}</p>
      <h1 className="text-4xl md:text-7xl font-black text-foreground mb-4">{t.title}</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed">
        {t.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-sea text-white font-bold hover:opacity-90 transition-colors">
          <Home className="w-4 h-4" /> {t.backHome}
        </Link>
        <button onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border text-foreground/70 font-semibold hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t.previous}
        </button>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6 md:gap-12 text-center opacity-40">
        {t.links.map((l) => (
          <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
