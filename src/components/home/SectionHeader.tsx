import type { HomeSectionId } from "@/lib/home/data";
import {
  HOME_H2_SECTION,
  HOME_H2_STATEMENT,
  HOME_HEADER_GRID,
  HOME_LEAD,
  sectionHeadingId,
} from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(HOME_HEADER_GRID, "w-full min-w-0", className)}>
      <h2 id={sectionHeadingId(sectionId)} className={cn(SCALE[scale], "min-w-0")}>
        {title}
      </h2>
      {lead ? <p className={cn(HOME_LEAD, "max-w-xl md:justify-self-end")}>{lead}</p> : null}
    </div>
  );
}
