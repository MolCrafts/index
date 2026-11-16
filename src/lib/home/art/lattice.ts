import type { ThreadPoint } from "../thread";
import {
  bucketByOpacity,
  circlePath,
  clamp,
  type OpacityPath,
  seededRandom,
  segmentPath,
  smoothstep,
} from "./numeric";

/** The frame every lattice is drawn in; the SVG scales it to its screen. */
export const LATTICE_FRAME = { width: 1440, height: 900 } as const;

export interface LatticeSpec {
  /** Bond length, before perspective. */
  readonly bond: number;
  /** Degrees the sheet is tipped away from the viewer. */
  readonly tilt: number;
  /** Degrees the sheet is turned in its own plane. */
  readonly turn: number;
  /** Viewing distance: smaller is a steeper perspective. */
  readonly distance: number;
  readonly cx: number;
  readonly cy: number;
  readonly seed: number;
  readonly walks: number;
  /** Brightness of the sheet at a point of the frame, 0–1. */
  readonly fade: (x: number, y: number) => number;
  /** Whether a lit walk may start at this point. */
  readonly admits: (x: number, y: number) => boolean;
  /**
   * What the screen is about, as a point of the frame. Every lit walk is laid
   * out to end nearer to it than it starts, so a signal travelling a walk
   * carries the eye toward the content rather than away from it.
   */
  readonly focus: ThreadPoint;
}

export interface LatticeArt {
  readonly bonds: readonly OpacityPath[];
  readonly atoms: readonly OpacityPath[];
  readonly litBonds: readonly OpacityPath[];
  readonly litRings: readonly OpacityPath[];
  readonly litAtoms: readonly OpacityPath[];
  /** The lit walks, site by site: the lines a signal travels. */
  readonly walks: readonly (readonly ThreadPoint[])[];
}

export interface Site {
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly opacity: number;
}

export type Sites = ReadonlyMap<string, Site>;

interface Bonding {
  /** Every bond once, as a pair of site keys. */
  readonly pairs: readonly (readonly [string, string])[];
  readonly neighbours: ReadonlyMap<string, readonly string[]>;
}

interface Walks {
  readonly sites: ReadonlySet<string>;
  readonly bonds: ReadonlySet<string>;
  readonly trails: readonly (readonly string[])[];
}

const { width: W, height: H } = LATTICE_FRAME;

/** The hero's sheet: open around the wordmark, brightest toward the lower edge. */
export const HERO_LATTICE: LatticeSpec = {
  bond: 50,
  tilt: 58,
  turn: 15,
  distance: 1500,
  cx: 720,
  cy: 505,
  seed: 11,
  walks: 7,
  fade: (x, y) => {
    const e = ((x - 720) / 660) ** 2 + ((y - 425) / 335) ** 2;
    return smoothstep(0.62, 1.75, e) * (0.3 + 0.7 * clamp(y / H)) * smoothstep(40, 150, y);
  },
  admits: (x, y) => x > 40 && x < W - 40 && y > 110 && y < H - 30 && Math.abs(x - 720) > 110,
  /* The wordmark. */
  focus: { x: 720, y: 400 },
};

/** The support band's sheet: the same lattice, kept to the right of the credit. */
export const SUPPORT_LATTICE: LatticeSpec = {
  ...HERO_LATTICE,
  seed: 23,
  walks: 3,
  fade: (x, y) => {
    if (x < 560) return 0;
    const reach = ((x - 520) / 900) * 0.9 + ((y - 250) / 520) * 0.35;
    return smoothstep(0.25, 1.1, reach) * smoothstep(770, 700, y) * smoothstep(80, 190, y) * 0.62;
  },
  admits: (x, y) => x > 600 && x < W - 40 && y > 110 && y < H - 30,
  /* The credit, to the left of the sheet. */
  focus: { x: 300, y: 420 },
};

/**
 * The cells laid out before projection. Through the camera both sheets share,
 * the frame shows cells -37…17 along one axis and -10…45 along the other;
 * `tests/test_lib/lattice.test.ts` checks that a wider range adds nothing.
 */
export interface CellRange {
  readonly i: readonly [number, number];
  readonly j: readonly [number, number];
}

export const LATTICE_CELLS: CellRange = { i: [-38, 18], j: [-11, 46] };
const ROOT3 = Math.sqrt(3);
const radians = (degrees: number) => (degrees * Math.PI) / 180;
const bondKey = (a: string, b: string) => [a, b].sort().join("|");

/**
 * The spec's camera: takes a point of the sheet to a site of the frame, or to
 * `null` when it lands behind the viewer or off the frame.
 */
function camera(spec: LatticeSpec): (x: number, y: number) => Site | null {
  const cosTurn = Math.cos(radians(spec.turn));
  const sinTurn = Math.sin(radians(spec.turn));
  const cosTilt = Math.cos(radians(spec.tilt));
  const sinTilt = Math.sin(radians(spec.tilt));
  return (x, y) => {
    const xr = x * cosTurn - y * sinTurn;
    const yr = x * sinTurn + y * cosTurn;
    const depth = yr * sinTilt;
    if (spec.distance + depth < spec.distance * 0.25) return null;
    const scale = spec.distance / (spec.distance + depth);
    const px = spec.cx + xr * scale;
    const py = spec.cy - yr * cosTilt * scale;
    if (px < -80 || px > W + 80 || py < -80 || py > H + 80) return null;
    return { x: px, y: py, scale, opacity: spec.fade(px, py) };
  };
}

