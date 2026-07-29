import sadMoko from "@/assets/moko/sad.png";
import { motion } from "framer-motion";
import { Suspense, lazy, useMemo } from "react";
import { fadeIn, slideUp } from "../lib/animations";
import { FEATURED_LINKS } from "../lib/routes";
import { cn } from "../lib/utils";

const MoleculeOverlay = lazy(() =>
  import("../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

function readSearchParams() {
  if (typeof window === "undefined") return { from: null as string | null, doc: null as string | null };
  const q = new URLSearchParams(window.location.search);
  return {
    from: q.get("from"),
    doc: q.get("doc"),
  };
}

export const NotFound = () => {
  const { from, doc } = useMemo(() => readSearchParams(), []);
  const attempted =
    from ||
    (typeof window !== "undefined" && window.location.pathname !== "/404"
      ? window.location.pathname
      : null);

  return (
    <motion.section
      className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
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
        className="molecular-glow"
        style={{ top: "30%", left: "50%", width: "300px", height: "300px" }}
        aria-hidden="true"
      />

      <Suspense fallback={null}>
        <MoleculeOverlay />
      </Suspense>

      <motion.div
        className="text-center w-full max-w-3xl mx-auto px-4 z-10 mb-12 mt-12"
        variants={slideUp}
      >
        <motion.header className="flex flex-col items-center justify-center w-full">
          <motion.img
            src={sadMoko}
            alt=""
            className="w-32 h-32 md:w-40 md:h-40 object-cover mb-2"
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

          <motion.p
            className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            404
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight leading-[1.1] mb-4 gradient-text-primary"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            This path is empty.
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            {doc
              ? `We could not find documentation for ${doc}. It may not be published yet, or the URL moved under docs.molcrafts.org.`
              : "That page is not part of the MolCrafts brand site. Check the path, or jump to a product below."}
          </motion.p>

          {attempted && (
            <motion.p
              className="mt-5 inline-flex max-w-full items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 font-mono text-xs sm:text-sm text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.35 }}
            >
              <span className="text-zinc-600 shrink-0">path</span>
              <span className="truncate text-primary">{attempted}</span>
            </motion.p>
          )}
        </motion.header>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {FEATURED_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className={cn(
                "rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground",
                "transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground outline outline-1 outline-primary outline-offset-[3px] transition-all hover:opacity-90 shadow-[0_0_18px_hsl(var(--primary)/0.35)]"
          >
            Return home
          </a>
        </motion.div>
      </motion.div>

      <div className="shadow" aria-hidden="true" />
    </motion.section>
  );
};
