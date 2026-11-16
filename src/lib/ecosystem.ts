import { APPLICATION_GITHUB_DESCRIPTIONS } from "@/lib/home/copy/applications";
import { packageGithubHref } from "./packages";
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
 * `status` is set from the package REGISTRY, never from a README badge. Badges were wrong
 * three times: MolPlot and MolMCP were shipping while flagged in-development, and MolExp
 * and MolNex were flagged shipping while absent from PyPI. Re-check with a registry call
 * before changing one.
 * Layers follow Application / Infrastructure. Shipping packages lead each
 * layer; anything not yet installable carries an explicit `status`.
 *
 * MolCfg, MolLog, MolRec, and MolMCP stay installable and redirected, but they
 * are not listed: the public menu is the homepage's product surface.
 * MolExp was renamed to MolAb; `/molexp` still redirects to that repository.
 *
 * Copy rules for `description`:
 *   - lead with the research task, under ~12 words
 *   - no third-party library names, algorithms, or force fields
 *   - no internal sub-package names as explanation
 *   - one format across the catalog: sentence case, no trailing period
 * Supported platforms (SLURM, Jupyter, VS Code…) are allowed — they say where it runs.
 * The eight application descriptions come verbatim from
 * {@link APPLICATION_GITHUB_DESCRIPTIONS}, the operator-approved record the
 * GitHub About descriptions are aligned to.
 *
 * MolQRC, Harness, and Zensical Theme are deliberately absent: still open source, but
 * internal tooling does not belong in a public product menu.
 */
export const ecosystemCategories: EcosystemCategory[] = [
  {
    title: "Application",
    blurb: "Tools for your research tasks.",
    items: [
      {
        title: "MolPy",
        href: packageGithubHref("molpy"),
        external: true,
        role: "model preparation",
        description: APPLICATION_GITHUB_DESCRIPTIONS.molpy,
        color: PRODUCT_ACCENTS.molpy.chip.color,
        bg: PRODUCT_ACCENTS.molpy.chip.bg,
      },
      {
        title: "MolPack",
        href: packageGithubHref("molpack"),
        external: true,
        role: "simulation setup",
        description: APPLICATION_GITHUB_DESCRIPTIONS.molpack,
        color: PRODUCT_ACCENTS.molpack.chip.color,
        bg: PRODUCT_ACCENTS.molpack.chip.bg,
      },
      {
        title: "MolNex",
        href: packageGithubHref("molnex"),
        external: true,
        role: "model training",
        description: APPLICATION_GITHUB_DESCRIPTIONS.molnex,
        status: "In development",
        color: PRODUCT_ACCENTS.molnex.chip.color,
        bg: PRODUCT_ACCENTS.molnex.chip.bg,
      },
      {
        title: "MolAb",
        href: packageGithubHref("molab"),
        external: true,
        role: "research records",
        description: APPLICATION_GITHUB_DESCRIPTIONS.molab,
        status: "In development",
        color: PRODUCT_ACCENTS.molab.chip.color,
        bg: PRODUCT_ACCENTS.molab.chip.bg,
      },
      {
        title: "MolVis",
        href: packageGithubHref("molvis"),
        external: true,
        role: "structure review",
        description: APPLICATION_GITHUB_DESCRIPTIONS.molvis,
        color: PRODUCT_ACCENTS.molvis.chip.color,
        bg: PRODUCT_ACCENTS.molvis.chip.bg,
      },
      {
        title: "MolPlot",
        href: packageGithubHref("molplot"),
        external: true,
        role: "research figures",
        description: "Create figures for exploring and sharing research results",
        color: CHIP_ONLY_ACCENTS.molplot.color,
        bg: CHIP_ONLY_ACCENTS.molplot.bg,
      },
      {
        title: "Atomiverse",
        href: packageGithubHref("atomiverse"),
        external: true,
        role: "simulation engine",
        description: APPLICATION_GITHUB_DESCRIPTIONS.atomiverse,
        status: "Preparing release",
        color: PRODUCT_ACCENTS.atomiverse.chip.color,
        bg: PRODUCT_ACCENTS.atomiverse.chip.bg,
      },
      {
        title: "MolQ",
        href: packageGithubHref("molq"),
        external: true,
        role: "job management",
        description: APPLICATION_GITHUB_DESCRIPTIONS.molq,
        color: PRODUCT_ACCENTS.molq.chip.color,
        bg: PRODUCT_ACCENTS.molq.chip.bg,
      },
      {
        title: "Tack",
        href: packageGithubHref("tack"),
        external: true,
        role: "AI research assistance",
        description: APPLICATION_GITHUB_DESCRIPTIONS.tack,
        status: "In development",
        color: PRODUCT_ACCENTS.tack.chip.color,
        bg: PRODUCT_ACCENTS.tack.chip.bg,
      },
    ],
  },
  {
    title: "Infrastructure",
    blurb: "Support for working with research data.",
    items: [
      {
        title: "MolRs",
        href: packageGithubHref("molrs"),
        external: true,
        role: "molecular data",
        description: "Read and work with molecular structures and results",
        color: PRODUCT_ACCENTS.molrs.chip.color,
        bg: PRODUCT_ACCENTS.molrs.chip.bg,
      },
      {
        title: "MolHub",
        href: packageGithubHref("molhub"),
        external: true,
        role: "dataset access",
        description: "Download benchmark datasets, upload your own",
        status: "In development",
        color: CHIP_ONLY_ACCENTS.molhub.color,
        bg: CHIP_ONLY_ACCENTS.molhub.bg,
      },
    ],
  },
];

/** Flat list for SEO helpers. */
export const ecosystemItems: EcosystemItem[] = ecosystemCategories.flatMap((c) => c.items);
