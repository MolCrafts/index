/**
 * Hallmark / commercial home
 * THESIS: A molecular and materials R&D company, not a software directory.
 * OWN-WORLD: Deep forest/cyan, luminous molecular matter, gradient type and restrained glows.
 * STORY: Company → capabilities → applications → collaboration → trust → contact.
 * FIRST VIEWPORT: Centred MolCrafts brand curtain; no product capture or commercial detail.
 * FORM: Marquee Hero followed by a split commercial statement (molcrafts-commercial-home-v2).
 * FINISH: the build ends with visual review, verification, and portable token records.
 */
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_SECTION_IDS } from "@/lib/home/data";
import { FullpageProvider, FullpageTrack } from "./fullpage/FullpageProvider";
import { SectionDots } from "./fullpage/SectionDots";
import { ApproachSection } from "./sections/ApproachSection";
import { ClosingSection } from "./sections/ClosingSection";
import { HeroSection } from "./sections/HeroSection";
import { ParticipateSection } from "./sections/ParticipateSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { WhatWeDoSection } from "./sections/WhatWeDoSection";

/**
 * Homepage: fullpage commercial narrative. Strings live in the locale copy,
 * while this file only owns the order of the argument.
 */
export function HomePage() {
  const { sectionLabels } = useHomeCopy();
  const dotLabels = HOME_SECTION_IDS.map((id) => ({ id, label: sectionLabels[id] }));

  return (
    <div className="home-narrative relative isolate h-full min-w-0 bg-background font-body text-foreground">
      <FullpageProvider sectionIds={HOME_SECTION_IDS} className="h-full">
        <SectionDots labels={dotLabels} />
        <FullpageTrack>
          <HeroSection />
          <ApproachSection />
          <WhatWeDoSection />
          <ProjectsSection />
          <ParticipateSection />
          <SponsorsSection />
          <ClosingSection />
        </FullpageTrack>
      </FullpageProvider>
    </div>
  );
}
