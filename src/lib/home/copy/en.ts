import { APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import type { HomeCopy } from "./types";

export const en: HomeCopy = {
  sectionLabels: {
    hero: "Home",
    about: "About MolCrafts",
    solutions: "Capabilities",
    assist: "AI",
    applications: "Applications",
    collaboration: "Collaboration",
    trust: "Support",
    contact: "Contact",
  },
  brandHero: {
    kicker: "Shaping Molecular Simulation for the AI Era",
    title: "MolCrafts",
    subtitle: "We build AI-assisted infrastructure for molecular science.",
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
  approach: {
    title: "Built from the ground up.",
    lead: "Science moves forward when its software can be understood, challenged, and built upon.",
    statement:
      "Designed around modern software architecture, free from legacy limitations, allowing the ecosystem to evolve with new methods, models, and AI-assisted science.",
    promises: ["Inspect what you use", "Extend what you need", "Build on what you trust"],
  },
  whatWeDo: {
    title: "Knowledge carries forward.",
    lead: "MolCrafts gives molecular R&D a shared foundation for data, knowledge, and reproducible workflows — turning every project into assets the next one can build on.",
    pillars: [
      {
        title: "One data foundation",
        body: "Keep molecules, datasets, models, simulations, and results in one unified data layer, with their provenance and relationships preserved.",
      },
      {
        title: "Knowledge that stays connected",
        body: "Keep methods, assumptions, decisions, and findings attached to the science, giving projects and teams a shared research context.",
      },
      {
        title: "Research you can replay",
        body: "Capture how computational work was done, not just what it produced. Replay, adapt, and extend it without rebuilding from scratch.",
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
        long: "Turn a structure into a typed system an engine can run, and inspect it first.",
      },
      molpack: {
        applicationTitle: "Box preparation",
        short: "Pack molecules into a box",
        long: "Fill a box with the composition you specify, and get the same result every run.",
      },
      molvis: {
        applicationTitle: "Visual inspection",
        short: "Inspect structures and trajectories",
        long: "Look at a structure or a full trajectory in the browser, your editor, or a notebook.",
      },
      molexp: {
        applicationTitle: "Experiment tracking",
        short: "Run and track experiments",
        long: "Describe a workflow once, run it, and keep every input and result linked to it.",
      },
      molnex: {
        applicationTitle: "Potential training",
        short: "Train and compose potentials",
        long: "Train a potential on your own data, and compose it with physics you already trust.",
      },
      atomiverse: {
        applicationTitle: "Simulation runs",
        short: "Run dynamics and electronic structure",
        long: "Reach molecular dynamics and electronic structure through one interface, on CPU and on GPU.",
      },
    },
  },
  participate: {
    title: "The way we work follows the research question.",
    lead: "Start with our open work or build a deeper R&D collaboration around a defined challenge.",
    paths: {
      openSource: {
        title: "Build in public, share for the long term",
        audience: "Open research",
        description:
          "We develop core scientific work in public so researchers can follow, use, and contribute.",
        cta: "See open work",
      },
      consulting: {
        title: "Bring the method into your research",
        audience: "Research consulting",
        description:
          "Frame a specific question, validate a path, and put the outcome in the team’s hands.",
        cta: "Discuss a research need",
      },
      enterprise: {
        title: "Build a long-term R&D partnership",
        audience: "Enterprise collaboration",
        description:
          "Work alongside internal teams on sustained molecular and materials challenges.",
        cta: "Start an enterprise conversation",
      },
    },
  },
  sponsors: {
    title: "Open work needs lasting support.",
    lead: "MolCrafts’ public work is supported by Claude for Open Source.",
    supporterNote: "Supporting the continued practice of open science.",
  },
  cta: {
    title: "Your next research project can begin with one concrete conversation.",
    lead: "Tell us the question, the goal, and what you already have. We’ll work out the right way forward.",
    primaryCta: "Discuss your research",
    secondaryCta: "Revisit applications",
  },
  footer: {
    tagline: "Scientific computing made to enter real molecular and materials R&D.",
    github: "GitHub",
    license: "MIT License",
    backToTop: "Back to top",
  },
};
