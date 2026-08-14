import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  AnalysisIcon,
  DataIcon,
  IntegrationIcon,
  SimulationIcon,
  WorkflowIcon,
} from "../../components/FeatureIcons";
import { ProductLinks } from "../../components/ProductLinks";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { fadeIn, slideUp, staggerContainer } from "../../lib/animations";
import { GRADIENT_TEXT, PRODUCT_ACCENTS } from "../../lib/productAccents";
import {
  CODE_HIGHLIGHTER,
  MOLECULAR_GLOW,
  MOLECULE_BLOB,
  PRODUCT_DISPLAY_HEADING,
  PRODUCT_HERO_SECTION,
} from "../../lib/styleTokens";
import { SyntaxHighlighter } from "../../lib/syntaxHighlighter";
import { cn } from "../../lib/utils";

const MoleculeOverlay = lazy(() =>
  import("../../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

const FEATURES = [
  {
    icon: <SimulationIcon className="w-8 h-8" />,
    title: "Classical MD",
    description:
      "Lennard-Jones and bonded force fields with NVE / NVT / NPT integrators on a shared Driver API.",
  },
  {
    icon: <AnalysisIcon className="w-8 h-8" />,
    title: "Gaussian-basis SCF",
    description:
      "Restricted and unrestricted Hartree-Fock plus Kohn-Sham DFT for molecular electronic structure.",
  },
  {
    icon: <DataIcon className="w-8 h-8" />,
    title: "Plane-wave & GPW DFT",
    description:
      "Periodic LDA and experimental Gaussian-and-plane-waves DFT with GTH pseudopotentials.",
  },
  {
    icon: <WorkflowIcon className="w-8 h-8" />,
    title: "Ab-initio MD",
    description:
      "Molecular dynamics driven by SCF forces — one Component tree for classical and AIMD.",
  },
  {
    icon: <IntegrationIcon className="w-8 h-8" />,
    title: "C++ / CUDA core",
    description:
      "Native C++ engine with optional CUDA paths; Python package for install and scripting workflows.",
  },
];

const API_SNIPPETS = [
  {
    title: "First RHF energy",
    filename: "build.sh",
    language: "bash",
    description:
      "Configure a CPU build with Gaussian-SCF methods, build the H2 example, and run it.",
    code: `cmake -B build -DCMAKE_BUILD_TYPE=Release \\
      -DATV_BUILD_CUDA=OFF -DATV_BUILD_RHF=ON -DATV_BUILD_EXAMPLES=ON
cmake --build build --target 02_rhf -j
./build/examples/02_rhf
# E_total ~ -1.1168 Hartree (Szabo & Ostlund)`,
  },
  {
    title: "Driver / Component",
    filename: "rhf.cpp",
    language: "cpp",
    description:
      "Methods share one Driver API: assemble components, set geometry, and converge energy.",
    code: `// Sketch of the shared Atomiverse Driver pattern
auto driver = atv::Driver::create(/* method config */);
driver->set_geometry(atoms, coords);
driver->run();
const double energy = driver->energy();`,
  },
];

const ACCENT = PRODUCT_ACCENTS.atomiverse;

export const AtomiverseLanding = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCodeIdx, setActiveCodeIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
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
          className="text-center w-full max-w-7xl mx-auto px-4 z-10 mb-24"
          variants={slideUp}
        >
          <motion.header className="flex flex-col items-center justify-center w-full">
            <motion.p
              className="mb-4 inline-flex items-center rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-lime-300"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.35 }}
            >
              Preparing release
            </motion.p>

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
              One engine. Many methods.
            </motion.h3>

            <motion.h1
              className={cn(
                "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-sans font-extrabold text-center mx-auto tracking-tighter leading-headline w-full mb-4 sm:mb-6 pb-4",
                GRADIENT_TEXT,
                ACCENT.title,
                "pt-2",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Atomiverse
            </motion.h1>

            <motion.h2
              className={cn(
                cn(PRODUCT_DISPLAY_HEADING, "tracking-[0.16em]"),
                GRADIENT_TEXT,
                ACCENT.subhead,
                "pb-2",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Simulation engine for molecular dynamics and electronic structure
            </motion.h2>

            <motion.p
              className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              Classical MD, geometry optimization, Gaussian-basis SCF, plane-wave DFT, and AIMD
              behind one Driver / Component API — built for HPC and research workflows.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <a
                href="https://github.com/MolCrafts/Atomiverse"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-md bg-lime-500 px-8 py-3 text-base font-semibold text-zinc-950 outline outline-1 outline-lime-500 outline-offset-[3px] transition-all hover:bg-lime-400 shadow-[0_0_18px_color-mix(in_srgb,var(--color-lime-500)_35%,transparent)]"
              >
                View on GitHub
              </a>
              <a
                href="https://docs.molcrafts.org/atomiverse/"
                className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-950/50 px-8 py-3 text-base font-semibold text-zinc-100 transition-all hover:border-lime-500/40 hover:bg-lime-500/10"
              >
                Documentation
              </a>
            </motion.div>
          </motion.header>
        </motion.div>
      </motion.section>

      <section id="methods" className="relative py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            className="text-center mb-14 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className={cn(
                cn(PRODUCT_DISPLAY_HEADING, "mx-0 w-auto max-w-none"),
                GRADIENT_TEXT,
                ACCENT.heading,
              )}
            >
              Methods on one surface
            </h2>
            <p className="mt-4 text-zinc-400">
              Swap the method, keep the Driver. Atomiverse is designed so classical and electronic
              structure share geometry, components, and run control.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-6 transition-colors hover:border-lime-500/30 hover:bg-lime-500/5"
              >
                <div className={cn("mb-4", ACCENT.icon, ACCENT.iconHover)}>{feature.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="toolkit" className="relative py-20 sm:py-28 border-t border-zinc-900">
        <motion.div
          ref={sectionRef}
          className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-12 max-w-3xl mx-auto" variants={slideUp}>
            <h2
              className={cn(
                cn(PRODUCT_DISPLAY_HEADING, "mx-0 w-auto max-w-none"),
                GRADIENT_TEXT,
                ACCENT.heading,
              )}
            >
              Get to first energy
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {API_SNIPPETS.map((snippet, idx) => (
              <Button
                key={snippet.filename}
                type="button"
                variant="ghost"
                onClick={() => setActiveCodeIdx(idx)}
                className={cn(
                  "h-auto rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-transparent",
                  idx === activeCodeIdx
                    ? "border-lime-500/50 bg-lime-500/15 text-lime-200 hover:bg-lime-500/15 hover:text-lime-200"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200",
                )}
              >
                {snippet.title}
              </Button>
            ))}
          </div>

          <motion.div className="rounded-2xl" variants={slideUp}>
            <Card className="overflow-hidden rounded-2xl border-zinc-800 bg-code-repo shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <span className="font-mono text-xs text-zinc-500">
                  {API_SNIPPETS[activeCodeIdx].filename}
                </span>
                <span className="text-xs text-zinc-600">release-ready examples</span>
              </div>
              <p className="px-4 pt-4 text-sm text-zinc-400">
                {API_SNIPPETS[activeCodeIdx].description}
              </p>
              <div className="px-6 pb-6 pt-5 text-[0.85rem]">
                <SyntaxHighlighter
                  language={API_SNIPPETS[activeCodeIdx].language}
                  className={CODE_HIGHLIGHTER}
                  useInlineStyles={false}
                >
                  {API_SNIPPETS[activeCodeIdx].code}
                </SyntaxHighlighter>
              </div>
            </Card>
          </motion.div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Docs target the C++ API. Python install path:{" "}
            <code className="text-zinc-400">pip install</code> +{" "}
            <code className="text-zinc-400">python -m atomiverse install</code>.
          </p>
        </motion.div>
      </section>

      <ProductLinks slug="atomiverse" />
    </div>
  );
};
