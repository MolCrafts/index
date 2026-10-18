import type { HomeCopy } from "./types";

/** Original six principles and Squire metaphor; retain the existing orbit layout. */
export const APPROVED_ASSIST_COPY = {
  title: { subject: "AI,", action: "here to assist." },
  subline: "A squire for science. The scientist leads. AI assists.",
  statements: [
    "Science gives AI context.",
    "Data stays traceable.",
    "Knowledge stays connected.",
    "Tools make action possible.",
    "Workflows remain reproducible.",
    "Judgment stays human.",
  ],
  concepts: [],
  products: ["MolPy", "MolAb", "MolVis", "MolPack", "Atomiverse"],
} as const satisfies HomeCopy["assist"];

export const ASSIST_COPY_ZH = {
  ...APPROVED_ASSIST_COPY,
  title: { subject: "AI，", action: "辅助你的研究。" },
  subline: "科学家的侍从。科学家引领，AI 辅助。",
  statements: [
    "科学为 AI 提供上下文。",
    "数据始终可追溯。",
    "知识始终相互关联。",
    "工具让行动成为可能。",
    "工作流始终可复现。",
    "判断始终由人作出。",
  ],
} as const satisfies HomeCopy["assist"];

export const ASSIST_COPY_SV = {
  ...APPROVED_ASSIST_COPY,
  title: { subject: "AI,", action: "som stöd i forskningen." },
  subline: "En väpnare för vetenskapen. Forskaren leder. AI hjälper till.",
  statements: [
    "Vetenskap ger AI kontext.",
    "Data förblir spårbara.",
    "Kunskap förblir sammanlänkad.",
    "Verktyg gör handling möjlig.",
    "Arbetsflöden förblir reproducerbara.",
    "Människan står för omdömet.",
  ],
} as const satisfies HomeCopy["assist"];
