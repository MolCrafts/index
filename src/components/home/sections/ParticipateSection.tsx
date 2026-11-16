import { useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { CONTACT_EMAIL, contactHref } from "@/lib/contact";
import { BREATH_SECONDS } from "@/lib/home/art/loop";
import { type StepRow, steppedLine } from "@/lib/home/art/steps";
import { useHomeCopy } from "@/lib/home/copy";
import { PARTICIPATE_PATHS } from "@/lib/home/data";
import { HOME_BODY, HOME_CONTAINER, HOME_H2_STATEMENT, HOME_H3, HOME_LEAD } from "@/lib/home/stage";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { StepLine } from "../art/StepLine";
import { useLoop, useStation } from "../art/useLoop";
import { useMeasured } from "../art/useMeasured";
import { HomeSection } from "../HomeSection";
import { Reveal } from "../Reveal";
import { useScreenMotion } from "../ScreenMotion";
import { SectionMarker } from "../SectionMarker";

/** Each depth starts further in than the one before it: open, deeper, embedded. */
const STEP_INDENT = [
  "",
  "md:ml-8 lg:ml-24 xl:ml-32 2xl:ml-40",
  "md:ml-16 lg:ml-48 xl:ml-64 2xl:ml-80",
] as const;

/** The light's trail, as a share of the stepped line. */
const TAIL = 0.12;
/** The light descends in about two breaths, then the screen rests for one. */
const LOOP_SECONDS = BREATH_SECONDS * 3;
const SPAN = 1 + TAIL + 0.35;
/** How near a row's edge the light has to be for the row to wake. */
const WAKE = 0.11;

interface Steps {
  readonly rows: readonly StepRow[];
  readonly width: number;
  readonly height: number;
}

const NO_STEPS: Steps = { rows: [], width: 1, height: 1 };

function readSteps(list: HTMLElement, items: readonly HTMLElement[]): Steps {
  return {
    width: list.offsetWidth,
    height: list.offsetHeight,
    rows: items.map((item) => ({
      left: item.offsetLeft,
      top: item.offsetTop,
      bottom: item.offsetTop + item.offsetHeight,
    })),
  };
}

/**
 * The rows, with the line that steps down them.
 *
 * Split from the section so the travelling light reads the screen's own
 * visibility: `useScreenMotion` is provided by the `HomeSection` above it.
 */
function CollaborationSteps() {
  const { participate } = useHomeCopy();
  const { visible, reduced } = useScreenMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const measured = useMeasured(listRef, readSteps, NO_STEPS);
  /* The line is drawn from `md` up; below it there is no light for a row to answer. */
  const drawn = useMediaQuery("(min-width: 48rem)");

  const line = useMemo(() => steppedLine(measured.rows), [measured.rows]);
  const travelling = drawn && visible && !reduced && line !== null;
  const progress = useLoop(LOOP_SECONDS, travelling);
  const head = useTransform(progress, (value) => value * SPAN);
  const station = useStation(head, line?.stops ?? [], WAKE);

  return (
    <div className="relative mt-10 md:mt-12">
      <ul ref={listRef} className="relative">
        {PARTICIPATE_PATHS.map((path, index) => {
          const copy = participate.paths[path.key];
          return (
            <li
              key={path.key}
              className={cn(
                "border-t border-primary/25 transition-colors duration-300 last:border-b hover:border-[rgb(var(--accent-rgb))]/60",
                STEP_INDENT[index],
              )}
            >
              <Reveal delay={0.08 + index * 0.08}>
                <a
                  href={path.href}
                  target={path.external ? "_blank" : undefined}
                  rel={path.external ? "noreferrer noopener" : undefined}
                  className="group grid gap-3 py-6 no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)_2rem] md:items-end md:gap-8 md:py-5 md:pl-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)_2rem] xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)_2rem]"
                >
                  {/* The row the light is passing stands at full strength. */}
                  <div className="home-lit" data-lit={!travelling || station === index}>
                    <span className="home-subtitle block font-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className={cn(HOME_H3, "mt-2 xl:text-3xl")}>{copy.statement}</h3>
                  </div>
                  <p className={cn(HOME_BODY, "md:pb-1.5 xl:text-lg")}>{copy.line}</p>
                  {/* Each row is a link; the arrow is what says so before the hover. */}
                  <span
                    aria-hidden="true"
                    className="hidden justify-self-end pb-1.5 font-body text-xl text-muted-foreground opacity-50 transition duration-300 group-hover:translate-x-1 group-hover:text-[rgb(var(--accent-rgb))] group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
                  >
                    {path.external ? "↗" : "→"}
                  </span>
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
      {line ? (
        <StepLine
          line={line}
          width={measured.width}
          height={measured.height}
          head={travelling ? head : undefined}
          tail={TAIL}
        />
      ) : null}
    </div>
  );
}

/**
 * Collaboration — the claim opens the screen and closes it: "open to start" above
 * the three depths, "tailored to fit" under them, with one line stepping down
 * from the first to the last.
 */
export function ParticipateSection() {
  const { participate } = useHomeCopy();
  return (
    <HomeSection id="collaboration">
      <SectionMarker sectionId="collaboration" />
      <div className={cn(HOME_CONTAINER, "pb-16 pt-32 md:pb-16 md:pt-36")}>
        <Reveal>
          {/* One heading, set in two places. Its closing half is real text here for
              a screen reader, and the copy set under the rows is hidden from one,
              so the heading is read whole and once. */}
          <h2 id="collaboration-heading" className={HOME_H2_STATEMENT}>
            {participate.title.plain} <span className="sr-only">{participate.title.accent}</span>
          </h2>
        </Reveal>

        <CollaborationSteps />

        <Reveal
          delay={0.32}
          className="mt-10 grid gap-6 md:grid-cols-2 md:items-end md:gap-12 lg:mt-12"
        >
          <p className={cn(HOME_LEAD, "max-w-sm text-balance md:text-xl")}>
            {participate.supporting}
          </p>
          <div className="md:text-right">
            <p aria-hidden="true" className={cn(HOME_H2_STATEMENT, "md:ml-auto")}>
              {participate.title.accent}
            </p>
            {/* The two commercial routes are mail links; the address is written out so
                a reader without a mail handler still has something to copy. */}
            <a
              href={contactHref("Collaboration")}
              className="mt-3 inline-flex min-h-11 items-center font-mono text-sm text-muted-foreground no-underline outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>
      </div>
    </HomeSection>
  );
}
