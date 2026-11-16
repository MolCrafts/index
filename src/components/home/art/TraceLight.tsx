import { type MotionValue, motion, useTransform } from "framer-motion";
import { useId, useMemo } from "react";
import { clamp } from "@/lib/home/art/numeric";
import { pointAt, type Trace, tracePath } from "@/lib/home/art/trace";

/** The trail is three strokes of falling length and rising strength, so it tapers. */
const TRAIL = [
  { share: 1, opacity: 0.22, width: 1.5 },
  { share: 0.55, opacity: 0.45, width: 1.75 },
  { share: 0.22, opacity: 0.95, width: 2 },
] as const;

/** Share of an open line over which the light fades in at one end and out at the other. */
const EDGE = 0.04;

interface TraceLightProps {
  trace: Trace;
  /**
   * Where the light is, as a fraction of the line. On an open line it may run
   * past 1: the trail then leaves through the end. On a closed line it wraps.
   */
  head: MotionValue<number>;
  closed?: boolean;
  /** Trail length, as a fraction of the line. */
  tail?: number;
  /** Scales the body of the light; the trail keeps its width. */
  size?: number;
}

interface TrailProps {
  d: string;
  length: number;
  head: MotionValue<number>;
  share: number;
  closed: boolean;
  opacity: number;
  width: number;
}

/** One stroke of the trail: a single dash, slid along the line to end at the light. */
function Trail({ d, length, head, share, closed, opacity, width }: TrailProps) {
  const dash = share * length;
  /* A closed line repeats the dash once per lap; an open one never repeats it. */
  const gap = closed ? length - dash : length * 3;
  const offset = useTransform(head, (value) => -(value - share) * length);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgb(var(--accent-rgb))"
      strokeOpacity={opacity}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={`${dash} ${gap}`}
      strokeDashoffset={offset}
    />
  );
}

/**
 * A light travelling along a drawn line, for use inside an `<svg>`.
 *
 * The line is the one already on screen — the orbit, the arc, the path across
 * the energy surface — so the light never invents a route of its own.
 */
export function TraceLight({
  trace,
  head,
  closed = false,
  tail = 0.12,
  size = 1,
}: TraceLightProps) {
  const glowId = useId();
  const d = useMemo(() => tracePath(trace.points), [trace]);
  const at = (value: number) => pointAt(trace, closed ? ((value % 1) + 1) % 1 : value);
  const x = useTransform(head, (value) => at(value).x);
  const y = useTransform(head, (value) => at(value).y);
  const presence = useTransform(head, (value) =>
    closed ? 1 : clamp(value / EDGE) * clamp((1 + EDGE - value) / EDGE),
  );

  if (trace.length === 0) return null;

  return (
    <g>
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
        </radialGradient>
      </defs>
      {TRAIL.map((stroke) => (
        <Trail
          key={stroke.share}
          d={d}
          length={trace.length}
          head={head}
          share={stroke.share * tail}
          closed={closed}
          opacity={stroke.opacity}
          width={stroke.width}
        />
      ))}
      <motion.g opacity={presence}>
        <motion.circle cx={x} cy={y} r={22 * size} fill={`url(#${glowId})`} />
        <motion.circle
          cx={x}
          cy={y}
          r={7 * size}
          fill="none"
          stroke="var(--home-blue-tint)"
          strokeOpacity="0.7"
          strokeWidth="1"
        />
        <motion.circle cx={x} cy={y} r={2.8 * size} fill="var(--home-blue-tint)" />
      </motion.g>
    </g>
  );
}
