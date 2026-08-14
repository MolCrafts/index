import type { HomeSectionId } from "@/lib/home/data";
import { sectionHeadingId } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HomeSectionProps {
  id: HomeSectionId;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  className?: string;
  children: ReactNode;
}

/**
 * One block of the homepage argument: a screen tall, in normal document flow.
 *
 * `min-h-svh` is a floor, not an equality. On a desktop viewport every block lands
 * on exactly one screen and the page keeps a steady beat; where content genuinely
 * outgrows a short viewport the block extends rather than clipping, so heights are
 * equal in practice but never guaranteed. Nothing snaps — the reader controls the
 * distance, and the shared background behind them (`HomeAtmosphere`) never moves,
 * so the blocks read as one space rather than eight.
 */
export function HomeSection({
  id,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
  className,
  children,
}: HomeSectionProps) {
  return (
    <section
      id={id}
      data-section-id={id}
      aria-labelledby={ariaLabelledby ?? sectionHeadingId(id)}
      aria-label={ariaLabel}
      className={cn(
        "relative flex min-h-svh w-full min-w-0 scroll-mt-24 flex-col justify-center",
        className,
      )}
    >
      {children}
    </section>
  );
}
