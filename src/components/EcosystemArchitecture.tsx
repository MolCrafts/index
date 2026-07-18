import atomOrbitalMoko from "@/assets/moko/atom_obital.png";
import coffeeMoko from "@/assets/moko/coffee.png";
import cookMoko from "@/assets/moko/cook.png";
import flaskMoko from "@/assets/moko/flask.png";
import happyMoko from "@/assets/moko/happy.png";
import masterMoko from "@/assets/moko/master.png";
import mokoMoko from "@/assets/moko/moko.png";
import molcfgMoko from "@/assets/moko/molcfg.png";
import mollogMoko from "@/assets/moko/mollog.png";
import molnexMoko from "@/assets/moko/molnex.png";
import molpackMoko from "@/assets/moko/molpack.png";
import molpyMoko from "@/assets/moko/molpy.png";
import molrecMoko from "@/assets/moko/molrec.png";
import molrsMoko from "@/assets/moko/molrs.png";
import movisMoko from "@/assets/moko/movis.png";
import { motion } from "framer-motion";
import { slideUp } from "../lib/animations";

interface NodeDetail {
  id: string;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  color: string;
  glow: string;
  mokoSrc: string;
  hex: string;
}

const originalNodes: NodeDetail[] = [
  {
    id: "molpy",
    title: "MolPy",
    description:
      "Python toolkit for molecular workflows: parsing, building, editing, typing, analyzing, packing, and simulation I/O.",
    color: "text-blue-400",
    glow: "bg-blue-500",
    mokoSrc: molpyMoko,
    hex: "#3b82f6",
  },
  {
    id: "molrs",
    title: "MolRs",
    description:
      "Rust core for molecular data structures, I/O, conformers, force fields, trajectory analysis, Python bindings, and WASM.",
    color: "text-red-400",
    glow: "bg-red-500",
    mokoSrc: molrsMoko,
    hex: "#ef4444",
  },
  {
    id: "molpack",
    title: "MolPack",
    description:
      "Packmol-grade molecular packing in Rust, with a Packmol-compatible CLI plus Rust and Python APIs.",
    color: "text-orange-400",
    glow: "bg-orange-500",
    mokoSrc: molpackMoko,
    hex: "#f97316",
  },
  {
    id: "molnex",
    title: "MolNex",
    description:
      "Layered molecular ML framework for training, representations, potential composition, and reference model families.",
    color: "text-cyan-400",
    glow: "bg-cyan-500",
    mokoSrc: molnexMoko,
    hex: "#06b6d4",
  },
  {
    id: "molrec",
    title: "MolRec",
    description:
      "Backend-neutral atomistic record contract for frames, trajectories, observables, status, metrics, and metadata.",
    color: "text-amber-400",
    glow: "bg-amber-500",
    mokoSrc: molrecMoko,
    hex: "#f59e0b",
  },
  {
    id: "molexp",
    title: "MolExp",
    description:
      "Agent-assisted experiment platform with typed workflow graphs, tracked runs, artifact lineage, FastAPI, and a React UI.",
    color: "text-indigo-400",
    glow: "bg-indigo-500",
    mokoSrc: flaskMoko,
    hex: "#6366f1",
  },
  {
    id: "molq",
    title: "MolQ",
    description:
      "Unified job queue for local execution and HPC schedulers including SLURM, PBS, and LSF.",
    color: "text-pink-400",
    glow: "bg-pink-500",
    mokoSrc: atomOrbitalMoko,
    hex: "#ec4899",
  },
  {
    id: "molhub",
    title: "MolHub",
    description:
      "Dataset access layer for molecular benchmarks, custom datasets, and uploads to public repositories.",
    href: "https://github.com/MolCrafts/molhub",
    external: true,
    color: "text-lime-400",
    glow: "bg-lime-500",
    mokoSrc: coffeeMoko,
    hex: "#84cc16",
  },
  {
    id: "molvis",
    title: "MolVis",
    description:
      "Interactive 3D inspection, editing, measurement, and trajectory playback for the web, VSCode, and Jupyter.",
    color: "text-purple-400",
    glow: "bg-purple-500",
    mokoSrc: movisMoko,
    hex: "#a855f7",
  },
  {
    id: "molplot",
    title: "MolPlot",
    description:
      "Unified scientific charting — one Vega-Lite spec, two renderers (web + matplotlib).",
    href: "https://github.com/MolCrafts/molplot",
    external: true,
    color: "text-teal-400",
    glow: "bg-teal-500",
    mokoSrc: happyMoko,
    hex: "#14b8a6",
  },
  {
    id: "molmcp",
    title: "MolMCP",
    description:
      "MCP server and graph-based codebase discovery for exposing MolCrafts capabilities to AI agents.",
    href: "https://github.com/MolCrafts/molmcp",
    external: true,
    color: "text-violet-400",
    glow: "bg-violet-500",
    mokoSrc: masterMoko,
    hex: "#8b5cf6",
  },
  {
    id: "molcfg",
    title: "MolCfg",
    description:
      "Layered configuration with source tracking, validation, profiles, interpolation, and thread-safe access.",
    color: "text-emerald-400",
    glow: "bg-emerald-500",
    mokoSrc: molcfgMoko,
    hex: "#10b981",
  },
  {
    id: "mollog",
    title: "MolLog",
    description:
      "Structured Python logging with stdlib-compatible APIs, JSON/Rich formatting, and context propagation.",
    color: "text-sky-400",
    glow: "bg-sky-500",
    mokoSrc: mollogMoko,
    hex: "#0ea5e9",
  },
  {
    id: "molqrc",
    title: "MolQRC",
    description: "High-quality QR code generator library in Rust.",
    href: "https://github.com/MolCrafts/molqrc",
    external: true,
    color: "text-fuchsia-400",
    glow: "bg-fuchsia-500",
    mokoSrc: mokoMoko,
    hex: "#d946ef",
  },
  {
    id: "harness",
    title: "Harness",
    description:
      "Claude Code–first plugin marketplace and agent harness for MolCrafts development.",
    href: "https://github.com/MolCrafts/molcrafts-harness",
    external: true,
    color: "text-zinc-300",
    glow: "bg-zinc-500",
    mokoSrc: cookMoko,
    hex: "#a1a1aa",
  },
  {
    id: "zensical",
    title: "Zensical Theme",
    description: "Shared Zensical theme extension for MolCrafts documentation sites.",
    href: "https://github.com/MolCrafts/molcrafts-zensical-theme",
    external: true,
    color: "text-stone-300",
    glow: "bg-stone-500",
    mokoSrc: mokoMoko,
    hex: "#a8a29e",
  },
];

