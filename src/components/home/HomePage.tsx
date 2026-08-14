/**
 * Hallmark / commercial home
 * THESIS: A molecular and materials R&D company, not a software directory.
 * OWN-WORLD: Deep forest/cyan, luminous molecular matter, gradient type and restrained glows.
 * STORY: Company → capabilities → applications → collaboration → trust → contact.
 * FIRST VIEWPORT: Centred MolCrafts brand curtain; no product capture or commercial detail.
 * FORM: One continuously scrolling document over a single fixed molecular field.
 * FINISH: the build ends with visual review, verification, and portable token records.
 */
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_SECTION_IDS } from "@/lib/home/data";
import { useEffect, useMemo } from "react";
import { HomeAtmosphere } from "./HomeAtmosphere";
import { HomeFooter } from "./HomeFooter";
import { SectionDots } from "./SectionDots";
import { ApproachSection } from "./sections/ApproachSection";
import { AssistSection } from "./sections/AssistSection";
import { ClosingSection } from "./sections/ClosingSection";
import { HeroSection } from "./sections/HeroSection";
import { ParticipateSection } from "./sections/ParticipateSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { WhatWeDoSection } from "./sections/WhatWeDoSection";

/**
 * Homepage: one scrolling commercial narrative. Strings live in the locale copy,
 * while this file only owns the order of the argument.
 */
export function HomePage() {
  const { sectionLabels } = useHomeCopy();
  /* Stable across renders: the rail observes these ids, so a fresh array each
     render would tear down and rebuild its observer. */
  const dotLabels = useMemo(
    () => HOME_SECTION_IDS.map((id) => ({ id, label: sectionLabels[id] })),
    [sectionLabels],
  );

  /* The app holds content behind a loading gate, so the browser has already run its
     own fragment scroll and found no such element. Apply the anchor once the
     sections exist — instantly, since the reader asked for that block, not for a
     journey down to it. */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    /* `instant`, not `auto`: `auto` defers to `scroll-behavior: smooth` on `html`,
       which glides the reader through every block between the top and the one they
       asked for. */
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);

  return (
    <div className="relative isolate min-w-0 bg-background font-body text-foreground">
      <HomeAtmosphere />
      <SectionDots labels={dotLabels} />

      <div className="relative z-10">
        <HeroSection />
        <ApproachSection />
        <WhatWeDoSection />
        <AssistSection />
        <ProjectsSection />
        <ParticipateSection />
        <SponsorsSection />
        <ClosingSection />
        <HomeFooter />
      </div>
    </div>
  );
}
