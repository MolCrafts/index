import type { HomeCopy } from "./types";

/**
 * Operator-authored English copy for the application stage headline.
 *
 * Supplied verbatim in the section brief; other locales share it until their
 * translations are approved, exactly as {@link APPROVED_ASSIST_COPY} does. It is
 * assigned *into* each locale record rather than imported by the component, so
 * `HomeCopy` stays the single contract for this section — a bare exported constant
 * escapes the locale check and strands every non-component consumer, which is how
 * the prerenderer lost its typed handle on this heading.
 */
export const APPROVED_APPLICATIONS_HEADING = {
  title: "Take one. Or take the stack.",
  lead: "Built to work better together, designed to stand on their own.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;
