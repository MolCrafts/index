import type { HomeCopy } from "./types";

/** Approved Foundation copy. English is the source for Chinese and Swedish. */
export const APPROVED_FOUNDATION_COPY = {
  kicker: "The Foundation",
  title: "Open infrastructure for molecular science.",
  titleLines: ["Open infrastructure", "for molecular science."],
  lead: "Shared standards for scientific software.",
  strata: [
    {
      id: "physics-data",
      tag: "CONTINUITY",
      title: "Open source",
      detail: "Open to inspection, modification and contribution.",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "Interoperability",
      detail: "Designed for integration across scientific software.",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "Extensibility",
      detail: "Architecture open to new methods and applications.",
    },
  ],
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_ZH = {
  kicker: "科学根基",
  title: "面向分子科学的开放基础设施。",
  titleLines: ["面向分子科学的", "开放基础设施。"],
  lead: "科学软件的共同标准。",
  strata: [
    {
      id: "physics-data",
      tag: "CONTINUITY",
      title: "开源",
      detail: "开放审阅、修改与贡献。",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "互操作",
      detail: "支持不同科学软件之间的集成。",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "可扩展",
      detail: "支持新方法与新应用的开放架构。",
    },
  ],
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_SV = {
  kicker: "Vetenskaplig grund",
  title: "Öppen infrastruktur för molekylär vetenskap.",
  titleLines: ["Öppen infrastruktur", "för molekylär vetenskap."],
  lead: "Gemensamma standarder för vetenskaplig programvara.",
  strata: [
    {
      id: "physics-data",
      tag: "CONTINUITY",
      title: "Öppen källkod",
      detail: "Öppen för granskning, ändringar och bidrag.",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "Interoperabilitet",
      detail: "Utformad för integration mellan vetenskapliga program.",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "Utbyggbarhet",
      detail: "Öppen arkitektur för nya metoder och tillämpningar.",
    },
  ],
} as const satisfies HomeCopy["approach"];
