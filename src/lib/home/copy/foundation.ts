import type { HomeCopy } from "./types";

/** Approved Foundation copy. English is the source for Chinese and Swedish. */
export const APPROVED_FOUNDATION_COPY = {
  kicker: "The Foundation",
  title: "Open infrastructure for molecular science.",
  titleLines: ["Open infrastructure", "for molecular science."],
  lead: "Open source. Interoperable. Extensible.",
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
  title: "确定性的科学，规模化运行。",
  titleLines: ["确定性的科学，", "规模化运行。"],
  lead: "将孤立的计算转化为组织持久的科研能力。",
  strata: [
    {
      id: "physics-data",
      tag: "CONTINUITY",
      title: "专业经验体系化",
      detail: "将领域直觉转化为可复用的方法。",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "完整溯源",
      detail: "让每一份科学记录都有连续、完整的溯源链。",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "弹性吞吐",
      detail: "从单个体系扩展到大规模科学发现。",
    },
  ],
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_SV = {
  kicker: "Vetenskaplig grund",
  title: "Deterministisk vetenskap i stor skala.",
  titleLines: ["Deterministisk vetenskap", "i stor skala."],
  lead: "Omvandla isolerade beräkningar till varaktig forskningsförmåga i organisationen.",
  strata: [
    {
      id: "physics-data",
      tag: "CONTINUITY",
      title: "Kodifierad expertis",
      detail: "Omvandla domänintuition till återanvändbar metodik.",
    },
    {
      id: "workflows",
      tag: "PROVENANCE",
      title: "Fullständig proveniens",
      detail: "Obruten spårbarhet genom varje vetenskaplig post.",
    },
    {
      id: "collaboration",
      tag: "SCALE",
      title: "Elastisk kapacitet",
      detail: "Skala från enskilda system till storskalig upptäckt.",
    },
  ],
} as const satisfies HomeCopy["approach"];
