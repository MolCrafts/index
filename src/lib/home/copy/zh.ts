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
    subtitle: "面向分子建模、模拟、机器学习与研究工作流的开源软件栈。",
    primaryCta: "查看软件",
    secondaryCta: "讨论合作",
  },
  approach: APPROVED_FOUNDATION_COPY_ZH,
  whatWeDo: {
    title: "知识，标准化。",
    titleLines: ["知识，", "标准化。"],
    lead: "在每一次发现之上继续前进。",
    pillars: [
      { title: "统一数据", body: "结构、模型与结果，共用一种记录格式。" },
      { title: "关联知识", body: "每项发现都关联到产生它的方法。" },
      { title: "可复用工作流", body: "工作流可直接沿用到下一个项目。" },
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
    tagline: "面向分子与材料计算的开放基础设施。",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "回到顶部",
  },
};
