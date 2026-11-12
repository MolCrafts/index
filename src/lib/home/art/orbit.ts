import { segmentPath } from "./numeric";
import {
  buildTrace,
  type Ellipse,
  ellipsePoints,
  fractionAtVertex,
  type Trace,
  tracePath,
} from "./trace";

/**
 * The AI screen's orbits, in the 16:10 frame the stage scales uniformly.
 *
 * The headline is the centre. Six statements sit on the outer orbit, sixty
 * degrees apart, in the order the eye takes a ring: from the top left, clockwise.
 * One body travels the inner orbit the same way and passes a gate facing each
 * statement in turn, so following it is reading the statements in order.
 */
export const ORBIT_FRAME = { width: 1440, height: 900 } as const;

const CENTRE = { cx: ORBIT_FRAME.width / 2, cy: ORBIT_FRAME.height / 2 } as const;

const STATEMENT_ORBIT: Ellipse = { ...CENTRE, rx: 452, ry: 292 };
const BODY_ORBIT: Ellipse = { ...CENTRE, rx: 310, ry: 180 };
const FIELD_ORBIT: Ellipse = { ...CENTRE, rx: 612, ry: 372 };

/** Where the first statement stands: the top left, where reading starts. */
const START_ANGLE = 120;
/**
 * Degrees, measured counter-clockwise from the right. They fall from one
 * statement to the next, which on screen is clockwise.
 */
const STATEMENT_ANGLES = [120, 60, 0, -60, -120, -180] as const;

/**
 * Where each statement is centred, as a share of the frame. Literal classes so
 * Tailwind's scanner sees them; `tests/test_lib/orbit.test.ts` keeps them on
 * the orbit.
 */
export const STATEMENT_POSITIONS = [
  "left-[34.31%] top-[21.9%]",
  "left-[65.69%] top-[21.9%]",
  "left-[81.39%] top-[50%]",
  "left-[65.69%] top-[78.1%]",
  "left-[34.31%] top-[78.1%]",
  "left-[18.61%] top-[50%]",
] as const;

/**
 * The body's lap: from the first statement's gate, clockwise, one vertex per
 * degree — so the degrees travelled to a gate are also its vertex index.
 */
export const BODY_TRACE: Trace = buildTrace(
  ellipsePoints(BODY_ORBIT, START_ANGLE, START_ANGLE - 360, 360),
);

/**
 * Where the body passes each statement's gate, as a fraction of the lap. By arc
 * length, not by angle: on an ellipse the two differ, and the body moves at a
 * constant speed.
 */
export const BODY_STOPS: readonly number[] = STATEMENT_ANGLES.map((angle) =>
  fractionAtVertex(BODY_TRACE, START_ANGLE - angle),
);

const radians = (degrees: number) => (degrees * Math.PI) / 180;

function pointOn(ellipse: Ellipse, degrees: number) {
  return {
    x: ellipse.cx + ellipse.rx * Math.cos(radians(degrees)),
    y: ellipse.cy - ellipse.ry * Math.sin(radians(degrees)),
  };
}

/** Outward unit normal of an ellipse, on screen. */
function normalOn(ellipse: Ellipse, degrees: number) {
  const nx = Math.cos(radians(degrees)) / ellipse.rx;
  const ny = -Math.sin(radians(degrees)) / ellipse.ry;
  const length = Math.hypot(nx, ny);
  return { x: nx / length, y: ny / length };
}

/** The centre of a statement, in frame units. */
export function statementPoint(index: number) {
  return pointOn(STATEMENT_ORBIT, STATEMENT_ANGLES[index] ?? 0);
}

/** A rectangle of the frame the orbit stays out of: a statement's own clearing. */
export interface Clearing {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

const inside = (x: number, y: number, clearing: Clearing) =>
  x > clearing.x &&
  x < clearing.x + clearing.width &&
  y > clearing.y &&
  y < clearing.y + clearing.height;

export const FIELD_PATH = tracePath(ellipsePoints(FIELD_ORBIT, 0, 360, 180), true);
export const BODY_PATH = tracePath(ellipsePoints(BODY_ORBIT, 0, 360, 180), true);

/** A short stroke across the inner orbit at each statement's angle. */
export const GATE_PATH = STATEMENT_ANGLES.map((angle) => {
  const point = pointOn(BODY_ORBIT, angle);
  const normal = normalOn(BODY_ORBIT, angle);
  return segmentPath(
    point.x - normal.x * 6,
    point.y - normal.y * 6,
    point.x + normal.x * 6,
    point.y + normal.y * 6,
  );
}).join("");

export interface StatementOrbitArt {
  readonly orbit: string;
  readonly minorTicks: string;
  readonly majorTicks: string;
}

/**
 * The outer orbit and its graduations, broken wherever a statement stands.
 *
 * The clearings are measured from the rendered statements, so a longer sentence
 * or another language opens a wider gap instead of running through the line.
 */
export function statementOrbitArt(clearings: readonly Clearing[]): StatementOrbitArt {
  const blocked = (x: number, y: number) => clearings.some((clearing) => inside(x, y, clearing));

  const runs: string[] = [];
  let run: { x: number; y: number }[] = [];
  const flush = () => {
    if (run.length > 1) runs.push(tracePath(run));
    run = [];
  };
  const step = 0.5;
  for (let angle = 0; angle < 360; angle += step) {
    const middle = pointOn(STATEMENT_ORBIT, angle + step / 2);
    if (blocked(middle.x, middle.y)) {
      flush();
      continue;
    }
    if (run.length === 0) run.push(pointOn(STATEMENT_ORBIT, angle));
    run.push(pointOn(STATEMENT_ORBIT, angle + step));
  }
  flush();

  const ticks = (from: number, every: number, length: number, skip: (angle: number) => boolean) => {
    const parts: string[] = [];
    for (let angle = from; angle < 360; angle += every) {
      if (skip(angle)) continue;
      const point = pointOn(STATEMENT_ORBIT, angle);
      if (blocked(point.x, point.y)) continue;
      const normal = normalOn(STATEMENT_ORBIT, angle);
      parts.push(
        segmentPath(
          point.x + normal.x * 5,
          point.y + normal.y * 5,
          point.x + normal.x * (5 + length),
          point.y + normal.y * (5 + length),
        ),
      );
    }
    return parts.join("");
  };

  return {
    orbit: runs.join(""),
    /* Fine graduations all the way round; a longer one midway between statements. */
    minorTicks: ticks(0, 2.5, 4, (angle) => angle % 30 === 0),
    majorTicks: ticks(30, 60, 10, () => false),
  };
}
