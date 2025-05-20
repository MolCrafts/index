import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { About } from "./components/About";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { NextSection } from "./components/next";
import "./App.css";

function App() {
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
    
    window.addEventListener('scroll', handleScroll);
    // Wywołaj raz na początku, aby aktywować widoczne elementy
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen"
      >
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <NextSection />
          <Features />
          <About />
        </main>
        <Footer />
        <ScrollToTop />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
