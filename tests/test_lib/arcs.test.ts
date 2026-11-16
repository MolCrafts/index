import { describe, expect, it } from "@rstest/core";
import { arcPoints, arcTicks, circleThrough } from "@/lib/home/art/arcs";

describe("circleThrough", () => {
  it("finds the circle through three points", () => {
    const circle = circleThrough({ x: 5, y: 0 }, { x: 0, y: 5 }, { x: -5, y: 0 });
    expect(circle).not.toBeNull();
    expect(circle?.cx).toBeCloseTo(0, 6);
    expect(circle?.cy).toBeCloseTo(0, 6);
    expect(circle?.r).toBeCloseTo(5, 6);
  });

  it("puts the centre to the left of a column bowed to the right", () => {
    const circle = circleThrough({ x: 0, y: 0 }, { x: 46, y: 218 }, { x: 0, y: 436 });
    expect(circle?.cx).toBeLessThan(-400);
    expect(circle?.cy).toBeCloseTo(218, 6);
  });

  it("returns null for points on one line", () => {
    expect(circleThrough({ x: 0, y: 0 }, { x: 0, y: 10 }, { x: 0, y: 20 })).toBeNull();
  });
});

describe("arcPoints", () => {
  it("stays on the circle from the first angle to the last", () => {
    const circle = { cx: 10, cy: 20, r: 100 };
    const points = arcPoints(circle, -0.5, 0.5, 16);
    expect(points).toHaveLength(17);
    for (const point of points) {
      expect(Math.hypot(point.x - circle.cx, point.y - circle.cy)).toBeCloseTo(100, 6);
    }
    expect(points[0].y).toBeLessThan(points[16].y);
  });
});

describe("arcTicks", () => {
  it("points every tick at the centre and skips the excluded angles", () => {
    const circle = { cx: 0, cy: 0, r: 100 };
    const ticks = arcTicks(circle, { from: -0.4, to: 0.4, every: 0.1, length: 10, inset: 5 }, [0]);
    expect(ticks.length).toBeGreaterThan(0);
    for (const [outer, inner] of ticks) {
      expect(Math.hypot(outer.x, outer.y)).toBeCloseTo(95, 6);
      expect(Math.hypot(inner.x, inner.y)).toBeCloseTo(85, 6);
    }
    expect(ticks.some(([outer]) => Math.abs(outer.y) < 1e-6)).toBe(false);
  });
});
