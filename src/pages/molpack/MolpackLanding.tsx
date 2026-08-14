import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { CodePanel } from "../../components/CodePanel";
import {
  DataIcon,
  IntegrationIcon,
  SimulationIcon,
  WorkflowIcon,
} from "../../components/FeatureIcons";
import { ProductCapabilities } from "../../components/ProductCapabilities";
import { ProductLinks } from "../../components/ProductLinks";
import { Button } from "../../components/ui/button";
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

const MoleculeOverlay = lazy(() =>
  import("../../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

const FEATURES = [
  {
    icon: <IntegrationIcon className="w-8 h-8" />,
    title: "Drop-in Keyword Scripts",
    description: "Reads a standard keyword script — bring existing decks unchanged.",
  },
  {
    icon: <SimulationIcon className="w-8 h-8" />,
    title: "Geometric Restraints",
    description:
      "Box, sphere, half-space planes, fixed positions, and per-atom-subset restraints out of the box.",
  },
  {
    icon: <DataIcon className="w-8 h-8" />,
    title: "Common Formats",
    description: "Reads and writes the common molecular structure and trajectory formats.",
  },
  {
    icon: <WorkflowIcon className="w-8 h-8" />,
    title: "Three Surfaces, One Engine",
    description: "Same kernel exposed as a CLI binary, a Rust crate, and a Python package.",
  },
  {
    icon: <SimulationIcon className="w-8 h-8" />,
    title: "Reproducible Packings",
    description:
      "Seedable RNG, explicit tolerance, configurable outer-loop iterations — same inputs, same configuration.",
  },
  {
    icon: <IntegrationIcon className="w-8 h-8" />,
    title: "Pairs With MolRs",
    description:
      "Python API consumes MolRs frames directly; share a single in-memory representation across the toolkit.",
  },
];

const API_SNIPPETS = [
  {
    title: "Drop-in Keyword Script",
    filename: "mixture.inp",
    description:
      "A standard keyword format — bring your existing scripts; the binary takes a file or stdin.",
    language: "bash",
    code: `# molpack mixture.inp   (or:  molpack < mixture.inp)
tolerance 2.0
seed 42
filetype pdb
output mixture.pdb

structure water.pdb
  number 500
  inside box 0. 0. 0. 40. 40. 40.
end structure

structure ethanol.pdb
  number 50
  inside box 0. 0. 0. 40. 40. 40.
end structure`,
  },
  {
    title: "Pack From Python",
    filename: "pack_water.py",
    description: "Read a frame with MolRs, declare a Target with restraints, and call pack.",
    language: "python",
    code: `import molrs
from molpack import InsideBoxRestraint, Molpack, Target

frame = molrs.read_pdb("water.pdb")

water = (
    Target(frame, count=500)
    .with_name("water")
    .with_restraint(InsideBoxRestraint([0, 0, 0], [40, 40, 40]))
)

result = (
    Molpack()
    .with_tolerance(2.0)
    .with_seed(42)
    .pack([water], max_loops=200)
)`,
  },
];

const ACCENT = PRODUCT_ACCENTS.molpack;

export const MolpackLanding = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCodeIdx, setActiveCodeIdx] = useState(0);

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
        <div className={cn(MOLECULE_BLOB, "left-[15%] top-1/4")} aria-hidden="true" />
        <div
          className={cn(MOLECULE_BLOB, "bottom-[30%] right-[20%] [animation-delay:4s]")}
          aria-hidden="true"
        />
        <div
          className={cn(MOLECULAR_GLOW, "left-1/2 top-[30%] size-[18.75rem]")}
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
              Pack first. Simulate clean.
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
              MolPack
            </motion.h1>

            <motion.h2
              className={cn(PRODUCT_DISPLAY_HEADING, GRADIENT_TEXT, ACCENT.subhead, "pb-2")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Molecular packing in Rust, with a native Python API
            </motion.h2>
          </motion.header>
        </motion.div>
      </motion.section>

      {/* API / SNIPPETS SECTION */}
      <section id="toolkit" className="relative py-24 sm:py-32">
        <motion.div
          ref={sectionRef}
          className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto" variants={slideUp}>
            <motion.h2
              className={cn(PRODUCT_DISPLAY_HEADING, GRADIENT_TEXT, ACCENT.heading, "pb-2")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              One engine, three{" "}
              <span
                className={cn(
                  "bg-gradient-to-r text-transparent bg-clip-text leading-relaxed",
                  ACCENT.headingSpan,
                )}
              >
                surfaces
              </span>
            </motion.h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
              The same engine, three ways in: a CLI binary, a Rust crate, a Python package.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            <div className="w-full lg:w-5/12 relative pt-2">
              <div className="absolute left-[8px] top-6 bottom-6 w-[1px] bg-zinc-800/80" />

              <div className="flex flex-col gap-10 relative">
                {API_SNIPPETS.map((cap, idx) => (
                  <Button
                    key={cap.title}
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveCodeIdx(idx)}
                    className={`group relative h-auto w-full justify-start whitespace-normal rounded-none p-0 pl-10 text-left transition-all duration-300 hover:bg-transparent ${
                      activeCodeIdx === idx ? "opacity-100" : "opacity-40 hover:opacity-80"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-1 w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                        activeCodeIdx === idx ? ACCENT.dot : "bg-zinc-900 border border-zinc-700"
                      }`}
                    >
                      {activeCodeIdx === idx && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>

                    <div
                      className={cn(
                        "mb-2 transition-colors duration-300",
                        activeCodeIdx === idx
                          ? ACCENT.accentText
                          : "text-zinc-500 group-hover:text-zinc-300",
                      )}
                    >
                      <span className="font-bold text-lg md:text-xl tracking-wide font-sans">
                        {cap.title}
                      </span>
                    </div>
                    <p className="text-snippet leading-relaxed text-zinc-400 font-light max-w-sm">
                      {cap.description}
                    </p>
                  </Button>
                ))}
              </div>
            </div>

            <CodePanel
              snippetKey={activeCodeIdx}
              filename={API_SNIPPETS[activeCodeIdx].filename}
              language={API_SNIPPETS[activeCodeIdx].language}
              code={API_SNIPPETS[activeCodeIdx].code}
              glowLine={ACCENT.glowLine}
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className={cn(PRODUCT_SECTION_AURA, "py-24 sm:py-32")}>
        <motion.div
          className="container mx-auto px-4 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="text-center mb-20" variants={slideUp}>
            <motion.h2
              className={cn(PRODUCT_DISPLAY_HEADING, GRADIENT_TEXT, ACCENT.heading, "pb-2")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              What MolPack{" "}
              <span
                className={cn(
                  "bg-gradient-to-r text-transparent bg-clip-text leading-relaxed",
                  ACCENT.headingSpan,
                )}
              >
                Covers
              </span>
            </motion.h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-4xl mx-auto">
              From a single keyword script to a typed Rust API — one packing engine, surfaced where
              you need it.
            </p>
          </motion.div>

          <ProductCapabilities items={FEATURES} accentText={ACCENT.accentText} />
        </motion.div>
      </section>

      <ProductLinks slug="molpack" />
    </div>
  );
};
