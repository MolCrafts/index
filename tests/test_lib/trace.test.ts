import { describe, expect, it } from "@rstest/core";
import { stationAt } from "@/lib/home/art/loop";
import {
  buildTrace,
  ellipsePoints,
  fractionAtVertex,
  nearestFraction,
  pointAt,
  tracePath,
} from "@/lib/home/art/trace";

const SQUARE = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];

describe("buildTrace", () => {
  it("measures a polyline by arc length", () => {
    const trace = buildTrace(SQUARE);
    expect(trace.length).toBe(30);
    expect(trace.cumulative).toEqual([0, 10, 20, 30]);
  });

  it("closes the loop when asked, without mutating its input", () => {
    const input = Object.freeze([...SQUARE]);
    const trace = buildTrace(input, true);
    expect(trace.length).toBe(40);
    expect(trace.points).toHaveLength(5);
    expect(input).toHaveLength(4);
  });

  it("keeps a single point finite", () => {
    const trace = buildTrace([{ x: 3, y: 4 }]);
    expect(trace.length).toBe(0);
    expect(pointAt(trace, 0.5)).toEqual({ x: 3, y: 4 });
  });
});

describe("pointAt", () => {
  const trace = buildTrace(SQUARE);

  it("walks the line at constant speed", () => {
    expect(pointAt(trace, 0)).toEqual({ x: 0, y: 0 });
    expect(pointAt(trace, 0.5)).toEqual({ x: 10, y: 5 });
    expect(pointAt(trace, 1)).toEqual({ x: 0, y: 10 });
  });

  it("holds the ends for fractions outside the line", () => {
    expect(pointAt(trace, -0.3)).toEqual({ x: 0, y: 0 });
    expect(pointAt(trace, 1.4)).toEqual({ x: 0, y: 10 });
  });
});

describe("fractions", () => {
  const trace = buildTrace(SQUARE);

  it("reports where a vertex sits along the line", () => {
    expect(fractionAtVertex(trace, 0)).toBe(0);
    expect(fractionAtVertex(trace, 2)).toBeCloseTo(2 / 3, 6);
  });

  it("finds the fraction nearest to a point off the line", () => {
    expect(nearestFraction(trace, { x: 12, y: 5 })).toBeCloseTo(0.5, 6);
  });
});

describe("tracePath", () => {
  it("writes rounded SVG path data", () => {
    expect(
      tracePath([
        { x: 0.04, y: 1 },
        { x: 2.26, y: 3 },
      ]),
    ).toBe("M0 1L2.3 3");
    expect(tracePath(SQUARE, true).endsWith("Z")).toBe(true);
    expect(tracePath([])).toBe("");
  });
});

describe("ellipsePoints", () => {
  it("runs counter-clockwise on screen from the right", () => {
    const points = ellipsePoints({ cx: 0, cy: 0, rx: 4, ry: 2 }, 0, 360, 4);
    expect(points).toHaveLength(5);
    expect(points[0].x).toBeCloseTo(4, 6);
    expect(points[1].x).toBeCloseTo(0, 6);
    expect(points[1].y).toBeCloseTo(-2, 6);
    expect(points[2].x).toBeCloseTo(-4, 6);
  });
});

describe("stationAt", () => {
  const stops = [0.2, 0.5, 0.8];

  it("lights the station the light is passing", () => {
    expect(stationAt(0.21, stops, 0.1)).toBe(0);
    expect(stationAt(0.55, stops, 0.1)).toBe(1);
  });

  it("lights nothing between stations", () => {
    expect(stationAt(0.35, stops, 0.1)).toBe(-1);
  });

  it("lights the nearest station where two windows overlap", () => {
    expect(stationAt(0.34, stops, 0.2)).toBe(0);
    expect(stationAt(0.36, stops, 0.2)).toBe(1);
  });

  it("wraps around a closed loop", () => {
    expect(stationAt(0.97, [0, 0.5], 0.1, true)).toBe(0);
    expect(stationAt(0.97, [0, 0.5], 0.1)).toBe(-1);
  });
});
