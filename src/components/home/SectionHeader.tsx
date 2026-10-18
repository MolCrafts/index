import type { ReactNode } from "react";
import type { HomeSectionId } from "@/lib/home/data";
import {
  HOME_H2_SECTION,
  HOME_H2_STATEMENT,
  HOME_HEADER_GRID,
  HOME_LEAD,
  HOME_SECTION_LEAD,
  sectionHeadingId,
} from "@/lib/home/stage";
import { cn } from "@/lib/utils";

const SCALE = {
  statement: HOME_H2_STATEMENT,
  section: HOME_H2_SECTION,
} as const;

interface SectionHeaderProps {
  sectionId: HomeSectionId;
  title: ReactNode;
  lead?: ReactNode;
  /** Claim screens take the larger rung; screens carrying content take the smaller. */
  scale?: keyof typeof SCALE;
  /**
   * `paragraph` — prose, set in its own measured column beside the heading.
   * `line` — one sentence that reads as a line and must not break in the middle of
   * itself; it takes the width it needs and the heading column yields. Narrow
   * viewports still wrap it, because no phrase of this length fits a phone.
   */
  leadShape?: "paragraph" | "line";
  className?: string;
}

/**
 * A screen's heading beside its lead. Screens differ in what hangs below this
 * row, never in the row itself — that shared measure is what stops the eye from
 * having to re-find the text on every flip.
 */
export function SectionHeader({
  sectionId,
  title,
  lead,
  scale = "section",
  leadShape = "paragraph",
  className,
}: SectionHeaderProps) {
  /* Support is a credit, not a two-column poster: title, lead, then the roster
     stack on the left. A side-by-side header shoved the sentence into the middle
     of the row and the sponsor to the far edge. */
  const stacked = sectionId === "trust";

  return (
    <div
      className={cn(
        HOME_HEADER_GRID,
        "w-full min-w-0",
        stacked && "md:grid-cols-1 md:items-start md:gap-4",
        /* The shared lead track is capped at its `fr` share, so an unbroken line
           overflows it and lands on the heading. A line sizes its own track and
           the heading takes what is left. */
        leadShape === "line" && !stacked && "lg:grid-cols-[minmax(0,1fr)_max-content]",
        className,
      )}
    >
      <h2 id={sectionHeadingId(sectionId)} className={cn(SCALE[scale], "min-w-0")}>
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            scale === "statement" ? HOME_SECTION_LEAD : HOME_LEAD,
            stacked ? "md:justify-self-start" : "md:justify-self-end",
            leadShape === "line" && !stacked ? "lg:whitespace-nowrap" : "max-w-xl",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
