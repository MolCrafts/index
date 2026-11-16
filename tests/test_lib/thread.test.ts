import { describe, expect, it } from "@rstest/core";
import { smoothThread, type ThreadPoint } from "@/lib/home/thread";

describe("smoothThread", () => {
  it("returns an empty path when no stations have been measured", () => {
    expect(smoothThread([])).toBe("");
  });

  it("moves to a single station without drawing a span", () => {
    expect(smoothThread([{ x: -24, y: 10 }])).toBe("M -24 10");
  });

  it("draws a straight diagonal between two stations", () => {
    expect(
      smoothThread([
        { x: 0, y: 0 },
        { x: 90, y: 180 },
      ]),
    ).toBe("M 0 0 C 30 60, 60 120, 90 180");
  });

  it("passes through every station with a shared tangent at each interior join", () => {
    const points: readonly ThreadPoint[] = [
      { x: -24, y: 10 },
      { x: 120, y: 154 },
      { x: 420, y: 250 },
      { x: 480, y: 442 },
    ];
    const path = smoothThread(points);
    const spans = [...path.matchAll(/C ([^C]+)/g)].map((match) =>
      match[1]
        .trim()
        .split(/[\s,]+/)
        .map(Number),
    );

    expect(path.startsWith("M -24 10 C ")).toBe(true);
    expect(spans).toHaveLength(points.length - 1);
    for (const [index, span] of spans.entries()) {
      expect(span).toHaveLength(6);
      expect(span.slice(4)).toEqual([points[index + 1].x, points[index + 1].y]);
      const next = spans[index + 1];
      if (next) {
        // Bézier derivatives at a shared endpoint must agree, avoiding a kink.
        expect(span[4] - span[2]).toBeCloseTo(next[0] - span[4], 2);
        expect(span[5] - span[3]).toBeCloseTo(next[1] - span[5], 2);
      }
    }
  });

  it("keeps repeated fractional stations finite and rounds SVG coordinates", () => {
    const point = Object.freeze({ x: -24.1234, y: 10.5678 });
    const points = Object.freeze([point, point, point]);
    expect(smoothThread(points)).toBe(
      "M -24.12 10.57 C -24.12 10.57, -24.12 10.57, -24.12 10.57 C -24.12 10.57, -24.12 10.57, -24.12 10.57",
    );
  });
});
