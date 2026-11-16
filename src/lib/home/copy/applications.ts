import type { ApplicationKey, HomeCopy } from "./types";

/** Application stage headline, with equivalent translations below. */
export const APPROVED_APPLICATIONS_HEADING = {
  title: "Tools for molecular research.",
  lead: "Model. Simulate. Learn. Visualize. Manage.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;

/**
 * One operator-approved English description per application, shared by the
 * homepage, catalog and generated product summaries. Sentence case, task-focused
 * phrases, no trailing period. MolPack covers initial configuration generation
 * across algorithms; packing is one method rather than the product boundary.
 *
 * Other locales preserve the same scope in their translated descriptions.
 */
export const APPLICATION_GITHUB_DESCRIPTIONS: Record<ApplicationKey, string> = {
  molpy: "Build molecular models for computation",
  molpack: "Generate initial configurations for molecular simulation",
  molvis: "Inspect structures, edit molecules and review trajectories",
  molab: "Keep workflows, runs and findings connected",
  molnex: "Train models for molecular properties and simulations",
  atomiverse: "Simulate molecular behavior and material properties",
  molq: "Submit and track local and cluster jobs",
  tack: "Plan research and review findings with AI",
};

export const APPLICATIONS_HEADING_ZH = {
  title: "用于分子研究的软件。",
  lead: "建模、模拟、学习、可视化与研究管理。",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;

export const APPLICATIONS_HEADING_SV = {
  title: "Verktyg för molekylär forskning.",
  lead: "Modellera. Simulera. Lär. Visualisera. Hantera.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;
