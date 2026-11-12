import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import {
  artFieldReveal,
  assistMicroStatementReveal,
  assistStatementsReveal,
} from "@/lib/animations";
import { BREATH_SECONDS } from "@/lib/home/art/loop";
import {
  BODY_PATH,
  BODY_STOPS,
  BODY_TRACE,
  type Clearing,
  FIELD_PATH,
  GATE_PATH,
  ORBIT_FRAME,
  STATEMENT_POSITIONS,
  statementOrbitArt,
  statementPoint,
} from "@/lib/home/art/orbit";
import { HOME_ASSIST_SENTENCE } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { TraceLight } from "./TraceLight";
import { useLoop, useStation } from "./useLoop";
import { useMeasured } from "./useMeasured";

/** One breath at each of the six statements. */
const LAP_SECONDS = BREATH_SECONDS * 6;
const TAIL = 0.14;
/**
 * How near a gate the body has to be for its statement to wake. The widest gap
 * between gates is a fifth of the lap, so at just over a tenth one statement is
 * always lit and the nearest one holds the light.
 */
const WAKE = 0.105;
/** Clear space kept around a statement, in screen pixels. */
const CLEARANCE = { x: 22, y: 12 } as const;

const NO_CLEARINGS: readonly Clearing[] = [];

/** The space each statement takes on the stage, in frame units, with its margin. */
function readClearings(stage: HTMLElement, labels: readonly HTMLElement[]): Clearing[] | null {
  const scale = stage.offsetWidth / ORBIT_FRAME.width;
  if (scale === 0) return null;
  return labels.map((label, index) => {
    const centre = statementPoint(index);
    const width = (label.offsetWidth + CLEARANCE.x * 2) / scale;
    const height = (label.offsetHeight + CLEARANCE.y * 2) / scale;
    return { x: centre.x - width / 2, y: centre.y - height / 2, width, height };
  });
}

type MotionState = "dormant" | "illuminated" | "settled";

interface AssistRingProps {
  statements: readonly string[];
  state: MotionState;
  /** Reduced motion starts settled, so nothing is animated in. */
  initial: MotionState;
  /** Whether the body is travelling: on screen, and motion allowed. */
  travelling: boolean;
}

/**
 * The AI screen's ring, on a wide screen: six statements on an orbit around the
 * headline, and one body circling inside them.
 *
 * The body never stops. It takes a breath to pass each statement, and the
 * statement it is passing stands at full strength — the assistant moving through
 * the work while the reader stays at the centre of it.
 */
export function AssistRing({ statements, state, initial, travelling }: AssistRingProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  /* Measured as rendered, so the orbit opens exactly around the statements —
     and again when the language changes them. */
  const clearings = useMeasured(stageRef, readClearings, NO_CLEARINGS, {
    selector: "[data-orbit-statement]",
    key: statements,
  });

  const orbit = useMemo(() => statementOrbitArt(clearings), [clearings]);
  const head = useLoop(LAP_SECONDS, travelling);
  const station = useStation(head, BODY_STOPS, WAKE, true);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      initial={initial}
      animate={state}
      variants={assistStatementsReveal}
    >
      <div ref={stageRef} className="home-stage relative shrink-0">
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${ORBIT_FRAME.width} ${ORBIT_FRAME.height}`}
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <motion.g variants={artFieldReveal} fill="none" stroke="var(--home-blue-tint)">
            <path d={FIELD_PATH} strokeOpacity="0.1" strokeWidth="1" />
            <path d={orbit.minorTicks} strokeOpacity="0.26" strokeWidth="1" />
            <path d={orbit.majorTicks} strokeOpacity="0.6" strokeWidth="1" />
            <path d={orbit.orbit} strokeOpacity="0.42" strokeWidth="1.25" />
            <path d={BODY_PATH} strokeOpacity="0.38" strokeWidth="1" strokeDasharray="2 7" />
            <path d={GATE_PATH} strokeOpacity="0.7" strokeWidth="1.25" />
          </motion.g>
          {travelling ? (
            <TraceLight trace={BODY_TRACE} head={head} closed tail={TAIL} size={1.15} />
          ) : null}
        </svg>

        {statements.map((statement, index) => (
          // The wrapper owns the placement; Framer only animates the paragraph,
          // so its inline transform never fights the centring translate.
          <div
            key={statement}
            className={cn("absolute -translate-x-1/2 -translate-y-1/2", STATEMENT_POSITIONS[index])}
          >
            <motion.p
              data-orbit-statement
              className={cn(HOME_ASSIST_SENTENCE, "assist-mission whitespace-nowrap text-center")}
              variants={assistMicroStatementReveal}
            >
              <span className="home-lit inline-block" data-lit={!travelling || station === index}>
                {statement}
              </span>
            </motion.p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
