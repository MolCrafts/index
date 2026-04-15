import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  AnalysisIcon,
  CollaborationIcon,
  DataIcon,
  IntegrationIcon,
  SimulationIcon,
  WorkflowIcon,
} from "../../components/FeatureIcons";
import { fadeIn, slideUp, staggerContainer } from "../../lib/animations";

const MoleculeOverlay = lazy(() =>
  import("../../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

const FEATURES = [
  {
    icon: <IntegrationIcon className="w-8 h-8" />,
    title: "Layered Loading",
    description:
      "Layered loading from dicts, TOML/JSON files, environment variables, and CLI arguments.",
  },
  {
    icon: <AnalysisIcon className="w-8 h-8" />,
    title: "Source Tracking",
    description:
      "Source tracking via Config.meta() for every value, showing exact provenance and override history.",
  },
  {
    icon: <WorkflowIcon className="w-8 h-8" />,
    title: "Interpolation",
    description:
      "Native support for ${path.to.key} and ${env:VAR} interpolation directly in your configuration.",
  },
  {
    icon: <SimulationIcon className="w-8 h-8" />,
    title: "Schema Validation",
    description:
      "Recursive schema validation with defaults, strict mode, and built-in constraints.",
  },
  {
    icon: <CollaborationIcon className="w-8 h-8" />,
    title: "Merge Strategies",
    description:
      "DEEP_MERGE, OVERRIDE, and APPEND strategies — all returning isolated immutable copies.",
  },
  {
    icon: <DataIcon className="w-8 h-8" />,
    title: "Thread-Safe",
    description:
      "Thread-safe wrapper and POSIX file lock for reliable concurrent access across processes.",
  },
];

const API_SNIPPETS = [
  {
    title: "Layered Loading",
    filename: "layered_load.py",
    description:
      "Chain multiple configuration sources naturally. Later sources override earlier ones, allowing defaults to be securely augmented by environment or CLI.",
    code: `from molcfg import CliSource, ConfigLoader, DictSource, EnvSource

cfg = ConfigLoader([
    DictSource({"db": {"host": "localhost", "port": 5432}}, name="defaults"),
    EnvSource(prefix="APP", name="env"),
    CliSource(["--db.port=6432"], name="cli"),
]).load()

assert cfg["db.port"] == 6432`,
  },
  {
    title: "Source Tracking",
    filename: "source_meta.py",
    description:
      "Never guess where a config value came from. Retrieve complete history of overlays to debug configuration drifts instantly.",
    code: `from molcfg import ConfigLoader

# Assuming the configuration loader from the previous snippet...
loader = ConfigLoader([...])
cfg = loader.load()

# Inspect metadata to trace value origins
meta = cfg.meta("db.port")
print(meta)
# {"source": "cli", "history": ("defaults", "cli")}`,
  },
  {
    title: "Variable Interpolation",
    filename: "interpolation.py",
    description:
      "Link configuration paths dynamically or inject system environment variables into nested properties.",
    code: `from molcfg import ConfigLoader, DictSource

cfg = ConfigLoader([
    DictSource({
        "server": {"host": "127.0.0.1", "port": 8080},
        "url": "http://\${server.host}:\${server.port}/api",
        "secret": "\${env:API_SECRET}"
    })
]).load()

print(cfg["url"])
# "http://127.0.0.1:8080/api"`,
  },
  {
    title: "Zero Dependencies",
    filename: "install.sh",
    description:
      "Keep your docker images lean and your environment clean. Built entirely on the standard library with no external dependencies.",
    code: `# Installation is as simple as pip installing
pip install molcrafts-molcfg

# No other packages required!`,
  },
];

export const MolcfgLanding = () => {
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
              className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text font-['Playfair_Display',serif] italic font-medium mb-4 sm:mb-6 pb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Configs without ceremony.
            </motion.h3>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1.1] w-full mb-4 sm:mb-6 pb-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              MolCfg
            </motion.h1>

            <motion.h2
              className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-lime-400 via-emerald-300 to-lime-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Zero-Dependency Configuration Library for Python
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
              className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              What the{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text leading-relaxed">
                API
              </span>{" "}
              Feels Like
            </motion.h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
              The examples here follow the README directly: layered loading, source tracking,
              interpolation, schema validation, and immutable merge behavior without runtime
              dependencies.
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
                        activeCodeIdx === idx
                          ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                          : "bg-zinc-900 border border-zinc-700"
                      }`}
                    >
                      {activeCodeIdx === idx && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>

                    <div
                      className={`mb-2 transition-colors duration-300 ${activeCodeIdx === idx ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"}`}
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
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
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
              className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              What MolCfg{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text leading-relaxed">
                Covers
              </span>
            </motion.h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-4xl mx-auto">
              The API above shows how the toolkit feels to use. The features below show how the
              package is designed to handle every edge case when dealing with configurations in your
              python package.
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
                <div className="text-emerald-500 mb-6 group-hover:text-emerald-400 transition-colors">
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
