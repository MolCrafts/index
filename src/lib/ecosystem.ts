import { CHIP_ONLY_ACCENTS, PRODUCT_ACCENTS } from "./productAccents";

export interface EcosystemItem {
  title: string;
  href: string;
  external?: boolean;
  role: string;
  /** One-line pitch aligned with the package README tagline. */
  description: string;
  /** Shown when a package is not installable yet. Omit for shipping packages. */
  status?: string;
  color: string;
  bg: string;
  /** Soft brand hex for glows / accent text (not borders). */
  hex: string;
}

export interface EcosystemCategory {
  title: string;
  /** One line explaining the layer to someone who has never seen the stack. */
  blurb: string;
  items: EcosystemItem[];
}

/**
 * Homepage / nav / footer catalog.
 *
 * Grouping and roster are governed by `.agents/product-marketing.md` (Product roster).
 *
 * `status` is set from the package REGISTRY, never from a README badge. Badges were wrong
 * three times: MolPlot and MolMCP were shipping while flagged in-development, and MolExp
 * and MolNex were flagged shipping while absent from PyPI. Re-check with a registry call
 * before changing one.
 * Layers follow Application / Infrastructure / Specification. Shipping packages lead each
 * layer; anything not yet installable carries an explicit `status`.
 *
 * Copy rules for `description`, from the same document:
 *   - lead with a concrete noun for what the thing IS, under ~12 words
 *   - no third-party library names, algorithms, or force fields
 *   - no internal sub-package names as explanation
 * Supported platforms (SLURM, Jupyter, VS Code…) are allowed — they say where it runs.
 *
 * MolQRC, Harness, and Zensical Theme are deliberately absent: still open source, but
 * internal tooling does not belong in a public product menu.
 */
export const ecosystemCategories: EcosystemCategory[] = [
  {
    title: "Application",
    blurb: "What you call directly.",
    items: [
      {
        title: "MolPy",
        href: "/molpy",
        role: "molecular toolkit",
        description: "Builds, types, and exports molecular systems.",
        color: PRODUCT_ACCENTS.molpy.chip.color,
        bg: PRODUCT_ACCENTS.molpy.chip.bg,
        hex: "#3b82f6",
      },
      {
        title: "MolPack",
        href: "/molpack",
        role: "packing tool",
        description: "Packs molecules into a simulation box.",
        color: PRODUCT_ACCENTS.molpack.chip.color,
        bg: PRODUCT_ACCENTS.molpack.chip.bg,
        hex: "#f97316",
      },
      {
        title: "MolNex",
        href: "/molnex",
        role: "ML framework",
        description: "Trains and composes interatomic potentials.",
        status: "In development",
        color: PRODUCT_ACCENTS.molnex.chip.color,
        bg: PRODUCT_ACCENTS.molnex.chip.bg,
        hex: "#06b6d4",
      },
      {
        title: "MolExp",
        href: "/molexp",
        role: "workflow platform",
        description: "Runs experiments and tracks every artifact.",
        status: "In development",
        color: PRODUCT_ACCENTS.molexp.chip.color,
        bg: PRODUCT_ACCENTS.molexp.chip.bg,
        hex: "#6366f1",
      },
      {
        title: "MolVis",
        href: "/molvis",
        role: "3D viewer",
        description: "Inspect, measure, and replay in the browser, VS Code, and Jupyter.",
        color: PRODUCT_ACCENTS.molvis.chip.color,
        bg: PRODUCT_ACCENTS.molvis.chip.bg,
        hex: "#a855f7",
      },
      {
        title: "MolPlot",
        href: "https://github.com/MolCrafts/molplot",
        external: true,
        role: "charting library",
        description: "One chart definition, for web and for print.",
        color: CHIP_ONLY_ACCENTS.molplot.color,
        bg: CHIP_ONLY_ACCENTS.molplot.bg,
        hex: "#14b8a6",
      },
      {
        title: "Atomiverse",
        href: "/atomiverse",
        role: "simulation engine",
        description: "Molecular dynamics and electronic structure, on CPU and GPU.",
        status: "Preparing release",
        color: PRODUCT_ACCENTS.atomiverse.chip.color,
        bg: PRODUCT_ACCENTS.atomiverse.chip.bg,
        hex: "#84cc16",
      },
    ],
  },
  {
    title: "Infrastructure",
    blurb: "What holds the stack up.",
    items: [
      {
        title: "MolRs",
        href: "/molrs",
        role: "compute core",
        description: "Data structures, file I/O, and compute kernels under MolPy.",
        color: PRODUCT_ACCENTS.molrs.chip.color,
        bg: PRODUCT_ACCENTS.molrs.chip.bg,
        hex: "#ef4444",
      },
      {
        title: "MolQ",
        href: "/molq",
        role: "job queue",
        description: "One submission API for local, SLURM, PBS, and LSF.",
        color: PRODUCT_ACCENTS.molq.chip.color,
        bg: PRODUCT_ACCENTS.molq.chip.bg,
        hex: "#ec4899",
      },
      {
        title: "MolCfg",
        href: "/molcfg",
        role: "config layer",
        description: "Every value tracks where it came from.",
        color: PRODUCT_ACCENTS.molcfg.chip.color,
        bg: PRODUCT_ACCENTS.molcfg.chip.bg,
        hex: "#10b981",
      },
      {
        title: "MolLog",
        href: "/mollog",
        role: "logging layer",
        description: "Drop-in structured logging.",
        color: PRODUCT_ACCENTS.mollog.chip.color,
        bg: PRODUCT_ACCENTS.mollog.chip.bg,
        hex: "#0ea5e9",
      },
      {
        title: "MolMCP",
        href: "https://docs.molcrafts.org/molmcp/",
        external: true,
        role: "agent APIs",
        description: "Gives AI agents structured access to MolCrafts packages and docs.",
        color: CHIP_ONLY_ACCENTS.molmcp.color,
        bg: CHIP_ONLY_ACCENTS.molmcp.bg,
        hex: "#8b5cf6",
      },
      {
        title: "MolHub",
        href: "https://github.com/MolCrafts/molhub",
        external: true,
        role: "dataset access",
        description: "Download benchmark datasets, upload your own.",
        status: "In development",
        color: CHIP_ONLY_ACCENTS.molhub.color,
        bg: CHIP_ONLY_ACCENTS.molhub.bg,
        hex: "#84cc16",
      },
    ],
  },
  {
    title: "Specification",
    blurb: "What every layer agrees on.",
    items: [
      {
        title: "MolRec",
        href: "/molrec",
        role: "record contract",
        description: "One format, so tools read each other's output.",
        status: "In development",
        color: PRODUCT_ACCENTS.molrec.chip.color,
        bg: PRODUCT_ACCENTS.molrec.chip.bg,
        hex: "#f59e0b",
      },
    ],
  },
];

/** Flat list for SEO helpers. */
export const ecosystemItems: EcosystemItem[] = ecosystemCategories.flatMap((c) => c.items);
