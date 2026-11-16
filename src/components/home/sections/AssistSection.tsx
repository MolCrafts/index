import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  assistAuraReveal,
  assistMobileProductsReveal,
  assistSublineReveal,
  assistWordFillReveal,
  assistWordOutlineReveal,
  knowledgeStationWake,
  prefersReducedMotion,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_H2_STATEMENT, HOME_SECTION_LEAD } from "@/lib/home/stage";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { AssistRing } from "../art/AssistRing";
import { HomeSection } from "../HomeSection";
import { SectionMarker } from "../SectionMarker";

/** A single editorial image of contextual AI, deliberately unlike the adjacent grids. */
export function AssistSection() {
  const { assist } = useHomeCopy();
  const wide = useMediaQuery("(min-width: 64rem)");
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = prefersReducedMotion();
  /* Gather again on each discrete screen arrival. */
  const hasEntered = useInView(stageRef, { amount: 0.45 });
  /* A live signal, unlike `hasEntered`. The orbit never stops, so left ungated
     it would cost the main thread continuously for a screen that is usually
     thousands of pixels away. */
  const onScreen = useInView(stageRef, { amount: 0.05 });
  const idle = onScreen ? undefined : "[animation-play-state:paused]";

  /* Reduced motion renders `settled`, never `illuminated`: the entrance
     variants carry keyframe arrays, and a keyframe array stated statically
     resolves to its first frame — near-transparent for the gather rings. */
  const motionState = reduceMotion ? "settled" : hasEntered ? "illuminated" : "dormant";

  return (
    <HomeSection id="assist" aria-labelledby="assist-heading" className="overflow-hidden">
      <SectionMarker sectionId="assist" />
      <div ref={stageRef} className="flex w-full flex-1 items-center justify-center">
        <div className="assist-composition relative isolate mx-auto h-svh w-full max-w-[110rem] overflow-hidden font-brand">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(34vw,32rem)] w-[min(78vw,76rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(var(--accent-rgb),0.16)_0%,rgba(var(--accent-rgb),0.08)_38%,hsl(var(--primary)/0.055)_56%,transparent_74%)] blur-[26px]"
            aria-hidden="true"
            initial={reduceMotion ? "settled" : "dormant"}
            animate={motionState}
            variants={assistAuraReveal}
          />

          {/* The ring only fits once there is width for it: below `lg` its outer
              statements start off-canvas and the top pair overlap, so a narrow
              screen lists the statements under the headline instead. The query
              is the `lg` breakpoint, where the list hides itself. */}
          {wide ? (
            <AssistRing
              statements={assist.statements}
              state={motionState}
              initial={reduceMotion ? "settled" : "dormant"}
              travelling={onScreen && !reduceMotion}
            />
          ) : null}

          <div className="absolute inset-x-6 top-[39%] z-10 -translate-y-1/2 text-center sm:inset-x-10 sm:top-[42%] md:inset-x-12 lg:top-1/2 xl:inset-x-0">
            <div className="relative inline-grid max-w-full">
              <motion.span
                aria-hidden="true"
                className={cn(
                  HOME_H2_STATEMENT,
                  "assist-title col-start-1 row-start-1 whitespace-nowrap pr-[0.08em] !bg-none text-transparent [font-kerning:normal] [-webkit-text-stroke:1px_color-mix(in_oklab,var(--home-blue)_72%,transparent)] max-sm:whitespace-normal",
                )}
                initial={reduceMotion ? "settled" : "dormant"}
                animate={motionState}
                variants={assistWordOutlineReveal}
              >
                <span className="inline-block max-sm:block">{assist.title.subject}</span>{" "}
                <span className="inline-block max-sm:mt-[0.12em] max-sm:block">
                  {assist.title.action}
                </span>
              </motion.span>
              <motion.h2
                id="assist-heading"
                className={cn(
                  HOME_H2_STATEMENT,
                  "assist-title col-start-1 row-start-1 whitespace-nowrap pr-[0.08em] [font-kerning:normal] max-sm:whitespace-normal",
                )}
                initial={reduceMotion ? "settled" : "dormant"}
                animate={motionState}
                variants={assistWordFillReveal}
              >
                <span className={cn(idle, "inline-block max-sm:block")}>
                  {assist.title.subject}
                </span>{" "}
                <span className="inline-block max-sm:mt-[0.12em] max-sm:block">
                  {assist.title.action}
                </span>
              </motion.h2>
            </div>
            <motion.p
              className={cn(HOME_SECTION_LEAD, "mx-auto mt-7 max-w-xl text-balance lg:max-w-sm")}
              initial={reduceMotion ? "settled" : "dormant"}
              animate={motionState}
              variants={assistSublineReveal}
            >
              {assist.subline}
            </motion.p>
          </div>

          <motion.ul
            className="absolute inset-x-6 top-[65%] grid grid-cols-2 gap-x-6 gap-y-5 lg:hidden"
            initial={reduceMotion ? "settled" : "dormant"}
            animate={motionState}
          >
            {assist.statements.map((statement, index) => (
              <motion.li
                key={statement}
                variants={knowledgeStationWake}
                custom={{ delay: 0.85 + index * 0.12 }}
                className="home-subtitle font-display text-balance text-center text-sm font-semibold leading-relaxed sm:text-base"
              >
                {statement}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="pointer-events-none absolute inset-x-6 top-[56%] z-20 flex flex-wrap justify-center gap-x-[0.85rem] gap-y-[0.35rem] text-chip font-strong leading-[1.2] tracking-[-0.005em] text-home-blue opacity-75 lg:hidden"
            aria-hidden="true"
            initial={reduceMotion ? "settled" : "dormant"}
            animate={motionState}
            variants={assistMobileProductsReveal}
          >
            {assist.products.map((product) => (
              <span key={product}>{product}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </HomeSection>
  );
}
