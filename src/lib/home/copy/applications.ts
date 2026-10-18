import type { ApplicationKey, HomeCopy } from "./types";

/** Application stage headline, with equivalent translations below. */
export const APPROVED_APPLICATIONS_HEADING = {
  title: "Software for molecular computation.",
  lead: "Modeling. Simulation. Machine learning.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;

/**
 * One operator-approved English description per application, shared by the
 * homepage, catalog and generated product summaries. Sentence case, noun
 * phrase, no trailing period. MolPack covers initial configuration generation
 * across algorithms; packing is one method rather than the product boundary.
 *
 * Other locales preserve the same scope in their translated descriptions.
 */
export const APPLICATION_GITHUB_DESCRIPTIONS: Record<ApplicationKey, string> = {
  molpy: "Composable toolkit for molecular modeling",
  molpack: "Extensible initial configuration generation for molecular simulation",
  molvis: "Interactive molecular visualization library",
  molab: "AI-assisted workflow and knowledge management for computational research",
  molnex:
    "Unified ML framework for interatomic potentials, generative models and property prediction",
  atomiverse: "Multiscale molecular simulation engine",
};

export const APPLICATIONS_HEADING_ZH = {
  title: "面向分子计算的软件。",
  lead: "建模、模拟与机器学习。",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;

export const APPLICATIONS_HEADING_SV = {
  title: "Programvara för molekylära beräkningar.",
  lead: "Modellering. Simulering. Maskininlärning.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;
