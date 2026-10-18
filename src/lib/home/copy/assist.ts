import type { HomeCopy } from "./types";

/** Scientific roles and assistance scope, within the existing orbit layout. */
export const APPROVED_ASSIST_COPY = {
  title: { subject: "AI,", action: "here to assist." },
  subline: "A squire for science. AI-assisted workflows and knowledge management.",
  statements: [
    "Scientific context.",
    "Traceable data.",
    "Connected knowledge.",
    "Scientific tool access.",
    "Reproducible workflows.",
    "Human judgment.",
  ],
  concepts: [],
  products: ["MolPy", "MolAb", "MolVis", "MolPack", "Atomiverse"],
} as const satisfies HomeCopy["assist"];

export const ASSIST_COPY_ZH = {
  ...APPROVED_ASSIST_COPY,
  title: { subject: "AI，", action: "辅助你的研究。" },
  subline: "科学家的侍从。AI 辅助工作流与知识管理。",
  statements: [
    "科学上下文。",
    "可追溯数据。",
    "关联知识。",
    "科学工具访问。",
    "可复现工作流。",
    "研究者判断。",
  ],
} as const satisfies HomeCopy["assist"];

export const ASSIST_COPY_SV = {
  ...APPROVED_ASSIST_COPY,
  title: { subject: "AI,", action: "som stöd i forskningen." },
  subline: "En väpnare för vetenskapen. AI-stödda arbetsflöden och kunskapshantering.",
  statements: [
    "Vetenskaplig kontext.",
    "Spårbara data.",
    "Sammanlänkad kunskap.",
    "Tillgång till forskningsverktyg.",
    "Reproducerbara arbetsflöden.",
    "Mänskligt omdöme.",
  ],
} as const satisfies HomeCopy["assist"];
