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
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-[#1E3A5F] rounded-2xl flex items-center justify-center mb-8">
        <span className="text-[#C9A84C] text-xl font-black leading-none">NC</span>
      </div>

      <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-4">{t.eyebrow}</p>
      <h1 className="text-5xl md:text-7xl font-black text-white mb-4">{t.title}</h1>
      <p className="text-white/40 text-lg max-w-md mb-10 leading-relaxed">
        {t.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A84C] text-white font-bold hover:bg-[#b8963e] transition-colors">
          <Home className="w-4 h-4" /> {t.backHome}
        </Link>
        <button onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/70 font-semibold hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t.previous}
        </button>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6 md:gap-12 text-center opacity-40">
        {t.links.map((l) => (
          <Link key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
