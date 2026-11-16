/**
 * The pace of every travelling light on the homepage.
 *
 * One breath is the period the block auras already fade on
 * (`home-aura-breathe` in `styles/tailwind.css`). A light spends about one
 * breath on each thing it passes, so the screens move at a resting pace and in
 * step with the light they sit in.
 */
export const BREATH_SECONDS = 8;

/**
 * Which stop the light is passing — the nearest one within `halfWindow` — or
 * -1 between stops.
 *
 * `progress` and `stops` are fractions of the line. `wraps` is for a closed
 * loop, where a stop at 0 is also reached from just under 1.
 */
export function stationAt(
  progress: number,
  stops: readonly number[],
  halfWindow: number,
  wraps = false,
): number {
  let nearest = -1;
  let reach = halfWindow;
  for (const [index, stop] of stops.entries()) {
    const direct = Math.abs(progress - stop);
    const distance = wraps ? Math.min(direct, 1 - direct) : direct;
    if (distance <= reach) {
      nearest = index;
      reach = distance;
    }
  }
  return nearest;
}
