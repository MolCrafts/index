import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { About } from "./components/About";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { NextSection } from "./components/next";
import { MolpyDocs, MolplotDocs, MolvisDocs } from "./docs";
import { LoadingScreen } from "./components/LoadingScreen";
import { SEOSchema } from "./components/SEOSchema";
import "./App.css";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading MolCrafts...");

  // Symulacja początkowego ładowania aplikacji
  useEffect(() => {
    // Reduce loading time to improve SEO and initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle route changes and history
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    // Handle browser back/forward navigation
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Modify links to use client-side routing
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin) && !anchor.target) {
        e.preventDefault();
        const newPath = anchor.href.replace(window.location.origin, '');
        
        if (newPath !== currentPath) {
          // Pokazujemy ekran ładowania przy zmianie strony
          setLoadingText(`Loading ${getPageName(newPath)}...`);
          setIsLoading(true);
          
          // Update URL without full page reload
          window.history.pushState({}, '', newPath);
          
          // Reduce page transition loading time
          setTimeout(() => {
            setCurrentPath(newPath);
            window.scrollTo(0, 0);
            setIsLoading(false);
          }, 500); // Reduced from 1200ms to improve UX and SEO
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [currentPath]);

  // Pomocnicza funkcja do uzyskania nazwy strony na podstawie ścieżki
  const getPageName = (path: string): string => {
    if (path === '/') return 'Home';
    if (path.startsWith('/docs/molpy')) return 'MolPy Documentation';
    if (path.startsWith('/docs/molplot')) return 'MolPlot Documentation';
    if (path.startsWith('/docs/molvis')) return 'MolVis Documentation';
    return path.split('/').pop() || 'Page';
  };

  // Obsługa efektu przewijania dla elementów z klasą scroll-fade
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-fade');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        // Aktywuj efekt, gdy element jest widoczny w oknie przeglądarki
        if (position.top < window.innerHeight - 100) {
          element.classList.add('active');
        }
      });
    };
    
    // Only add scroll handler for the landing page
    if (currentPath === '/') {
      window.addEventListener('scroll', handleScroll);
      // Wywołaj raz na początku, aby aktywować widoczne elementy
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentPath]);

  // Check if we're on a docs page
  const isDocsPage = currentPath.startsWith('/docs/');

  // Render content based on the current path
  const renderContent = () => {
    if (currentPath.startsWith('/docs/molpy')) {
      return <MolpyDocs />;
    } else if (currentPath.startsWith('/docs/molplot')) {
      return <MolplotDocs />;
    } else if (currentPath.startsWith('/docs/molvis')) {
      return <MolvisDocs />;
    } else {
      // Default landing page
      return (
        <>
          <Hero />
          <NextSection />
          <Features />
          <About />
        </>
      );
    }
  };

  return (
    <>
      {/* SEO Structured Data */}
      <SEOSchema path={currentPath} />
      
      <LoadingScreen isLoading={isLoading} text={loadingText} />
      
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={currentPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen"
          >
            {!isDocsPage && <Navbar />}
            <main className={`flex-grow ${isDocsPage ? 'docs-page' : ''}`}>
              {renderContent()}
            </main>
            {!isDocsPage && <Footer />}
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
