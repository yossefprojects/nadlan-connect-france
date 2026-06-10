import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  FileUp, Upload, CheckCircle2, ShieldAlert, FileText, Loader2, Globe, X, Menu,
  ChevronDown, Building2, Handshake, ArrowUp, Phone, MapPin, Mail
} from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

const modalContent = {
  fr: {
    invalidFile: "Veuillez uploader un fichier PDF valide.",
    analyzeError: "Erreur lors de l'analyse. Veuillez réessayer.",
    genericError: "Une erreur est survenue lors de l'analyse.",
    title: "Analyser mon document",
    subtitle: "Contrat VEFA, bail ou brochure promoteur",
    close: "Fermer",
    dropHere: "Glissez-déposez votre PDF ici",
    orBrowse: "ou cliquez pour parcourir",
    selectFile: "Sélectionner un fichier",
    analyzing: "Analyse IA en cours...",
    analyzingSub: "Notre IA lit et extrait les informations clés.",
    analyzedByAi: "Analysé par IA",
    newAnalysis: "Nouvelle analyse",
    priceDetected: "Prix détecté",
    surface: "Surface",
    summary: "Résumé",
    clauses: "Clauses importantes",
    risks: "Points de vigilance",
  },
  en: {
    invalidFile: "Please upload a valid PDF file.",
    analyzeError: "Analysis failed. Please try again.",
    genericError: "An error occurred during analysis.",
    title: "Analyze my document",
    subtitle: "VEFA contract, lease or developer brochure",
    close: "Close",
    dropHere: "Drag and drop your PDF here",
    orBrowse: "or click to browse",
    selectFile: "Select a file",
    analyzing: "AI analysis in progress...",
    analyzingSub: "Our AI reads and extracts the key information.",
    analyzedByAi: "Analyzed by AI",
    newAnalysis: "New analysis",
    priceDetected: "Detected price",
    surface: "Surface area",
    summary: "Summary",
    clauses: "Key clauses",
    risks: "Points of caution",
  },
} as const;

