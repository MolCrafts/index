import type { HomeCopy } from "./types";

/**
 * Operator-approved English copy for the AI editorial screen.
 * Translations preserve the same research roles and claims.
 */
export const APPROVED_ASSIST_COPY = {
  title: {
    subject: "AI,",
    action: "here to assist.",
  },
  subline: "Researchers stay in control.",
  statements: [
    "Science gives AI context.",
    "Data stays traceable.",
    "Knowledge stays connected.",
    "Tools connect AI to research.",
    "Workflows remain reproducible.",
    "Researchers make the decisions.",
  ],
  concepts: ["data", "knowledge", "tools", "workflows"],
  products: ["MolPy", "MolAb", "MolVis", "MolPack", "Atomiverse"],
} as const satisfies HomeCopy["assist"];

export const ASSIST_COPY_ZH = {
  ...APPROVED_ASSIST_COPY,
  title: { subject: "AI，", action: "辅助你的研究。" },
  subline: "研究者掌握主导权。",
  statements: [
    "科学为 AI 提供上下文。",
    "数据来源可追溯。",
    "研究知识相互关联。",
    "工具让 AI 参与研究。",
    "工作流可以复现。",
    "研究者作出判断。",
  ],
  concepts: ["数据", "知识", "工具", "工作流"],
} as const satisfies HomeCopy["assist"];

export const ASSIST_COPY_SV = {
  ...APPROVED_ASSIST_COPY,
  title: { subject: "AI,", action: "som stöd i forskningen." },
  subline: "Forskaren behåller kontrollen.",
  statements: [
    "Vetenskap ger AI kontext.",
    "Data är spårbara.",
    "Kunskap hänger samman.",
    "Verktyg kopplar AI till forskning.",
    "Arbetsflöden är reproducerbara.",
    "Forskaren fattar besluten.",
  ],
  concepts: ["data", "kunskap", "verktyg", "arbetsflöden"],
} as const satisfies HomeCopy["assist"];
