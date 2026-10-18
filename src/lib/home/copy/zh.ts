import { APPLICATIONS_HEADING_ZH } from "./applications";
import { ASSIST_COPY_ZH } from "./assist";
import { COLLABORATION_COPY_ZH } from "./collaboration";
import { APPROVED_FOUNDATION_COPY_ZH } from "./foundation";
import type { HomeCopy } from "./types";

/** Shipped from the English homepage. English is written first. */
export const zh: HomeCopy = {
  sectionLabels: {
    hero: "首页",
    about: "根基",
    solutions: "知识延续",
    assist: "AI",
    applications: "应用",
    collaboration: "合作",
    trust: "支持",
  },
  brandHero: {
    kicker: "标准化材料研发，",
    title: "MolCrafts",
    subtitle: "面向 AI 时代。",
  },
  hero: {
    title: "让复杂分子研究",
    accent: "走向可用的答案。",
    subtitle:
      "MolCrafts 将科学计算、AI 与研发经验带进真实问题：从材料性质预测到模拟研究，再到长期技术合作。",
    primaryCta: "查看应用",
    secondaryCta: "讨论合作",
    scrollHint: "继续了解",
  },
  approach: APPROVED_FOUNDATION_COPY_ZH,
  whatWeDo: {
    title: "知识，标准化。",
    titleLines: ["知识，", "标准化。"],
    lead: "在每一次发现之上继续前进。",
    pillars: [
      { title: "统一数据", body: "结构化输入、模型与结果。" },
      { title: "关联知识", body: "关联方法与研究发现。" },
      { title: "可复用工作流", body: "跨项目复用研究方法。" },
    ],
  },
  assist: ASSIST_COPY_ZH,
  projects: {
    ...APPLICATIONS_HEADING_ZH,
    stageLabel: "MolCrafts 应用",
    items: {
      molpy: {
        description: "用于分子建模的可组合工具包",
      },
      molpack: {
        description: "可扩展的分子模拟初始构型生成",
      },
      molvis: {
        description: "交互式分子可视化库",
      },
      molab: {
        description: "面向计算研究的 AI 辅助工作流与知识管理",
      },
      molnex: {
        description: "统一机器学习框架，用于原子间势、生成模型与性质预测",
      },
      atomiverse: {
        description: "多尺度分子模拟引擎",
      },
    },
  },
  participate: COLLABORATION_COPY_ZH,
  sponsors: {
    title: "赞助者",
    lead: "感谢支持我们开源工作的计划。",
  },
  footer: {
    tagline: "面向 AI 辅助研究的科学基础设施。",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "回到顶部",
  },
};
