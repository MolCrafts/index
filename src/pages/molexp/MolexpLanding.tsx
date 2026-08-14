import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { CodePanel } from "../../components/CodePanel";
import { DataIcon, IntegrationIcon, WorkflowIcon } from "../../components/FeatureIcons";
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
    icon: <WorkflowIcon className="w-8 h-8" />,
    title: "Typed Workflow Layer",
    description:
      "DAG-based task graphs with automatic parallelization, exposed through both a functional DSL and an OOP builder.",
  },
  {
    icon: <DataIcon className="w-8 h-8" />,
    title: "Workspace Hierarchy",
    description:
      "Project-Experiment-Run workspaces keep scientific workflows reproducible while scoped asset libraries deduplicate content by hash.",
  },
  {
    icon: <IntegrationIcon className="w-8 h-8" />,
    title: "Agent + UI Layer",
    description:
      "An HTTP server, a web UI, and an optional agent layer sit directly on top of the workflow runtime and workspace.",
  },
];

const API_SNIPPETS = [
  {
    title: "Workflow DSL",
    filename: "workflow.py",
    description:
      "Define typed async workflows with explicit task dependencies, then build and execute the resulting specification.",
    code: `from molexp.workflow import WorkflowBuilder, TaskContext

wf = WorkflowBuilder(name="data-pipeline")

@wf.task
async def fetch(ctx: TaskContext) -> list[float]:
    return [1.0, 2.0, 3.0]

result = await wf.build().execute()`,
  },
];

const ACCENT = PRODUCT_ACCENTS.molexp;

export const MolexpLanding = () => {
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
        {/* Background Blobs */}
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
              Rerun it in two years.
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
              MolExp
            </motion.h1>

            <motion.h2
              className={cn(PRODUCT_DISPLAY_HEADING, GRADIENT_TEXT, ACCENT.subhead, "pb-2")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Agent-assisted workflows with tracked runs and artifact lineage
            </motion.h2>
          </motion.header>
        </motion.div>
      </motion.section>

      {/* NAKED UNIFIED CAPABILITIES SECTION (NO CARDS) */}
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
              Define once, rerun{" "}
              <span
                className={cn(
                  "bg-gradient-to-r text-transparent bg-clip-text leading-relaxed",
                  ACCENT.headingSpan,
                )}
              >
                later
              </span>
            </motion.h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
              Task-graph execution, reproducible Project-Experiment-Run workspaces, and agent-aware
              automation on one platform.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Timeline-style capabilities menu (Naked text, pure interactions) */}
            <div className="w-full lg:w-5/12 relative pt-2">
              {/* Vertical continuous line */}
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
                    {/* Active Dot / Timeline node */}
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
              language={API_SNIPPETS[activeCodeIdx].filename.endsWith(".sh") ? "bash" : "python"}
              code={API_SNIPPETS[activeCodeIdx].code}
              glowLine={ACCENT.glowLine}
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION (DOMAIN BREADTH) */}
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
              What MolExp{" "}
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
              The API above illustrates the workflow composition block. The features below explain
              how MolExp manages stateful datasets, runs, and artifacts.
            </p>
          </motion.div>

          <ProductCapabilities items={FEATURES} accentText={ACCENT.accentText} />
        </motion.div>
      </section>

      <ProductLinks slug="molexp" />
    </div>
  );
};
