import { TYPE_BODY, TYPE_HEADING, TYPE_LABEL } from "./typeStyles";
import { cn } from "./utils";

/**
 * Homepage section language — shared measure so edges line up.
 * Wide shell (max-w-7xl) matches Hero / product pages; type measures stay
 * readable without stacking long paragraphs into a tall text column.
 */

/**
 * Continuous page surface — no per-section background paint (avoids hard seams).
 * Parent `.home-body` / page root owns `bg-background`.
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
  TYPE_LABEL,
  "flex items-center gap-4 text-sm font-bold text-primary",
);

export const sectionLabelRule =
  "h-px w-14 shrink-0 bg-[linear-gradient(90deg,hsl(var(--primary)/0.95),hsl(var(--primary)/0.4),transparent)] shadow-[0_0_14px_hsl(var(--primary)/0.4),0_0_28px_hsl(var(--primary)/0.18)]";

export const sectionTitle = cn(
  TYPE_HEADING,
  "max-w-4xl text-3xl font-light text-foreground",
  "md:text-4xl lg:text-[2.75rem]",
);

export const sectionLead = cn(
  TYPE_BODY,
  "max-w-3xl text-base font-light text-muted-foreground md:text-lg",
);

export const sectionH3 = cn(TYPE_HEADING, "text-lg font-medium text-foreground md:text-xl");

export const sectionBody = cn(TYPE_BODY, "text-base font-light text-muted-foreground");

export const sectionSubLabel = cn(TYPE_LABEL, "font-outfit text-xs font-bold text-primary");

export const sectionBandRow = "grid gap-6 md:grid-cols-2 md:items-end";
