import type { HomeCopy } from "./types";

/** Three ways to use MolCrafts: open-source tools, collaboration and internal deployment. */
export const APPROVED_COLLABORATION_COPY = {
  title: {
    plain: "Open to start.",
    accent: "Tailored to fit.",
  },
  supporting: "Computational R&D. Methods. In-house deployment.",
  paths: {
    startOpen: {
      statement: "Start open.",
      line: "Open tools for molecular research.",
    },
    buildTogether: {
      statement: "Build together.",
      line: "Simulation models, methods and research reports.",
    },
    deployInHouse: {
      statement: "Deploy in-house.",
      line: "Research workflows for your team's computing resources.",
    },
  },
} as const satisfies HomeCopy["participate"];

export const COLLABORATION_COPY_ZH = {
  title: { plain: "从开源开始。", accent: "按需定制。" },
  supporting: "计算研发、方法开发与内部部署。",
  paths: {
    startOpen: {
      statement: "使用开源工具。",
      line: "用于分子研究的开源软件。",
    },
    buildTogether: {
      statement: "共同研发。",
      line: "模拟模型、计算方法与研究报告。",
    },
    deployInHouse: {
      statement: "内部部署。",
      line: "适配团队计算资源的研究工作流。",
    },
  },
} as const satisfies HomeCopy["participate"];

export const COLLABORATION_COPY_SV = {
  title: { plain: "Börja öppet.", accent: "Anpassa efter behov." },
  supporting: "Beräkningsbaserad FoU. Metoder. Intern driftsättning.",
  paths: {
    startOpen: {
      statement: "Börja öppet.",
      line: "Öppna verktyg för molekylär forskning.",
    },
    buildTogether: {
      statement: "Utveckla tillsammans.",
      line: "Simuleringsmodeller, metoder och forskningsrapporter.",
    },
    deployInHouse: {
      statement: "Driftsätt internt.",
      line: "Forskningsarbetsflöden för teamets beräkningsresurser.",
    },
  },
} as const satisfies HomeCopy["participate"];
