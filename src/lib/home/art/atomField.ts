import {
  bucketByOpacity,
  circlePath,
  clamp,
  type OpacityPath,
  seededRandom,
  segmentPath,
  smoothstep,
} from "./numeric";

/** The strip the field is drawn in: the lower part of a 1440 × 900 screen. */
const ATOM_FIELD_FRAME = { width: 1440, height: 340 } as const;

export interface AtomFieldArt {
  readonly width: number;
  readonly height: number;
  readonly bonds: readonly OpacityPath[];
  readonly atoms: readonly OpacityPath[];
}

interface Atom {
  /** Position in the plane, before perspective. */
  readonly px: number;
  readonly py: number;
  /** Position in the frame. */
  readonly x: number;
  readonly y: number;
  readonly scale: number;
}

const SPACING = 54;
const BOND_REACH = SPACING * 1.42;
const TILT = (63 * Math.PI) / 180;
const DISTANCE = 1300;
/** Where the frame's top edge sat on the 900-tall screen the field was designed on. */
const TOP = 560;

interface Placed {
  readonly x: number;
  readonly y: number;
}

/**
 * Points scattered over the plane with a minimum spacing, by rejection
 * sampling — how a liquid looks: no lattice, no overlaps. A spatial hash keeps
 * the placement linear rather than quadratic in the number of atoms.
 */
function scatter(random: () => number): Placed[] {
  const cells = new Map<string, Placed[]>();
  const placed: Placed[] = [];
  const crowded = (x: number, y: number, cx: number, cy: number) => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (const other of cells.get(`${cx + dx},${cy + dy}`) ?? []) {
          if ((other.x - x) ** 2 + (other.y - y) ** 2 <= SPACING * SPACING) return true;
        }
      }
    }
    return false;
  };

  for (let attempt = 0; attempt < 9000; attempt++) {
    const x = -2100 + random() * 4200;
    const y = -260 + random() * 1500;
    const cx = Math.floor(x / SPACING);
    const cy = Math.floor(y / SPACING);
    if (crowded(x, y, cx, cy)) continue;
    const atom = { x, y };
    placed.push(atom);
    const key = `${cx},${cy}`;
    const cell = cells.get(key);
    if (cell) cell.push(atom);
    else cells.set(key, [atom]);
  }
  return placed;
}

/** The scattered points through the camera, keeping those that land in the frame. */
function projectAtoms(placed: readonly Placed[]): Atom[] {
  const { width, height } = ATOM_FIELD_FRAME;
  const atoms: Atom[] = [];
  for (const point of placed) {
    const depth = point.y * Math.sin(TILT);
    const scale = DISTANCE / (DISTANCE + depth);
    const x = 720 + point.x * scale;
    const y = 742 - point.y * Math.cos(TILT) * scale - TOP;
    if (x > -60 && x < width + 60 && y > 0 && y < height + 40) {
      atoms.push({ px: point.x, py: point.y, x, y, scale });
    }
  }
  return atoms;
}

/* Nearer is brighter, and the far edge dissolves instead of ending on a line. */
const fade = (y: number) => smoothstep(36, 240, y) * (0.4 + 0.6 * clamp((y - 40) / 300));

/** A bond between every pair of atoms that sit close enough in the plane. */
function bondPaths(atoms: readonly Atom[]): OpacityPath[] {
  const bonds: OpacityPath[] = [];
  for (const [index, a] of atoms.entries()) {
    for (let other = index + 1; other < atoms.length; other++) {
      const b = atoms[other];
      if (!b) continue;
      if ((a.px - b.px) ** 2 + (a.py - b.py) ** 2 < BOND_REACH * BOND_REACH) {
        bonds.push({ d: segmentPath(a.x, a.y, b.x, b.y), opacity: (fade(a.y) + fade(b.y)) / 2 });
      }
    }
  }
  return bonds;
}

/**
 * A disordered sheet of atoms in perspective — the ground the application lines
 * stand on. Eight tools, one system: the tools are named above it, and each
 * line comes down into the same material.
 */
export function atomField(seed = 41): AtomFieldArt {
  const atoms = projectAtoms(scatter(seededRandom(seed)));
  return {
    ...ATOM_FIELD_FRAME,
    bonds: bucketByOpacity(bondPaths(atoms), 7, 0.5),
    atoms: bucketByOpacity(
      atoms.map((atom) => ({
        d: circlePath(atom.x, atom.y, 1.9 * atom.scale),
        opacity: fade(atom.y),
      })),
      7,
      0.8,
    ),
  };
}
