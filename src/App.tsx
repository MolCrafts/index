import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SEOSchema } from "./components/SEOSchema";
import { HomePage } from "./components/home/HomePage";
import { trackPageView } from "./lib/analytics";
import { type ProductSlug, pathProductSlug } from "./lib/routes";
import { PAGE_ATMOSPHERE } from "./lib/styleTokens";
import { cn } from "./lib/utils";
import {
  AtomiverseLanding,
  MolVisLanding,
  MolcfgLanding,
  MolexpLanding,
  MollogLanding,
  MolnexLanding,
  MolpackLanding,
  MolpyLanding,
  MolqLanding,
  MolrecLanding,
  MolrsLanding,
  NotFound,
} from "./pages";

const PRODUCT_PAGES: Record<ProductSlug, ComponentType> = {
  molpy: MolpyLanding,
  molrs: MolrsLanding,
  molpack: MolpackLanding,
  molnex: MolnexLanding,
  molrec: MolrecLanding,
  molexp: MolexpLanding,
  molq: MolqLanding,
  molvis: MolVisLanding,
  molcfg: MolcfgLanding,
  mollog: MollogLanding,
  atomiverse: AtomiverseLanding,
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  /* Client-side routing means GA's automatic page_view fires once and misses every
     navigation after it, so each route change reports its own view. */
  useEffect(() => {
    trackPageView(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor?.href?.startsWith(window.location.origin) && !anchor.target) {
        const url = new URL(anchor.href);

        if (url.pathname === window.location.pathname && url.hash) {
          return;
        }

        e.preventDefault();
        const newPath = url.pathname + url.search;

        if (newPath !== currentPath + window.location.search) {
          window.history.pushState({}, "", newPath);
          setTimeout(() => {
            setCurrentPath(url.pathname);
            window.scrollTo(0, 0);
            setIsLoading(false);
          }, 350);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [currentPath]);

  const isHome = currentPath === "/" || currentPath === "";

  const renderContent = () => {
    if (isHome) {
      return <HomePage />;
    }

    // Explicit 404 route (used by docs edge router fallback)
    if (currentPath === "/404" || currentPath.startsWith("/404/")) {
      return <NotFound />;
    }

    const slug = pathProductSlug(currentPath);
    if (slug) {
      const Page = PRODUCT_PAGES[slug];
      return <Page />;
    }

    return <NotFound />;
  };

  return (
    <>
      <SEOSchema path={currentPath} />
      {!isHome && <div className={PAGE_ATMOSPHERE} aria-hidden="true" />}

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-1 flex flex-col",
              isHome
                ? "dark h-[100svh] min-w-0 overflow-hidden bg-background text-foreground"
                : "min-h-screen",
            )}
          >
            <Navbar />
            <main className={isHome ? "min-h-0 min-w-0 flex-1 overflow-hidden" : "flex-grow"}>
              {renderContent()}
            </main>
            {!isHome && <Footer />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
