import { motion } from "framer-motion";
import { ArrowDownRight, Github } from "lucide-react";
import { Suspense, lazy } from "react";
import { fadeIn, slideUp } from "../lib/animations";

const MoleculeOverlay = lazy(() =>
  import("./MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

/** Brand display cyan (#03a3d7) — solid subtitle; wordmark uses the ramp. */
const BRAND_CYAN = "#03a3d7";

export const Hero = () => {
  return (
    <motion.section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center space-section overflow-hidden px-4 md:px-8 lg:px-16"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      aria-labelledby="main-heading"
    >
      {/* Deep center stage glow — dual layer for depth */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(75vw,560px)] w-[min(95vw,820px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(3,163,215,0.22) 0%, rgba(3,163,215,0.08) 38%, transparent 68%)",
          filter: "blur(10px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[48%] h-[min(40vw,280px)] w-[min(55vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(140,228,255,0.16) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      <div className="molecule-blob" style={{ top: "25%", left: "15%" }} aria-hidden="true" />
      <div
        className="molecule-blob"
        style={{ top: "35%", right: "20%", animationDelay: "7s" }}
        aria-hidden="true"
      />
      <div
        className="molecule-blob"
        style={{ bottom: "30%", left: "25%", animationDelay: "4s" }}
        aria-hidden="true"
      />
      <div
        className="molecule-blob"
        style={{ bottom: "15%", right: "15%", animationDelay: "2s" }}
        aria-hidden="true"
      />

      <div
        className="molecular-glow"
        style={{ top: "30%", left: "50%", width: "340px", height: "340px" }}
        aria-hidden="true"
      />
      <div
        className="molecular-glow"
        style={{
          top: "60%",
          left: "30%",
          width: "220px",
          height: "220px",
          animationDelay: "3s",
        }}
        aria-hidden="true"
      />
      <div
        className="molecular-glow"
        style={{
          top: "20%",
          right: "20%",
          width: "280px",
          height: "280px",
          animationDelay: "5s",
        }}
        aria-hidden="true"
      />

      <Suspense fallback={null}>
        <MoleculeOverlay />
      </Suspense>

      <motion.div
        className="z-10 mb-24 w-full max-w-7xl px-4 text-center sm:mb-32"
        variants={slideUp}
      >
        <motion.header className="flex w-full flex-col items-center justify-center">
          <motion.h3
            className="mb-4 font-['Playfair_Display',serif] text-2xl font-medium italic text-primary sm:mb-6 sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Shaping Molecular Simulation for AI Era
          </motion.h3>

          {/* Cyan → blue gradient + sweep — only the wordmark */}
          <motion.h1
            id="main-heading"
            className="mb-6 w-full text-center font-sans text-5xl font-extrabold leading-[1] tracking-tighter gradient-text-primary sm:mb-8 sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.22, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            MolCrafts
          </motion.h1>

          <motion.h2
            className="mx-auto w-full max-w-4xl font-['Outfit',sans-serif] text-lg font-semibold uppercase tracking-[0.2em] sm:text-xl md:text-2xl"
            style={{ color: BRAND_CYAN }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            We build AI-assisted infra for molecular science.
          </motion.h2>

          <motion.nav
            className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:mt-14 sm:gap-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Hero"
          >
            {/* Was "#approach" — the first click on the page went into the most abstract
                section. It now lands on the packages. */}
            <a href="#projects" className="group premium-link">
              Browse the packages
              <ArrowDownRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://github.com/MolCrafts"
              target="_blank"
              rel="noreferrer noopener"
              className="group premium-link-ghost"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </motion.nav>
        </motion.header>
      </motion.div>

      <div className="shadow" aria-hidden="true" />
    </motion.section>
  );
};