export function PdfUploadModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { lang } = useLang();
  const t = modalContent[lang];
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf") { setError(t.invalidFile); return; }
    setError(null); setIsAnalyzing(true); setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lang", lang);
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/pdf/analyze`, { method: "POST", body: formData });
      if (!res.ok) throw new Error(t.analyzeError);
      setResult(await res.json());
    } catch (err: any) {
      setError(err.message || t.genericError);
    } finally { setIsAnalyzing(false); }
  };

  const handleDrop = async (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) await processFile(e.dataTransfer.files[0]); };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) await processFile(e.target.files[0]); };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={t.title}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="bg-[#1E3A5F] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileUp className="w-5 h-5 text-[#C9A84C]" />
            <div>
              <h2 className="text-white font-bold">{t.title}</h2>
              <p className="text-white/50 text-xs">{t.subtitle}</p>
            </div>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-white/50 hover:text-white transition-colors p-1" aria-label={t.close}>
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
              <p className="font-semibold text-[#1E3A5F] mb-1">{t.dropHere}</p>
              <p className="text-sm text-gray-400 mb-5">{t.orBrowse}</p>
              <input type="file" id="file-upload" accept=".pdf" className="hidden" onChange={handleFileChange} aria-label={t.selectFile} />
              <label htmlFor="file-upload" className="px-6 py-2.5 rounded-full bg-[#1E3A5F] text-white text-sm font-semibold cursor-pointer hover:bg-[#152d4a] transition-colors min-h-[44px] flex items-center">
                {t.selectFile}
              </label>
              {error && <p className="mt-4 text-sm text-red-500 flex items-center gap-1.5"><ShieldAlert className="w-4 h-4" />{error}</p>}
            </div>
          )}
          {isAnalyzing && (
            <div className="py-12 flex flex-col items-center text-center">
              <Loader2 className="w-12 h-12 text-[#1E3A5F] animate-spin mb-4" />
              <p className="font-semibold text-[#1E3A5F]">{t.analyzing}</p>
              <p className="text-sm text-gray-400 mt-1">{t.analyzingSub}</p>
            </div>
          )}
          {result && !isAnalyzing && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#b8963e] text-xs font-semibold border border-[#C9A84C]/30">{t.analyzedByAi}</span>
                <button onClick={() => setResult(null)} className="ml-auto text-xs text-gray-400 hover:text-gray-600">{t.newAnalysis}</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {result.prix && <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 mb-1">{t.priceDetected}</p><p className="font-bold text-[#1E3A5F]">{result.prix}</p></div>}
                {result.surface && <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 mb-1">{t.surface}</p><p className="font-bold text-[#1E3A5F]">{result.surface}</p></div>}
              </div>
              {result.resume && <div className="bg-gray-50 rounded-xl p-4"><p className="text-xs font-semibold text-[#1E3A5F] flex items-center gap-1.5 mb-2"><FileText className="w-3.5 h-3.5" />{t.summary}</p><p className="text-sm text-gray-600 leading-relaxed">{result.resume}</p></div>}
              {result.clauses?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-green-700 flex items-center gap-1.5 mb-2"><CheckCircle2 className="w-3.5 h-3.5" />{t.clauses}</p>
                  <ul className="space-y-1.5">{result.clauses.map((c: string, i: number) => <li key={i} className="text-sm text-gray-600 flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />{c}</li>)}</ul>
                </div>
              )}
              {result.risques?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-red-600 flex items-center gap-1.5 mb-2"><ShieldAlert className="w-3.5 h-3.5" />{t.risks}</p>
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

const navConfig = [
  { href: "/", key: "home" as const },
  { href: "/marche-neuf", key: "marche" as const },
  { href: "/defiscalisation", key: "defisc" as const },
  { href: "/simulateur", key: "simu" as const },
  { href: "/acteurs", key: "acteurs" as const },
];

const proConfig = [
  { href: "/promoteurs", key: "promoteurs" as const, icon: Building2 },
  { href: "/agences", key: "agences" as const, icon: Handshake },
];

const uiContent = {
  fr: {
    skip: "Aller au contenu principal",
    nav: { home: "Accueil", marche: "Marché Neuf", defisc: "Défiscalisation", simu: "Simulateur IA", acteurs: "Acteurs" },
    logoAria: "NadlanConnect France — Accueil",
    navAria: "Navigation principale",
    pros: "Professionnels",
    pro: {
      promoteurs: { label: "Promoteurs", desc: "Diffusez vos programmes neuf" },
      agences: { label: "Agences immobilières", desc: "Accédez aux programmes partenaires" },
    },
    ticker: {
      bce: { label: "Taux BCE", value: "2,65%" },
      credit: { label: "Taux moyen crédit immo", value: "3,20%" },
      notaires: { label: "Indice notaires-INSEE", value: "▲ 1,8% / 12 mois" },
      chantier: { label: "Mises en chantier 2025", value: "287 000 logements" },
    },
    analysePdf: "Analyser un PDF",
    analysePdfAria: "Analyser un document PDF",
    simuCta: "Simulateur IA",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    langAria: "Changer de langue",
    footer: {
      tagline: "Plateforme française d'investissement immobilier neuf. Simulateurs, défiscalisation et analyse IA.",
      contactVia: "Contact via NadlanConnect.com",
      particuliers: "Particuliers",
      pros: "Professionnels",
      about: "À propos",
      aboutText: "Extension française de NadlanConnect.com, référence internationale en accompagnement immobilier.",
      visit: "→ Visiter NadlanConnect.com",
      legal: "Légal",
      privacy: "Politique de confidentialité",
      mentions: "Mentions légales",
      manageCookies: "Gérer les cookies",
      rights: "Tous droits réservés.",
      disclaimer: "Simulateurs fournis à titre indicatif — pas de conseil financier ou fiscal.",
      follow: (n: string) => `Suivre NadlanConnect France sur ${n}`,
    },
    whatsappAria: "Nous contacter sur WhatsApp",
    whatsappMsg: "Bonjour, je souhaite des informations sur l'immobilier neuf en France.",
    backToTop: "Retour en haut de page",
    cookie: {
      region: "Consentement cookies",
      text: "Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. Consultez notre",
      privacyLink: "politique de confidentialité",
      refuse: "Refuser",
      accept: "Accepter",
    },
    popup: {
      aria: "Inscription aux alertes immobilières",
      close: "Fermer",
      title: "Recevez nos opportunités en avant-première",
      subtitle: "Programmes neufs, défiscalisation, guides exclusifs",
      label: "Votre adresse email",
      placeholder: "prenom@email.com",
      submit: "Recevoir les alertes →",
      consentBefore: "Sans spam, désinscription en 1 clic. Voir notre",
      consentLink: "politique de confidentialité",
      successTitle: "Inscription confirmée !",
      successText: "Vous recevrez nos prochaines opportunités.",
    },
    dateLocale: "fr-FR",
  },
  en: {
    skip: "Skip to main content",
    nav: { home: "Home", marche: "New-Build Market", defisc: "Tax Optimization", simu: "AI Simulator", acteurs: "Key Players" },
    logoAria: "NadlanConnect France — Home",
    navAria: "Main navigation",
    pros: "Professionals",
    pro: {
      promoteurs: { label: "Developers", desc: "Showcase your new-build projects" },
      agences: { label: "Real-estate agencies", desc: "Access partner projects" },
    },
    ticker: {
      bce: { label: "ECB rate", value: "2.65%" },
      credit: { label: "Avg. mortgage rate", value: "3.20%" },
      notaires: { label: "Notaire-INSEE index", value: "▲ 1.8% / 12 months" },
      chantier: { label: "Housing starts 2025", value: "287,000 homes" },
    },
    analysePdf: "Analyze a PDF",
    analysePdfAria: "Analyze a PDF document",
    simuCta: "AI Simulator",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langAria: "Change language",
    footer: {
      tagline: "French new-build property investment platform. Simulators, tax optimization and AI analysis.",
      contactVia: "Contact via NadlanConnect.com",
      particuliers: "Individuals",
      pros: "Professionals",
      about: "About",
      aboutText: "The French extension of NadlanConnect.com, an international reference in real-estate guidance.",
      visit: "→ Visit NadlanConnect.com",
      legal: "Legal",
      privacy: "Privacy policy",
      mentions: "Legal notice",
      manageCookies: "Manage cookies",
      rights: "All rights reserved.",
      disclaimer: "Simulators provided for guidance only — not financial or tax advice.",
      follow: (n: string) => `Follow NadlanConnect France on ${n}`,
    },
    whatsappAria: "Contact us on WhatsApp",
    whatsappMsg: "Hello, I would like information about new-build property in France.",
    backToTop: "Back to top",
    cookie: {
      region: "Cookie consent",
      text: "We use cookies to improve your experience and analyze our traffic. See our",
      privacyLink: "privacy policy",
      refuse: "Decline",
      accept: "Accept",
    },
    popup: {
      aria: "Real-estate alerts sign-up",
      close: "Close",
      title: "Get our opportunities first",
      subtitle: "New-build projects, tax schemes, exclusive guides",
      label: "Your email address",
      placeholder: "firstname@email.com",
      submit: "Get the alerts →",
      consentBefore: "No spam, unsubscribe in 1 click. See our",
      consentLink: "privacy policy",
      successTitle: "Sign-up confirmed!",
      successText: "You'll receive our next opportunities.",
    },
    dateLocale: "en-GB",
  },
} as const;

function LangToggle({ lang, setLang, ariaLabel }: { lang: Lang; setLang: (l: Lang) => void; ariaLabel: string }) {
  return (
    <div className="flex items-center rounded-full border border-gray-200 overflow-hidden text-[11px] font-bold" role="group" aria-label={ariaLabel}>
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-[5px] transition-colors duration-150 ${
            lang === l ? "bg-[#1E3A5F] text-white" : "text-gray-400 hover:text-[#1E3A5F]"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { lang, setLang } = useLang();
  const t = uiContent[lang];
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [proDropdown, setProDropdown] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cookieConsented, setCookieConsented] = useState<boolean | null>(null);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailCapture, setEmailCapture] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isProActive = proConfig.some((i) => i.href === location);

  const tickerItems = [
    { ...t.ticker.bce },
    { ...t.ticker.credit },
    { ...t.ticker.notaires, highlight: true },
    { ...t.ticker.chantier },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("nc-cookie-consent");
    if (stored !== null) setCookieConsented(stored === "true");
  }, []);

  useEffect(() => {
    const popupShown = localStorage.getItem("nc-popup-shown");
    if (popupShown) return;
    const timer = setTimeout(() => setShowEmailPopup(true), 30000);
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5 && !localStorage.getItem("nc-popup-shown")) setShowEmailPopup(true);
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => { clearTimeout(timer); document.removeEventListener("mouseleave", onMouseLeave); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setProDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCookieAccept = () => { localStorage.setItem("nc-cookie-consent", "true"); setCookieConsented(true); };
  const handleCookieRefuse = () => { localStorage.setItem("nc-cookie-consent", "false"); setCookieConsented(false); };
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    localStorage.setItem("nc-popup-shown", "true");
    setTimeout(() => setShowEmailPopup(false), 3000);
  };
  const closeEmailPopup = () => { setShowEmailPopup(false); localStorage.setItem("nc-popup-shown", "true"); };

  const scrollProgress = Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 100, 100);

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      {/* Skip to main content (accessibility) */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#C9A84C] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        {t.skip}
      </a>

      {/* Ticker — marquee en boucle infinie */}
      <div className="bg-[#0d1117] text-white/60 text-xs border-b border-white/5 overflow-hidden h-8 flex items-center">
        <div className="flex animate-[ticker_28s_linear_infinite] whitespace-nowrap will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-0 shrink-0" aria-hidden={copy === 1}>
              <span className="text-white/30 px-6 shrink-0">
                📅 {new Date().toLocaleDateString(t.dateLocale, { day: "2-digit", month: "2-digit", year: "numeric" })}
              </span>
              {tickerItems.map((item) => (
                <span key={item.label} className="shrink-0 flex items-center gap-1.5 px-6 border-l border-white/5">
                  <span className="text-white/30">{item.label}</span>
                  <span className={"highlight" in item && item.highlight ? "text-emerald-400 font-semibold" : "text-white/80 font-semibold"}>{item.value}</span>
                </span>
              ))}
              <span className="px-6 shrink-0 text-white/10">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header — calqué sur NadlanConnect.com */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[#C9A84C] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-6 h-[52px] flex items-center justify-between gap-8">

          {/* Logo — identique NC.com */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={t.logoAria}>
            {/* Logo NadlanConnect France */}
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-7 h-7 rounded-[6px]" />
            {/* Wordmark */}
            <span className="text-[15px] font-bold tracking-tight">
              <span className="text-[#1E3A5F]">Nadlan</span><span className="text-[#C9A84C]">Connect</span>
            </span>
            {/* Badge France */}
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-widest uppercase bg-[#1E3A5F]/8 text-[#1E3A5F]/50 border border-[#1E3A5F]/10">
              France
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0" aria-label={t.navAria}>
            {navConfig.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}
                  className={`relative px-3 py-[6px] text-[13px] transition-colors duration-150 ${
                    isActive ? "text-[#1E3A5F] font-semibold" : "text-gray-500 hover:text-[#1E3A5F]"
                  }`}>
                  {t.nav[item.key]}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#C9A84C] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Professionnels dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProDropdown(!proDropdown)}
                aria-haspopup="true"
                aria-expanded={proDropdown}
                className={`relative flex items-center gap-1 px-3 py-[6px] text-[13px] transition-colors duration-150 min-h-[44px] ${
                  isProActive ? "text-[#1E3A5F] font-semibold" : "text-gray-500 hover:text-[#1E3A5F]"
                }`}>
                {t.pros}
                <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-200 ${proDropdown ? "rotate-180" : ""}`} />
                {isProActive && <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#C9A84C] rounded-full" />}
              </button>

              {proDropdown && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {proConfig.map((item) => (
                    <Link key={item.href} href={item.href}
                      onClick={() => setProDropdown(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-[#1E3A5F]/8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-[#1E3A5F]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1E3A5F] text-sm">{t.pro[item.key].label}</p>
                        <p className="text-xs text-gray-400">{t.pro[item.key].desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right — style boutons NC.com */}
          <div className="flex items-center gap-2">
            {/* Sélecteur de langue */}
            <div className="hidden sm:block">
              <LangToggle lang={lang} setLang={setLang} ariaLabel={t.langAria} />
            </div>
            <button onClick={() => setModalOpen(true)}
              aria-label={t.analysePdfAria}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-600 text-[13px] font-medium hover:border-gray-300 hover:text-[#1E3A5F] transition-all duration-150 whitespace-nowrap">
              <FileUp className="w-3.5 h-3.5 shrink-0" />
              {t.analysePdf}
            </button>
            {/* CTA principal — fond ambre + texte sombre, comme "Sign in" sur NC.com */}
            <Link href="/simulateur"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C9A84C] text-[#1a1a1a] text-[13px] font-semibold hover:bg-[#d4b05a] transition-all duration-150 whitespace-nowrap border border-[#b8963e]/30">
              {t.simuCta}
            </Link>
            <button className="md:hidden p-2 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
              aria-expanded={mobileOpen}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2 flex flex-col animate-in slide-in-from-top-2 duration-200">
            {navConfig.map((item) => (
              <Link key={item.href} href={item.href}
                className="px-3 py-3.5 text-sm text-gray-600 hover:text-[#1E3A5F] border-b border-gray-50 transition-colors min-h-[44px] flex items-center"
                onClick={() => setMobileOpen(false)}>
                {t.nav[item.key]}
              </Link>
            ))}
            {proConfig.map((item) => (
              <Link key={item.href} href={item.href}
                className="px-3 py-3.5 text-sm text-gray-600 hover:text-[#1E3A5F] border-b border-gray-50 transition-colors min-h-[44px] flex items-center"
                onClick={() => setMobileOpen(false)}>
                {t.pro[item.key].label}
              </Link>
            ))}
            <div className="px-3 py-3.5 flex items-center gap-3">
              <Globe className="w-4 h-4 text-gray-400" aria-hidden="true" />
              <LangToggle lang={lang} setLang={setLang} ariaLabel={t.langAria} />
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0d1117] text-white border-t border-white/5">
        <div className="container mx-auto px-4 py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pb-10 border-b border-white/8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-8 h-8 rounded" />
                <span className="font-bold">Nadlan<span className="text-[#C9A84C]">Connect</span> <span className="text-white/40 font-normal text-sm">France</span></span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                {t.footer.tagline}
              </p>
              <div className="space-y-2 text-xs text-white/35">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 shrink-0" />
                  <span>+33 1 00 00 00 00</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 shrink-0" />
                  <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">
                    {t.footer.contactVia}
                  </a>
                </div>
              </div>
              {/* Social links */}
              <div className="flex items-center gap-3 mt-5">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
                  { label: "Instagram", href: "https://instagram.com", icon: "ig" },
                  { label: "Facebook", href: "https://facebook.com", icon: "f" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={t.footer.follow(s.label)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 hover:text-white transition-all duration-200">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{t.footer.particuliers}</h3>
              <ul className="space-y-2.5">
                {navConfig.slice(1).map((item) => (
                  <li key={item.href}><Link href={item.href} className="text-sm text-white/50 hover:text-[#C9A84C] transition-colors">{t.nav[item.key]}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{t.footer.pros}</h3>
              <ul className="space-y-2.5">
                {proConfig.map((item) => (
                  <li key={item.href}><Link href={item.href} className="text-sm text-white/50 hover:text-[#C9A84C] transition-colors">{t.pro[item.key].label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{t.footer.about}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">{t.footer.aboutText}</p>
              <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#C9A84C] hover:underline">
                {t.footer.visit}
              </a>
              <div className="mt-6 space-y-2">
                <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest">{t.footer.legal}</h4>
                <ul className="space-y-1.5">
                  <li><Link href="/politique-confidentialite" className="text-xs text-white/35 hover:text-white/60 transition-colors">{t.footer.privacy}</Link></li>
                  <li><Link href="/mentions-legales" className="text-xs text-white/35 hover:text-white/60 transition-colors">{t.footer.mentions}</Link></li>
                  <li>
                    <button
                      onClick={() => { localStorage.removeItem("nc-cookie-consent"); setCookieConsented(null); }}
                      className="text-xs text-white/35 hover:text-white/60 transition-colors text-left">
                      {t.footer.manageCookies}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/25">
            <span>© {new Date().getFullYear()} NadlanConnect France. {t.footer.rights}</span>
            <span className="text-white/15">{t.footer.disclaimer}</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/33100000000?text=${encodeURIComponent(t.whatsappMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsappAria}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#1da851] rounded-full flex items-center justify-center shadow-xl shadow-green-900/30 transition-all duration-300 hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.backToTop}
          className="fixed bottom-24 right-6 z-40 w-11 h-11 bg-[#1E3A5F] hover:bg-[#152d4a] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-2"
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </button>
      )}

      {/* Cookie banner */}
      {cookieConsented === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1117] border-t border-white/10 px-4 py-4 animate-in slide-in-from-bottom-2" role="region" aria-label={t.cookie.region}>
          <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="text-sm text-white/60 flex-1 leading-relaxed">
              🍪 {t.cookie.text}{" "}
              <Link href="/politique-confidentialite" className="text-[#C9A84C] hover:underline">{t.cookie.privacyLink}</Link>.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={handleCookieRefuse}
                className="px-4 py-2 rounded-full border border-white/15 text-white/50 text-sm hover:bg-white/5 transition-colors min-h-[40px]">
                {t.cookie.refuse}
              </button>
              <button onClick={handleCookieAccept}
                className="px-4 py-2 rounded-full bg-[#C9A84C] text-white text-sm font-semibold hover:bg-[#b8963e] transition-colors min-h-[40px]">
                {t.cookie.accept}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email capture popup */}
      {showEmailPopup && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={t.popup.aria}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeEmailPopup} />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
            <button onClick={closeEmailPopup} className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 p-1" aria-label={t.popup.close}>
              <X className="w-4 h-4" />
            </button>
            <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0d1117] p-6 pb-4">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-lg font-black text-white leading-snug">{t.popup.title}</h3>
              <p className="text-white/50 text-xs mt-1">{t.popup.subtitle}</p>
            </div>
            <div className="p-5">
              {!emailSent ? (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="popup-email" className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">{t.popup.label}</label>
                    <input
                      id="popup-email"
                      type="email"
                      required
                      value={emailCapture}
                      onChange={(e) => setEmailCapture(e.target.value)}
                      placeholder={t.popup.placeholder}
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    />
                  </div>
                  <button type="submit"
                    className="w-full py-3 rounded-xl bg-[#C9A84C] text-white font-bold text-sm hover:bg-[#b8963e] transition-colors">
                    {t.popup.submit}
                  </button>
                  <p className="text-[10px] text-gray-300 text-center">
                    {t.popup.consentBefore}{" "}
                    <Link href="/politique-confidentialite" className="text-[#C9A84C]" onClick={closeEmailPopup}>{t.popup.consentLink}</Link>.
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <p className="font-bold text-[#1E3A5F]">{t.popup.successTitle}</p>
                  <p className="text-sm text-gray-400 mt-1">{t.popup.successText}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <PdfUploadModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
