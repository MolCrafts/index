import { type MotionValue, motion } from "framer-motion";
import {
  artFieldReveal,
  artLineDraw,
  type KnowledgeStationMotion,
  knowledgeStationWake,
} from "@/lib/animations";
import {
  CONTINUITY_PASSES,
  CONTINUITY_STATIONS,
  CONTINUITY_TRACE,
} from "@/lib/home/art/continuity";
import { BASIN_LEVEL, isolines, LANDSCAPE_FRAME } from "@/lib/home/art/landscape";
import { CONTINUITY_STATION_CLASSES } from "@/lib/home/art/landscapePath";
import { tracePath } from "@/lib/home/art/trace";
import type { PillarCopy } from "@/lib/home/copy";
import { HOME_BODY } from "@/lib/home/stage";
import { HOME_KEYWORD } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { MonoLabel } from "../MonoLabel";
import { TraceLight } from "./TraceLight";
import { useDeferred } from "./useDeferred";

const { width: WIDTH, height: HEIGHT } = LANDSCAPE_FRAME;
/** Contour grid pitch, in frame units: fine enough to read as curves at 1440. */
const GRID = 12;
const PATH = tracePath(CONTINUITY_TRACE.points);
const buildContours = () => isolines({ left: 0, right: WIDTH, top: 0, bottom: HEIGHT }, GRID);

interface ContinuityLandscapeProps {
  pillars: readonly PillarCopy[];
  /** When each station wakes on arrival; the trajectory reaches them in order. */
  wakes: readonly KnowledgeStationMotion[];
  /** Which station the travelling light is at, or -1; `null` while the screen is still. */
  station: number | null;
  head?: MotionValue<number>;
  tail: number;
}

/**
 * Continuity on a wide screen: an energy surface, its three basins, and the
 * minimum-energy path through them.
 *
 * The stage is a fixed 16:10 frame scaled uniformly to fit the screen. Uniform,
 * because stretching a surface along one axis moves its steepest-descent lines:
 * the path would stop being the path.
 */
export function ContinuityLandscape({
  pillars,
  wakes,
  station,
  head,
  tail,
}: ContinuityLandscapeProps) {
  /* Traced once the page is quiet: the surface is two screens below the hero. */
  const contours = useDeferred(buildContours);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="home-stage relative shrink-0">
        {/* The contours are their own element: the fade is a CSS mask, and a mask
            takes a box — it does not apply to a group inside an svg. */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="continuity-contours absolute inset-0 h-full w-full"
        >
          <motion.g variants={artFieldReveal} fill="none">
            {(contours ?? []).map((line) => {
              const basin = line.level < BASIN_LEVEL;
              /* Deeper is brighter: the eye finds the basins before it reads a label. */
              const depth = basin
                ? 0.3 + 0.5 * Math.min(1, (BASIN_LEVEL - line.level) / 0.72)
                : 0.26;
              return (
                <path
                  key={line.level}
                  d={line.d}
                  stroke={basin ? "rgb(var(--accent-rgb))" : "hsl(var(--primary))"}
                  strokeOpacity={depth}
                  strokeWidth="1"
                />
              );
            })}
          </motion.g>
        </svg>
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="continuity-path absolute inset-0 h-full w-full"
        >
          <motion.path
            variants={artLineDraw}
            d={PATH}
            fill="none"
            stroke="var(--home-blue-tint)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.g variants={artFieldReveal}>
            {CONTINUITY_PASSES.map((pass) => (
              <circle
                key={pass.x}
                cx={pass.x}
                cy={pass.y}
                r="3.2"
                fill="hsl(var(--background))"
                stroke="var(--home-blue-tint)"
                strokeOpacity="0.8"
                strokeWidth="1.1"
              />
            ))}
            {CONTINUITY_STATIONS.map((basin) => (
              <g key={basin.x}>
                <circle
                  cx={basin.x}
                  cy={basin.y}
                  r="6"
                  fill="hsl(var(--background))"
                  stroke="var(--home-blue-tint)"
                  strokeWidth="1.75"
                />
                <circle cx={basin.x} cy={basin.y} r="2.2" fill="rgb(var(--accent-rgb))" />
              </g>
            ))}
          </motion.g>
          {head ? <TraceLight trace={CONTINUITY_TRACE} head={head} tail={tail} /> : null}
        </svg>

        <ol>
          {pillars.map((pillar, index) => (
            <motion.li
              key={pillar.title}
              custom={wakes[index]}
              variants={knowledgeStationWake}
              className={cn("absolute", CONTINUITY_STATION_CLASSES[index])}
            >
              {/* Sized and placed by `.continuity-label`, in shares of the stage:
                  below the first basin, above the second, below and inward of
                  the third — clear of the trajectory in every case. */}
              <div
                className="home-lit continuity-label"
                data-station={index}
                data-lit={station === null || station === index}
              >
                <MonoLabel className={cn("block", HOME_KEYWORD)}>{pillar.title}</MonoLabel>
                <p className={cn(HOME_BODY, "mt-2.5")}>{pillar.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
