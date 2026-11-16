import type { HomeCopy } from "./types";

/** Approved Foundation copy. English is the source for Chinese and Swedish. */
export const APPROVED_FOUNDATION_COPY = {
  kicker: "The Foundation",
  title: "Open infrastructure for molecular science.",
  titleLines: ["Open infrastructure", "for molecular science."],
  lead: "Software, methods and workflows for materials R&D.",
  strata: [
    {
      id: "physics-data",
      tag: "CONTINUITY",
      title: "Open source",
      detail: "Inspect and adapt the methods you use.",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "Interoperability",
      detail: "Share molecular data between supported tools.",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "Extensibility",
      detail: "Add methods as your research evolves.",
    },
  ],
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_ZH = {
  kicker: "科学根基",
  title: "面向分子科学的开放基础设施。",
  titleLines: ["面向分子科学的", "开放基础设施。"],
  lead: "面向材料研发的软件、方法与工作流。",
  strata: [
    {
      id: "physics-data",
      tag: "CONTINUITY",
      title: "开源",
      detail: "查看方法，按需调整。",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "互操作",
      detail: "在支持互通的工具间共享数据。",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "可扩展",
      detail: "按研究需要接入新方法。",
    },
  ],
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_SV = {
  kicker: "Vetenskaplig grund",
  title: "Öppen infrastruktur för molekylär vetenskap.",
  titleLines: ["Öppen infrastruktur", "för molekylär vetenskap."],
  lead: "Programvara, metoder och arbetsflöden för materialforskning och utveckling.",
  strata: [
    {
      id: "physics-data",
      tag: "CONTINUITY",
      title: "Öppen källkod",
      detail: "Granska och anpassa metoderna du använder.",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "Interoperabilitet",
      detail: "Dela molekylära data mellan verktyg som stöder utbytet.",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "Utbyggbarhet",
      detail: "Lägg till metoder när forskningen förändras.",
    },
  ],
} as const satisfies HomeCopy["approach"];
