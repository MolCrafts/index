import { describe, expect, it } from "@rstest/core";
import {
  HERO_LATTICE,
  honeycomb,
  LATTICE_CELLS,
  latticeSites,
  SUPPORT_LATTICE,
} from "@/lib/home/art/lattice";

describe("honeycomb", () => {
  const hero = honeycomb(HERO_LATTICE);

  it("is the same picture on every call", () => {
    expect(honeycomb(HERO_LATTICE)).toEqual(hero);
  });

  it("draws bonds, atoms and the lit walks", () => {
    expect(hero.bonds.length).toBeGreaterThan(0);
    expect(hero.atoms.length).toBeGreaterThan(0);
    expect(hero.walks.length).toBeGreaterThan(2);
    for (const layer of [...hero.bonds, ...hero.atoms, ...hero.litBonds]) {
      expect(layer.opacity).toBeGreaterThan(0);
      expect(layer.opacity).toBeLessThanOrEqual(1);
      expect(layer.d.startsWith("M")).toBe(true);
    }
  });

  it("keeps every walk on neighbouring sites within the frame's bleed", () => {
    for (const walk of hero.walks) {
      expect(walk.length).toBeGreaterThan(1);
      for (const [index, point] of walk.entries()) {
        expect(point.x).toBeGreaterThan(-80);
        expect(point.x).toBeLessThan(1440 + 80);
        const next = walk[index + 1];
        /* One bond in perspective: never further than a few lattice constants. */
        if (next) expect(Math.hypot(next.x - point.x, next.y - point.y)).toBeLessThan(160);
      }
    }
  });

  it("sends every signal toward what its screen is about", () => {
    for (const spec of [HERO_LATTICE, SUPPORT_LATTICE]) {
      const away = (point: { x: number; y: number }) =>
        Math.hypot(point.x - spec.focus.x, point.y - spec.focus.y);
      for (const walk of honeycomb(spec).walks) {
        const first = walk[0];
        const last = walk[walk.length - 1];
        if (!first || !last) throw new Error("expected a walk with two ends");
        expect(away(last)).toBeLessThanOrEqual(away(first));
      }
    }
  });

  it("lays out every cell the frame can show", () => {
    const wider = { i: [-70, 70], j: [-70, 70] } as const;
    for (const spec of [HERO_LATTICE, SUPPORT_LATTICE]) {
      expect(latticeSites(spec, LATTICE_CELLS).size).toBe(latticeSites(spec, wider).size);
    }
  });

  it("clears the wordmark on the hero and the copy on the support band", () => {
    for (const walk of hero.walks) {
      for (const point of walk) expect(Math.abs(point.x - 720)).toBeGreaterThan(110);
    }
    const support = honeycomb(SUPPORT_LATTICE);
    for (const walk of support.walks) {
      for (const point of walk) expect(point.x).toBeGreaterThan(560);
    }
  });
});
