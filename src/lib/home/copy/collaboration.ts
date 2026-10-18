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
      line: "Open-source tools. Independent research.",
    },
    buildTogether: {
      statement: "Build together.",
      line: "Molecular modeling and method development.",
    },
    deployInHouse: {
      statement: "Deploy in-house.",
      line: "Workflow integration for local and HPC systems.",
    },
  },
} as const satisfies HomeCopy["participate"];

export const COLLABORATION_COPY_ZH = {
  title: { plain: "从开源开始。", accent: "按需定制。" },
  supporting: "使用开源工具，与我们合作，或部署到自己的基础设施中。",
  paths: {
    startOpen: {
      statement: "使用开源工具。",
      line: "直接使用 MolCrafts，扩展工具，并在开源生态上继续开发。",
    },
    buildTogether: {
      statement: "共同研发。",
      line: "带来你的研究课题，与我们共同开发方法、软件与基础设施。",
    },
    deployInHouse: {
      statement: "内部部署。",
      line: "将 MolCrafts 集成到自己的基础设施中，支持内部研发。",
    },
  },
} as const satisfies HomeCopy["participate"];

export const COLLABORATION_COPY_SV = {
  title: { plain: "Börja öppet.", accent: "Anpassa efter behov." },
  supporting:
    "Använd verktygen med öppen källkod, samarbeta med oss eller driftsätt på egen infrastruktur.",
  paths: {
    startOpen: {
      statement: "Börja öppet.",
      line: "Använd MolCrafts direkt. Utforska, utöka och bygg vidare på verktygen med öppen källkod.",
    },
    buildTogether: {
      statement: "Utveckla tillsammans.",
      line: "Ta med en forskningsfråga. Vi utvecklar metoder, programvara och infrastruktur med ert team.",
    },
    deployInHouse: {
      statement: "Driftsätt internt.",
      line: "Integrera MolCrafts i er egen infrastruktur för forskning och utveckling inom organisationen.",
    },
  },
} as const satisfies HomeCopy["participate"];
