import { type MotionValue, motion } from "framer-motion";
import {
  type ApproachBuildMotion,
  approachRise,
  artFieldReveal,
  artLineDraw,
} from "@/lib/animations";
import type { FoundationArt } from "@/lib/home/art/foundation";
import type { ThreadPoint } from "@/lib/home/thread";
import { TraceLight } from "./TraceLight";

interface FoundationArcsProps {
  art: FoundationArt;
  /** The three markers, measured from the list they belong to. */
  points: readonly ThreadPoint[];
  width: number;
  height: number;
  /** Desktop: the arcs gain their inner companions. */
  wide: boolean;
  /** Where the travelling light is; omitted while the screen is still. */
  head?: MotionValue<number>;
  tail: number;
}

/** The drawing behind Foundation's list. See `foundationArt` for the geometry. */
export function FoundationArcs({
  art,
  points,
  width,
  height,
  wide,
  head,
  tail,
}: FoundationArcsProps) {
  return (
    <svg aria-hidden="true" className="foundation-guide" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        {/* Fully lit between the outer markers, fading out toward each end. */}
        <linearGradient
          id="foundation-arc"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={art.startY}
          x2="0"
          y2={art.endY}
        >
          <stop offset="0" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
          <stop offset={art.litFrom} stopColor="rgb(var(--accent-rgb))" stopOpacity="0.6" />
          <stop offset={art.litFrom} stopColor="rgb(var(--accent-rgb))" stopOpacity="1" />
          <stop offset={art.litTo} stopColor="rgb(var(--accent-rgb))" stopOpacity="1" />
          <stop offset={art.litTo} stopColor="rgb(var(--accent-rgb))" stopOpacity="0.6" />
          <stop offset="1" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.g variants={artFieldReveal} fill="none">
        {wide ? (
          <>
            <path d={art.inner} stroke="url(#foundation-arc)" strokeOpacity="0.3" strokeWidth="1" />
            <path
              d={art.far}
              stroke="var(--home-blue-tint)"
              strokeOpacity="0.16"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
          </>
        ) : null}
        <path
          d={art.minorTicks}
          stroke="url(#foundation-arc)"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <path
          d={art.majorTicks}
          stroke="url(#foundation-arc)"
          strokeOpacity="0.8"
          strokeWidth="1"
        />
      </motion.g>
      <motion.path
        variants={artLineDraw}
        d={art.main}
        fill="none"
        stroke="url(#foundation-arc)"
        strokeWidth="1.5"
      />
      {points.map((point, index) => (
        <motion.g
          key={index}
          variants={approachRise}
          custom={{ delay: 0.9 + index * 0.4 } satisfies ApproachBuildMotion}
        >
          <circle
            cx={point.x}
            cy={point.y}
            r="8.5"
            fill="hsl(var(--background))"
            stroke="var(--home-blue-tint)"
            strokeWidth="1.25"
          />
          <circle
            className="home-guide-node"
            cx={point.x}
            cy={point.y}
            r="3"
            fill="var(--home-blue-tint)"
          />
        </motion.g>
      ))}
      {head ? <TraceLight trace={art.trace} head={head} tail={tail} /> : null}
    </svg>
  );
}
