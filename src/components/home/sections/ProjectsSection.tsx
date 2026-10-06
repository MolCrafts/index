import { useHomeCopy } from "@/lib/home/copy";
import { HomeBlock } from "../HomeBlock";
import { Reveal } from "../Reveal";
import { ApplicationStage } from "../applications/ApplicationStage";

/**
 * Applications — an interactive stage rather than a catalog.
 *
 * The block argues that the ecosystem can be entered at any point: the band shows
 * every entry at once, and the one the reader picks becomes the whole stage.
 *
 */
export function ProjectsSection() {
  const { projects } = useHomeCopy();

  return (
    <HomeBlock id="applications" title={projects.title} lead={projects.lead} scale="section">
      <Reveal delay={0.65}>
        <ApplicationStage />
      </Reveal>
    </HomeBlock>
  );
}
