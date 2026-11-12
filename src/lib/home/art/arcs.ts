import type { ThreadPoint } from "../thread";

export interface Circle {
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
}

/**
 * The circle through three points, or `null` when they lie on one line.
 *
 * Foundation's three items sit in a column bowed toward the reader. The circle
 * through their markers has its centre back among the headline, so arcs drawn
 * on it turn around the claim the items support.
 */
export function circleThrough(a: ThreadPoint, b: ThreadPoint, c: ThreadPoint): Circle | null {
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  if (Math.abs(d) < 1e-9) return null;
  const a2 = a.x * a.x + a.y * a.y;
  const b2 = b.x * b.x + b.y * b.y;
  const c2 = c.x * c.x + c.y * c.y;
  const cx = (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d;
  const cy = (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d;
  return { cx, cy, r: Math.hypot(a.x - cx, a.y - cy) };
}

/** The angle of a point as seen from the circle's centre, in screen radians. */
export function angleOn(circle: Circle, point: ThreadPoint): number {
  return Math.atan2(point.y - circle.cy, point.x - circle.cx);
}

/** Points along the circle between two screen angles (y grows downward). */
export function arcPoints(circle: Circle, from: number, to: number, steps: number): ThreadPoint[] {
  const points: ThreadPoint[] = [];
  for (let step = 0; step <= steps; step++) {
    const angle = from + ((to - from) * step) / steps;
    points.push({
      x: circle.cx + circle.r * Math.cos(angle),
      y: circle.cy + circle.r * Math.sin(angle),
    });
  }
  return points;
}

interface TickRun {
  readonly from: number;
  readonly to: number;
  /** Angular pitch, in radians. */
  readonly every: number;
  readonly length: number;
  /** Gap between the arc and the start of each tick. */
  readonly inset: number;
}

/**
 * Graduations on the inside of an arc, as `[outer, inner]` point pairs.
 *
 * `skip` lists angles to leave clear — the markers the scale is read against.
 */
export function arcTicks(
  circle: Circle,
  run: TickRun,
  skip: readonly number[] = [],
): [ThreadPoint, ThreadPoint][] {
  const ticks: [ThreadPoint, ThreadPoint][] = [];
  const clearance = run.every * 0.75;
  const count = Math.floor((run.to - run.from) / run.every + 1e-6);
  for (let index = 0; index <= count; index++) {
    const angle = run.from + index * run.every;
    if (skip.some((blocked) => Math.abs(blocked - angle) < clearance)) continue;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const outer = circle.r - run.inset;
    const inner = outer - run.length;
    ticks.push([
      { x: circle.cx + outer * cos, y: circle.cy + outer * sin },
      { x: circle.cx + inner * cos, y: circle.cy + inner * sin },
    ]);
  }
  return ticks;
}
