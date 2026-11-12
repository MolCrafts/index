import { motion, useInView, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  type KnowledgeStationMotion,
  knowledgeHeaderReveal,
  prefersReducedMotion,
} from "@/lib/animations";
import { CONTINUITY_STOPS } from "@/lib/home/art/continuity";
import { BREATH_SECONDS } from "@/lib/home/art/loop";
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_BLOCK, HOME_CONTAINER } from "@/lib/home/stage";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { ContinuityLandscape } from "../art/ContinuityLandscape";
import { ContinuityThread } from "../art/ContinuityThread";
import { useLoop, useStation } from "../art/useLoop";
import { HomeSection } from "../HomeSection";
import { SectionHeader } from "../SectionHeader";
import { SectionMarker } from "../SectionMarker";

/** Each station wakes as the drawn line reaches it. */
const STATIONS: ReadonlyArray<KnowledgeStationMotion> = [
  { delay: 0.7 },
  { delay: 1.1 },
  { delay: 1.55 },
];

/** The light's trail, as a share of the trajectory. */
const TAIL = 0.07;
/** The light crosses the surface in about four breaths, then the screen rests for one. */
const LOOP_SECONDS = BREATH_SECONDS * 5;
const SPAN = 1 + TAIL + 0.2;
/** How near a basin the light has to be for its station to wake. */
const WAKE = 0.07;
/**
 * Where the landscape has room: the stage and its labels scale with the screen,
 * the headline above them does not, so a very short screen keeps the stations
 * in a column like a narrow one.
 */
const LANDSCAPE_QUERY = "(min-width: 64rem) and (min-height: 40rem)";

/**
 * Continuity — one statement, and a line through three stations.
 *
 * The message ("what one project produces, the next one stands on") is sequence
 * and persistence, so the composition is that sequence. On a wide screen it is
 * drawn the way the field draws it: an energy surface, the three results as its
 * basins, and the minimum-energy path between them, with a light travelling the
 * path at a resting pace. A narrow screen keeps the three stations and the line.
 *
 * It composes the block's primitives directly rather than through `HomeBlock`,
 * because it wants the shared opening without the rule under it — the path is
 * this screen's line, and a second one across the top would compete with it.
 */
export function WhatWeDoSection() {
  const { whatWeDo } = useHomeCopy();
  const reduceMotion = prefersReducedMotion();
  const wide = useMediaQuery(LANDSCAPE_QUERY);
  const stageRef = useRef<HTMLDivElement>(null);
  const visible = useInView(stageRef, { amount: 0.25 });
  const motionState = reduceMotion ? "settled" : visible ? "illuminated" : "dormant";

  const travelling = wide && visible && !reduceMotion;
  const progress = useLoop(LOOP_SECONDS, travelling);
  const head = useTransform(progress, (value) => value * SPAN);
  const station = useStation(head, CONTINUITY_STOPS, WAKE);

  return (
    <HomeSection id="solutions" className="overflow-hidden lg:justify-start">
      <SectionMarker sectionId="solutions" />
      {/* No box of its own: it only hands the arrival state down to both layers. */}
      <motion.div
        className="contents"
        initial={reduceMotion ? "settled" : "dormant"}
        animate={motionState}
      >
        <div
          ref={stageRef}
          /* On `md+` the header trades bottom padding for top, or it rises into
             the numbered rail's band at `top-24`. */
          className={cn(
            HOME_CONTAINER,
            HOME_BLOCK,
            "sm:py-16 md:pb-6 md:pt-36",
            "relative isolate z-10",
          )}
        >
          <motion.div variants={knowledgeHeaderReveal}>
            <SectionHeader
              sectionId="solutions"
              title={whatWeDo.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              lead={whatWeDo.lead}
              scale="statement"
              className="capabilities-header"
            />
          </motion.div>
          {wide ? null : <ContinuityThread pillars={whatWeDo.pillars} wakes={STATIONS} />}
        </div>
        {/* After the heading in the document, so the stations are read under it;
            behind it on the screen, where the heading's layer sits above. */}
        {wide ? (
          <ContinuityLandscape
            pillars={whatWeDo.pillars}
            wakes={STATIONS}
            station={travelling ? station : null}
            head={travelling ? head : undefined}
            tail={TAIL}
          />
        ) : null}
      </motion.div>
    </HomeSection>
  );
}
