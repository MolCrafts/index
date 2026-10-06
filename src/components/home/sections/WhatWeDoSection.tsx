import {
  type KnowledgeStationMotion,
  knowledgeHeaderReveal,
  knowledgeStationWake,
  knowledgeThreadDraw,
  prefersReducedMotion,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_BLOCK, HOME_CONTAINER, HOME_STATEMENT } from "@/lib/home/stage";

import { HOME_KEYWORD } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { HomeSection } from "../HomeSection";
import { MonoLabel } from "../MonoLabel";
import { SectionHeader } from "../SectionHeader";
import { SectionMarker } from "../SectionMarker";

/** Each station wakes as the measured curve reaches it. */
const STATIONS: ReadonlyArray<KnowledgeStationMotion> = [
  { delay: 0.7 },
  { delay: 1.1 },
  { delay: 1.55 },
];

/** How far the thread stands off the text, and how far it runs past the ends. */
const THREAD_FRAME = { overshoot: 32 } as const;

/**
 * Capabilities — one statement and a thread of light through three stations.
 *
 * The pillars used to be a numbered run down a single measure: honest, but a
 * list — the reader had to read all three to get the screen, and the right half
 * of the screen stood empty. The message ("what one project produces, the next
 * one stands on") is sequence and persistence, so the composition now *is* that
 * sequence: three stations stepping down and across the screen, each beginning
 * under the column where the previous one ends, with one drawn line of light
 * carrying the eye through them in reading order.
 *
 * It composes the block's primitives directly rather than through `HomeBlock`,
 * because it wants the shared opening without the rule under it — the thread is
 * this screen's line, and a second one across the top would compete with it.
 */
export function WhatWeDoSection() {
  const { whatWeDo } = useHomeCopy();
  const reduceMotion = prefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const visible = useInView(stageRef, { amount: 0.25 });
  const motionState = reduceMotion ? "settled" : visible ? "illuminated" : "dormant";
  const fieldRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [thread, setThread] = useState<{
    d: string;
    width: number;
    height: number;
    points: { x: number; y: number }[];
  } | null>(null);

  /* Measure the resting layout: the curve stays in a dedicated band above
     the copy, with horizontal tangents at every join. */
  useLayoutEffect(() => {
    const field = fieldRef.current;
    const list = listRef.current;
    if (!field || !list) return;

    const measure = () => {
      const items = Array.from(list.children) as HTMLElement[];
      const vertical = getComputedStyle(list).display !== "flex";
      const points = items.map((item) => ({
        x: vertical ? item.offsetLeft - 24 : item.offsetLeft + item.offsetWidth / 2,
        y: vertical ? item.offsetTop + 10 : item.offsetTop - THREAD_FRAME.overshoot,
      }));
      setThread({
        points,
        width: field.offsetWidth,
        height: field.offsetHeight,
        d: points
          .map((point, index) => {
            if (!index) return `M ${point.x} ${point.y}`;
            const prev = points[index - 1];
            if (vertical) {
              const mid = (prev.y + point.y) / 2;
              return `C ${prev.x} ${mid}, ${point.x} ${mid}, ${point.x} ${point.y}`;
            }
            const mid = (prev.x + point.x) / 2;
            return `C ${mid} ${prev.y}, ${mid} ${point.y}, ${point.x} ${point.y}`;
          })
          .join(" "),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(field);
    for (const item of list.children) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <HomeSection id="solutions">
      <SectionMarker sectionId="solutions" />
      <motion.div
        /* The tallest block on the page: a statement-scale header over three
           statement-scale stations. It art-directs within the shared rungs by
           tightening the block gutter — or a laptop-height viewport pushes the
           third station past the fold and breaks the one-screen beat — and by
           trading bottom padding for top on `md+`, where the content otherwise
           rises into the numbered rail's band at `top-24`. */
        className={cn(HOME_CONTAINER, HOME_BLOCK, "sm:py-16 md:pb-6 md:pt-36", "relative isolate")}
        ref={stageRef}
        initial={reduceMotion ? "settled" : "dormant"}
        animate={motionState}
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

        <div ref={fieldRef} className="capabilities-field relative isolate mt-12">
          {thread ? (
            <svg
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
              viewBox={`0 0 ${thread.width} ${thread.height}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="knowledge-thread" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--home-green)" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
              <motion.path
                d={thread.d}
                fill="none"
                stroke="url(#knowledge-thread)"
                strokeWidth="1.3"
                strokeLinecap="round"
                className="opacity-50"
                variants={knowledgeThreadDraw}
              />
              {thread.points.map((point, i) => (
                <motion.g
                  key={whatWeDo.pillars[i].title}
                  variants={knowledgeStationWake}
                  custom={STATIONS[i]}
                >
                  <circle
                    className="home-guide-node"
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="var(--home-green)"
                  />
                </motion.g>
              ))}
            </svg>
          ) : null}

          <ol ref={listRef} className="capabilities-stations grid gap-y-12">
            {whatWeDo.pillars.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                custom={STATIONS[index]}
                variants={knowledgeStationWake}
              >
                <MonoLabel className={cn("block", HOME_KEYWORD)}>{pillar.title}</MonoLabel>
                {/* One size below the statement rung's ceiling: three of these
                    at `2xl` are what pushed the block past a laptop fold. */}
                <p className={cn(HOME_STATEMENT, "mt-3 max-w-xl md:text-xl")}>{pillar.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </HomeSection>
  );
}
