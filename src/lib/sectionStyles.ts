import { cn } from "./utils";

/**
 * Homepage section language — shared measure so edges line up.
 * Wide shell (max-w-7xl) matches Hero / product pages; type measures stay
 * readable without stacking long paragraphs into a tall text column.
 */

export const sectionShell = "relative overflow-hidden py-24 md:py-32";

/** Essay peaks (principles / work with us). */
export const sectionShellTall = "relative overflow-hidden py-28 md:py-40";

/** Closing strips (updates / start here). */
export const sectionShellBand = "relative overflow-hidden py-16 md:py-20";

/** Full-bleed content rail — matches Hero max-w-7xl. */
export const sectionContainer = "container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10";

export const sectionStack = "flex flex-col gap-16 md:gap-20";

export const sectionHeader = "flex flex-col gap-5 md:gap-6";

export const sectionLabel = cn(
  "flex items-center gap-4 text-sm font-bold uppercase tracking-[0.3em] text-primary",
);

/** Prefer class `section-label-rule` in CSS for the glowing tip; keep utility as fallback. */
export const sectionLabelRule = "section-label-rule";

export const sectionTitle = cn(
  "max-w-4xl text-3xl font-light leading-[1.15] tracking-tight text-foreground",
  "md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]",
);

export const sectionLead = cn(
  "max-w-3xl text-base font-light leading-relaxed text-muted-foreground",
  "md:text-lg md:leading-[1.7]",
);

export const sectionH3 = "text-lg font-medium tracking-tight text-foreground md:text-xl";

export const sectionBody =
  "text-base font-light leading-relaxed text-muted-foreground md:leading-[1.7]";

export const sectionSubLabel = cn(
  "font-['Outfit',sans-serif] text-xs font-bold uppercase tracking-[0.28em] text-primary",
);

export const sectionBandRow = "grid gap-6 md:grid-cols-2 md:items-end";
