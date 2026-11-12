import { motion, useInView, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import {
  approachRise,
  assistSublineReveal,
  assistWordFillReveal,
  prefersReducedMotion,
} from "@/lib/animations";
import { foundationArt } from "@/lib/home/art/foundation";
import { BREATH_SECONDS } from "@/lib/home/art/loop";
import { useHomeCopy } from "@/lib/home/copy";
import {
  HOME_BLOCK,
  HOME_BODY,
  HOME_CONTAINER,
  HOME_H2_STATEMENT,
  HOME_H3,
  HOME_SECTION_LEAD,
} from "@/lib/home/stage";
import type { ThreadPoint } from "@/lib/home/thread";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { FoundationArcs } from "../art/FoundationArcs";
import { useLoop, useStation } from "../art/useLoop";
import { useMeasured } from "../art/useMeasured";
import { BlockAura } from "../BlockAura";
import { HomeSection } from "../HomeSection";
import { SectionMarker } from "../SectionMarker";

/** The light's trail, as a share of the arc. */
const TAIL = 0.1;
/** The light crosses the arc in about three breaths, then the screen rests for one. */
const LOOP_SECONDS = BREATH_SECONDS * 4;
const SPAN = 1 + TAIL + 0.25;
/** How near a marker the light has to be for its item to wake. */
const WAKE = 0.09;

interface Guide {
  readonly width: number;
  readonly height: number;
  /** Where each item's marker sits, in the list's own box. */
  readonly points: readonly ThreadPoint[];
}

const NO_GUIDE: Guide = { width: 1, height: 1, points: [] };

function readGuide(list: HTMLElement, items: readonly HTMLElement[]): Guide {
  return {
    width: list.offsetWidth,
    height: list.offsetHeight,
    points: items.map((item) => ({ x: item.offsetLeft - 28, y: item.offsetTop + 18 })),
  };
}

export function ApproachSection() {
  const { approach } = useHomeCopy();
  const { locale } = useLocale();
  const reduceMotion = prefersReducedMotion();
  const wide = useMediaQuery("(min-width: 64rem)");
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const guide = useMeasured(listRef, readGuide, NO_GUIDE);
  const hasEntered = useInView(stageRef, { amount: 0.28 });
  const motionState = reduceMotion ? "settled" : hasEntered ? "illuminated" : "dormant";

  const art = useMemo(() => foundationArt(guide.points, wide), [guide.points, wide]);
  const travelling = hasEntered && !reduceMotion && art !== null;
  const progress = useLoop(LOOP_SECONDS, travelling);
  const head = useTransform(progress, (value) => value * SPAN);
  const station = useStation(head, art?.stops ?? [], WAKE);

  return (
    <HomeSection id="about" className="overflow-hidden">
      <SectionMarker sectionId="about" />
      <div className={cn(HOME_CONTAINER, HOME_BLOCK, "relative isolate")}>
        <BlockAura />
        <motion.div
          ref={stageRef}
          lang={locale}
          initial={reduceMotion ? "settled" : "dormant"}
          animate={motionState}
          className="foundation-composition"
        >
          <div className="foundation-intro">
            <motion.h2
              id="about-heading"
              variants={assistWordFillReveal}
              className={cn(HOME_H2_STATEMENT, "foundation-title")}
            >
              {approach.titleLines.map((line) => (
                <span key={line} className="foundation-title-line">
                  {line}
                </span>
              ))}
            </motion.h2>
            {approach.lead && (
              <motion.p
                variants={assistSublineReveal}
                className={cn(HOME_SECTION_LEAD, "mt-7 max-w-xl")}
              >
                {approach.lead}
              </motion.p>
            )}
          </div>
          <div className="foundation-strata">
            {art ? (
              <FoundationArcs
                art={art}
                points={guide.points}
                width={guide.width}
                height={guide.height}
                wide={wide}
                head={travelling ? head : undefined}
                tail={TAIL}
              />
            ) : null}
            <ul ref={listRef} className="foundation-list">
              {approach.strata.map((stratum, index) => (
                <motion.li
                  key={stratum.id}
                  custom={{ delay: 0.9 + index * 0.4 }}
                  variants={approachRise}
                >
                  {/* The item the light is passing stands at full strength; the
                      others wait a step back. Still screens hold all three lit. */}
                  <div className="home-lit" data-lit={!travelling || station === index}>
                    <h3 className={HOME_H3}>{stratum.title}</h3>
                    <p className={cn(HOME_BODY, "mt-3 max-w-sm")}>{stratum.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </HomeSection>
  );
}
