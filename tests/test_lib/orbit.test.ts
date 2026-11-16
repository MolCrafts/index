import { describe, expect, it } from "@rstest/core";
import {
  BODY_STOPS,
  BODY_TRACE,
  ORBIT_FRAME,
  STATEMENT_POSITIONS,
  statementOrbitArt,
  statementPoint,
} from "@/lib/home/art/orbit";
import { pointAt } from "@/lib/home/art/trace";

describe("AI orbit", () => {
  it("centres every statement on the outer orbit", () => {
    for (const [index, classes] of STATEMENT_POSITIONS.entries()) {
      const point = statementPoint(index);
      const left = Number(classes.match(/left-\[([\d.]+)%\]/)?.[1]);
      const top = Number(classes.match(/top-\[([\d.]+)%\]/)?.[1]);
      expect(left).toBeCloseTo((point.x / ORBIT_FRAME.width) * 100, 1);
      expect(top).toBeCloseTo((point.y / ORBIT_FRAME.height) * 100, 1);
    }
  });

  it("passes the six gates in reading order, a full lap apart", () => {
    expect(BODY_STOPS[0]).toBe(0);
    for (let index = 1; index < BODY_STOPS.length; index++) {
      expect(BODY_STOPS[index]).toBeGreaterThan(BODY_STOPS[index - 1]);
    }
    /* Opposite gates are half a lap apart. */
    expect(BODY_STOPS[3]).toBeCloseTo(0.5, 3);
    const start = pointAt(BODY_TRACE, 0);
    const end = pointAt(BODY_TRACE, 1);
    expect(end.x).toBeCloseTo(start.x, 6);
    expect(end.y).toBeCloseTo(start.y, 6);
  });

  it("leads the eye clockwise from the top left", () => {
    const centre = { x: ORBIT_FRAME.width / 2, y: ORBIT_FRAME.height / 2 };
    const first = statementPoint(0);
    expect(first.x).toBeLessThan(centre.x);
    expect(first.y).toBeLessThan(centre.y);
    /* On screen, y grows downward: a positive cross product is a clockwise turn. */
    for (let index = 0; index < 6; index++) {
      const a = statementPoint(index);
      const b = statementPoint((index + 1) % 6);
      const turn = (a.x - centre.x) * (b.y - centre.y) - (a.y - centre.y) * (b.x - centre.x);
      expect(turn).toBeGreaterThan(0);
    }
    /* The body sets off beside the first statement and moves toward the second. */
    const start = pointAt(BODY_TRACE, 0);
    const soon = pointAt(BODY_TRACE, 0.05);
    expect(start.x).toBeLessThan(centre.x);
    expect(start.y).toBeLessThan(centre.y);
    expect(soon.x).toBeGreaterThan(start.x);
  });

  it("opens the orbit where a statement stands", () => {
    const whole = statementOrbitArt([]);
    const point = statementPoint(0);
    const broken = statementOrbitArt([
      { x: point.x - 120, y: point.y - 30, width: 240, height: 60 },
    ]);
    expect(whole.orbit.match(/M/g)).toHaveLength(1);
    expect(broken.orbit.length).toBeLessThan(whole.orbit.length);
    expect(broken.minorTicks.length).toBeLessThan(whole.minorTicks.length);
    expect(whole.majorTicks.match(/M/g)).toHaveLength(6);
  });
});
