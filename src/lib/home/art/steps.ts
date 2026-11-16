import type { ThreadPoint } from "../thread";
import { buildTrace, type Trace } from "./trace";

/** One row of a stepped list, measured: its left edge, top and bottom. */
export interface StepRow {
  readonly left: number;
  readonly top: number;
  readonly bottom: number;
}

export interface SteppedLine {
  readonly trace: Trace;
  /** The corners where the line turns, plus its two ends. */
  readonly corners: readonly ThreadPoint[];
  /** Where the line runs down each row's edge, as a fraction of its length. */
  readonly stops: readonly number[];
}

/**
 * One line down a staircase of rows: down the first row's left edge, along its
 * foot to the next row's edge, down again — the three depths of working with
 * MolCrafts as one continuous descent.
 */
export function steppedLine(rows: readonly StepRow[]): SteppedLine | null {
  if (rows.length === 0) return null;
  const points: ThreadPoint[] = [];
  for (const [index, row] of rows.entries()) {
    const previous = rows[index - 1];
    points.push({ x: row.left, y: previous ? previous.bottom : row.top });
    points.push({ x: row.left, y: row.bottom });
  }
  const trace = buildTrace(points);
  const stops = rows.map((_, index) => {
    const from = trace.cumulative[index * 2] ?? 0;
    const to = trace.cumulative[index * 2 + 1] ?? from;
    return trace.length === 0 ? 0 : (from + to) / 2 / trace.length;
  });
  const last = points[points.length - 1];
  const corners = [...points.filter((_, index) => index % 2 === 0), ...(last ? [last] : [])];
  return { trace, corners, stops };
}
