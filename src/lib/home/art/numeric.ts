/** Small numeric helpers shared by the homepage drawings. */

export function clamp(value: number, low = 0, high = 1): number {
  return Math.min(high, Math.max(low, value));
}

/** Hermite step from `from` to `to`; `from` may be the larger bound to step down. */
export function smoothstep(from: number, to: number, value: number): number {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
}

/** One decimal: enough for SVG coordinates on a 1440-wide frame. */
export function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Seeded generator (mulberry32). The drawings are pictures of disorder, and a
 * picture has to be the same one on every visit and in every test.
 */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One SVG path and the opacity it is drawn at. */
export interface OpacityPath {
  readonly d: string;
  readonly opacity: number;
}

/**
 * Merges many faded segments into a handful of paths, one per opacity step.
 *
 * A lattice has thousands of bonds that each fade a little differently. One
 * element per bond is thousands of nodes; one path for all of them loses the
 * fade. A few opacity steps keep both.
 */
export function bucketByOpacity(
  items: readonly OpacityPath[],
  steps: number,
  ceiling: number,
): OpacityPath[] {
  const groups = new Map<number, string[]>();
  for (const item of items) {
    const step = Math.round((clamp(item.opacity, 0, ceiling) / ceiling) * steps);
    if (step === 0) continue;
    const group = groups.get(step);
    if (group) group.push(item.d);
    else groups.set(step, [item.d]);
  }
  return [...groups.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([step, parts]) => ({
      d: parts.join(""),
      opacity: Math.round((step / steps) * ceiling * 100) / 100,
    }));
}

/** A straight segment as path data. */
export function segmentPath(ax: number, ay: number, bx: number, by: number): string {
  return `M${round1(ax)} ${round1(ay)}L${round1(bx)} ${round1(by)}`;
}

/** A full circle as path data, so many of them can share one path element. */
export function circlePath(x: number, y: number, r: number): string {
  const radius = round1(r);
  return `M${round1(x - r)} ${round1(y)}a${radius} ${radius} 0 1 0 ${round1(2 * r)} 0a${radius} ${radius} 0 1 0 ${round1(-2 * r)} 0Z`;
}
