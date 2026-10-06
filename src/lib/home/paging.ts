export interface HomeScreenBox {
  top: number;
  height: number;
}

/** Long mobile screens get extra stops so pagination never hides their content. */
export function homeScrollStops(screens: readonly HomeScreenBox[], viewport: number, max: number) {
  const stops = new Set<number>();
  for (const screen of screens) {
    stops.add(Math.min(screen.top, max));
    const end = Math.min(screen.top + screen.height - viewport, max);
    // A few pixels of padding overflow do not deserve a separate reading stop.
    for (let y = screen.top; end - screen.top > 48 && y < end; ) {
      y = Math.min(y + viewport * 0.8, end);
      stops.add(y);
    }
  }
  return [...stops].sort((a, b) => a - b);
}

export function nextHomeStop(stops: readonly number[], position: number, direction: number) {
  return direction > 0
    ? (stops.find((stop) => stop > position + 2) ?? stops.at(-1) ?? 0)
    : ([...stops].reverse().find((stop) => stop < position - 2) ?? stops[0] ?? 0);
}

/** A trackpad's momentum belongs to the gesture that started it. */
export class HomeWheelGesture {
  private lastEvent = Number.NEGATIVE_INFINITY;
  private lastSwitch = Number.NEGATIVE_INFINITY;
  private total = 0;
  private consumed = false;

  consume(delta: number, time: number): number {
    if (time - this.lastEvent > 160 && time - this.lastSwitch > 450) {
      this.consumed = false;
      this.total = 0;
    }
    this.lastEvent = time;
    if (this.consumed) return 0;
    if (Math.sign(delta) !== Math.sign(this.total)) this.total = 0;
    this.total += delta;
    if (Math.abs(this.total) < 8) return 0;
    this.consumed = true;
    this.lastSwitch = time;
    return Math.sign(this.total);
  }
}
