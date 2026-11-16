/**
 * A thread through measured stations.
 *
 * The old guide was an axis-aligned midpoint cubic: each join arrived on a
 * horizontal or vertical tangent, so the line stepped like a rounded elbow.
 * This is a uniform Catmull–Rom spline written as cubic Béziers. It still
 * passes through every measured point, and neighbouring spans share a tangent,
 * so the line eases through the stations instead of cornering at them.
 */

export interface ThreadPoint {
  x: number;
  y: number;
}

function coord(value: number): number {
  return Math.round(value * 100) / 100;
}

function reflected(anchor: ThreadPoint, other: ThreadPoint): ThreadPoint {
  return { x: anchor.x * 2 - other.x, y: anchor.y * 2 - other.y };
}

/** SVG path data. Empty when there is nothing to draw. */
export function smoothThread(points: readonly ThreadPoint[]): string {
  if (points.length === 0) return "";
  const first = points[0];
  if (!first) return "";
  if (points.length === 1) return `M ${coord(first.x)} ${coord(first.y)}`;

  const last = points[points.length - 1];
  const next = points[1];
  const prev = points[points.length - 2];
  if (!last || !next || !prev) return `M ${coord(first.x)} ${coord(first.y)}`;

  const padded = [reflected(first, next), ...points, reflected(last, prev)];
  let path = `M ${coord(first.x)} ${coord(first.y)}`;

  for (let index = 1; index < padded.length - 2; index++) {
    const p0 = padded[index - 1];
    const p1 = padded[index];
    const p2 = padded[index + 1];
    const p3 = padded[index + 2];
    if (!p0 || !p1 || !p2 || !p3) continue;
    /* Uniform Catmull–Rom, tension 1/6, converted to a cubic Bézier. */
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    path += ` C ${coord(c1x)} ${coord(c1y)}, ${coord(c2x)} ${coord(c2y)}, ${coord(p2.x)} ${coord(p2.y)}`;
  }

  return path;
}
