import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import MarcheNeuf from "@/pages/marche-neuf";
import Defiscalisation from "@/pages/defiscalisation";
import Simulateur from "@/pages/simulateur";
import Acteurs from "@/pages/acteurs";
import Promoteurs from "@/pages/promoteurs";
import Agences from "@/pages/agences";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/marche-neuf" component={MarcheNeuf} />
      <Route path="/defiscalisation" component={Defiscalisation} />
      <Route path="/simulateur" component={Simulateur} />
      <Route path="/acteurs" component={Acteurs} />
      <Route path="/promoteurs" component={Promoteurs} />
      <Route path="/agences" component={Agences} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
