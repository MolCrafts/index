import type { ThreadPoint } from "../thread";
import { round1 } from "./numeric";

/**
 * The energy surface behind Continuity.
 *
 * The screen says research carries forward from one result to the next, and it
 * says so with a picture a computational scientist reads literally: basins on a
 * potential-energy surface, and the path between them. So the surface is a real
 * function, the stations sit at its true minima, and the trajectory is the
 * minimum-energy path — it stays on the valley floor and crosses each ridge at
 * its saddle. `scripts/generate-continuity-path.ts` solves for that path and
 * `tests/test_lib/landscape.test.ts` holds the drawing to it.
 */

/** The frame the surface is defined in; the stage scales it uniformly. */
export const LANDSCAPE_FRAME = { width: 1440, height: 900 } as const;

interface Gaussian {
  readonly x: number;
  readonly y: number;
  /** Depth (negative) or height (positive). */
  readonly a: number;
  /** Width. */
  readonly s: number;
}

/** Where the three stations settle, before relaxing to the true minima. */
export const STATION_SEEDS: readonly ThreadPoint[] = [
  { x: 292, y: 628 },
  { x: 716, y: 486 },
  { x: 1128, y: 640 },
];

/** Two more basins off-screen: where the work came from, and where it goes next. */
export const OFFSCREEN_SEEDS: readonly ThreadPoint[] = [
  { x: -140, y: 700 },
  { x: LANDSCAPE_FRAME.width + 130, y: 560 },
];

const WELLS: readonly Gaussian[] = [...STATION_SEEDS, ...OFFSCREEN_SEEDS].map((seed) => ({
  ...seed,
  a: -1,
  s: 150,
}));

const HILLS: readonly Gaussian[] = [
  { x: 520, y: 790, a: 0.8, s: 170 },
  { x: 930, y: 330, a: 0.75, s: 190 },
  { x: 1330, y: 420, a: 0.6, s: 170 },
  { x: 110, y: 400, a: 0.6, s: 180 },
  { x: 900, y: 860, a: 0.5, s: 150 },
];

const TERMS: readonly Gaussian[] = [...WELLS, ...HILLS];

/** Energy at a point of the frame: a gentle tilt plus wells and hills. */
export function energy(x: number, y: number): number {
  let value = 0.00022 * (y - 450) - 0.00008 * (x - 720);
  for (const term of TERMS) {
    value += term.a * Math.exp(-((x - term.x) ** 2 + (y - term.y) ** 2) / (2 * term.s * term.s));
  }
  return value;
}

/** Slope of the surface, per unit of the frame. */
export function gradient(x: number, y: number): ThreadPoint {
  return {
    x: energy(x + 0.5, y) - energy(x - 0.5, y),
    y: energy(x, y + 0.5) - energy(x, y - 0.5),
  };
}

/**
 * Contour levels, lowest first. Levels below {@link BASIN_LEVEL} lie inside a
 * basin and are drawn in the accent; the rest are the ground between them.
 */
export const LANDSCAPE_LEVELS: readonly number[] = Array.from(
  { length: 15 },
  (_, index) => Math.round((-0.92 + index * 0.115) * 1000) / 1000,
);

export const BASIN_LEVEL = -0.2;

export interface Isoline {
  readonly level: number;
  readonly d: string;
}

export interface Bounds {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
}

type Edge = "top" | "right" | "bottom" | "left";

/** Marching-squares cases: which cell edges a contour joins, by corner pattern. */
const CASES: Readonly<Record<number, readonly (readonly [Edge, Edge])[]>> = {
  1: [["left", "bottom"]],
  2: [["bottom", "right"]],
  3: [["left", "right"]],
  4: [["top", "right"]],
  5: [
    ["top", "left"],
    ["bottom", "right"],
  ],
  6: [["top", "bottom"]],
  7: [["top", "left"]],
  8: [["top", "left"]],
  9: [["top", "bottom"]],
  10: [
    ["top", "right"],
    ["left", "bottom"],
  ],
  11: [["top", "right"]],
  12: [["left", "right"]],
  13: [["bottom", "right"]],
  14: [["left", "bottom"]],
};

/**
 * Contours of the surface over `bounds`, one path per level.
 *
 * Marching squares on a grid of `step`. It runs once, on the client, for the one
 * screen that draws it: shipping the surface as a function and tracing it here
 * costs a few milliseconds and keeps tens of kilobytes of path data out of the
 * bundle.
 */
export function isolines(bounds: Bounds, step: number): Isoline[] {
  const columns = Math.ceil((bounds.right - bounds.left) / step) + 1;
  const rows = Math.ceil((bounds.bottom - bounds.top) / step) + 1;
  const grid: number[][] = [];
  for (let row = 0; row < rows; row++) {
    const values: number[] = [];
    for (let column = 0; column < columns; column++) {
      values.push(energy(bounds.left + column * step, bounds.top + row * step));
    }
    grid.push(values);
  }

  return LANDSCAPE_LEVELS.map((level) => {
    const parts: string[] = [];
    for (let row = 0; row < rows - 1; row++) {
      for (let column = 0; column < columns - 1; column++) {
        const v0 = grid[row]?.[column] ?? 0;
        const v1 = grid[row]?.[column + 1] ?? 0;
        const v2 = grid[row + 1]?.[column + 1] ?? 0;
        const v3 = grid[row + 1]?.[column] ?? 0;
        const pattern =
          (v0 > level ? 8 : 0) | (v1 > level ? 4 : 0) | (v2 > level ? 2 : 0) | (v3 > level ? 1 : 0);
        const joins = CASES[pattern];
        if (!joins) continue;
        const x0 = bounds.left + column * step;
        const y0 = bounds.top + row * step;
        const cross = (edge: Edge): string => {
          switch (edge) {
            case "top":
              return `${round1(x0 + (step * (level - v0)) / (v1 - v0))} ${round1(y0)}`;
            case "bottom":
              return `${round1(x0 + (step * (level - v3)) / (v2 - v3))} ${round1(y0 + step)}`;
            case "left":
              return `${round1(x0)} ${round1(y0 + (step * (level - v0)) / (v3 - v0))}`;
            default:
              return `${round1(x0 + step)} ${round1(y0 + (step * (level - v1)) / (v2 - v1))}`;
          }
        };
        for (const [from, to] of joins) parts.push(`M${cross(from)}L${cross(to)}`);
      }
    }
    return { level, d: parts.join("") };
  });
}
