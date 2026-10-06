import type { HomeCopy } from "./types";

/**
 * Foundation screen (01) copy. English is the approved source; Chinese and
 * Swedish keep the same hierarchy and claims, said idiomatically. MolCrafts
 * stays untranslated. Banned on this screen: compound, FAIR, reproducible,
 * legacy-free, and the common-ground metaphor.
 */
export const APPROVED_FOUNDATION_COPY = {
  kicker: "The Foundation",
  title: "Open infrastructure for molecular science.",
  titleLines: ["Open infrastructure", "for molecular science."],
  lead: "Connect data, computation and research.",
  strata: [
    {
      id: "physics-data",
      tag: "01 // Physics & Data",
      title: "Scientific data",
      detail: "Physical models, trajectories and topologies in one searchable data layer.",
    },
    {
      id: "workflows",
      tag: "02 // Sustainable Compute",
      title: "Connected workflows",
      detail: "Compose calculations and reuse methods across runs.",
    },
    {
      id: "collaboration",
      tag: "03 // Autonomous Agents",
      title: "AI-assisted research",
      detail: "Give AI access to research context, tools and validation.",
    },
  ],
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_ZH = {
  kicker: "科学根基",
  title: "面向分子科学的开放基础设施。",
  titleLines: ["面向分子科学的", "开放基础设施。"],
  lead: "连接数据、计算与研究。",
  strata: [
    {
      id: "physics-data",
      tag: "01 // 物理与数据基底",
      title: "科学数据",
      detail: "在统一的数据层中检索物理模型、模拟轨迹与分子拓扑。",
    },
    {
      id: "workflows",
      tag: "02 // 可持续计算体系",
      title: "计算工作流",
      detail: "组合计算步骤，在不同任务中复用方法。",
    },
    {
      id: "collaboration",
      tag: "03 // 人机智能体协同",
      title: "AI 辅助研究",
      detail: "让 AI 使用研究上下文、工具与验证方法。",
    },
  ],
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_SV = {
  kicker: "Vetenskaplig grund",
  title: "Öppen infrastruktur för molekylär vetenskap.",
  titleLines: ["Öppen infrastruktur", "för molekylär vetenskap."],
  lead: "Koppla samman data, beräkningar och forskning.",
  strata: [
    {
      id: "physics-data",
      tag: "01 // Fysik & data",
      title: "Vetenskapliga data",
      detail: "Fysikaliska modeller, trajektorier och topologier i ett sökbart datalager.",
    },
    {
      id: "workflows",
      tag: "02 // Hållbar beräkning",
      title: "Beräkningsflöden",
      detail: "Kombinera beräkningar och återanvänd metoder mellan körningar.",
    },
    {
      id: "collaboration",
      tag: "03 // Autonoma agenter",
      title: "AI-stödd forskning",
      detail: "Ge AI tillgång till forskningskontext, verktyg och validering.",
    },
  ],
} as const satisfies HomeCopy["approach"];
