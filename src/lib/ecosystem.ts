import { CHIP_ONLY_ACCENTS, PRODUCT_ACCENTS } from "./productAccents";

export interface EcosystemItem {
  title: string;
  href: string;
  external?: boolean;
  role: string;
  description: string;
  color: string;
  bg: string;
}

export interface EcosystemCategory {
  title: string;
  items: EcosystemItem[];
}

/**
 * Homepage / nav / footer catalog.
 * `mol*` products are user-facing; Tools holds `molcrafts-*` developer tooling.
 */
export const ecosystemCategories: EcosystemCategory[] = [
  {
    title: "Core",
    items: [
      {
        title: "MolPy",
        href: "/molpy",
        role: "toolkit",
        description:
          "Python toolkit for molecular workflows: parsing, building, editing, typing, analyzing, packing, and simulation I/O.",
        color: PRODUCT_ACCENTS.molpy.chip.color,
        bg: PRODUCT_ACCENTS.molpy.chip.bg,
      },
      {
        title: "MolRs",
        href: "/molrs",
        role: "Rust kernel",
        description:
          "Rust core for molecular data structures, I/O, conformers, force fields, trajectory analysis, Python bindings, and WASM.",
        color: PRODUCT_ACCENTS.molrs.chip.color,
        bg: PRODUCT_ACCENTS.molrs.chip.bg,
      },
      {
        title: "MolPack",
        href: "/molpack",
        role: "packing",
        description:
          "Packmol-grade molecular packing in Rust, with a Packmol-compatible CLI plus Rust and Python APIs.",
        color: PRODUCT_ACCENTS.molpack.chip.color,
        bg: PRODUCT_ACCENTS.molpack.chip.bg,
      },
      {
        title: "MolNex",
        href: "/molnex",
        role: "ML framework",
        description:
          "Layered molecular ML framework for training, representations, potential composition, and reference model families.",
        color: PRODUCT_ACCENTS.molnex.chip.color,
        bg: PRODUCT_ACCENTS.molnex.chip.bg,
      },
      {
        title: "MolRec",
        href: "/molrec",
        role: "record spec",
        description:
          "Backend-neutral atomistic record contract for frames, trajectories, observables, status, metrics, and metadata.",
        color: PRODUCT_ACCENTS.molrec.chip.color,
        bg: PRODUCT_ACCENTS.molrec.chip.bg,
      },
    ],
  },
  {
    title: "Workflow",
    items: [
      {
        title: "MolExp",
        href: "/molexp",
        role: "experiments",
        description:
          "Agent-assisted experiment platform with typed workflow graphs, tracked runs, artifact lineage, FastAPI, and a React UI.",
        color: PRODUCT_ACCENTS.molexp.chip.color,
        bg: PRODUCT_ACCENTS.molexp.chip.bg,
      },
      {
        title: "MolQ",
        href: "/molq",
        role: "job queue",
        description:
          "Unified job queue for local execution and HPC schedulers including SLURM, PBS, and LSF.",
        color: PRODUCT_ACCENTS.molq.chip.color,
        bg: PRODUCT_ACCENTS.molq.chip.bg,
      },
      {
        title: "MolHub",
        href: "https://github.com/MolCrafts/molhub",
        external: true,
        role: "datasets",
        description:
          "Dataset access layer for molecular benchmarks, custom datasets, and uploads to public repositories.",
        color: CHIP_ONLY_ACCENTS.molhub.color,
        bg: CHIP_ONLY_ACCENTS.molhub.bg,
      },
    ],
  },
  {
    title: "Interfaces",
    items: [
      {
        title: "MolVis",
        href: "/molvis",
        role: "visualization",
        description:
          "Interactive 3D inspection, editing, measurement, and trajectory playback for the web, VSCode, and Jupyter.",
        color: PRODUCT_ACCENTS.molvis.chip.color,
        bg: PRODUCT_ACCENTS.molvis.chip.bg,
      },
      {
        title: "MolPlot",
        href: "https://github.com/MolCrafts/molplot",
        external: true,
        role: "charting",
        description:
          "Unified scientific charting — one Vega-Lite spec, two renderers (web + matplotlib).",
        color: CHIP_ONLY_ACCENTS.molplot.color,
        bg: CHIP_ONLY_ACCENTS.molplot.bg,
      },
      {
        title: "MolMCP",
        href: "https://github.com/MolCrafts/molmcp",
        external: true,
        role: "agent tools",
        description:
          "MCP server and graph-based codebase discovery for exposing MolCrafts capabilities to AI agents.",
        color: CHIP_ONLY_ACCENTS.molmcp.color,
        bg: CHIP_ONLY_ACCENTS.molmcp.bg,
      },
    ],
  },
  {
    title: "Libraries",
    items: [
      {
        title: "MolCfg",
        href: "/molcfg",
        role: "config",
        description:
          "Layered configuration with source tracking, validation, profiles, interpolation, and thread-safe access.",
        color: PRODUCT_ACCENTS.molcfg.chip.color,
        bg: PRODUCT_ACCENTS.molcfg.chip.bg,
      },
      {
        title: "MolLog",
        href: "/mollog",
        role: "logging",
        description:
          "Structured Python logging with stdlib-compatible APIs, JSON/Rich formatting, and context propagation.",
        color: PRODUCT_ACCENTS.mollog.chip.color,
        bg: PRODUCT_ACCENTS.mollog.chip.bg,
      },
      {
        title: "MolQRC",
        href: "https://github.com/MolCrafts/molqrc",
        external: true,
        role: "QR core",
        description: "High-quality QR code generator library in Rust.",
        color: CHIP_ONLY_ACCENTS.molqrc.color,
        bg: CHIP_ONLY_ACCENTS.molqrc.bg,
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        title: "Harness",
        href: "https://github.com/MolCrafts/molcrafts-harness",
        external: true,
        role: "agent harness",
        description:
          "Claude Code–first plugin marketplace and agent harness for MolCrafts development.",
        color: CHIP_ONLY_ACCENTS.harness.color,
        bg: CHIP_ONLY_ACCENTS.harness.bg,
      },
      {
        title: "Zensical Theme",
        href: "https://github.com/MolCrafts/molcrafts-zensical-theme",
        external: true,
        role: "docs theme",
        description: "Shared Zensical theme extension for MolCrafts documentation sites.",
        color: CHIP_ONLY_ACCENTS.zensical.color,
        bg: CHIP_ONLY_ACCENTS.zensical.bg,
      },
    ],
  },
];
