import { cn } from "./utils";

/**
 * Homepage section language — shared measure so edges line up.
 * Premium: paper material + normal/medium type, not light walls + cyan glow.
 */

export const sectionShell = "relative overflow-hidden py-24 md:py-32";

/** Essay peaks (principles). */
export const sectionShellTall = "relative overflow-hidden py-28 md:py-36";

/** Closing strips (updates / start here). */
export const sectionShellBand = "relative overflow-hidden py-14 md:py-16";

/** Full-bleed content rail — matches Hero max-w-7xl. */
export const sectionContainer = "container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10";

export const sectionStack = "flex flex-col gap-14 md:gap-16 lg:gap-20";

export const sectionHeader = "flex flex-col gap-4 md:gap-5";

/** Quiet section mark — no glow rule by default. */
export const sectionLabel = cn("text-xs font-semibold uppercase tracking-[0.14em] text-primary");

/** Optional hairline before a label when a section needs a mark. */
export const sectionLabelRule = "section-label-rule";

export const sectionTitle = cn(
  "max-w-3xl text-3xl font-medium leading-[1.15] tracking-tight text-foreground",
  "md:text-4xl lg:text-[2.5rem] lg:leading-[1.12]",
);

export const sectionLead = cn(
  "max-w-2xl text-base font-normal leading-relaxed text-muted-foreground",
  "md:text-lg md:leading-[1.65]",
);

export const sectionH3 = "text-lg font-medium tracking-tight text-foreground md:text-xl";

export const sectionBody = cn(
  "text-base font-normal leading-relaxed text-muted-foreground",
  "md:leading-[1.65]",
);

export const sectionSubLabel = cn(
  "font-['Outfit',sans-serif] text-xs font-semibold uppercase tracking-[0.14em] text-primary",
);

export const sectionBandRow = "grid gap-6 md:grid-cols-2 md:items-end";
