import type { ApplicationKey, HomeCopy } from "./types";

/** Application stage headline, with equivalent translations below. */
export const APPROVED_APPLICATIONS_HEADING = {
  title: "Take one. Or take the stack.",
  lead: "Built to work better together, designed to stand on their own.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;

/**
 * Application descriptions — GitHub's About descriptions
 * (`github.com/MolCrafts/<repo>`), normalised by operator instruction on
 * 2026-08-15: `[WIP]` markers dropped, one format across the set (sentence
 * case, noun phrase, no trailing period), and molnex rewritten onto
 * potentials, generative models, and prediction. This record is now the
 * approved wording; align the GitHub About descriptions to it, not the other
 * way around.
 *
 * English only; other locales keep their approved translations until the
 * operator re-approves wording against this record.
 */
export const APPLICATION_GITHUB_DESCRIPTIONS: Record<ApplicationKey, string> = {
  molpy: "A fast, clean, and composable toolkit for molecular modeling",
  molpack: "Extensible molecule packing for initial configuration generation",
  molvis: "Interactive molecule visualization library",
  molab: "AI-assisted workflow management and knowledge system for computational research",
  molnex:
    "Unified ML framework for interatomic potentials, generative models, and property prediction",
  atomiverse: "The multi-scale molecular simulation engine",
};

export const APPLICATIONS_HEADING_ZH = {
  title: "单独使用，或组合成技术栈。",
  lead: "各自独立可用，也能相互配合。",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;

export const APPLICATIONS_HEADING_SV = {
  title: "Välj ett verktyg. Eller hela stacken.",
  lead: "Verktygen fungerar både tillsammans och var för sig.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;
