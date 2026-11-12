import type { HomeCopy } from "./types";

/**
 * The research cycle the assistant works through, read counter-clockwise around
 * the orbit from the right: literature to experience, and round again.
 */
export const APPROVED_ASSIST_COPY = {
  title: { subject: "AI,", action: "here to assist." },
  subline: "Review research with AI. You decide the next step.",
  statements: [
    "Read the literature.",
    "Reproduce results.",
    "Plan the study.",
    "Run the workflow.",
    "Verify the evidence.",
    "Build on experience.",
  ],
  products: ["Tack", "MolAb", "MolVis", "MolPy", "MolPack"],
} as const satisfies HomeCopy["assist"];

export const ASSIST_COPY_ZH = {
  ...APPROVED_ASSIST_COPY,
  title: { subject: "AI，", action: "辅助你的研究。" },
  subline: "AI 辅助研究，科学判断由你掌握。",
  statements: ["读文献。", "复现结果。", "规划研究。", "运行流程。", "核验证据。", "积累经验。"],
} as const satisfies HomeCopy["assist"];

export const ASSIST_COPY_SV = {
  ...APPROVED_ASSIST_COPY,
  title: { subject: "AI,", action: "som stöd i forskningen." },
  subline: "Granska forskning med AI. Du bestämmer nästa steg.",
  statements: [
    "Läs litteraturen.",
    "Reproducera resultat.",
    "Planera studien.",
    "Kör arbetsflödet.",
    "Verifiera evidensen.",
    "Bygg på erfarenhet.",
  ],
} as const satisfies HomeCopy["assist"];
