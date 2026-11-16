import { LANDSCAPE_FRAME } from "./landscape";
import { CONTINUITY_LEGS, CONTINUITY_MINIMA, CONTINUITY_SADDLES } from "./landscapePath";
import { buildTrace, nearestFraction, type Trace } from "./trace";

const toPoint = ([x, y]: readonly [number, number]) => ({ x, y });

/** The whole trajectory as one line: the legs joined, shared ends counted once. */
const PATH_POINTS = CONTINUITY_LEGS.flatMap((leg, index) =>
  (index === 0 ? leg : leg.slice(1)).map(toPoint),
);

export const CONTINUITY_TRACE: Trace = buildTrace(PATH_POINTS);
export const CONTINUITY_STATIONS = CONTINUITY_MINIMA.map(toPoint);
/** Only the passes on screen: the outer two legs cross theirs near the edges. */
export const CONTINUITY_PASSES = CONTINUITY_SADDLES.map(toPoint).filter(
  (point) => point.x > 0 && point.x < LANDSCAPE_FRAME.width,
);
/** Where each station sits along the trajectory, as a fraction of its length. */
export const CONTINUITY_STOPS: readonly number[] = CONTINUITY_STATIONS.map((station) =>
  nearestFraction(CONTINUITY_TRACE, station),
);
