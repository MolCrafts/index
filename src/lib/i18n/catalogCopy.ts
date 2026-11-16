/**
 * Locale overlay for the ecosystem catalog (`src/lib/ecosystem.ts`).
 * The catalog itself stays English-canonical; this module localizes the
 * visitor-facing strings (group titles, blurbs, roles, descriptions, statuses)
 * at render time, falling back to English for anything missing.
 */

import { useMemo } from "react";
import { type EcosystemCategory, type EcosystemItem, ecosystemCategories } from "@/lib/ecosystem";
import { sv } from "@/lib/home/copy/sv";
import { zh } from "@/lib/home/copy/zh";
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
    MolPy: { role: "模型准备", description: zh.projects.items.molpy.description },
    MolPack: { role: "模拟准备", description: zh.projects.items.molpack.description },
    MolNex: { role: "模型训练", description: zh.projects.items.molnex.description },
    MolAb: { role: "研究记录", description: zh.projects.items.molab.description },
    MolVis: { role: "结构查看", description: zh.projects.items.molvis.description },
    MolPlot: { role: "研究绘图", description: "绘制用于探索和分享研究结果的图表" },
    Atomiverse: { role: "分子模拟", description: zh.projects.items.atomiverse.description },
    MolRs: { role: "分子数据", description: "读取和处理分子结构与计算结果" },
    MolQ: { role: "任务管理", description: zh.projects.items.molq.description },
    Tack: { role: "AI 研究辅助", description: zh.projects.items.tack.description },
    MolHub: { role: "数据集访问", description: "下载基准数据集，上传自己的数据" },
  },
  sv: {
    MolPy: { role: "modellförberedelse", description: sv.projects.items.molpy.description },
    MolPack: {
      role: "simuleringsförberedelse",
      description: sv.projects.items.molpack.description,
    },
    MolNex: { role: "modellträning", description: sv.projects.items.molnex.description },
    MolAb: { role: "forskningsdokumentation", description: sv.projects.items.molab.description },
    MolVis: { role: "strukturgranskning", description: sv.projects.items.molvis.description },
    MolPlot: {
      role: "forskningsfigurer",
      description: "Skapa figurer för att utforska och dela forskningsresultat",
    },
    Atomiverse: {
      role: "molekylsimulering",
      description: sv.projects.items.atomiverse.description,
    },
    MolRs: {
      role: "molekylära data",
      description: "Läs och bearbeta molekylstrukturer och resultat",
    },
    MolQ: { role: "jobbhantering", description: sv.projects.items.molq.description },
    Tack: { role: "AI-forskningsstöd", description: sv.projects.items.tack.description },
    MolHub: { role: "datasetåtkomst", description: "Ladda ner referensdataset och ladda upp egna" },
  },
};

/** Keyed by the canonical English group `title`. */
const GROUPS: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, CatalogGroupCopy>>>> =
  {
    zh: {
      Application: { title: "应用层", blurb: "用于研究任务的软件。" },
      Infrastructure: { title: "基础设施层", blurb: "支持研究数据的使用。" },
      Specification: { title: "规范层", blurb: "所有层共同遵守的约定。" },
    },
    sv: {
      Application: { title: "Applikation", blurb: "Verktyg för dina forskningsuppgifter." },
      Infrastructure: { title: "Infrastruktur", blurb: "Stöd för arbetet med forskningsdata." },
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
