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
 * English only; other locales keep their approved translations until the
 * operator re-approves wording against this record.
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
  title: "单独使用，或组合成技术栈。",
  lead: "各自独立可用，也能相互配合。",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;

export const APPLICATIONS_HEADING_SV = {
  title: "Välj ett verktyg. Eller hela stacken.",
  lead: "Verktygen fungerar både tillsammans och var för sig.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;
