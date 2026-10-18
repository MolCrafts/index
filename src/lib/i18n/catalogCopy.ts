/**
 * Locale overlay for the ecosystem catalog (`src/lib/ecosystem.ts`).
 * The catalog itself stays English-canonical; this module localizes the
 * visitor-facing strings (group titles, blurbs, roles, descriptions, statuses)
 * at render time, falling back to English for anything missing.
 */

import { useMemo } from "react";
import { type EcosystemCategory, type EcosystemItem, ecosystemCategories } from "@/lib/ecosystem";
import { useLocale } from "./LocaleProvider";
import type { Locale } from "./locale";

interface CatalogItemCopy {
  readonly role: string;
  readonly description: string;
}

interface CatalogGroupCopy {
  readonly title: string;
  readonly blurb: string;
}

/** Keyed by the canonical English `title` in ecosystem.ts. */
const ITEMS: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, CatalogItemCopy>>>> = {
  zh: {
    MolPy: { role: "分子工具包", description: "用于分子建模的可组合工具包" },
    MolPack: { role: "构型生成工具", description: "可扩展的分子模拟初始构型生成" },
    MolNex: {
      role: "机器学习框架",
      description: "统一机器学习框架，用于原子间势、生成模型与性质预测",
    },
    MolAb: { role: "工作流平台", description: "面向计算研究的 AI 辅助工作流与知识管理" },
    MolVis: { role: "可视化库", description: "交互式分子可视化库" },
    MolPlot: { role: "绘图库", description: "一份图表定义，同时用于网页与出版。" },
    Atomiverse: { role: "模拟引擎", description: "多尺度分子模拟引擎" },
    MolRs: { role: "计算内核", description: "MolPy 底层的数据结构、文件 I/O 与计算内核。" },
    MolQ: { role: "作业队列", description: "一个提交 API，通用于本地、SLURM、PBS 与 LSF。" },
    MolHub: { role: "数据集访问", description: "下载基准数据集，上传你自己的。" },
  },
  sv: {
    MolPy: {
      role: "molekylverktygslåda",
      description: "Komponerbar verktygslåda för molekylmodellering",
    },
    MolPack: {
      role: "konfigurationsgenerator",
      description: "Utbyggbar generering av startkonfigurationer för molekylsimulering",
    },
    MolNex: {
      role: "ML-ramverk",
      description:
        "Enhetligt ML-ramverk för interatomära potentialer, generativa modeller och egenskapsprediktion",
    },
    MolAb: {
      role: "arbetsflödesplattform",
      description: "AI-stödd hantering av arbetsflöden och kunskap för beräkningsforskning",
    },
    MolVis: {
      role: "visualiseringsbibliotek",
      description: "Bibliotek för interaktiv molekylvisualisering",
    },
    MolPlot: {
      role: "diagrambibliotek",
      description: "En diagramdefinition, för webb och för tryck.",
    },
    Atomiverse: {
      role: "simuleringsmotor",
      description: "Motor för molekylsimulering i flera skalor",
    },
    MolRs: {
      role: "beräkningskärna",
      description: "Datastrukturer, fil-I/O och beräkningskärnor under MolPy.",
    },
    MolQ: { role: "jobbkö", description: "Ett inlämnings-API för lokalt, SLURM, PBS och LSF." },
    MolHub: {
      role: "datasetåtkomst",
      description: "Ladda ner referensdataset, ladda upp dina egna.",
    },
  },
};

/** Keyed by the canonical English group `title`. */
const GROUPS: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, CatalogGroupCopy>>>> =
  {
    zh: {
      Application: { title: "应用层", blurb: "你直接调用的部分。" },
      Infrastructure: { title: "基础设施层", blurb: "支撑技术栈的底座。" },
      Specification: { title: "规范层", blurb: "所有层共同遵守的约定。" },
    },
    sv: {
      Application: { title: "Applikation", blurb: "Det du anropar direkt." },
      Infrastructure: { title: "Infrastruktur", blurb: "Det som bär upp stacken." },
      Specification: { title: "Specifikation", blurb: "Det alla lager är överens om." },
    },
  };

/** Keyed by the canonical English `status`. */
const STATUSES: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, string>>>> = {
  zh: {
    "In development": "开发中",
    "Preparing release": "准备发布",
  },
  sv: {
    "In development": "Under utveckling",
    "Preparing release": "Förbereder release",
  },
};

/** Catalog status in the active locale. English strings stay canonical. */
export function localizeStatus(status: string, locale: Locale): string {
  if (locale === "en") return status;
  return STATUSES[locale][status] ?? status;
}

function localizeItem(item: EcosystemItem, locale: Locale): EcosystemItem {
  if (locale === "en") return item;
  const copy = ITEMS[locale][item.title];
  const status = item.status ? localizeStatus(item.status, locale) : undefined;
  return {
    ...item,
    role: copy?.role ?? item.role,
    description: copy?.description ?? item.description,
    ...(status !== undefined && { status }),
  };
}

function localizeCategory(category: EcosystemCategory, locale: Locale): EcosystemCategory {
  if (locale === "en") return category;
  const group = GROUPS[locale][category.title];
  return {
    ...category,
    title: group?.title ?? category.title,
    blurb: group?.blurb ?? category.blurb,
    items: category.items.map((item) => localizeItem(item, locale)),
  };
}

/** The ecosystem catalog in the active locale. English is returned as-is. */
export function useLocalizedEcosystem(): EcosystemCategory[] {
  const { locale } = useLocale();
  return useMemo(
    () => ecosystemCategories.map((category) => localizeCategory(category, locale)),
    [locale],
  );
}
