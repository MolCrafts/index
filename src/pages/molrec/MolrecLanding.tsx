import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef } from "react";
import { ProductCapabilities } from "../../components/ProductCapabilities";
import { ProductLinks } from "../../components/ProductLinks";
import { Card } from "../../components/ui/card";
import { fadeIn, slideUp, staggerContainer } from "../../lib/animations";
import { GRADIENT_TEXT, PRODUCT_ACCENTS } from "../../lib/productAccents";
import {
  MOLECULAR_GLOW,
  MOLECULE_BLOB,
  PRODUCT_DISPLAY_HEADING,
  PRODUCT_HERO_SECTION,
  PRODUCT_SECTION_AURA,
} from "../../lib/styleTokens";
import { cn } from "../../lib/utils";

const ACCENT = PRODUCT_ACCENTS.molrec;

const MoleculeOverlay = lazy(() =>
  import("../../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

export const MolrecLanding = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <motion.section
        className={PRODUCT_HERO_SECTION}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Background Blobs */}
        <div
          className={cn(MOLECULE_BLOB, "left-[10%] top-[20%] !bg-amber-500/10")}
          aria-hidden="true"
        />
        <div
          className={cn(
            MOLECULE_BLOB,
            "bottom-1/4 right-[15%] !bg-amber-500/[0.08] [animation-delay:3s]",
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            MOLECULAR_GLOW,
            "left-[55%] top-[40%] size-[21.875rem] !bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-amber-500)_10%,transparent)_0%,transparent_70%)]",
          )}
          aria-hidden="true"
        />

        <Suspense fallback={null}>
          <MoleculeOverlay />
        </Suspense>

        <motion.div
          className="text-center w-full max-w-7xl mx-auto px-4 z-10 mb-32"
          variants={slideUp}
        >
          <motion.header className="flex flex-col items-center justify-center w-full">
            <motion.h3
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl",
                GRADIENT_TEXT,
                ACCENT.kicker,
                "font-playfair italic font-medium mb-4 sm:mb-6 pb-2",
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              One shape for atomistic data.
            </motion.h3>

            <motion.h1
              className={cn(
                "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-product-hero font-sans font-extrabold text-center mx-auto tracking-tighter leading-headline w-full mb-4 sm:mb-6 pb-4",
                GRADIENT_TEXT,
                ACCENT.title,
                "pt-2",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              MolRec
            </motion.h1>

            <motion.h2
              className={cn(PRODUCT_DISPLAY_HEADING, GRADIENT_TEXT, ACCENT.subhead, "pb-2")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Backend-neutral record contract for atomistic data
            </motion.h2>
          </motion.header>
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION */}
      <section id="toolkit" className={cn(PRODUCT_SECTION_AURA, "py-24 sm:py-32")}>
        <motion.div
          ref={sectionRef}
          className="container mx-auto px-4 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-20" variants={slideUp}>
            <motion.h2
              className={cn(PRODUCT_DISPLAY_HEADING, GRADIENT_TEXT, ACCENT.heading, "pb-2")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              One format, any <span className={ACCENT.headingSpanText}>backend</span>
            </motion.h2>
          </motion.div>

          <ProductCapabilities
            accentText={ACCENT.headingSpanText}
            items={[
              {
                title: "Backend-neutral storage",
                description:
                  "The spec defines semantics, not storage. Any array store or database backend can implement the same record model.",
              },
              {
                title: "Language-agnostic semantics",
                description:
                  "One semantic layer lets a tool interpret another tool's atomistic records without guessing what arrays or dataset names mean.",
              },
              {
                title: "Collections and grids",
                description:
                  "Frames hold atoms, bonds, angles, beads, fragments, and volumetric grids as first-class record elements.",
              },
            ]}
          />
        </motion.div>
      </section>

      {/* TECHNICAL SPEC SECTION */}
      <section className="relative bg-code-surface px-4 py-20 md:px-8 lg:px-12">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-white/[0.03] p-10 py-10 backdrop-blur-xl transition-[transform,background-color,box-shadow] duration-400 hover:-translate-y-2 hover:bg-white/[0.05] hover:shadow-panel dark:bg-black/40 dark:hover:bg-zinc-900/50 dark:hover:shadow-panel-lifted md:p-16 md:py-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-field rounded-full -mr-32 -mt-32" />

            <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair italic text-zinc-100">
                  One record shape every tool can read.
                </h2>
                <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-light">
                  MolRec defines what a molecular record means, not how it must be stored. From
                  canonical snapshots to trajectories and observables, metadata stays explicit
                  instead of being inferred from array shape or dataset naming.
                </p>
                <ul className="space-y-4">
                  {[
                    "Language-Agnostic Specification",
                    "First-class Grid and Collection Support",
                    "Extensible to MD, ML Potentials, and Electronic Structure",
                    "Mandatory Metadata for Every Observable",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className={cn("w-1.5 h-1.5 rounded-full", ACCENT.dot)} />
                      <span className="text-zinc-300 font-medium text-sm tracking-wide">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="mt-12 rounded-2xl lg:mt-0"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-2xl border-zinc-800 bg-zinc-950 p-8 font-mono text-sm shadow-2xl">
                  <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/30" />
                  </div>
                  <pre className="text-amber-500/80 leading-relaxed overflow-x-auto">
                    {`/
+-- meta                  # record-level metadata (required)
+-- frame                 # canonical snapshot (required)
|   +-- atoms/            #   named collection: atoms
|   +-- bonds/            #   named collection: bonds
|   +-- <grids>/          #   named volumetric grids
|   +-- box               #   simulation cell (SimBox)
+-- trajectory            # time-series frames (optional)
+-- observables           # derived quantities (optional)
+-- status                # execution state and progress (optional)
+-- metrics               # runtime metric stream (optional)
+-- method                # scientific context (optional)
+-- parameters            # workflow parameters (optional)`}
                  </pre>
                </Card>
              </motion.div>
            </div>
          </Card>
        </div>
      </section>

      <ProductLinks slug="molrec" />
    </div>
  );
};
