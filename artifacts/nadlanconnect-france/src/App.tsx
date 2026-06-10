import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLang } from "@/lib/i18n";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const MarcheNeuf = lazy(() => import("@/pages/marche-neuf"));
const Defiscalisation = lazy(() => import("@/pages/defiscalisation"));
const Simulateur = lazy(() => import("@/pages/simulateur"));
const Acteurs = lazy(() => import("@/pages/acteurs"));
const Promoteurs = lazy(() => import("@/pages/promoteurs"));
const Agences = lazy(() => import("@/pages/agences"));
const PolitiqueConfidentialite = lazy(() => import("@/pages/politique-confidentialite"));
const MentionsLegales = lazy(() => import("@/pages/mentions-legales"));

const queryClient = new QueryClient();

function PageLoader() {
  const { lang } = useLang();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-400">{lang === "en" ? "Loading…" : "Chargement…"}</span>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/marche-neuf" component={MarcheNeuf} />
        <Route path="/defiscalisation" component={Defiscalisation} />
        <Route path="/simulateur" component={Simulateur} />
        <Route path="/acteurs" component={Acteurs} />
        <Route path="/promoteurs" component={Promoteurs} />
        <Route path="/agences" component={Agences} />
        <Route path="/politique-confidentialite" component={PolitiqueConfidentialite} />
        <Route path="/mentions-legales" component={MentionsLegales} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
