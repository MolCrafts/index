import { APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import type { HomeCopy } from "./types";

export const sv: HomeCopy = {
  sectionLabels: {
    hero: "Hem",
    about: "Om MolCrafts",
    solutions: "Förmågor",
    assist: "AI",
    applications: "Tillämpningar",
    collaboration: "Samarbete",
    trust: "Stöd",
    contact: "Kontakt",
  },
  brandHero: {
    kicker: "Vi formar molekylär simulering för AI-eran",
    title: "MolCrafts",
    subtitle: "Vi bygger AI-assisterad infrastruktur för molekylär vetenskap.",
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
  approach: {
    title: "Ett resultat spelar roll när det för nästa beslut framåt.",
    lead: "Vi samlar beräkning, AI och vetenskapligt omdöme i en sammanhängande FoU-process.",
    statement:
      "Varje samarbete börjar i forskningsfrågan och håller fokus på evidens som teamet kan använda.",
    promises: ["Börja med frågan", "Bygg evidens som håller", "Arbeta sida vid sida"],
  },
  whatWeDo: {
    title: "Gör svår forskning till arbete som går att driva vidare.",
    lead: "Vi väljer metod utifrån frågan och förenar simulering, prediktion och samarbete.",
    pillars: [
      {
        title: "Molekyl- och materialsimulering",
        body: "Studera struktur, beteende och egenskaper genom en väg formad efter forskningsfrågan.",
      },
      {
        title: "AI-driven prediktion",
        body: "Samla data, modeller och vetenskapligt omdöme för screening och egenskapsstudier.",
      },
      {
        title: "Anpassat FoU-samarbete",
        body: "Gå från metodvalidering till arbetssätt tillsammans med teamet bakom forskningen.",
      },
    ],
  },
  assist: APPROVED_ASSIST_COPY,
  projects: {
    ...APPROVED_APPLICATIONS_HEADING,
    cta: "Utforska",
    stageLabel: "MolCrafts tillämpningar",
    items: {
      molpy: {
        applicationTitle: "Systemuppbyggnad",
        short: "Bygg och typa molekylära system",
        long: "Gör en struktur till ett typat system som en motor kan köra, och granska det först.",
      },
      molpack: {
        applicationTitle: "Boxpreparation",
        short: "Packa molekyler i en box",
        long: "Fyll en box med den sammansättning du anger, och få samma resultat varje körning.",
      },
      molvis: {
        applicationTitle: "Visuell granskning",
        short: "Granska strukturer och trajektorier",
        long: "Se en struktur eller en hel trajektoria i webbläsaren, din editor eller en notebook.",
      },
      molexp: {
        applicationTitle: "Experimentspårning",
        short: "Kör och spåra experiment",
        long: "Beskriv ett arbetsflöde en gång, kör det, och håll varje indata och resultat kopplat.",
      },
      molnex: {
        applicationTitle: "Potentialträning",
        short: "Träna och kombinera potentialer",
        long: "Träna en potential på dina egna data, och kombinera den med fysik du redan litar på.",
      },
      atomiverse: {
        applicationTitle: "Simuleringskörningar",
        short: "Kör dynamik och elektronstruktur",
        long: "Nå molekyldynamik och elektronstruktur genom ett gränssnitt, på CPU och på GPU.",
      },
    },
  },
  participate: {
    title: "Vårt arbetssätt följer forskningsfrågan.",
    lead: "Börja i vårt öppna arbete eller bygg ett djupare FoU-samarbete kring en tydlig utmaning.",
    paths: {
      openSource: {
        title: "Bygg öppet, dela långsiktigt",
        audience: "Öppen forskning",
        description:
          "Vi utvecklar centralt vetenskapligt arbete öppet så att forskare kan följa, använda och bidra.",
        cta: "Se öppet arbete",
      },
      consulting: {
        title: "För in metoden i er forskning",
        audience: "Forskningsrådgivning",
        description:
          "Formulera en konkret fråga, validera en väg och lägg resultatet i teamets händer.",
        cta: "Diskutera ett forskningsbehov",
      },
      enterprise: {
        title: "Bygg ett långsiktigt FoU-partnerskap",
        audience: "Företagssamarbete",
        description:
          "Arbeta tillsammans med interna team kring varaktiga molekyl- och materialutmaningar.",
        cta: "Inled ett företagssamtal",
      },
    },
  },
  sponsors: {
    title: "Öppet arbete behöver långsiktigt stöd.",
    lead: "MolCrafts offentliga arbete stöds av Claude for Open Source.",
    supporterNote: "Stöd för att öppen vetenskap ska kunna fortsätta.",
  },
  cta: {
    title: "Nästa forskningsprojekt kan börja med ett konkret samtal.",
    lead: "Berätta om frågan, målet och det ni redan har. Tillsammans hittar vi rätt väg framåt.",
    primaryCta: "Diskutera er forskning",
    secondaryCta: "Se tillämpningarna igen",
  },
  footer: {
    tagline: "Vetenskaplig beräkning skapad för verklig molekyl- och materialutveckling.",
    github: "GitHub",
    license: "MIT License",
    backToTop: "Till toppen",
  },
};