const categoryGroups = [
  {
    label: "Core",
    hex: "#3b82f6",
    nodeIds: ["molpy", "molrs", "molpack", "molnex", "molrec"],
  },
  {
    label: "Workflow",
    hex: "#6366f1",
    nodeIds: ["molexp", "molq", "molhub"],
  },
  {
    label: "Interfaces",
    hex: "#a855f7",
    nodeIds: ["molvis", "molplot", "molmcp"],
  },
  {
    label: "Libraries",
    hex: "#10b981",
    nodeIds: ["molcfg", "mollog", "molqrc"],
  },
  {
    label: "Tools",
    hex: "#a1a1aa",
    nodeIds: ["harness", "zensical"],
  },
];

export const EcosystemArchitecture = () => {
  const getNodeHref = (node: NodeDetail) => node.href ?? `/${node.id}`;

  const NodeCard = ({ node }: { node: NodeDetail }) => (
    <motion.a
      href={getNodeHref(node)}
      target={node.external ? "_blank" : undefined}
      rel={node.external ? "noreferrer noopener" : undefined}
      className="w-[220px] h-[220px] shrink-0 bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-4 cursor-pointer group no-underline relative overflow-hidden"
      draggable="false"
      whileHover={{
        y: -8,
        boxShadow: `0 16px 48px ${node.hex}28, 0 0 0 1px ${node.hex}22`,
        borderColor: `${node.hex}30`,
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {/* Colored top accent */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${node.hex}90, transparent)`,
        }}
      />

      {/* Header row: large icon + title on same line */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${node.hex}18` }}
        >
          <img
            src={node.mokoSrc}
            alt={node.title}
            className="w-12 h-12 object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
            draggable="false"
          />
        </div>
        <h3 className={`text-lg font-bold tracking-tight ${node.color}`}>{node.title}</h3>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-500 font-light leading-relaxed line-clamp-4 flex-grow min-h-0">
        {node.description}
      </p>
    </motion.a>
  );

  const CategoryDivider = ({ label, hex }: { label: string; hex: string }) => (
    <div className="flex flex-col items-center justify-center shrink-0 w-12 h-[220px] select-none gap-2 mx-1">
      <div
        className="w-px flex-1"
        style={{
          background: `linear-gradient(to bottom, transparent, ${hex}60)`,
        }}
      />
      <span
        className="text-[10px] font-bold tracking-[0.35em] uppercase [writing-mode:vertical-rl] rotate-180"
        style={{ color: `${hex}cc` }}
      >
        {label}
      </span>
      <div
        className="w-px flex-1"
        style={{
          background: `linear-gradient(to top, transparent, ${hex}60)`,
        }}
      />
    </div>
  );

  const MarqueeSequence = () => (
    <div className="flex gap-4 md:gap-5 pr-4 md:pr-5 items-center">
      {categoryGroups.map((group) => (
        <div key={group.label} className="flex gap-4 md:gap-5 items-center">
          <CategoryDivider label={group.label} hex={group.hex} />
          {group.nodeIds.map((id) => {
            const node = originalNodes.find((n) => n.id === id);
            return node ? <NodeCard key={id} node={node} /> : null;
          })}
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="architecture"
      className="py-20 md:py-32 relative bg-transparent overflow-hidden flex flex-col justify-center"
    >
      {/* CSS for perfect seamless marquee loop */}
      <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 70s linear infinite;
                }
            `}</style>

      <div className="container mx-auto px-4 lg:px-8 max-w-5xl z-10 mb-16">
        <div className="flex flex-col gap-6">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6">
              <div className="w-12 h-[1px] bg-primary opacity-50" />
              Projects
            </div>
            <p className="text-2xl md:text-3xl text-foreground font-light leading-snug max-w-3xl">
              Separate by design. Unified by purpose.
            </p>
            <p className="mt-4 text-base text-muted-foreground font-light max-w-2xl">
              User-facing <span className="text-foreground/80">mol*</span> products, plus{" "}
              <span className="text-foreground/80">molcrafts-*</span> developer tools that keep the
              ecosystem buildable, documentable, and agent-ready.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full-width Automatic Marquee */}
      <div className="w-full relative z-10 group overflow-hidden py-4">
        {/* Visual fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center">
          {/* Two sequences allow -50% translateX to loop perfectly */}
          <MarqueeSequence />
          <MarqueeSequence />
        </div>
      </div>
    </section>
  );
};
