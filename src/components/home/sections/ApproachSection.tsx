import {
  approachRise,
  assistSublineReveal,
  assistWordFillReveal,
  knowledgeThreadDraw,
  prefersReducedMotion,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import {
  HOME_BLOCK,
  HOME_BODY,
  HOME_CONTAINER,
  HOME_H2_STATEMENT,
  HOME_H3,
} from "@/lib/home/stage";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { BlockAura } from "../BlockAura";
import { HomeSection } from "../HomeSection";
import { SectionMarker } from "../SectionMarker";

export function ApproachSection() {
  const { approach } = useHomeCopy();
  const { locale } = useLocale();
  const reduceMotion = prefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [guide, setGuide] = useState({
    path: "",
    width: 1,
    height: 1,
    points: [] as { x: number; y: number }[],
  });
  const hasEntered = useInView(stageRef, { amount: 0.28 });
  const motionState = reduceMotion ? "settled" : hasEntered ? "illuminated" : "dormant";

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const points = Array.from(list.children).map((item) => {
        const node = item as HTMLElement;
        return { x: node.offsetLeft - 28, y: node.offsetTop + 18 };
      });
      const path = points
        .map((p, i) => {
          if (!i) return `M ${p.x} ${p.y}`;
          const prev = points[i - 1];
          const mid = (prev.y + p.y) / 2;
          return `C ${prev.x} ${mid}, ${p.x} ${mid}, ${p.x} ${p.y}`;
        })
        .join(" ");
      setGuide({ points, path, width: list.offsetWidth, height: list.offsetHeight });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    for (const item of list.children) observer.observe(item);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <HomeSection id="about">
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
            <motion.p
              variants={assistSublineReveal}
              className="foundation-subtitle home-subtitle font-display"
            >
              {approach.lead}
            </motion.p>
          </div>
          <div className="foundation-strata">
            <svg
              aria-hidden="true"
              className="foundation-guide"
              viewBox={`0 0 ${guide.width} ${guide.height}`}
            >
              <motion.path
                variants={knowledgeThreadDraw}
                d={guide.path}
                fill="none"
                stroke="var(--home-green)"
                strokeOpacity=".35"
                strokeWidth="1.25"
              />
              {guide.points.map((point, i) => (
                <motion.g
                  key={approach.strata[i].id}
                  variants={approachRise}
                  custom={{ delay: 0.9 + i * 0.4 }}
                >
                  <circle
                    className="home-guide-node"
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="rgb(var(--accent-rgb))"
                  />
                </motion.g>
              ))}
            </svg>
            <ol ref={listRef} className="foundation-list">
              {approach.strata.map((stratum, index) => (
                <motion.li
                  key={stratum.id}
                  custom={{ delay: 0.9 + index * 0.4 }}
                  variants={approachRise}
                >
                  <h3 className={HOME_H3}>{stratum.title}</h3>
                  <p className={cn(HOME_BODY, "mt-3 max-w-sm")}>{stratum.detail}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </HomeSection>
  );
}