/** The sheet's sites that fall in the frame: two per cell, keyed `A i,j` / `B i,j`. */
export function latticeSites(spec: LatticeSpec, cells: CellRange = LATTICE_CELLS): Sites {
  const sites = new Map<string, Site>();
  const project = camera(spec);
  const place = (key: string, x: number, y: number) => {
    const site = project(x, y);
    if (site) sites.set(key, site);
  };
  for (let i = cells.i[0]; i <= cells.i[1]; i++) {
    for (let j = cells.j[0]; j <= cells.j[1]; j++) {
      const x = i * ROOT3 * spec.bond + j * (ROOT3 / 2) * spec.bond;
      const y = j * 1.5 * spec.bond;
      place(`A${i},${j}`, x, y);
      place(`B${i},${j}`, x, y + spec.bond);
    }
  }
  return sites;
}

/** Each A site bonds to the three B sites around it. */
function latticeBonds(sites: Sites): Bonding {
  const pairs: [string, string][] = [];
  const neighbours = new Map<string, string[]>();
  const join = (from: string, to: string) => {
    const list = neighbours.get(from);
    if (list) list.push(to);
    else neighbours.set(from, [to]);
  };
  for (const key of sites.keys()) {
    if (!key.startsWith("A")) continue;
    const [i = 0, j = 0] = key.slice(1).split(",").map(Number);
    for (const other of [`B${i},${j}`, `B${i},${j - 1}`, `B${i + 1},${j - 1}`]) {
      if (!sites.has(other)) continue;
      pairs.push([key, other]);
      join(key, other);
      join(other, key);
    }
  }
  return { pairs, neighbours };
}

/** A few short self-avoiding walks along the bonds, from bright starting sites. */
function litWalks(spec: LatticeSpec, sites: Sites, bonding: Bonding): Walks {
  const random = seededRandom(spec.seed);
  const starts = [...sites.entries()]
    .filter(([, site]) => site.opacity > 0.55 && spec.admits(site.x, site.y))
    .map(([key]) => key);
  const lit = new Set<string>();
  const bonds = new Set<string>();
  const trails: string[][] = [];

  for (let walk = 0; walk < spec.walks; walk++) {
    let current = starts[Math.floor(random() * starts.length)];
    if (!current) break;
    lit.add(current);
    const trail = [current];
    const steps = 3 + Math.floor(random() * 4);
    for (let step = 0; step < steps; step++) {
      const options = (bonding.neighbours.get(current) ?? []).filter(
        (key) => !lit.has(key) && (sites.get(key)?.opacity ?? 0) > 0.3,
      );
      /* Checked before drawing: a dead end must not use up a random number. */
      if (options.length === 0) break;
      const next = options[Math.floor(random() * options.length)];
      if (!next) break;
      bonds.add(bondKey(current, next));
      lit.add(next);
      trail.push(next);
      current = next;
    }
    if (trail.length > 1) trails.push(trail);
  }
  return { sites: lit, bonds, trails };
}

/** The bonds as paths, split into the plain sheet and the lit walks. */
function bondLayers(sites: Sites, bonding: Bonding, walks: Walks) {
  const plain: OpacityPath[] = [];
  const bright: OpacityPath[] = [];
  for (const [a, b] of bonding.pairs) {
    const p = sites.get(a);
    const q = sites.get(b);
    if (!p || !q) continue;
    const item = { d: segmentPath(p.x, p.y, q.x, q.y), opacity: (p.opacity + q.opacity) / 2 };
    (walks.bonds.has(bondKey(a, b)) ? bright : plain).push(item);
  }
  return { plain, bright };
}

/** The sites as dots; a lit site is larger and carries a ring. */
function atomLayers(sites: Sites, walks: Walks) {
  const atoms: OpacityPath[] = [];
  const litAtoms: OpacityPath[] = [];
  const litRings: OpacityPath[] = [];
  for (const [key, site] of sites) {
    if (walks.sites.has(key)) {
      litAtoms.push({ d: circlePath(site.x, site.y, 2.6 * site.scale), opacity: site.opacity });
      litRings.push({ d: circlePath(site.x, site.y, 6.5 * site.scale), opacity: site.opacity });
    } else {
      atoms.push({ d: circlePath(site.x, site.y, 1.7 * site.scale), opacity: site.opacity });
    }
  }
  return { atoms, litAtoms, litRings };
}

/** A walk, turned if need be so that it ends nearer `focus` than it starts. */
function toward(focus: ThreadPoint, walk: readonly ThreadPoint[]): readonly ThreadPoint[] {
  const first = walk[0];
  const last = walk[walk.length - 1];
  if (!first || !last) return walk;
  const distance = (point: ThreadPoint) => Math.hypot(point.x - focus.x, point.y - focus.y);
  return distance(last) <= distance(first) ? walk : [...walk].reverse();
}

/**
 * A honeycomb sheet in perspective, with a few short walks lit along its bonds.
 *
 * It is a real lattice rather than a texture: two sites per cell, three bonds
 * per site, projected through one camera. The lit walks follow actual bonds, so
 * a signal sent along one never leaves the structure.
 */
export function honeycomb(spec: LatticeSpec): LatticeArt {
  const sites = latticeSites(spec);
  const bonding = latticeBonds(sites);
  const walks = litWalks(spec, sites, bonding);
  const { plain, bright } = bondLayers(sites, bonding, walks);
  const { atoms, litAtoms, litRings } = atomLayers(sites, walks);

  return {
    bonds: bucketByOpacity(plain, 7, 0.5),
    atoms: bucketByOpacity(atoms, 7, 0.75),
    litBonds: bucketByOpacity(bright, 5, 0.85),
    litRings: bucketByOpacity(litRings, 5, 0.6),
    litAtoms: bucketByOpacity(litAtoms, 5, 1),
    walks: walks.trails.map((trail) =>
      toward(
        spec.focus,
        trail.flatMap((key) => {
          const site = sites.get(key);
          return site ? [{ x: site.x, y: site.y }] : [];
        }),
      ),
    ),
  };
}
