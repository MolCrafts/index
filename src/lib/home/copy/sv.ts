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
    kicker: "Standardisering av molekyl- och materialberäkning",
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
    lead: "Omvandla isolerade körningar till varaktig förmåga.",
    pillars: [
      { title: "ENHETLIGA DATA", body: "Strukturerade poster, aldrig isolerade." },
      { title: "SAMMANLÄNKAD KUNSKAP", body: "Gemensam kunskap över forskningskampanjer." },
      { title: "ÅTERANVÄNDBARA ARBETSFLÖDEN", body: "Metodik som lever vidare efter projektet." },
    ],
  },
  assist: ASSIST_COPY_SV,
  projects: {
    ...APPLICATIONS_HEADING_SV,
    stageLabel: "MolCrafts tillämpningar",
    items: {
      molpy: {
        short: "Bygg och typa molekylära system",
        description: "En komponerbar verktygslåda för molekylmodellering",
      },
      molpack: {
        short: "Packa molekyler i en box",
        description: "Utökningsbar molekylpackning för att skapa startkonfigurationer",
      },
      molvis: {
        short: "Granska strukturer och trajektorier",
        description: "Bibliotek för interaktiv molekylvisualisering",
      },
      molab: {
        short: "Kör och spåra experiment",
        description: "AI-stödd hantering av arbetsflöden och kunskap för beräkningsforskning",
      },
      molnex: {
        short: "Träna och kombinera potentialer",
        description:
          "Ett ML-ramverk för interatomära potentialer, generativa modeller och egenskapsprediktion",
      },
      atomiverse: {
        short: "Kör dynamik och elektronstruktur",
        description: "En motor för molekylsimulering på flera skalor",
      },
    },
  },
  participate: COLLABORATION_COPY_SV,
  sponsors: {
    title: "Våra sponsorer",
    lead: "Tack till programmen som stödjer vårt arbete med öppen källkod.",
  },
  footer: {
    tagline: "Accelerera din FoU med AI-assisterad vetenskaplig infrastruktur.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Till toppen",
  },
};
