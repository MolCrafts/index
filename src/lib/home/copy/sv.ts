import { APPLICATIONS_HEADING_SV } from "./applications";
import { ASSIST_COPY_SV } from "./assist";
import { COLLABORATION_COPY_SV } from "./collaboration";
import { APPROVED_FOUNDATION_COPY_SV } from "./foundation";
import type { HomeCopy } from "./types";

export const sv: HomeCopy = {
  sectionLabels: {
    hero: "Hem",
    about: "Grund",
    solutions: "Förmågor",
    assist: "AI",
    applications: "Tillämpningar",
    collaboration: "Samarbete",
    trust: "Stöd",
  },
  brandHero: {
    kicker: "Standardisering av molekyl- och materialberäkning",
    title: "MolCrafts",
    subtitle: "Accelerera din FoU med AI-assisterad vetenskaplig infrastruktur.",
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
    title: "Kunskap lever vidare.",
    titleLines: ["Kunskap", "lever vidare."],
    lead: "Bygg vidare på varje upptäckt.",
    pillars: [
      {
        title: "Samlad data",
        body: "Molekyler, modeller och resultat med spårbara källor.",
      },
      {
        title: "Sammanlänkad kunskap",
        body: "Koppla metoder och resultat till de data de förklarar.",
      },
      {
        title: "Reproducerbar forskning",
        body: "Kör om, anpassa och utöka arbetsflöden.",
      },
    ],
  },
  assist: ASSIST_COPY_SV,
  projects: {
    ...APPLICATIONS_HEADING_SV,
    cta: "Utforska",
    stageLabel: "MolCrafts tillämpningar",
    items: {
      molpy: {
        applicationTitle: "Systemuppbyggnad",
        short: "Bygg och typa molekylära system",
        long: "En komponerbar verktygslåda för molekylmodellering",
      },
      molpack: {
        applicationTitle: "Boxpreparation",
        short: "Packa molekyler i en box",
        long: "Utökningsbar molekylpackning för att skapa startkonfigurationer",
      },
      molvis: {
        applicationTitle: "Visuell granskning",
        short: "Granska strukturer och trajektorier",
        long: "Bibliotek för interaktiv molekylvisualisering",
      },
      molab: {
        applicationTitle: "Experimentspårning",
        short: "Kör och spåra experiment",
        long: "AI-stödd hantering av arbetsflöden och kunskap för beräkningsforskning",
      },
      molnex: {
        applicationTitle: "Potentialträning",
        short: "Träna och kombinera potentialer",
        long: "Ett ML-ramverk för interatomära potentialer, generativa modeller och egenskapsprediktion",
      },
      atomiverse: {
        applicationTitle: "Simuleringskörningar",
        short: "Kör dynamik och elektronstruktur",
        long: "En motor för molekylsimulering på flera skalor",
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
