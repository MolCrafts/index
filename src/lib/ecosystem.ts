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
        color: "text-blue-500",
        bg: "hover:bg-blue-500/10",
      },
      {
        title: "MolVis",
        href: "/molvis",
        role: "visualization",
        description: "Interactive 3D molecules — browser, editor, notebooks.",
        color: "text-purple-500",
        bg: "hover:bg-purple-500/10",
      },
      {
        title: "MolNex",
        href: "/molnex",
        role: "ML framework",
        description: "Layered ML framework: training, representation, potentials, model zoo.",
        color: "text-cyan-500",
        bg: "hover:bg-cyan-500/10",
      },
      {
        title: "MolPack",
        href: "/molpack",
        role: "system builder",
        description: "Molecular packing engine — CLI, Rust crate, Python package.",
        color: "text-orange-500",
        bg: "hover:bg-orange-500/10",
      },
      {
        title: "MolExp",
        href: "/molexp",
        role: "experiments",
        description: "Typed workflows, asset dedup, agent layer for experiments.",
        color: "text-indigo-500",
        bg: "hover:bg-indigo-500/10",
      },
      {
        title: "MolHub",
        href: "https://github.com/MolCrafts/molhub",
        external: true,
        role: "datasets",
        description: "Common dataset protocols, built-in molecular benchmarks, and uploaders.",
        color: "text-lime-500",
        bg: "hover:bg-lime-500/10",
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
        color: "text-red-500",
        bg: "hover:bg-red-500/10",
      },
      {
        title: "MolCfg",
        href: "/molcfg",
        role: "config",
        description: "Layered config with source tracking. One dep (pyyaml).",
        color: "text-emerald-500",
        bg: "hover:bg-emerald-500/10",
      },
      {
        title: "MolLog",
        href: "/mollog",
        role: "logging",
        description: "Structured Python logging, stdlib-compatible.",
        color: "text-sky-500",
        bg: "hover:bg-sky-500/10",
      },
      {
        title: "MolQ",
        href: "/molq",
        role: "job queue",
        description: "One job-queue API: local, slurm, pbs, lsf.",
        color: "text-pink-500",
        bg: "hover:bg-pink-500/10",
      },
      {
        title: "MolMCP",
        href: "https://github.com/MolCrafts/molmcp",
        external: true,
        role: "agent tools",
        description: "MCP server: graph-based code discovery plus ecosystem providers.",
        color: "text-violet-500",
        bg: "hover:bg-violet-500/10",
      },
      {
        title: "MolQRC",
        href: "https://github.com/MolCrafts/molqrc",
        external: true,
        role: "QR core",
        description: "QR Code generator with a C core, Python API, and CLI.",
        color: "text-fuchsia-500",
        bg: "hover:bg-fuchsia-500/10",
      },
      {
        title: "Symphony",
        href: "https://github.com/MolCrafts/molcrafts-symphony",
        external: true,
        role: "agent runner",
        description: "MolCrafts Symphony runs GitHub Project issues through coding agents.",
        color: "text-rose-500",
        bg: "hover:bg-rose-500/10",
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
        color: "text-amber-500",
        bg: "hover:bg-amber-500/10",
      },
    ],
  },
];
