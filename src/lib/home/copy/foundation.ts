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
      detail: "Every layer open to inspection, modification and contribution.",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "Interoperability",
      detail: "Common data structures and file formats, so one tool reads what another wrote.",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "Extensibility",
      detail: "New methods and formats plug in without forking the core.",
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
      detail: "每一层都开放审阅、修改与贡献。",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "互操作",
      detail: "共用数据结构与文件格式，一个工具的输出就是下一个工具的输入。",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "可扩展",
      detail: "新方法与新格式直接接入，无需分叉内核。",
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
      detail: "Varje lager är öppet för granskning, ändringar och bidrag.",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "Interoperabilitet",
      detail:
        "Gemensamma datastrukturer och filformat, så att ett verktyg läser det ett annat skrev.",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "Utbyggbarhet",
      detail: "Nya metoder och format ansluts utan att kärnan förgrenas.",
    },
  ],
} as const satisfies HomeCopy["approach"];
