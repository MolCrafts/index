import { APPLICATION_GITHUB_DESCRIPTIONS, APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import { APPROVED_COLLABORATION_COPY } from "./collaboration";
import { APPROVED_FOUNDATION_COPY } from "./foundation";
import type { HomeCopy } from "./types";

export const HOME_DESCRIPTION = "Molecular computation software and workflows for materials R&D.";

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
    primaryCta: "Explore the software",
  },
  approach: APPROVED_FOUNDATION_COPY,
  whatWeDo: {
    title: "Research that builds on itself.",
    titleLines: ["Research that", "builds on itself."],
    lead: "Carry each discovery forward.",
    pillars: [
      {
        title: "CONNECTED DATA",
        body: "Structures and results shared between supported tools.",
      },
      {
        title: "FINDINGS WITH SOURCES",
        body: "Findings linked to their methods and evidence.",
      },
      {
        title: "REUSABLE WORKFLOWS",
        body: "Workflows adapted to the next research question.",
      },
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
      molq: {
        description: APPLICATION_GITHUB_DESCRIPTIONS.molq,
      },
      tack: {
        description: APPLICATION_GITHUB_DESCRIPTIONS.tack,
      },
    },
  },
  participate: APPROVED_COLLABORATION_COPY,
  sponsors: {
    title: "Our sponsors",
    lead: "Thanks to the programs supporting our open-source work.",
  },
  footer: {
    tagline: "Software and research workflows for materials R&D.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Back to top",
  },
};
