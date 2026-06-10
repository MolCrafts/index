import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DataIcon, IntegrationIcon, WorkflowIcon } from "../../components/FeatureIcons";
import { fadeIn, slideUp, staggerContainer } from "../../lib/animations";
import { GRADIENT_TEXT, PRODUCT_ACCENTS } from "../../lib/productAccents";
import { cn } from "../../lib/utils";

const MoleculeOverlay = lazy(() =>
  import("../../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

const FEATURES = [
  {
    icon: <WorkflowIcon className="w-8 h-8" />,
    title: "Execution and Representation",
    description:
      "`molix` owns the training and evaluation lifecycle — trainer, hooks, and data pipeline — while `molrep` owns reusable equivariant representation modules.",
  },
  {
    icon: <DataIcon className="w-8 h-8" />,
    title: "Composition and Potentials",
    description:
      "`molpot` turns learned representations into compositional, physics-aware outputs: energy, force, and stress derivation alongside classical potential terms.",
  },
  {
    icon: <IntegrationIcon className="w-8 h-8" />,
    title: "Reference Models",
    description:
      "`molzoo` assembles reference encoder families from the shared stack without collapsing the package boundaries.",
  },
];

const API_SNIPPETS = [
  {
    title: "Execution Layer",
    filename: "train.py",
    description:
      "`molix.Trainer` wraps any nn.Module with a hook-driven training loop. You supply the model, the loss, and an optimizer factory.",
    code: `import torch
from molix.core.trainer import Trainer

# Execution layer wraps any nn.Module.
trainer = Trainer(
    model=model,                                  # representation + potential
    loss_fn=loss_fn,                              # (pred, batch) -> scalar
    optimizer_factory=lambda p: torch.optim.Adam(p, lr=1e-3),
)

state = trainer.train(datamodule, max_epochs=50)
print(state["train/loss"])`,
  },
  {
    title: "Reference Models",
    filename: "encoders.py",
    description:
      "`molzoo` ships reference encoder families assembled from shared representation blocks. Each shares one interface and writes per-layer node features into the batch.",
    code: `# Every reference family in molzoo shares one encoder interface:
#   encoder(batch) -> batch with per-layer node features.
# Pick a family, then drop it into the Trainer above —
# swapping the architecture never touches the training loop.

batch = encoder(batch)   # per-layer node features (N, layers, dim)`,
  },
  {
    title: "Built-in Datasets",
    filename: "data.py",
    description:
      "Built-in datasets share one packed, mmap-friendly cache. Batches arrive as nested TensorDicts split into atoms / edges / graphs.",
    code: `# Built-in datasets share one packed, mmap-friendly cache.
# Batches are nested TensorDicts with a fixed namespace layout.
batch["atoms", "Z"]           # atomic numbers   (N,)
batch["atoms", "pos"]         # positions        (N, 3)
batch["edges", "edge_index"]  # source -> target (E, 2)
batch["graphs", "energy"]     # per-graph target (B,)`,
  },
];

const ACCENT = PRODUCT_ACCENTS.molnex;

export const MolnexLanding = () => {
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
        className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Background Blobs */}
        <div className="molecule-blob" style={{ top: "25%", left: "15%" }} aria-hidden="true" />
        <div
          className="molecule-blob"
          style={{ bottom: "30%", right: "20%", animationDelay: "4s" }}
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
          className="text-center w-full max-w-7xl mx-auto px-4 z-10 mb-32"
          variants={slideUp}
        >
          <motion.header className="flex flex-col items-center justify-center w-full">
            <motion.h3
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl",
                GRADIENT_TEXT,
                ACCENT.kicker,
                "font-['Playfair_Display',serif] italic font-medium mb-4 sm:mb-6 pb-2",
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Composable ML for chemistry.
            </motion.h3>

            <motion.h1
              className={cn(
                "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1.1] w-full mb-4 sm:mb-6 pb-4",
                GRADIENT_TEXT,
                ACCENT.title,
                "pt-2",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              MolNex
            </motion.h1>

            <motion.h2
              className={cn(
                "text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto",
                GRADIENT_TEXT,
                ACCENT.subhead,
                "pb-2",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              A molecular ML framework organized as four cooperating packages
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
              className={cn(
                "text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto",
                GRADIENT_TEXT,
                ACCENT.heading,
                "pb-2",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              What the{" "}
              <span
                className={cn(
                  "bg-gradient-to-r text-transparent bg-clip-text leading-relaxed",
                  ACCENT.headingSpan,
                )}
              >
                API
              </span>{" "}
              Feels Like
            </motion.h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
              The API surface is intentionally layered. The goal is reusable training
              infrastructure, reusable representations, reusable composition layers, and replaceable
              reference models.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Timeline-style capabilities menu (Naked text, pure interactions) */}
            <div className="w-full lg:w-5/12 relative pt-2">
              {/* Vertical continuous line */}
              <div className="absolute left-[8px] top-6 bottom-6 w-[1px] bg-zinc-800/80" />

              <div className="flex flex-col gap-10 relative">
                {API_SNIPPETS.map((cap, idx) => (
                  <button
                    key={cap.title}
                    type="button"
                    onClick={() => setActiveCodeIdx(idx)}
                    className={`text-left pl-10 transition-all duration-300 relative group outline-none ${
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
                    <p className="text-[15px] leading-relaxed text-zinc-400 font-light max-w-sm">
                      {cap.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Pure Naked Terminal Code Editor Representation */}
            <motion.div
              key={activeCodeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:w-7/12 sticky top-32"
            >
              <div className="rounded-2xl overflow-hidden bg-[#070707] border border-zinc-800/60 shadow-2xl relative">
                {/* Subtle top glow line */}
                <div
                  className={cn(
                    "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent",
                    ACCENT.glowLine,
                  )}
                />
                <div className="flex px-6 py-4 border-b border-zinc-800/40 items-center justify-between bg-[#0A0A0A]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono tracking-[0.15em] uppercase font-medium">
                    {API_SNIPPETS[activeCodeIdx].filename}
                  </div>
                </div>

                {/* Code Content Area with custom scrollbar hiding */}
                <div
                  className="p-6 md:p-8 overflow-x-auto text-[13px] sm:text-sm md:text-[15px] font-mono leading-relaxed bg-[#030303] min-h-[420px] flex items-center"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <SyntaxHighlighter
                    language={
                      API_SNIPPETS[activeCodeIdx].filename.endsWith(".sh") ? "bash" : "python"
                    }
                    style={vscDarkPlus}
                    customStyle={{
                      background: "transparent",
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      textShadow: "none",
                    }}
                    wrapLines={true}
                    showLineNumbers={false}
                  >
                    {API_SNIPPETS[activeCodeIdx].code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION (DOMAIN BREADTH) */}
      <section id="features" className="space-section gradient-bg-1 relative py-24 sm:py-32">
        <motion.div
          className="container mx-auto px-4 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="text-center mb-20" variants={slideUp}>
            <motion.h2
              className={cn(
                "text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto",
                GRADIENT_TEXT,
                ACCENT.heading,
                "pb-2",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              What MolNex{" "}
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
              The design keeps representations decoupled from trainers, so components stay
              interchangeable across the stack.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={staggerContainer}
          >
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center text-center group"
                variants={slideUp}
              >
                <div className={cn(ACCENT.icon, "mb-6", ACCENT.iconHover, "transition-colors")}>
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
