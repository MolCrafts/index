import { describe, expect, it } from "@rstest/core";
import { energy, gradient, isolines, LANDSCAPE_LEVELS } from "@/lib/home/art/landscape";
import {
  CONTINUITY_LEGS,
  CONTINUITY_MINIMA,
  CONTINUITY_STATION_CLASSES,
} from "@/lib/home/art/landscapePath";

/** The largest slope on the drawn surface, as the scale for "flat". */
const STEEP = 0.004;

describe("continuity landscape", () => {
  it("places every station at a true minimum of the surface", () => {
    for (const [x, y] of CONTINUITY_MINIMA) {
      const slope = gradient(x, y);
      expect(Math.hypot(slope.x, slope.y)).toBeLessThan(STEEP / 200);
      for (const [dx, dy] of [
        [6, 0],
        [-6, 0],
        [0, 6],
        [0, -6],
        [4, 4],
        [-4, -4],
      ]) {
        expect(energy(x + dx, y + dy)).toBeGreaterThan(energy(x, y));
      }
    }
  });

  it("keeps the trajectory on the valley floor: no slope across the path", () => {
    for (const leg of CONTINUITY_LEGS) {
      for (let index = 1; index < leg.length - 1; index++) {
        const [x, y] = leg[index];
        const [px, py] = leg[index - 1];
        const [nx, ny] = leg[index + 1];
        const length = Math.hypot(nx - px, ny - py);
        const slope = gradient(x, y);
        /* Component of the slope perpendicular to the direction of travel. */
        const across = Math.abs((slope.x * -(ny - py) + slope.y * (nx - px)) / length);
        expect(across).toBeLessThan(STEEP / 25);
      }
    }
  });

  it("crosses each ridge once, at a pass lower than the straight line would take", () => {
    for (const leg of CONTINUITY_LEGS) {
      const heights = leg.map(([x, y]) => energy(x, y));
      const top = heights.indexOf(Math.max(...heights));
      expect(top).toBeGreaterThan(0);
      expect(top).toBeLessThan(leg.length - 1);
      for (let index = 1; index <= top; index++) {
        expect(heights[index]).toBeGreaterThanOrEqual(heights[index - 1] - 1e-4);
      }
      for (let index = top + 1; index < heights.length; index++) {
        expect(heights[index]).toBeLessThanOrEqual(heights[index - 1] + 1e-4);
      }
      const [ax, ay] = leg[0];
      const [bx, by] = leg[leg.length - 1];
      let straight = Number.NEGATIVE_INFINITY;
      for (let step = 0; step <= 100; step++) {
        const t = step / 100;
        straight = Math.max(straight, energy(ax + (bx - ax) * t, ay + (by - ay) * t));
      }
      expect(heights[top]).toBeLessThanOrEqual(straight + 1e-6);
    }
  });

  it("joins the legs end to end through the three stations", () => {
    for (let index = 1; index < CONTINUITY_LEGS.length; index++) {
      const previous = CONTINUITY_LEGS[index - 1];
      expect(CONTINUITY_LEGS[index][0]).toEqual(previous[previous.length - 1]);
      expect(CONTINUITY_LEGS[index][0]).toEqual(CONTINUITY_MINIMA[index - 1]);
    }
  });

  it("anchors each station label to its minimum", () => {
    for (const [index, [x, y]] of CONTINUITY_MINIMA.entries()) {
      const classes = CONTINUITY_STATION_CLASSES[index];
      const left = Number(classes.match(/left-\[([\d.]+)%\]/)?.[1]);
      const top = Number(classes.match(/top-\[([\d.]+)%\]/)?.[1]);
      expect(left).toBeCloseTo((x / 1440) * 100, 1);
      expect(top).toBeCloseTo((y / 900) * 100, 1);
    }
  });

  it("draws one closed-form contour set per level", () => {
    const lines = isolines({ left: 0, right: 1440, top: 0, bottom: 900 }, 24);
    expect(lines).toHaveLength(LANDSCAPE_LEVELS.length);
    expect(lines.filter((line) => line.d.length > 0).length).toBeGreaterThan(8);
  });
});
