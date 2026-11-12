import { describe, expect, it } from "@rstest/core";
import { CONTINUITY_STATIONS, CONTINUITY_STOPS, CONTINUITY_TRACE } from "@/lib/home/art/continuity";
import { foundationArt } from "@/lib/home/art/foundation";
import { pointAt } from "@/lib/home/art/trace";

describe("foundationArt", () => {
  /* Three markers on the circle of radius 500 around (-300, 400). */
  const markers = [
    { x: 100, y: 100 },
    { x: 200, y: 400 },
    { x: 100, y: 700 },
  ];

  it("runs the arc through all three markers, in order", () => {
    const art = foundationArt(markers, true);
    expect(art).not.toBeNull();
    if (!art) return;
    expect(art.stops[0]).toBeLessThan(art.stops[1] ?? 0);
    expect(art.stops[1]).toBeLessThan(art.stops[2] ?? 0);
    for (const [index, stop] of art.stops.entries()) {
      const point = pointAt(art.trace, stop);
      expect(point.x).toBeCloseTo(markers[index]?.x ?? 0, 0);
      expect(point.y).toBeCloseTo(markers[index]?.y ?? 0, 0);
    }
  });

  it("lights the arc between the outer markers and fades it past them", () => {
    const art = foundationArt(markers, true);
    if (!art) throw new Error("expected an arc");
    expect(art.startY).toBeLessThan(markers[0]?.y ?? 0);
    expect(art.endY).toBeGreaterThan(markers[2]?.y ?? 0);
    expect(art.litFrom).toBeGreaterThan(0);
    expect(art.litTo).toBeLessThan(1);
    expect(art.litFrom).toBeLessThan(art.litTo);
  });

  it("reaches further on a wide screen than on a narrow one", () => {
    const wide = foundationArt(markers, true);
    const narrow = foundationArt(markers, false);
    expect(wide?.trace.length ?? 0).toBeGreaterThan(narrow?.trace.length ?? 0);
  });

  it("draws nothing for markers on one line or a short list", () => {
    const column = [
      { x: 100, y: 100 },
      { x: 100, y: 400 },
      { x: 100, y: 700 },
    ];
    expect(foundationArt(column, true)).toBeNull();
    expect(foundationArt(markers.slice(0, 2), true)).toBeNull();
  });
});

describe("continuity stops", () => {
  it("places each station on the trajectory, left to right", () => {
    expect(CONTINUITY_STOPS).toHaveLength(3);
    expect(CONTINUITY_STOPS[0]).toBeLessThan(CONTINUITY_STOPS[1] ?? 0);
    expect(CONTINUITY_STOPS[1]).toBeLessThan(CONTINUITY_STOPS[2] ?? 0);
    for (const [index, stop] of CONTINUITY_STOPS.entries()) {
      const point = pointAt(CONTINUITY_TRACE, stop);
      const station = CONTINUITY_STATIONS[index];
      expect(Math.hypot(point.x - (station?.x ?? 0), point.y - (station?.y ?? 0))).toBeLessThan(2);
    }
  });
});
