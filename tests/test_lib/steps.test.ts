import { describe, expect, it } from "@rstest/core";
import { steppedLine } from "@/lib/home/art/steps";

describe("steppedLine", () => {
  const rows = [
    { left: 0, top: 0, bottom: 100 },
    { left: 160, top: 100, bottom: 200 },
    { left: 320, top: 200, bottom: 300 },
  ];

  it("descends each row's edge and steps across at its foot", () => {
    const line = steppedLine(rows);
    expect(line?.trace.points).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 100 },
      { x: 160, y: 100 },
      { x: 160, y: 200 },
      { x: 320, y: 200 },
      { x: 320, y: 300 },
    ]);
    expect(line?.trace.length).toBe(620);
  });

  it("marks the corners and the midpoint of every descent", () => {
    const line = steppedLine(rows);
    expect(line?.corners).toEqual([
      { x: 0, y: 0 },
      { x: 160, y: 100 },
      { x: 320, y: 200 },
      { x: 320, y: 300 },
    ]);
    expect(line?.stops[0]).toBeCloseTo(50 / 620, 6);
    expect(line?.stops[1]).toBeCloseTo(310 / 620, 6);
    expect(line?.stops[2]).toBeCloseTo(570 / 620, 6);
  });

  it("has nothing to draw without rows", () => {
    expect(steppedLine([])).toBeNull();
  });
});
