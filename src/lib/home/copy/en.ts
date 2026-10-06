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
    subtitle: "Accelerate your R&D with AI-assisted scientific infrastructure.",
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
        body: "Molecules, models and results — connected to their origins.",
      },
      {
        title: "Connected knowledge",
        body: "Link methods and findings to the data they explain.",
      },
      {
        title: "Replayable research",
        body: "Rerun, adapt and extend workflows.",
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
        applicationTitle: "System construction",
        short: "Build and type molecular systems",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molpy,
      },
      molpack: {
        applicationTitle: "Box preparation",
        short: "Pack molecules into a box",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molpack,
      },
      molvis: {
        applicationTitle: "Visual inspection",
        short: "Inspect structures and trajectories",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molvis,
      },
      molab: {
        applicationTitle: "Experiment tracking",
        short: "Run and track experiments",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molab,
      },
      molnex: {
        applicationTitle: "Potential training",
        short: "Train and compose potentials",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molnex,
      },
      atomiverse: {
        applicationTitle: "Simulation runs",
        short: "Run dynamics and electronic structure",
        long: APPLICATION_GITHUB_DESCRIPTIONS.atomiverse,
      },
    },
  },
  participate: APPROVED_COLLABORATION_COPY,
  sponsors: {
    title: "Our sponsors",
    lead: "Thanks to the programs supporting our open-source work.",
  },
  footer: {
    tagline: "Accelerate your R&D with AI-assisted scientific infrastructure.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Back to top",
  },
};
