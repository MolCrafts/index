import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import {
  type KnowledgeStationMotion,
  knowledgeStationWake,
  knowledgeThreadDraw,
} from "@/lib/animations";
import type { PillarCopy } from "@/lib/home/copy";
import { HOME_STATEMENT } from "@/lib/home/stage";
import { smoothThread, type ThreadPoint } from "@/lib/home/thread";
import { HOME_KEYWORD } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { MonoLabel } from "../MonoLabel";

interface ContinuityThreadProps {
  pillars: readonly PillarCopy[];
  /** When each station wakes on arrival; the thread reaches them in order. */
  wakes: readonly KnowledgeStationMotion[];
}

/**
 * Continuity on a narrow screen: three stations down one measure, and a thread
 * of light drawn through them in reading order.
 *
 * The energy surface needs width to be read, so a phone keeps the sequence
 * without the landscape: what one project produces, the next one stands on.
 */
export function ContinuityThread({ pillars, wakes }: ContinuityThreadProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [thread, setThread] = useState<{
    d: string;
    width: number;
    height: number;
    points: ThreadPoint[];
  } | null>(null);

  /* Measure the resting layout: the thread runs down the left of the stations. */
  useLayoutEffect(() => {
    const field = fieldRef.current;
    const list = listRef.current;
    if (!field || !list) return;

    const measure = () => {
      const points = (Array.from(list.children) as HTMLElement[]).map((item) => ({
        x: item.offsetLeft - 24,
        y: item.offsetTop + 10,
      }));
      setThread({
        points,
        width: field.offsetWidth,
        height: field.offsetHeight,
        d: smoothThread(points),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(field);
    for (const item of list.children) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={fieldRef} className="relative isolate mt-12">
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
            className="opacity-75"
            variants={knowledgeThreadDraw}
          />
          {thread.points.map((point, index) => (
            <motion.g
              key={pillars[index]?.title}
              variants={knowledgeStationWake}
              custom={wakes[index]}
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
        {pillars.map((pillar, index) => (
          <motion.li key={pillar.title} custom={wakes[index]} variants={knowledgeStationWake}>
            <MonoLabel className={cn("block", HOME_KEYWORD)}>{pillar.title}</MonoLabel>
            <p className={cn(HOME_STATEMENT, "mt-3 max-w-xl")}>{pillar.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
