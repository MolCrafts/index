import { APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import type { HomeCopy } from "./types";

/** Simplified Chinese is the primary voice of the commercial homepage. */
export const zh: HomeCopy = {
  sectionLabels: {
    hero: "首页",
    about: "关于 MolCrafts",
    solutions: "能力",
    assist: "AI",
    applications: "应用",
    collaboration: "合作",
    trust: "支持",
    contact: "联系",
  },
  brandHero: {
    kicker: "塑造 AI 时代的分子模拟",
    title: "MolCrafts",
    subtitle: "我们为分子科学构建 AI 辅助基础设施。",
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
  approach: {
    title: "研究不止需要算出来，还要能继续往前走。",
    lead: "我们把计算、AI 与科研判断放进同一段研发进程。",
    statement: "每一步都围绕问题、证据与下一次决策展开，让结果真正进入团队的研究现场。",
    promises: ["从问题出发", "用证据推进", "与团队一起落地"],
  },
  whatWeDo: {
    title: "把研究难题，变成可以推进的工作。",
    lead: "根据问题选择方法，把模拟、预测与研发协作连成一条清晰路径。",
    pillars: [
      {
        title: "分子与材料模拟",
        body: "围绕结构、行为与性质，建立适合研究问题的计算路径。",
      },
      {
        title: "AI 驱动的预测",
        body: "把数据、模型与科学判断放在一起，支持材料筛选与性质研究。",
      },
      {
        title: "定制研发协作",
        body: "从方法验证到工作方式落地，与团队共同推进长期课题。",
      },
    ],
  },
  assist: APPROVED_ASSIST_COPY,
  projects: {
    ...APPROVED_APPLICATIONS_HEADING,
    cta: "了解详情",
    stageLabel: "MolCrafts 应用",
    items: {
      molpy: {
        applicationTitle: "体系构建",
        short: "构建并定型分子体系",
        long: "把一个结构变成引擎可以直接运行的定型体系，运行之前先看清楚。",
      },
      molpack: {
        applicationTitle: "装填准备",
        short: "把分子装进模拟盒",
        long: "按你指定的组成填满盒子，每一次运行都得到相同的结果。",
      },
      molvis: {
        applicationTitle: "可视检查",
        short: "查看结构与轨迹",
        long: "在浏览器、编辑器或 notebook 里查看一个结构，或者一整条轨迹。",
      },
      molexp: {
        applicationTitle: "实验追踪",
        short: "运行并追踪实验",
        long: "把流程描述一次就可以运行，每个输入与结果都留在它名下。",
      },
      molnex: {
        applicationTitle: "势函数训练",
        short: "训练并组合势函数",
        long: "用你自己的数据训练势函数，再与你已经信任的物理组合起来。",
      },
      atomiverse: {
        applicationTitle: "模拟运行",
        short: "运行动力学与电子结构",
        long: "通过同一个接口触及分子动力学与电子结构，在 CPU 与 GPU 上运行。",
      },
    },
  },
  participate: {
    title: "合作方式，跟着研究问题走。",
    lead: "可以从公开工作开始，也可以围绕明确课题，建立更深入的研发合作。",
    paths: {
      openSource: {
        title: "公开建设，持续共享",
        audience: "开放研究",
        description: "我们持续公开核心科学工作，让更多研究者能够了解、使用并参与。",
        cta: "查看开源工作",
      },
      consulting: {
        title: "让方法进入你的研究现场",
        audience: "研究咨询",
        description: "围绕一个具体问题，共同判断方法、验证路径，并把结果交到团队手中。",
        cta: "讨论研究需求",
      },
      enterprise: {
        title: "建立长期研发合作",
        audience: "企业合作",
        description: "面对持续性的分子与材料课题，与内部团队协作推进研究和能力建设。",
        cta: "开启企业合作",
      },
    },
  },
  sponsors: {
    title: "开放工作，需要长期支持。",
    lead: "MolCrafts 的公开建设获得 Claude for Open Source 支持。",
    supporterNote: "支持开放科学工作的持续发生。",
  },
  cta: {
    title: "你的下一项研究，可以从一次具体的讨论开始。",
    lead: "告诉我们问题、目标和现有条件。我们会一起判断最合适的推进方式。",
    primaryCta: "讨论你的研究",
    secondaryCta: "再看一次应用",
  },
  footer: {
    tagline: "为分子与材料研发，做能真正进入现场的科学计算。",
    github: "GitHub",
    license: "MIT License",
    backToTop: "回到顶部",
  },
};
