import type { HomeCopy } from "./types";

/** Three ways to use MolCrafts: open-source tools, collaboration and internal deployment. */
export const APPROVED_COLLABORATION_COPY = {
  title: {
    plain: "Open to start.",
    accent: "Tailored to fit.",
  },
  supporting: "Computational R&D. Method development. In-house integration.",
  paths: {
    startOpen: {
      statement: "Start open.",
      line: "Open-source software for molecular modeling and simulation.",
    },
    buildTogether: {
      statement: "Build together.",
      line: "Simulation models, methods and research reports.",
    },
    deployInHouse: {
      statement: "Deploy in-house.",
      line: "Deployable workflows. Local and HPC integration.",
    },
  },
} as const satisfies HomeCopy["participate"];

export const COLLABORATION_COPY_ZH = {
  title: { plain: "从开源开始。", accent: "按需定制。" },
  supporting: "计算研发、方法开发与内部集成。",
  paths: {
    startOpen: {
      statement: "使用开源工具。",
      line: "用于分子建模与模拟的开源软件。",
    },
    buildTogether: {
      statement: "共同研发。",
      line: "模拟模型、计算方法与研究报告。",
    },
    deployInHouse: {
      statement: "内部部署。",
      line: "可部署工作流，本地与 HPC 集成。",
    },
  },
} as const satisfies HomeCopy["participate"];

export const COLLABORATION_COPY_SV = {
  title: { plain: "Börja öppet.", accent: "Anpassa efter behov." },
  supporting: "Beräkningsbaserad FoU. Metodutveckling. Intern integration.",
  paths: {
    startOpen: {
      statement: "Börja öppet.",
      line: "Programvara med öppen källkod för molekylmodellering och simulering.",
    },
    buildTogether: {
      statement: "Utveckla tillsammans.",
      line: "Simuleringsmodeller, metoder och forskningsrapporter.",
    },
    deployInHouse: {
      statement: "Driftsätt internt.",
      line: "Driftsättningsbara arbetsflöden. Lokal integration och HPC-integration.",
    },
  },
} as const satisfies HomeCopy["participate"];
