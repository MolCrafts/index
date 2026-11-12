import type { ThreadPoint } from "../thread";
import { clamp, round1 } from "./numeric";

/**
 * A drawn line, measured.
 *
 * Every screen of the homepage carries one line a light travels along: an orbit,
 * an arc, a path across an energy surface, a walk through a lattice. They are all
 * polylines, so one arc-length table serves every one of them and the light moves
 * at a constant speed whatever the shape.
 */
export interface Trace {
  readonly points: readonly ThreadPoint[];
  /** Distance from the first point to each point, in the line's own units. */
  readonly cumulative: readonly number[];
  readonly length: number;
}

/** `closed` returns to the first point, for a loop the light never leaves. */
export function buildTrace(points: readonly ThreadPoint[], closed = false): Trace {
  const first = points[0];
  const path = closed && first ? [...points, first] : [...points];
  const cumulative: number[] = [];
  let total = 0;
  for (const [index, point] of path.entries()) {
    const previous = path[index - 1];
    if (previous) total += Math.hypot(point.x - previous.x, point.y - previous.y);
    cumulative.push(total);
  }
  return { points: path, cumulative, length: total };
}

/** The point a fraction of the way along; fractions outside 0–1 hold the ends. */
export function pointAt(trace: Trace, fraction: number): ThreadPoint {
  const { points, cumulative, length } = trace;
  const first = points[0];
  if (!first) return { x: 0, y: 0 };
  const last = points[points.length - 1] ?? first;
  if (length === 0 || fraction <= 0) return { x: first.x, y: first.y };
  if (fraction >= 1) return { x: last.x, y: last.y };

  const distance = fraction * length;
  let low = 0;
  let high = cumulative.length - 1;
  while (high - low > 1) {
    const middle = (low + high) >> 1;
    if ((cumulative[middle] ?? 0) <= distance) low = middle;
    else high = middle;
  }
  const a = points[low] ?? first;
  const b = points[high] ?? last;
  const start = cumulative[low] ?? 0;
  const span = (cumulative[high] ?? length) - start;
  const t = span === 0 ? 0 : (distance - start) / span;
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/** Where along the line a vertex sits, as a fraction of the whole. */
export function fractionAtVertex(trace: Trace, index: number): number {
  if (trace.length === 0) return 0;
  return (trace.cumulative[index] ?? 0) / trace.length;
}

/** The fraction whose point on the line is closest to `target`. */
export function nearestFraction(trace: Trace, target: ThreadPoint): number {
  const { points, cumulative, length } = trace;
  if (length === 0) return 0;
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let index = 1; index < points.length; index++) {
    const a = points[index - 1];
    const b = points[index];
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const span = dx * dx + dy * dy;
    const t = span === 0 ? 0 : clamp(((target.x - a.x) * dx + (target.y - a.y) * dy) / span);
    const distance = Math.hypot(a.x + dx * t - target.x, a.y + dy * t - target.y);
    if (distance < bestDistance) {
      bestDistance = distance;
      const start = cumulative[index - 1] ?? 0;
      best = (start + ((cumulative[index] ?? start) - start) * t) / length;
    }
  }
  return best;
}

/** SVG path data for a polyline. Empty when there is nothing to draw. */
export function tracePath(points: readonly ThreadPoint[], closed = false): string {
  if (points.length === 0) return "";
  const body = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${round1(point.x)} ${round1(point.y)}`)
    .join("");
  return closed ? `${body}Z` : body;
}

export interface Ellipse {
  readonly cx: number;
  readonly cy: number;
  readonly rx: number;
  readonly ry: number;
}

/**
 * Points on an ellipse, in degrees, counter-clockwise on screen from the right —
 * the direction the AI screen's statements are read in.
 */
export function ellipsePoints(
  ellipse: Ellipse,
  fromDegrees: number,
  toDegrees: number,
  steps: number,
): ThreadPoint[] {
  const points: ThreadPoint[] = [];
  for (let step = 0; step <= steps; step++) {
    const angle = ((fromDegrees + ((toDegrees - fromDegrees) * step) / steps) * Math.PI) / 180;
    points.push({
      x: ellipse.cx + ellipse.rx * Math.cos(angle),
      y: ellipse.cy - ellipse.ry * Math.sin(angle),
    });
  }
  return points;
}
