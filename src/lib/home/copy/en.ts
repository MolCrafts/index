import { APPLICATION_GITHUB_DESCRIPTIONS, APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import { APPROVED_COLLABORATION_COPY } from "./collaboration";
import { APPROVED_FOUNDATION_COPY } from "./foundation";
import type { HomeCopy } from "./types";

export const en: HomeCopy = {
  sectionLabels: {
    hero: "Home",
    about: "Foundation",
    solutions: "Capabilities",
    assist: "AI",
    applications: "Applications",
    collaboration: "Collaboration",
    trust: "Support",
  },
  brandHero: {
    kicker: "Standardizing Molecular & Materials Computation",
    title: "MolCrafts",
    subtitle: "Scientific infrastructure for AI-assisted research.",
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
    title: "Knowledge carries forward.",
    titleLines: ["Knowledge", "carries forward."],
    lead: "Build on every discovery.",
    pillars: [
      {
        title: "Unified data",
        body: "Scientific data, in context.",
      },
      {
        title: "Connected knowledge",
        body: "Cumulative scientific knowledge.",
      },
      {
        title: "Replayable research",
        body: "Research beyond a single run.",
      },
    ],
  },
  assist: APPROVED_ASSIST_COPY,
  projects: {
    ...APPROVED_APPLICATIONS_HEADING,
    cta: "Explore",
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
