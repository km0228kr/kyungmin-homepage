/*
 * App: Cold Manifesto × Signal & Noise
 * Routes: /, /about, /research, /startup, /writing, /media, /contact
 * Default theme: dark (차갑고 선명한 다크 기반)
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Research from "./pages/Research";
import Startup from "./pages/Startup";
import Writing from "./pages/Writing";
import Media from "./pages/Media";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/research" component={Research} />
        <Route path="/startup" component={Startup} />
        <Route path="/writing" component={Writing} />
        <Route path="/media" component={Media} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
