import type { HomeCopy } from "./types";

/** Scientific roles and assistance scope, within the existing orbit layout. */
export const APPROVED_ASSIST_COPY = {
  title: { subject: "AI,", action: "here to assist." },
  subline: "A squire for science. AI works with the same open tools you do, and leaves a record.",
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
  subline: "科学家的侍从。AI 使用与你相同的开源工具，每一步都留有记录。",
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
  subline:
    "En väpnare för vetenskapen. AI arbetar med samma öppna verktyg som du, och lämnar spår.",
  statements: [
    "Vetenskaplig kontext.",
    "Spårbara data.",
    "Sammanlänkad kunskap.",
    "Tillgång till forskningsverktyg.",
    "Reproducerbara arbetsflöden.",
    "Mänskligt omdöme.",
  ],
} as const satisfies HomeCopy["assist"];
