import { About } from "./components/About";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { NextSection } from "./components/next";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <NextSection />
      <Features />
      <About />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
