import type { ThreadPoint } from "../thread";
import { angleOn, arcPoints, arcTicks, circleThrough } from "./arcs";
import { segmentPath } from "./numeric";
import { buildTrace, type Trace, tracePath } from "./trace";

const DEGREE = Math.PI / 180;

/** How far the arc runs past its outer markers, as a share of the marked span. */
const REACH = {
  wide: { above: 0.75, below: 1.55 },
  narrow: { above: 0.2, below: 0.2 },
} as const;

/** The two quieter arcs inside the main one, as shares of its radius. */
const INNER_RADIUS = 0.872;
const FAR_RADIUS = 0.763;

export interface FoundationArt {
  /** The main arc, measured, for the light that travels it. */
  readonly trace: Trace;
  readonly main: string;
  readonly inner: string;
  readonly far: string;
  readonly minorTicks: string;
  readonly majorTicks: string;
  /** Vertical extent of the main arc, for the gradient that fades its ends. */
  readonly startY: number;
  readonly endY: number;
  /** Shares of that extent between which the arc is fully lit. */
  readonly litFrom: number;
  readonly litTo: number;
  /** Where each marker sits along the arc, as a fraction of its length. */
  readonly stops: readonly number[];
}

/**
 * Arcs turning around the Foundation headline, through its three markers.
 *
 * The markers are measured, not placed: the circle through them is solved from
 * wherever the list has laid them out, so the arc follows the type at every
 * width and in every language. `wide` runs the arc on past the markers and adds
 * its inner companions; a narrow screen keeps to the list.
 */
export function foundationArt(points: readonly ThreadPoint[], wide: boolean): FoundationArt | null {
  const [first, middle, last] = points;
  if (!first || !middle || !last) return null;
  const circle = circleThrough(first, middle, last);
  if (!circle) return null;

  const angles = [first, middle, last].map((point) => angleOn(circle, point));
  const [top = 0, , bottom = 0] = angles;
  const half = (bottom - top) / 2;
  const reach = wide ? REACH.wide : REACH.narrow;
  const from = top - half * reach.above;
  const to = bottom + half * reach.below;
  const main = arcPoints(circle, from, to, 120);
  const ticks = (every: number, length: number) =>
    arcTicks(circle, { from, to, every: every * DEGREE, length, inset: 5 }, angles)
      .map(([outer, inner]) => segmentPath(outer.x, outer.y, inner.x, inner.y))
      .join("");
  const startY = main[0]?.y ?? 0;
  const endY = main[main.length - 1]?.y ?? startY + 1;
  const share = (y: number) => (y - startY) / (endY - startY || 1);

  return {
    trace: buildTrace(main),
    main: tracePath(main),
    inner: tracePath(arcPoints({ ...circle, r: circle.r * INNER_RADIUS }, from, to, 96)),
    far: tracePath(arcPoints({ ...circle, r: circle.r * FAR_RADIUS }, from, to, 96)),
    minorTicks: ticks(1.5, 4),
    majorTicks: ticks(7.5, 10),
    startY,
    endY,
    litFrom: share(first.y),
    litTo: share(last.y),
    /* On a circle equal angles are equal lengths, so the angle is the fraction. */
    stops: angles.map((angle) => (angle - from) / (to - from)),
  };
}
