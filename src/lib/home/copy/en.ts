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
    subtitle:
      "An open-source stack for molecular modeling, simulation, machine learning and research workflows.",
    primaryCta: "Explore the software",
    secondaryCta: "Discuss a project",
  },
  approach: APPROVED_FOUNDATION_COPY,
  whatWeDo: {
    title: "Knowledge, standardized.",
    titleLines: ["Knowledge,", "standardized."],
    lead: "Build on every discovery.",
    pillars: [
      { title: "UNIFIED DATA", body: "Structures, models and results in one record format." },
      {
        title: "CONNECTED KNOWLEDGE",
        body: "Every finding linked to the method that produced it.",
      },
      { title: "REUSABLE WORKFLOWS", body: "Workflows that carry over to the next project." },
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
    tagline: "Open infrastructure for molecular and materials computation.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Back to top",
  },
};
