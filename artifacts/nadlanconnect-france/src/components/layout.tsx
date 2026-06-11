import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  FileUp, Upload, CheckCircle2, ShieldAlert, FileText, Loader2, Globe, X, Menu,
  ChevronDown, Building2, Handshake, ArrowUp, MapPin, Mail, TrendingUp,
  Linkedin, Instagram, Calculator, ArrowUpRight
} from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { FranceFlag } from "./france-flag";

/* ─── PDF Modal content ─── */
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
        <div className="bg-[#0A1628] px-6 py-4 flex items-center justify-between">
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
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center text-center transition-colors ${isDragging ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-gray-200 hover:border-[#1A3A5C]/40 hover:bg-gray-50"}`}
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            >
              <div className="w-16 h-16 rounded-full bg-[#1A3A5C]/8 flex items-center justify-center mb-4">
                <Upload className="w-7 h-7 text-[#1A3A5C]" />
              </div>
              <p className="font-semibold text-[#1A3A5C] mb-1">{t.dropHere}</p>
              <p className="text-sm text-gray-400 mb-5">{t.orBrowse}</p>
              <input type="file" id="file-upload" accept=".pdf" className="hidden" onChange={handleFileChange} aria-label={t.selectFile} />
              <label htmlFor="file-upload" className="px-6 py-2.5 rounded-full bg-[#C9A84C] hover:bg-[#E8C96A] text-[#0A1628] text-sm font-semibold cursor-pointer transition-colors min-h-[44px] flex items-center">
                {t.selectFile}
              </label>
              {error && <p className="mt-4 text-sm text-red-500 flex items-center gap-1.5"><ShieldAlert className="w-4 h-4" />{error}</p>}
            </div>
          )}
          {isAnalyzing && (
            <div className="py-12 flex flex-col items-center text-center">
              <Loader2 className="w-12 h-12 text-[#C9A84C] animate-spin mb-4" />
              <p className="font-semibold text-[#1A3A5C]">{t.analyzing}</p>
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
                {result.prix && <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 mb-1">{t.priceDetected}</p><p className="font-bold text-[#1A3A5C]">{result.prix}</p></div>}
                {result.surface && <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 mb-1">{t.surface}</p><p className="font-bold text-[#1A3A5C]">{result.surface}</p></div>}
              </div>
              {result.resume && <div className="bg-gray-50 rounded-xl p-4"><p className="text-xs font-semibold text-[#1A3A5C] flex items-center gap-1.5 mb-2"><FileText className="w-3.5 h-3.5" />{t.summary}</p><p className="text-sm text-gray-600 leading-relaxed">{result.resume}</p></div>}
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

/* ─── Nav & UI content ─── */
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
    market: {
      asOf: "Au",
      bce: { label: "Taux BCE", value: "2,65%" },
      credit: { label: "Taux moyen crédit", value: "3,20%" },
      notaires: { label: "Indice notaires-INSEE", value: "▲ 1,8% / 12 mois" },
    },
    analysePdf: "Analyser un PDF",
    analysePdfAria: "Analyser un document PDF",
    simuCta: "Simulateur IA",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    changeLang: "Changer de langue",
    footer: {
      tagline: "Plateforme française d'investissement immobilier neuf. Simulateurs, défiscalisation et analyse IA.",
      quickLinks: "Liens rapides",
      contact: "Contact",
      location: "Paris, France",
      aiSimulator: "Simulateur IA",
      cgu: "CGU",
      cgv: "CGV",
      disclaimer: "Simulateurs fournis à titre indicatif.",
      privacy: "Politique de confidentialité",
      mentions: "Mentions légales",
      manageCookies: "Gérer les cookies",
    },
    cookie: {
      region: "Consentement cookies",
      text: "Nous utilisons des cookies pour améliorer votre expérience. Consultez notre",
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
    market: {
      asOf: "As of",
      bce: { label: "ECB rate", value: "2.65%" },
      credit: { label: "Avg. mortgage rate", value: "3.20%" },
      notaires: { label: "Notaire-INSEE index", value: "▲ 1.8% / 12 months" },
    },
    analysePdf: "Analyze a PDF",
    analysePdfAria: "Analyze a PDF document",
    simuCta: "AI Simulator",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    changeLang: "Change language",
    footer: {
      tagline: "French new-build property investment platform. Simulators, tax optimization and AI analysis.",
      quickLinks: "Quick links",
      contact: "Contact",
      location: "Paris, France",
      aiSimulator: "AI Simulator",
      cgu: "Terms",
      cgv: "Sales terms",
      disclaimer: "Simulators provided for guidance only.",
      privacy: "Privacy policy",
      mentions: "Legal notice",
      manageCookies: "Manage cookies",
    },
    cookie: {
      region: "Cookie consent",
      text: "We use cookies to improve your experience. See our",
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

/* ─── Market Bar (matches ISR design) ─── */
function MarketBar() {
  const { lang } = useLang();
  const t = uiContent[lang];
  const locale = lang === "en" ? "en-GB" : "fr-FR";

  const marketData = [
    { label: t.market.bce.label, value: t.market.bce.value, trend: null },
    { label: t.market.credit.label, value: t.market.credit.value, trend: null },
    { label: t.market.notaires.label, value: t.market.notaires.value, trend: null },
  ];

  const dateStr = new Date().toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="w-full overflow-hidden bg-[#0A1628] text-xs">
      <div className="ticker-track">
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            className="flex h-8 shrink-0 items-center gap-5 px-2.5"
            aria-hidden={copy !== 0}
          >
            <span className="flex items-center gap-1.5 text-[#9CABBF]">
              <TrendingUp className="h-3 w-3" />
              <span className="text-[#85B7EB]">
                {t.market.asOf} {dateStr}
              </span>
            </span>
            {marketData.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 text-[#9CABBF]">
                <span>{item.label}</span>
                <span className="font-semibold text-[#C9A84C]">{item.value}</span>
                {item.trend && <span className="font-medium text-[#0F6E56]">{item.trend}</span>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Layout ─── */
export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { lang, setLang } = useLang();
  const t = uiContent[lang];
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [proDropdown, setProDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cookieConsented, setCookieConsented] = useState<boolean | null>(null);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailCapture, setEmailCapture] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = location === "/";
  const isProActive = proConfig.some((i) => i.href === location);

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
      setScrolled(window.scrollY > 40);
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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#C9A84C] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        {t.skip}
      </a>

      {/* Sticky top: MarketBar + Navbar (ISR style) */}
      <div className={`${isHome ? "fixed" : "sticky"} top-0 left-0 right-0 z-50`}>
        <MarketBar />

        {/* Navbar — dark glassmorphism like ISR */}
        <header
          className={`w-full transition-colors duration-300 ${
            scrolled
              ? "bg-[#0A1628]/80 backdrop-blur-md border-b border-white/10 shadow-sm"
              : isHome
                ? "bg-transparent border-b border-transparent"
                : "bg-[#0A1628] border-b border-white/10"
          }`}
        >
          <div className="container flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center space-x-2.5 group shrink-0" aria-label={t.logoAria}>
                <div className="h-8 w-8 rounded overflow-hidden relative">
                  <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NadlanConnect" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <span className="relative inline-block font-serif text-xl tracking-tight text-white transition-opacity group-hover:opacity-90">
                  Nadlan<span className="text-[#C9A84C]">Connect</span>
                  <FranceFlag className="absolute -bottom-1 -right-5 h-[15px] w-[22px] rounded-[2px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.35)] ring-1 ring-black/10" />
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden lg:flex gap-5" aria-label={t.navAria}>
                {navConfig.filter((item) => item.key !== "simu").map((item) => {
                  const isActive = location === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative text-[13px] font-medium whitespace-nowrap transition-colors hover:text-white px-1 py-2 ${
                        isActive ? "text-white" : (scrolled || !isHome ? "text-white/70" : "text-white/80")
                      }`}
                    >
                      {t.nav[item.key]}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />
                      )}
                    </Link>
                  );
                })}

                {/* Professionals dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProDropdown(!proDropdown)}
                    aria-haspopup="true"
                    aria-expanded={proDropdown}
                    className={`relative flex items-center gap-1 text-[13px] font-medium whitespace-nowrap transition-colors hover:text-white px-1 py-2 ${
                      isProActive ? "text-white" : (scrolled || !isHome ? "text-white/70" : "text-white/80")
                    }`}
                  >
                    {t.pros}
                    <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-200 ${proDropdown ? "rotate-180" : ""}`} />
                    {isProActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />}
                  </button>

                  {proDropdown && (
                    <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#0A1628] rounded-2xl shadow-2xl border border-white/10 py-2 z-50">
                      {proConfig.map((item) => (
                        <Link key={item.href} href={item.href}
                          onClick={() => setProDropdown(false)}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                            <item.icon className="w-4 h-4 text-[#C9A84C]" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{t.pro[item.key].label}</p>
                            <p className="text-xs text-white/40">{t.pro[item.key].desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Language toggle */}
              <div className="flex items-center rounded-full border border-white/20 overflow-hidden text-[11px] font-bold">
                {(["fr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`px-2.5 py-[5px] transition-colors duration-150 ${
                      lang === l ? "bg-[#C9A84C] text-[#0A1628]" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* PDF analyzer */}
              <button onClick={() => setModalOpen(true)}
                aria-label={t.analysePdfAria}
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 text-white/70 text-[13px] font-medium hover:border-white/40 hover:text-white transition-all duration-150 whitespace-nowrap">
                <FileUp className="w-3.5 h-3.5 shrink-0" />
                {t.analysePdf}
              </button>

              {/* CTA */}
              <Link href="/simulateur"
                className="hidden sm:flex items-center gap-1.5 h-9 px-5 rounded-full bg-[#C9A84C] hover:bg-[#E8C96A] text-[#0A1628] font-bold text-[13px] whitespace-nowrap shrink-0 shadow-[0_4px_14px_rgba(201,168,76,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.4)] border-0">
                {t.simuCta}
              </Link>

              {/* Mobile menu toggle */}
              <button className="lg:hidden text-white/80 hover:text-white hover:bg-white/10 rounded-full h-9 w-9 flex items-center justify-center shrink-0"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? t.closeMenu : t.openMenu}
                aria-expanded={mobileOpen}>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-white/10 bg-[#0A1628]/95 backdrop-blur-xl px-6 py-8 flex flex-col gap-6">
              {navConfig.map((item) => (
                <Link key={item.href} href={item.href}
                  className={`text-lg font-medium transition-colors ${
                    location === item.href ? "text-[#C9A84C]" : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setMobileOpen(false)}>
                  {t.nav[item.key]}
                </Link>
              ))}
              {proConfig.map((item) => (
                <Link key={item.href} href={item.href}
                  className={`text-lg font-medium transition-colors ${
                    location === item.href ? "text-[#C9A84C]" : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setMobileOpen(false)}>
                  {t.pro[item.key].label}
                </Link>
              ))}
            </div>
          )}
        </header>
      </div>

      <main id="main-content" className="flex-1 w-full relative">{children}</main>

      {/* Floating simulator button */}
      <Link
        href="/simulateur"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#0F2235] shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-[#d8b95e]"
      >
        <Calculator className="h-5 w-5" />
        <span>{t.simuCta}</span>
      </Link>

      {/* Footer — ISR style */}
      <footer className="bg-[#0A1628] text-white/60">
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent md:mx-12" />
        <div className="container grid max-w-6xl grid-cols-1 gap-12 py-14 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NadlanConnect" className="h-8 w-8 rounded-lg" />
              <span className="relative inline-block font-serif text-xl text-white">
                Nadlan<span className="text-[#C9A84C]">Connect</span>
                <FranceFlag className="absolute -bottom-1 -right-5 h-[15px] w-[22px] rounded-[2px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.35)] ring-1 ring-black/10" />
              </span>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/40">
              {t.footer.tagline}
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Mail, label: "Email", href: "mailto:contact@nadlanconnect.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C9A84C]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navConfig.map((item) => (
                <li key={item.href}><Link href={item.href} className="text-white/40 transition-colors hover:text-[#C9A84C]">{t.nav[item.key]}</Link></li>
              ))}
              {proConfig.map((item) => (
                <li key={item.href}><Link href={item.href} className="text-white/40 transition-colors hover:text-[#C9A84C]">{t.pro[item.key].label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C9A84C]">
              {t.footer.contact}
            </h4>
            <div className="mb-2.5 flex items-center gap-2 text-sm text-white/40">
              <MapPin className="h-4 w-4 shrink-0 text-[#C9A84C]" />
              {t.footer.location}
            </div>
            <a
              href="mailto:contact@nadlanconnect.com"
              className="mb-5 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#C9A84C]"
            >
              <Mail className="h-4 w-4 shrink-0 text-[#C9A84C]" />
              contact@nadlanconnect.com
            </a>
            <Link
              href="/simulateur"
              className="inline-flex items-center gap-2 rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-3.5 py-2 text-xs font-semibold text-[#C9A84C] transition-colors hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/20"
            >
              <Calculator className="h-4 w-4" />
              {t.footer.aiSimulator}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div className="border-t border-white/5 py-5 text-center">
          <div className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px]">
            <Link href="/politique-confidentialite" className="text-white/30 transition-colors hover:text-[#C9A84C]">{t.footer.privacy}</Link>
            <span className="text-white/10">·</span>
            <Link href="/mentions-legales" className="text-white/30 transition-colors hover:text-[#C9A84C]">{t.footer.mentions}</Link>
            <span className="text-white/10">·</span>
            <button
              onClick={() => { localStorage.removeItem("nc-cookie-consent"); setCookieConsented(null); }}
              className="text-white/30 transition-colors hover:text-[#C9A84C]"
            >
              {t.footer.manageCookies}
            </button>
          </div>
          <p className="text-[11px] text-white/20">
            © {new Date().getFullYear()} NadlanConnect France · {t.footer.disclaimer}
          </p>
        </div>
      </footer>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={lang === "en" ? "Back to top" : "Retour en haut"}
          className="fixed bottom-20 right-5 z-40 w-11 h-11 bg-[#0A1628] hover:bg-[#152d4a] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </button>
      )}

      {/* Cookie banner */}
      {cookieConsented === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A1628] border-t border-white/10 px-4 py-4" role="region" aria-label={t.cookie.region}>
          <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="text-sm text-white/60 flex-1 leading-relaxed">
              {t.cookie.text}{" "}
              <Link href="/politique-confidentialite" className="text-[#C9A84C] hover:underline">{t.cookie.privacyLink}</Link>.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={handleCookieRefuse}
                className="px-4 py-2 rounded-full border border-white/15 text-white/50 text-sm hover:bg-white/5 transition-colors min-h-[40px]">
                {t.cookie.refuse}
              </button>
              <button onClick={handleCookieAccept}
                className="px-4 py-2 rounded-full bg-[#C9A84C] text-[#0A1628] text-sm font-semibold hover:bg-[#E8C96A] transition-colors min-h-[40px]">
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
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <button onClick={closeEmailPopup} className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 p-1 z-10" aria-label={t.popup.close}>
              <X className="w-4 h-4" />
            </button>
            <div className="bg-gradient-to-br from-[#0A1628] to-[#1A3A5C] p-6 pb-4">
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
                    className="w-full py-3 rounded-xl bg-[#C9A84C] text-[#0A1628] font-bold text-sm hover:bg-[#E8C96A] transition-colors">
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
                  <p className="font-bold text-[#1A3A5C]">{t.popup.successTitle}</p>
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
