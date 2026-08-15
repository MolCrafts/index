import { APPLICATION_GITHUB_DESCRIPTIONS as APP_DESC } from "../src/lib/home/copy/applications";

export interface OgRoute {
  path: string;
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  gradient: [string, string, string];
  subGradient: [string, string, string];
  ogTitle: string;
  ogDescription: string;
}

export const routes: OgRoute[] = [
  {
    path: "/",
    slug: "index",
    kicker: "Molecular and materials R&D",
    title: "MolCrafts",
    subtitle: "Scientific computing, AI applications, and research collaboration",
    gradient: ["#2a6744", "#55a572", "#18432b"],
    subGradient: ["#c8841d", "#f2da9d", "#c8841d"],
    ogTitle: "MolCrafts – Molecular and materials R&D",
    ogDescription:
      "MolCrafts brings scientific computing, AI, and research expertise to molecular and materials R&D, from application exploration to long-term collaboration.",
  },
  {
    path: "/molpy",
    slug: "molpy",
    kicker: "One structure, every engine.",
    title: "MolPy",
    subtitle: "A programmable toolkit for molecular simulation workflows",
    gradient: ["#38bdf8", "#67e8f9", "#38bdf8"],
    subGradient: ["#60a5fa", "#93c5fd", "#60a5fa"],
    ogTitle: "MolPy – Programmable toolkit for molecular simulation workflows",
    ogDescription: `${APP_DESC.molpy}. Part of MolCrafts.`,
  },
  {
    path: "/molvis",
    slug: "molvis",
    kicker: "See it before you trust it.",
    title: "MolVis",
    subtitle: "Interactive 3D molecular visualization for web, VS Code, and Jupyter",
    gradient: ["#e879f9", "#f9a8d4", "#e879f9"],
    subGradient: ["#c084fc", "#e9d5ff", "#c084fc"],
    ogTitle: "MolVis – Interactive 3D molecular visualization",
    ogDescription: `${APP_DESC.molvis}. Part of MolCrafts.`,
  },
  {
    path: "/molrec",
    slug: "molrec",
    kicker: "One shape for atomistic data.",
    title: "MolRec",
    subtitle: "Backend-neutral record contract for atomistic data",
    gradient: ["#fb923c", "#fde047", "#fb923c"],
    subGradient: ["#fbbf24", "#fcd34d", "#fbbf24"],
    ogTitle: "MolRec – Backend-neutral record contract for atomistic data",
    ogDescription:
      "Frames, trajectories, observables, status, and metadata — one contract. Part of MolCrafts.",
  },
  {
    path: "/molcfg",
    slug: "molcfg",
    kicker: "Configs without ceremony.",
    title: "MolCfg",
    subtitle: "Layered configuration — loading, merging, validation, source tracking",
    gradient: ["#2dd4bf", "#67e8f9", "#2dd4bf"],
    subGradient: ["#34d399", "#6ee7b7", "#34d399"],
    ogTitle: "MolCfg – Layered configuration for Python",
    ogDescription:
      "Predictable loading, merging, validation, and source tracking. Part of MolCrafts.",
  },
  {
    path: "/mollog",
    slug: "mollog",
    kicker: "Logs you can query later.",
    title: "MolLog",
    subtitle: "Structured logging for Python with a stdlib-compatible API",
    gradient: ["#22d3ee", "#5eead4", "#22d3ee"],
    subGradient: ["#38bdf8", "#7dd3fc", "#38bdf8"],
    ogTitle: "MolLog – Structured logging for Python, stdlib-compatible",
    ogDescription:
      "No import logging required — structured extra fields, JSON, context. Part of MolCrafts.",
  },
  {
    path: "/molq",
    slug: "molq",
    kicker: "One queue, every cluster.",
    title: "MolQ",
    subtitle: "One submission API for local, SLURM, PBS, and LSF",
    gradient: ["#fb7185", "#f0abfc", "#fb7185"],
    subGradient: ["#f472b6", "#f9a8d4", "#f472b6"],
    ogTitle: "MolQ – Unified job queue for local and HPC",
    ogDescription: "One submission API for local, SLURM, PBS, and LSF. Part of MolCrafts.",
  },
  {
    path: "/molrs",
    slug: "molrs",
    kicker: "Rust speed. Python ease.",
    title: "MolRs",
    subtitle: "Rust core for molecular modeling — data structures, I/O, and compute",
    gradient: ["#fb923c", "#fcd34d", "#fb923c"],
    subGradient: ["#f87171", "#fca5a5", "#f87171"],
    ogTitle: "MolRs – Rust core for molecular modeling",
    ogDescription:
      "Data structures, I/O, and compute kernels — native and in the browser. Part of MolCrafts.",
  },
  {
    path: "/molexp",
    slug: "molexp",
    kicker: "Rerun it in two years.",
    title: "MolExp",
    subtitle: "Agent-assisted workflows with tracked runs and artifact lineage",
    gradient: ["#a78bfa", "#d8b4fe", "#a78bfa"],
    subGradient: ["#818cf8", "#a5b4fc", "#818cf8"],
    ogTitle: "MolExp – Agent-assisted workflows with tracked runs and artifact lineage",
    ogDescription: `${APP_DESC.molexp}. Part of MolCrafts.`,
  },
  {
    path: "/molnex",
    slug: "molnex",
    kicker: "Composable ML for chemistry.",
    title: "MolNex",
    subtitle: "Machine-learning framework for interatomic potentials",
    gradient: ["#2dd4bf", "#6ee7b7", "#2dd4bf"],
    subGradient: ["#22d3ee", "#67e8f9", "#22d3ee"],
    ogTitle: "MolNex – Machine-learning framework for interatomic potentials",
    ogDescription: `${APP_DESC.molnex}. Part of MolCrafts.`,
  },
  {
    path: "/molpack",
    slug: "molpack",
    kicker: "Pack first. Simulate clean.",
    title: "MolPack",
    subtitle: "Molecular packing in Rust, with a native Python API",
    gradient: ["#fbbf24", "#fdba74", "#fbbf24"],
    subGradient: ["#fb923c", "#fdba74", "#fb923c"],
    ogTitle: "MolPack – Molecular packing with a native Python API",
    ogDescription: `${APP_DESC.molpack}. Part of MolCrafts.`,
  },
  {
    path: "/atomiverse",
    slug: "atomiverse",
    kicker: "One engine. Many methods.",
    title: "Atomiverse",
    subtitle: "Simulation engine for molecular dynamics and electronic structure",
    gradient: ["#84cc16", "#4ade80", "#84cc16"],
    subGradient: ["#a3e635", "#86efac", "#a3e635"],
    ogTitle: "Atomiverse – Simulation engine for molecular dynamics and electronic structure",
    ogDescription: `${APP_DESC.atomiverse}. Part of MolCrafts.`,
  },
];
