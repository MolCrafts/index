import atomOrbitalMoko from "@/assets/moko/atom_obital.png";
import flaskMoko from "@/assets/moko/flask.png";
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
  color: string;
  glow: string;
  mokoSrc: string;
  hex: string;
}

const originalNodes: NodeDetail[] = [
  {
    id: "molpy",
    title: "MolPy",
    description: "Programmable Python toolkit for molecular simulation workflows.",
    color: "text-blue-400",
    glow: "bg-blue-500",
    mokoSrc: molpyMoko,
    hex: "#3b82f6",
  },
  {
    id: "molvis",
    title: "MolVis",
    description: "Interactive 3D molecules — web, desktop, Jupyter.",
    color: "text-purple-400",
    glow: "bg-purple-500",
    mokoSrc: movisMoko,
    hex: "#a855f7",
  },
  {
    id: "molrec",
    title: "MolRec",
    description: "Backend-neutral record spec for atomistic data.",
    color: "text-amber-400",
    glow: "bg-amber-500",
    mokoSrc: molrecMoko,
    hex: "#f59e0b",
  },
  {
    id: "molcfg",
    title: "MolCfg",
    description: "Layered config with source tracking. Zero deps.",
    color: "text-emerald-400",
    glow: "bg-emerald-500",
    mokoSrc: molcfgMoko,
    hex: "#10b981",
  },
  {
    id: "mollog",
    title: "MolLog",
    description: "Structured Python logging. Zero dependencies.",
    color: "text-sky-400",
    glow: "bg-sky-500",
    mokoSrc: mollogMoko,
    hex: "#0ea5e9",
  },
  {
    id: "molq",
    title: "MolQ",
    description: "One job-queue API: local, slurm, pbs, lsf.",
    color: "text-pink-400",
    glow: "bg-pink-500",
    mokoSrc: atomOrbitalMoko,
    hex: "#ec4899",
  },
  {
    id: "molrs",
    title: "MolRs",
    description: "Rust molecular kernel — Python, WASM, C bindings.",
    color: "text-red-400",
    glow: "bg-red-500",
    mokoSrc: molrsMoko,
    hex: "#ef4444",
  },
  {
    id: "molexp",
    title: "MolExp",
    description: "Typed workflows, asset dedup, agent layer for experiments.",
    color: "text-indigo-400",
    glow: "bg-indigo-500",
    mokoSrc: flaskMoko,
    hex: "#6366f1",
  },
  {
    id: "molnex",
    title: "MolNex",
    description: "Layered ML framework: training, representation, potentials, model zoo.",
    color: "text-cyan-400",
    glow: "bg-cyan-500",
    mokoSrc: molnexMoko,
    hex: "#06b6d4",
  },
  {
    id: "molpack",
    title: "MolPack",
    description: "Packmol-grade molecular packing engine — CLI, Rust crate, Python package.",
    color: "text-orange-400",
    glow: "bg-orange-500",
    mokoSrc: molpackMoko,
    hex: "#f97316",
  },
];

const categoryGroups = [
  {
    label: "Application",
    hex: "#3b82f6",
    nodeIds: ["molpy", "molvis", "molnex", "molpack", "molexp"],
  },
  {
    label: "Infrastructure",
    hex: "#10b981",
    nodeIds: ["molrs", "molcfg", "mollog", "molq"],
  },
  {
    label: "Specification",
    hex: "#f59e0b",
    nodeIds: ["molrec"],
  },
];

export const EcosystemArchitecture = () => {
  const NodeCard = ({ node }: { node: NodeDetail }) => (
    <motion.a
      href={`/${node.id}`}
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
                    animation: marquee 60s linear infinite;
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
