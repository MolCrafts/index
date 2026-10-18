import { APPLICATION_GITHUB_DESCRIPTIONS, APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import { APPROVED_COLLABORATION_COPY } from "./collaboration";
import { APPROVED_FOUNDATION_COPY } from "./foundation";
import type { HomeCopy } from "./types";

export const en: HomeCopy = {
  sectionLabels: {
    hero: "Home",
    about: "Foundation",
    solutions: "Continuity",
    assist: "AI",
    applications: "Applications",
    collaboration: "Collaboration",
    trust: "Support",
  },
  brandHero: {
    kicker: "Standardizing Materials R&D",
    title: "MolCrafts",
    subtitle: "for the AI Era.",
  },
  hero: {
    title: "A modern, open-source ecosystem",
    accent: "for molecular science.",
    subtitle:
      "MolCrafts brings scientific computing, AI, and research expertise into real molecular and materials R&D—from property prediction to long-term collaboration.",
    primaryCta: "Explore",
    secondaryCta: "Discuss a project",
    scrollHint: "Continue",
  },
  approach: APPROVED_FOUNDATION_COPY,
  whatWeDo: {
    title: "Knowledge, standardized.",
    titleLines: ["Knowledge,", "standardized."],
    lead: "Build on every discovery.",
    pillars: [
      { title: "UNIFIED DATA", body: "Structured inputs, models and results." },
      { title: "CONNECTED KNOWLEDGE", body: "Methods linked to findings." },
      { title: "REUSABLE WORKFLOWS", body: "Methods reused across projects." },
    ],
  },
  assist: APPROVED_ASSIST_COPY,
  projects: {
    ...APPROVED_APPLICATIONS_HEADING,
    stageLabel: "MolCrafts applications",
    items: {
      molpy: {
        description: APPLICATION_GITHUB_DESCRIPTIONS.molpy,
      },
      molpack: {
        description: APPLICATION_GITHUB_DESCRIPTIONS.molpack,
      },
      molvis: {
        description: APPLICATION_GITHUB_DESCRIPTIONS.molvis,
      },
      molab: {
        description: APPLICATION_GITHUB_DESCRIPTIONS.molab,
      },
      molnex: {
        description: APPLICATION_GITHUB_DESCRIPTIONS.molnex,
      },
      atomiverse: {
        description: APPLICATION_GITHUB_DESCRIPTIONS.atomiverse,
      },
    },
  },
  participate: APPROVED_COLLABORATION_COPY,
  sponsors: {
    title: "Our sponsors",
    lead: "Thanks to the programs supporting our open-source work.",
  },
  footer: {
    tagline: "Scientific infrastructure for AI-assisted research.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Back to top",
  },
};
