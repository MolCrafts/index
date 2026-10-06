import { HomeWheelGesture, homeScrollStops, nextHomeStop } from "@/lib/home/paging";
import { describe, expect, it } from "@rstest/core";

describe("homepage pagination", () => {
  it("switches exactly one screen in either direction", () => {
    const stops = homeScrollStops(
      [
        { top: 0, height: 900 },
        { top: 900, height: 900 },
        { top: 1800, height: 900 },
      ],
      900,
      1800,
    );
    expect(stops).toEqual([0, 900, 1800]);
    expect(nextHomeStop(stops, 0, 1)).toBe(900);
    expect(nextHomeStop(stops, 1800, -1)).toBe(900);
    expect(nextHomeStop(stops, 1800, 1)).toBe(1800);
    expect(nextHomeStop(stops, 0, -1)).toBe(0);
  });

  it("keeps every part of a long phone screen and the footer reachable", () => {
    const stops = homeScrollStops(
      [
        { top: 0, height: 1500 },
        { top: 1500, height: 700 },
      ],
      600,
      1600,
    );
    expect(stops).toEqual([0, 480, 900, 1500, 1600]);
    expect(nextHomeStop(stops, 480, 1)).toBe(900);
  });

  it("does not add a near-identical stop for a small padding overflow", () => {
    expect(
      homeScrollStops(
        [
          { top: 0, height: 857 },
          { top: 857, height: 844 },
        ],
        844,
        857,
      ),
    ).toEqual([0, 857]);
  });

  it("absorbs a trackpad's whole momentum tail without skipping screens", () => {
    const gesture = new HomeWheelGesture();
    expect(gesture.consume(3, 0)).toBe(0);
    expect(gesture.consume(5, 30)).toBe(1);
    for (const time of [80, 180, 300, 450, 600, 750, 900])
      expect(gesture.consume(40, time)).toBe(0);
    expect(gesture.consume(-40, 1200)).toBe(-1);
  });

  it("does not accumulate opposite wheel movements or switch during cooldown", () => {
    const gesture = new HomeWheelGesture();
    expect(gesture.consume(3, 0)).toBe(0);
    expect(gesture.consume(-3, 20)).toBe(0);
    expect(gesture.consume(-5, 40)).toBe(-1);
    expect(gesture.consume(100, 350)).toBe(0);
    expect(gesture.consume(100, 600)).toBe(1);
  });

  it("responds to a light wheel gesture immediately", () => {
    expect(new HomeWheelGesture().consume(8, 0)).toBe(1);
  });

  it("joins the compact sponsor/footer band to the preceding screen", () => {
    const stops = homeScrollStops(
      [
        { top: 0, height: 900 },
        { top: 900, height: 900 },
        { top: 1800, height: 400 },
      ],
      900,
      1300,
    );
    expect(stops).toEqual([0, 900, 1300]);
    expect(nextHomeStop(stops, 900, 1)).toBe(1300);
  });
});
