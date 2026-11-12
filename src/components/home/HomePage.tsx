import { useMemo } from "react";
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_SECTION_IDS } from "@/lib/home/data";
import { useHomePaging } from "@/lib/home/useHomePaging";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { LatticeField } from "./art/LatticeField";
import { HomeAtmosphere } from "./HomeAtmosphere";
import { HomeFooter } from "./HomeFooter";
import { SectionDots } from "./SectionDots";
import { ApproachSection } from "./sections/ApproachSection";
import { AssistSection } from "./sections/AssistSection";
import { HeroSection } from "./sections/HeroSection";
import { ParticipateSection } from "./sections/ParticipateSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { WhatWeDoSection } from "./sections/WhatWeDoSection";

/**
 * Homepage: a sequence of scientific editorial screens. Strings live in the locale copy,
 * while this file only owns the order of the argument.
 */
export function HomePage() {
  const { sectionLabels } = useHomeCopy();
  useHomePaging();
  const roomy = useMediaQuery("(min-width: 48rem)");
  /* Stable across renders: the rail observes these ids, so a fresh array each
     render would tear down and rebuild its observer. */
  const dotLabels = useMemo(
    () => HOME_SECTION_IDS.map((id) => ({ id, label: sectionLabels[id] })),
    [sectionLabels],
  );

  return (
    <div
      data-home-pager
      className="relative isolate min-w-0 bg-background font-body text-foreground"
    >
      <HomeAtmosphere />
      <SectionDots labels={dotLabels} />

      <div className="relative z-10">
        <HeroSection />
        <ApproachSection />
        <WhatWeDoSection />
        <AssistSection />
        <ProjectsSection />
        <ParticipateSection />
        {/* The closing stop takes a screen like every other: shorter than the
            viewport, it could not pin, and the collaboration rows above it slid
            under the navbar. The credit sits in the middle, the footer at the foot. */}
        <div data-home-stop="trust" className="relative isolate flex min-h-svh flex-col">
          {/* The hero's sheet returns to close the page, kept to the right of the
              credit and above the footer. A phone has no such side: the credit
              fills the screen, so the sheet is neither built nor drawn there. */}
          {roomy ? <LatticeField variant="support" className="-z-10" /> : null}
          <SponsorsSection />
          <HomeFooter />
        </div>
      </div>
    </div>
  );
}
