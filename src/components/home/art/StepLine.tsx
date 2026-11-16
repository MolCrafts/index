import type { MotionValue } from "framer-motion";
import type { SteppedLine } from "@/lib/home/art/steps";
import { tracePath } from "@/lib/home/art/trace";
import { TraceLight } from "./TraceLight";

interface StepLineProps {
  line: SteppedLine;
  width: number;
  height: number;
  /** Where the travelling light is; omitted while the screen is still. */
  head?: MotionValue<number>;
  tail: number;
}

/** The stepped line down the collaboration rows. See `steppedLine` for the geometry. */
export function StepLine({ line, width, height, head, tail }: StepLineProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
    >
      <path
        d={tracePath(line.trace.points)}
        fill="none"
        stroke="rgb(var(--accent-rgb))"
        strokeOpacity="0.7"
        strokeWidth="1.25"
      />
      {line.corners.map((corner) => (
        <circle
          key={`${corner.x}-${corner.y}`}
          cx={corner.x}
          cy={corner.y}
          r="3"
          fill="hsl(var(--background))"
          stroke="var(--home-blue-tint)"
          strokeWidth="1.25"
        />
      ))}
      {head ? <TraceLight trace={line.trace} head={head} tail={tail} size={0.85} /> : null}
    </svg>
  );
}
