/** Locale-independent homepage structure. Visitor-facing copy lives in `./copy/`. */

import { contactHref } from "../contact";
import type { ProductSlug } from "../routes";
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
  /**
   * Also a routed product slug. Typing it as the intersection makes the compiler
   * reject an entry that names a product the router does not serve — this roster is
   * an eighth product-registration surface, and the catalog guard could not see it
   * while the key was a free-standing union.
   */
  readonly key: ApplicationKey & ProductSlug;
  /** Product name as it is written everywhere else on the site. */
  readonly product: string;
}

/**
 * The application stage roster, in the order the operator fixed: entry points into
 * the stack, read left to right. Every entry stands alone, so the order is a
 * reading order rather than a pipeline.
 */
export const APPLICATIONS: readonly ApplicationMeta[] = [
  { key: "molpy", product: "MolPy" },
  { key: "molpack", product: "MolPack" },
  { key: "molvis", product: "MolVis" },
  { key: "molexp", product: "MolExp" },
  { key: "molnex", product: "MolNex" },
  { key: "atomiverse", product: "Atomiverse" },
] as const;

/** Derived, never hand-written, so a slug rename cannot leave the homepage on a 404. */
export function applicationHref(key: ApplicationMeta["key"]): string {
  return `/${key}`;
}

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
