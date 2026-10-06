import type { HomeSectionId } from "@/lib/home/data";
import { sectionHeadingId } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { ScreenMotionContext } from "./ScreenMotion";

interface HomeSectionProps {
  id: HomeSectionId;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  /**
   * `screen` — a block of the argument, which takes a screen.
   * `band` — a short strip that sizes to its own content, for a block that credits
   * rather than argues and would read as empty space if it took a screen too.
   */
  height?: "screen" | "band";
  className?: string;
  children: ReactNode;
}

/**
 * A screen remains in document flow so long mobile content stays accessible.
 * The pager switches between its stops; visibility drives each entrance anew.
 */
export function HomeSection({
  id,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
  height = "screen",
  className,
  children,
}: HomeSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.25 });
  return (
    <section
      ref={ref}
      id={id}
      data-section-id={id}
      data-home-stop={height === "screen" ? id : undefined}
      data-home-visible={visible}
      aria-labelledby={ariaLabelledby ?? sectionHeadingId(id)}
      aria-label={ariaLabel}
      className={cn(
        "relative flex w-full min-w-0 flex-col justify-center",
        height === "screen" && "min-h-svh",
        className,
      )}
    >
      <ScreenMotionContext.Provider value={visible}>{children}</ScreenMotionContext.Provider>
    </section>
  );
}
