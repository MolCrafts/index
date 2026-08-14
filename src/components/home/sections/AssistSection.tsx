import {
  assistAuraReveal,
  assistContextGather,
  assistMicroStatementReveal,
  assistMobileProductsReveal,
  assistStatementsReveal,
  assistSublineReveal,
  assistWordFillReveal,
  assistWordOutlineReveal,
  prefersReducedMotion,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { StageShell } from "../StageShell";
import { useFullpage } from "../fullpage/FullpageProvider";
import { SnapSection } from "../fullpage/SnapSection";

const STATEMENT_POSITIONS = [
  "left-[7%] top-[15%] [@media(max-height:30rem)]:top-[24%] xl:left-[10%] xl:top-[13%]",
  "right-[7%] top-[16%] text-right [@media(max-height:30rem)]:top-[24%] xl:right-[10%] xl:top-[15%]",
  "left-[7%] top-[64%] xl:left-[4%] xl:top-[43%]",
  "right-[7%] top-[64%] text-right xl:right-[4%] xl:top-[43%]",
  "bottom-[9%] left-[7%] xl:bottom-[10%] xl:left-[10%]",
  "bottom-[8%] right-[7%] text-right xl:bottom-[9%] xl:right-[8%]",
] as const;

const CONCEPT_CONTEXT = [
  { className: "left-[26%] top-[39%]", delay: 0.22, x: -56, y: -32 },
  { className: "left-[37%] top-[33%]", delay: 0.34, x: -40, y: -48 },
  { className: "right-[35%] top-[34%]", delay: 0.28, x: 48, y: -40 },
  { className: "bottom-[37%] right-[25%]", delay: 0.4, x: 64, y: 36 },
] as const;

const PRODUCT_CONTEXT = [
  { className: "left-[23%] top-[27%]", delay: 0.18, x: -64, y: -48 },
  { className: "right-[22%] top-[25%]", delay: 0.3, x: 64, y: -56 },
  { className: "right-[16%] top-1/2", delay: 0.38, x: 72, y: 0 },
  { className: "bottom-[25%] right-[30%]", delay: 0.46, x: 52, y: 48 },
  { className: "bottom-[25%] left-[24%]", delay: 0.42, x: -56, y: 48 },
] as const;

const CONTEXT_NODES = [
  { className: "left-[27%] top-[52%]", delay: 0.18, x: -80, y: 24 },
  { className: "right-[38%] top-[27%]", delay: 0.31, x: 40, y: -64 },
  { className: "right-[23%] top-[49%]", delay: 0.37, x: 84, y: -16 },
  { className: "bottom-[31%] left-[38%]", delay: 0.46, x: -56, y: 56 },
] as const;

/** A single editorial image of contextual AI, deliberately unlike the adjacent grids. */
export function AssistSection() {
  const { assist } = useHomeCopy();
  const { activeIndex, arrivingId, sectionIds } = useFullpage();
  const reduceMotion = prefersReducedMotion();
  const active = sectionIds[activeIndex] === "assist";
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (active && arrivingId === null) setHasEntered(true);
  }, [active, arrivingId]);

  const motionState = hasEntered || reduceMotion ? "illuminated" : "dormant";

  return (
    <SnapSection
      id="assist"
      aria-labelledby="assist-heading"
      className="h-[var(--home-view,100cqb)] justify-center after:hidden"
    >
      <StageShell field={0.2} veil="soft" className="flex min-h-full items-center justify-center">
        <div
          lang="en"
          className="relative isolate mx-auto h-full w-full max-w-[90rem] overflow-hidden font-brand"
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(34vw,32rem)] w-[min(78vw,76rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(var(--accent-rgb),0.16)_0%,rgba(var(--accent-rgb),0.08)_38%,hsl(var(--primary)/0.055)_56%,transparent_74%)] blur-[26px]"
            aria-hidden="true"
            initial={reduceMotion ? "illuminated" : "dormant"}
            animate={motionState}
            variants={assistAuraReveal}
          />

          <div
            className="pointer-events-none absolute inset-0 z-5 hidden lg:block"
            aria-hidden="true"
          >
            {assist.concepts.map((label, index) => (
              <motion.span
                key={label}
                className={cn(
                  "absolute whitespace-nowrap font-brand text-[clamp(0.75rem,0.82vw,0.875rem)] font-label leading-none tracking-[0.055em] text-[var(--brand-assist-concept)] [text-shadow:0_0_22px_rgba(var(--accent-rgb),0.2)]",
                  CONCEPT_CONTEXT[index].className,
                )}
                custom={{ ...CONCEPT_CONTEXT[index], peak: 0.76, settled: 0.56 }}
                initial={reduceMotion ? "illuminated" : "dormant"}
                animate={motionState}
                variants={assistContextGather}
              >
                {label}
              </motion.span>
            ))}
            {assist.products.map((label, index) => (
              <motion.span
                key={label}
                className={cn(
                  "absolute whitespace-nowrap font-brand text-[clamp(0.8rem,0.9vw,0.95rem)] font-wordmark leading-none tracking-[-0.01em] text-[var(--brand-assist-from)] [text-shadow:0_0_22px_rgba(var(--accent-rgb),0.2)]",
                  PRODUCT_CONTEXT[index].className,
                )}
                custom={{ ...PRODUCT_CONTEXT[index], peak: 0.92, settled: 0.74 }}
                initial={reduceMotion ? "illuminated" : "dormant"}
                animate={motionState}
                variants={assistContextGather}
              >
                {label}
              </motion.span>
            ))}
            {CONTEXT_NODES.map((context) => (
              <motion.span
                key={context.className}
                className={cn(
                  "absolute size-[0.38rem] rounded-full border border-[color-mix(in_oklab,var(--brand-assist-from)_70%,transparent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.38)]",
                  context.className,
                )}
                custom={{ ...context, peak: 0.58, settled: 0.32 }}
                initial={reduceMotion ? "illuminated" : "dormant"}
                animate={motionState}
                variants={assistContextGather}
              />
            ))}
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={reduceMotion ? "illuminated" : "dormant"}
            animate={motionState}
            variants={assistStatementsReveal}
          >
            {assist.statements.map((statement, index) => (
              <motion.p
                key={statement}
                className={cn(
                  "absolute w-[min(42%,16rem)] text-balance text-[clamp(0.75rem,1.05vw,1.05rem)] font-book leading-[1.42] tracking-[-0.015em] text-foreground/78",
                  STATEMENT_POSITIONS[index],
                )}
                variants={assistMicroStatementReveal}
              >
                {statement}
              </motion.p>
            ))}
          </motion.div>

          <div className="absolute inset-x-6 top-[39%] z-10 -translate-y-1/2 text-center sm:inset-x-10 sm:top-[42%] md:inset-x-12 xl:inset-x-0 xl:top-1/2">
            <div className="relative inline-grid">
              <motion.span
                aria-hidden="true"
                className="col-start-1 row-start-1 whitespace-nowrap pr-[0.08em] text-[clamp(2.5rem,6vw,6rem)] font-titling leading-wordmark tracking-[-0.035em] text-transparent [font-kerning:normal] [-webkit-text-stroke:1px_color-mix(in_oklab,var(--brand-assist-from)_72%,transparent)] [text-shadow:0_0_42px_rgba(var(--accent-rgb),0.18)] max-sm:whitespace-normal max-sm:leading-wordmark-wrap"
                initial={reduceMotion ? "illuminated" : "dormant"}
                animate={motionState}
                variants={assistWordOutlineReveal}
              >
                <span className="inline-block text-[1.18em] font-heavy tracking-[-0.04em] max-sm:block">
                  {assist.title.subject}
                </span>{" "}
                <span className="inline-block font-titling max-sm:mt-[0.12em] max-sm:block">
                  {assist.title.action}
                </span>
              </motion.span>
              <motion.h2
                id="assist-heading"
                className="col-start-1 row-start-1 whitespace-nowrap bg-[linear-gradient(112deg,var(--brand-assist-from)_4%,var(--brand-assist-via)_52%,var(--brand-assist-to)_98%)] bg-clip-text pr-[0.08em] text-[clamp(2.5rem,6vw,6rem)] font-titling leading-wordmark tracking-[-0.035em] text-transparent [font-kerning:normal] [text-shadow:0_24px_88px_rgba(var(--accent-rgb),0.2)] max-sm:whitespace-normal max-sm:leading-wordmark-wrap"
                initial={reduceMotion ? "illuminated" : "dormant"}
                animate={motionState}
                variants={assistWordFillReveal}
              >
                <span className="inline-block bg-[linear-gradient(112deg,var(--brand-assist-subject-from)_4%,var(--brand-assist-subject-via)_55%,var(--brand-assist-subject-to)_100%)] bg-clip-text text-[1.18em] font-heavy tracking-[-0.04em] text-transparent drop-shadow-[0_18px_42px_rgba(var(--accent-rgb),0.22)] max-sm:block">
                  {assist.title.subject}
                </span>{" "}
                <span className="inline-block font-titling opacity-90 max-sm:mt-[0.12em] max-sm:block">
                  {assist.title.action}
                </span>
              </motion.h2>
            </div>
            <motion.p
              className="mt-[clamp(0.7rem,1.3vw,1.2rem)] text-[clamp(1.05rem,1.45vw,1.35rem)] font-medium leading-[1.3] tracking-[0.01em] text-[color-mix(in_oklab,var(--brand-assist-concept)_78%,transparent)]"
              initial={reduceMotion ? "illuminated" : "dormant"}
              animate={motionState}
              variants={assistSublineReveal}
            >
              {assist.subline}
            </motion.p>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-x-6 top-[56%] z-20 flex flex-wrap justify-center gap-x-[0.85rem] gap-y-[0.35rem] text-chip font-strong leading-[1.2] tracking-[-0.005em] text-[color-mix(in_oklab,var(--brand-assist-from)_76%,transparent)] lg:hidden"
            aria-hidden="true"
            initial={reduceMotion ? "illuminated" : "dormant"}
            animate={motionState}
            variants={assistMobileProductsReveal}
          >
            {assist.products.map((product) => (
              <span key={product}>{product}</span>
            ))}
          </motion.div>
        </div>
      </StageShell>
    </SnapSection>
  );
}
