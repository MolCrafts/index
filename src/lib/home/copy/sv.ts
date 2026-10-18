import { APPLICATIONS_HEADING_SV } from "./applications";
import { ASSIST_COPY_SV } from "./assist";
import { COLLABORATION_COPY_SV } from "./collaboration";
import { APPROVED_FOUNDATION_COPY_SV } from "./foundation";
import type { HomeCopy } from "./types";

export const sv: HomeCopy = {
  sectionLabels: {
    hero: "Hem",
    about: "Grund",
    solutions: "Kontinuitet",
    assist: "AI",
    applications: "Tillämpningar",
    collaboration: "Samarbete",
    trust: "Stöd",
  },
  brandHero: {
    kicker: "Standardiserar materialforskning och utveckling",
    title: "MolCrafts",
    subtitle: "för AI-eran.",
  },
  hero: {
    title: "Molekylär forskning,",
    accent: "redo för nästa steg.",
    subtitle:
      "MolCrafts för in vetenskaplig beräkning, AI och forskningserfarenhet i verklig molekyl- och materialutveckling – från egenskapsprognoser till långsiktigt samarbete.",
    primaryCta: "Se tillämpningar",
    secondaryCta: "Diskutera ett projekt",
    scrollHint: "Fortsätt",
  },
  approach: APPROVED_FOUNDATION_COPY_SV,
  whatWeDo: {
    title: "Kunskap, standardiserad.",
    titleLines: ["Kunskap,", "standardiserad."],
    lead: "Bygg vidare på varje upptäckt.",
    pillars: [
      { title: "ENHETLIGA DATA", body: "Strukturerade indata, modeller och resultat." },
      { title: "SAMMANLÄNKAD KUNSKAP", body: "Metoder kopplade till resultat." },
      { title: "ÅTERANVÄNDBARA ARBETSFLÖDEN", body: "Metoder som återanvänds mellan projekt." },
    ],
  },
  assist: ASSIST_COPY_SV,
  projects: {
    ...APPLICATIONS_HEADING_SV,
    stageLabel: "MolCrafts tillämpningar",
    items: {
      molpy: {
        description: "Komponerbar verktygslåda för molekylmodellering",
      },
      molpack: {
        description: "Utbyggbar generering av startkonfigurationer för molekylsimulering",
      },
      molvis: {
        description: "Bibliotek för interaktiv molekylvisualisering",
      },
      molab: {
        description: "AI-stödd hantering av arbetsflöden och kunskap för beräkningsforskning",
      },
      molnex: {
        description:
          "Enhetligt ML-ramverk för interatomära potentialer, generativa modeller och egenskapsprediktion",
      },
      atomiverse: {
        description: "Motor för molekylsimulering i flera skalor",
      },
    },
  },
  participate: COLLABORATION_COPY_SV,
  sponsors: {
    title: "Våra sponsorer",
    lead: "Tack till programmen som stödjer vårt arbete med öppen källkod.",
  },
  footer: {
    tagline: "Vetenskaplig infrastruktur för AI-stödd forskning.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Till toppen",
  },
};
