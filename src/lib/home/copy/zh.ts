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
    solutions: "能力",
    assist: "AI",
    applications: "应用",
    collaboration: "合作",
    trust: "支持",
  },
  brandHero: {
    kicker: "标准化分子与材料计算",
    title: "MolCrafts",
    subtitle: "用 AI 辅助的科学基础设施，加速你的研发。",
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
    title: "让研究知识不断积累。",
    titleLines: ["让研究知识", "不断积累。"],
    lead: "在已有发现之上继续研究。",
    pillars: [
      {
        title: "统一数据",
        body: "连接分子、模型与结果，保留数据来源。",
      },
      {
        title: "关联知识",
        body: "将方法和发现与相关数据关联。",
      },
      {
        title: "可复现研究",
        body: "重新运行、调整和扩展工作流。",
      },
    ],
  },
  assist: ASSIST_COPY_ZH,
  projects: {
    ...APPLICATIONS_HEADING_ZH,
    cta: "了解详情",
    stageLabel: "MolCrafts 应用",
    items: {
      molpy: {
        applicationTitle: "体系构建",
        short: "构建分子体系并分配原子类型",
        long: "用于分子建模的可组合工具包",
      },
      molpack: {
        applicationTitle: "装填准备",
        short: "把分子装进模拟盒",
        long: "可扩展的分子装填工具，用于生成初始构型",
      },
      molvis: {
        applicationTitle: "可视检查",
        short: "查看结构与轨迹",
        long: "交互式分子可视化库",
      },
      molab: {
        applicationTitle: "实验追踪",
        short: "运行并追踪实验",
        long: "面向计算研究的 AI 辅助工作流管理与知识系统",
      },
      molnex: {
        applicationTitle: "势函数训练",
        short: "训练并组合势函数",
        long: "统一的机器学习框架，用于原子间势、生成模型与性质预测",
      },
      atomiverse: {
        applicationTitle: "模拟运行",
        short: "运行分子动力学与电子结构计算",
        long: "多尺度分子模拟引擎",
      },
    },
  },
  participate: COLLABORATION_COPY_ZH,
  sponsors: {
    title: "赞助者",
    lead: "感谢支持我们开源工作的计划。",
  },
  footer: {
    tagline: "用 AI 辅助的科学基础设施，加速你的研发。",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "回到顶部",
  },
};
