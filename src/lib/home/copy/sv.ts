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
    primaryCta: "Utforska programvaran",
  },
  approach: APPROVED_FOUNDATION_COPY_SV,
  whatWeDo: {
    title: "Forskning som bygger vidare.",
    titleLines: ["Forskning som", "bygger vidare."],
    lead: "Bygg vidare på varje upptäckt.",
    pillars: [
      {
        title: "SAMMANLÄNKADE DATA",
        body: "Strukturer och resultat delas mellan verktyg som stöder utbytet.",
      },
      {
        title: "RESULTAT MED KÄLLOR",
        body: "Forskningsresultat kopplade till metoder och evidens.",
      },
      {
        title: "ÅTERANVÄNDBARA ARBETSFLÖDEN",
        body: "Arbetsflöden anpassade till nästa forskningsfråga.",
      },
    ],
  },
  assist: ASSIST_COPY_SV,
  projects: {
    ...APPLICATIONS_HEADING_SV,
    stageLabel: "MolCrafts tillämpningar",
    items: {
      molpy: {
        description: "Bygg molekylmodeller för beräkningar",
      },
      molpack: {
        description: "Generera startkonfigurationer för molekylsimulering",
      },
      molvis: {
        description: "Granska strukturer, redigera molekyler och följ trajektorier",
      },
      molab: {
        description: "Håll arbetsflöden, körningar och forskningsresultat sammanlänkade",
      },
      molnex: {
        description: "Träna modeller för molekylära egenskaper och simuleringar",
      },
      atomiverse: {
        description: "Simulera molekylers beteende och materialegenskaper",
      },
      molq: {
        description: "Skicka och följ lokala jobb och klusterjobb",
      },
      tack: {
        description: "Planera forskning och granska forskningsresultat med AI",
      },
    },
  },
  participate: COLLABORATION_COPY_SV,
  sponsors: {
    title: "Våra sponsorer",
    lead: "Tack till programmen som stödjer vårt arbete med öppen källkod.",
  },
  footer: {
    tagline: "Programvara och arbetsflöden för materialutveckling.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Till toppen",
  },
};
