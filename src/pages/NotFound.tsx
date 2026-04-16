import sadMoko from "@/assets/moko/sad.png";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { fadeIn, slideUp } from "../lib/animations";

// Lazy load the MoleculeOverlay component
const MoleculeOverlay = lazy(() =>
  import("../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

export const NotFound = () => {
  return (
    <motion.section
      className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Enhanced subtle background blobs with molecular-like shapes */}
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

      {/* Subtle molecular background glow effects */}
      <div
        className="molecular-glow"
        style={{ top: "30%", left: "50%", width: "300px", height: "300px" }}
        aria-hidden="true"
      />

      {/* Molecule overlay */}
      <Suspense fallback={null}>
        <MoleculeOverlay />
      </Suspense>

      <motion.div
        className="text-center w-full max-w-7xl mx-auto px-4 z-10 mb-12 mt-12"
        variants={slideUp}
      >
        <motion.header className="flex flex-col items-center justify-center w-full">
          {/* Sad moko mascot — feathered into the backdrop, mint halo to match the page */}
          <motion.img
            src={sadMoko}
            alt="Moko"
            className="w-36 h-36 md:w-44 md:h-44 object-cover mb-4"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at center, #000 42%, rgba(0,0,0,0.65) 60%, transparent 78%)",
              maskImage:
                "radial-gradient(circle at center, #000 42%, rgba(0,0,0,0.65) 60%, transparent 78%)",
              filter:
                "drop-shadow(0 0 28px rgba(16,185,129,0.28)) drop-shadow(0 0 12px rgba(140,228,255,0.18))",
            }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.5, ease: "easeOut" },
              scale: { duration: 0.5, ease: "easeOut" },
              y: {
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
            draggable="false"
          />

          {/* Kicker */}
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl gradient-text-secondary font-['Playfair_Display',serif] italic font-medium mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Lost in Space.
          </motion.h3>

          {/* 404 Heading */}
          <motion.h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1] w-full mb-6 sm:mb-8 bg-gradient-to-r from-[#03a3d7] via-[#8ce4ff] to-[#03a3d7] bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            404
          </motion.h1>

          {/* Subhead */}
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-[#10b981] via-[#1fc0f1] to-[#10b981] bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Page Not Found
          </motion.h2>

          {/* Terminal style text */}
          <motion.p
            className="mt-6 text-zinc-400 max-w-md mx-auto text-sm sm:text-base font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {">"} The molecular coordinates you requested do not exist in this ecosystem.
          </motion.p>
        </motion.header>

        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/"
              className="flex items-center justify-center w-full sm:w-auto text-base sm:text-lg px-8 py-3 font-semibold rounded-md bg-[#10b981] text-zinc-950 outline outline-1 outline-[#10b981] outline-offset-[3px] transition-all hover:bg-[#34d399] shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Return Home
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="shadow" aria-hidden="true" />
    </motion.section>
  );
};
