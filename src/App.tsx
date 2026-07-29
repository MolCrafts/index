import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { Cta } from "./components/Cta";
import { EcosystemArchitecture } from "./components/EcosystemArchitecture";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { SEOSchema } from "./components/SEOSchema";
import { Sponsors } from "./components/Sponsors";
import { pathProductSlug, type ProductSlug } from "./lib/routes";
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
import "./App.css";

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

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-fade");
      for (const element of elements) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          element.classList.add("active");
        }
      }
    };

    if (currentPath === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [currentPath]);

  const renderContent = () => {
    if (currentPath === "/" || currentPath === "") {
      return (
        <>
          <Hero />
          <Manifesto />
          <EcosystemArchitecture />
          <Sponsors />
          <Newsletter />
          <Cta />
        </>
      );
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

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={currentPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col min-h-screen"
          >
            <Navbar />
            <main className="flex-grow">{renderContent()}</main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
