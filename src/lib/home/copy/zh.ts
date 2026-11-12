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
    primaryCta: "查看软件",
  },
  approach: APPROVED_FOUNDATION_COPY_ZH,
  whatWeDo: {
    title: "让研究持续积累。",
    titleLines: ["让研究", "持续积累。"],
    lead: "让每项发现成为下一步的起点。",
    pillars: [
      { title: "衔接数据", body: "在支持互通的工具间传递结构与结果。" },
      { title: "发现有据", body: "让发现关联到方法与证据。" },
      { title: "复用流程", body: "沿用已有流程，研究下一个问题。" },
    ],
  },
  assist: ASSIST_COPY_ZH,
  projects: {
    ...APPLICATIONS_HEADING_ZH,
    stageLabel: "MolCrafts 应用",
    items: {
      molpy: {
        description: "构建用于计算的分子模型",
      },
      molpack: {
        description: "生成分子模拟所需的初始构型",
      },
      molvis: {
        description: "查看结构、编辑分子、检查轨迹",
      },
      molab: {
        description: "关联工作流、运行记录与研究发现",
      },
      molnex: {
        description: "训练用于性质预测与模拟的模型",
      },
      atomiverse: {
        description: "模拟分子行为与材料性质",
      },
      molq: {
        description: "提交并跟踪本地与集群计算任务",
      },
      tack: {
        description: "与 AI 一起规划研究、梳理发现",
      },
    },
  },
  participate: COLLABORATION_COPY_ZH,
  sponsors: {
    title: "赞助者",
    lead: "感谢支持我们开源工作的计划。",
  },
  footer: {
    tagline: "面向材料研发的软件与研究工作流。",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "回到顶部",
  },
};
