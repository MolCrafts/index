import type { HomeSectionId } from "@/lib/home/data";
import { HOME_BLOCK, HOME_CONTAINER, HOME_RULE } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { HomeSection } from "./HomeSection";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { SectionMarker } from "./SectionMarker";

interface HomeBlockProps {
  id: HomeSectionId;
  title: ReactNode;
  lead?: ReactNode;
  /** Claim blocks take the larger heading rung; blocks carrying content the smaller. */
  scale?: "statement" | "section";
  children: ReactNode;
}

/**
 * The opening every content block shares: the numbered rail, the shared measure,
 * the heading row, and the rule under it — with the block's own content below.
 *
 * Six blocks hand-wired this identical five-element skeleton, which is also where
 * the heading id drifted. It is a convenience over the primitives, not a
 * replacement: `HomeSection`, `SectionMarker`, `SectionHeader` and `Reveal` stay
 * exported, and the hero, the AI screen and the closing block still compose them
 * directly because none of them wants this exact shape.
 */
export function HomeBlock({ id, title, lead, scale, children }: HomeBlockProps) {
  return (
    <HomeSection id={id}>
      <SectionMarker sectionId={id} />
      <div className={cn(HOME_CONTAINER, HOME_BLOCK)}>
        <Reveal>
          <SectionHeader sectionId={id} title={title} lead={lead} scale={scale} />
          <div className={HOME_RULE} aria-hidden="true" />
        </Reveal>
        {children}
      </div>
    </HomeSection>
  );
}
