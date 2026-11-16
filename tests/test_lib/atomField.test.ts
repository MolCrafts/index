import { describe, expect, it } from "@rstest/core";
import { atomField } from "@/lib/home/art/atomField";

/** Every `M x y` a layer's path starts a mark at. */
const starts = (d: string) =>
  [...d.matchAll(/M(-?[\d.]+) (-?[\d.]+)/g)].map((match) => ({
    x: Number(match[1]),
    y: Number(match[2]),
  }));

describe("atomField", () => {
  const art = atomField();

  it("is the same field every time for the same seed", () => {
    expect(atomField()).toEqual(art);
    expect(atomField(7)).not.toEqual(art);
  });

  it("fills the strip with atoms and bonds between them", () => {
    const atoms = art.atoms.flatMap((layer) => starts(layer.d));
    const bonds = art.bonds.flatMap((layer) => starts(layer.d));
    expect(atoms.length).toBeGreaterThan(100);
    expect(bonds.length).toBeGreaterThan(atoms.length / 2);
    for (const atom of atoms) {
      expect(atom.x).toBeGreaterThan(-80);
      expect(atom.x).toBeLessThan(art.width + 80);
      expect(atom.y).toBeGreaterThan(-10);
      expect(atom.y).toBeLessThan(art.height + 60);
    }
  });

  it("draws nothing invisible and nothing malformed", () => {
    for (const layer of [...art.atoms, ...art.bonds]) {
      expect(layer.opacity).toBeGreaterThan(0);
      expect(layer.opacity).toBeLessThanOrEqual(1);
      expect(layer.d).not.toMatch(/NaN|undefined|Infinity/);
    }
  });
});
