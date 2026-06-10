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

export const ecosystemCategories: EcosystemCategory[] = [
  {
    title: "Application",
    items: [
      {
        title: "MolPy",
        href: "/molpy",
        role: "toolkit",
        description: "Programmable Python toolkit for molecular simulation workflows.",
        color: PRODUCT_ACCENTS.molpy.chip.color,
        bg: PRODUCT_ACCENTS.molpy.chip.bg,
      },
      {
        title: "MolVis",
        href: "/molvis",
        role: "visualization",
        description: "Interactive 3D molecules — browser, editor, notebooks.",
        color: PRODUCT_ACCENTS.molvis.chip.color,
        bg: PRODUCT_ACCENTS.molvis.chip.bg,
      },
      {
        title: "MolNex",
        href: "/molnex",
        role: "ML framework",
        description: "Layered ML framework: training, representation, potentials, model zoo.",
        color: PRODUCT_ACCENTS.molnex.chip.color,
        bg: PRODUCT_ACCENTS.molnex.chip.bg,
      },
      {
        title: "MolPack",
        href: "/molpack",
        role: "system builder",
        description: "Molecular packing engine — CLI, Rust crate, Python package.",
        color: PRODUCT_ACCENTS.molpack.chip.color,
        bg: PRODUCT_ACCENTS.molpack.chip.bg,
      },
      {
        title: "MolExp",
        href: "/molexp",
        role: "experiments",
        description: "Typed workflows, asset dedup, agent layer for experiments.",
        color: PRODUCT_ACCENTS.molexp.chip.color,
        bg: PRODUCT_ACCENTS.molexp.chip.bg,
      },
      {
        title: "MolHub",
        href: "https://github.com/MolCrafts/molhub",
        external: true,
        role: "datasets",
        description: "Common dataset protocols, built-in molecular benchmarks, and uploaders.",
        color: CHIP_ONLY_ACCENTS.molhub.color,
        bg: CHIP_ONLY_ACCENTS.molhub.bg,
      },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      {
        title: "MolRs",
        href: "/molrs",
        role: "Rust kernel",
        description: "Rust molecular kernel — Python, WASM, C bindings.",
        color: PRODUCT_ACCENTS.molrs.chip.color,
        bg: PRODUCT_ACCENTS.molrs.chip.bg,
      },
      {
        title: "MolCfg",
        href: "/molcfg",
        role: "config",
        description: "Layered config with source tracking. One dep (pyyaml).",
        color: PRODUCT_ACCENTS.molcfg.chip.color,
        bg: PRODUCT_ACCENTS.molcfg.chip.bg,
      },
      {
        title: "MolLog",
        href: "/mollog",
        role: "logging",
        description: "Structured Python logging, stdlib-compatible.",
        color: PRODUCT_ACCENTS.mollog.chip.color,
        bg: PRODUCT_ACCENTS.mollog.chip.bg,
      },
      {
        title: "MolQ",
        href: "/molq",
        role: "job queue",
        description: "One job-queue API: local, slurm, pbs, lsf.",
        color: PRODUCT_ACCENTS.molq.chip.color,
        bg: PRODUCT_ACCENTS.molq.chip.bg,
      },
      {
        title: "MolMCP",
        href: "https://github.com/MolCrafts/molmcp",
        external: true,
        role: "agent tools",
        description: "MCP server: graph-based code discovery plus ecosystem providers.",
        color: CHIP_ONLY_ACCENTS.molmcp.color,
        bg: CHIP_ONLY_ACCENTS.molmcp.bg,
      },
      {
        title: "MolQRC",
        href: "https://github.com/MolCrafts/molqrc",
        external: true,
        role: "QR core",
        description: "QR Code generator with a C core, Python API, and CLI.",
        color: CHIP_ONLY_ACCENTS.molqrc.color,
        bg: CHIP_ONLY_ACCENTS.molqrc.bg,
      },
    ],
  },
  {
    title: "Specification",
    items: [
      {
        title: "MolRec",
        href: "/molrec",
        role: "record spec",
        description: "Backend-neutral record spec for atomistic data.",
        color: PRODUCT_ACCENTS.molrec.chip.color,
        bg: PRODUCT_ACCENTS.molrec.chip.bg,
      },
    ],
  },
];
