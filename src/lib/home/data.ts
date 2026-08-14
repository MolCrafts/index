/** Locale-independent homepage structure. Visitor-facing copy lives in `./copy/`. */

import { contactHref } from "../contact";
import type { ApplicationKey, ParticipatePathKey } from "./copy/types";

export const HOME_SECTION_IDS = [
  "hero",
  "about",
  "solutions",
  "assist",
  "applications",
  "collaboration",
  "trust",
  "contact",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

export const GITHUB_ORG_HREF = "https://github.com/MolCrafts";

export const heroLinks = {
  primaryHref: "#applications",
  secondaryHref: contactHref("Homepage hero"),
} as const;

export interface ApplicationMeta {
  readonly key: ApplicationKey;
  readonly product: string;
  readonly href: string;
}

export const APPLICATIONS: readonly ApplicationMeta[] = [
  { key: "simulation", product: "Atomiverse", href: "/atomiverse" },
  { key: "prediction", product: "MolNex", href: "/molnex" },
  { key: "systemDesign", product: "MolPy · MolPack", href: "/molpy" },
  { key: "visualAnalysis", product: "MolVis", href: "/molvis" },
  { key: "collaboration", product: "MolExp", href: "/molexp" },
] as const;

export interface ParticipatePathMeta {
  readonly key: ParticipatePathKey;
  readonly href: string;
  readonly external?: boolean;
}

export const PARTICIPATE_PATHS: readonly ParticipatePathMeta[] = [
  { key: "openSource", href: GITHUB_ORG_HREF, external: true },
  { key: "consulting", href: contactHref("Research consulting") },
  { key: "enterprise", href: contactHref("Enterprise collaboration") },
] as const;

export const sponsorItems = [
  {
    name: "Claude for Open Source",
    href: "https://claude.com/contact-sales/claude-for-oss",
    logoAlt: "Claude",
  },
] as const;

export const closingLinks = {
  contactHref: contactHref("Homepage closing"),
  applicationsHref: "#applications",
  githubHref: GITHUB_ORG_HREF,
} as const;
