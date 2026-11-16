import {
  cancelFrame,
  frame,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState } from "react";
import { stationAt } from "@/lib/home/art/loop";

/** Longest frame the clock will count, so a backgrounded tab does not jump the light. */
const MAX_FRAME_MS = 100;

/**
 * A slow, repeating clock: 0 → 1 over `seconds`, then again.
 *
 * Every travelling light on the homepage reads one of these, so the light, its
 * trail and the labels it wakes share a single timeline and cannot drift apart.
 * It holds its place while `running` is false — off-screen, or for a reader who
 * asked for less motion — and picks up where it stopped. A stopped clock asks
 * for no frames at all: the page's frame loop is left to go idle.
 */
export function useLoop(seconds: number, running: boolean): MotionValue<number> {
  const progress = useMotionValue(0);
  useEffect(() => {
    if (!running) return;
    const tick = ({ delta }: { delta: number }) => {
      progress.set((progress.get() + Math.min(delta, MAX_FRAME_MS) / (seconds * 1000)) % 1);
    };
    frame.update(tick, true);
    return () => cancelFrame(tick);
  }, [progress, running, seconds]);
  return progress;
}

/**
 * The stop a light is passing, as React state.
 *
 * It changes a handful of times per lap, so the labels can answer with a CSS
 * transition instead of being driven frame by frame.
 */
export function useStation(
  head: MotionValue<number>,
  stops: readonly number[],
  halfWindow: number,
  wraps = false,
): number {
  const [station, setStation] = useState(-1);
  useMotionValueEvent(head, "change", (value) => {
    const next = stationAt(wraps ? value % 1 : value, stops, halfWindow, wraps);
    setStation((current) => (current === next ? current : next));
  });
  return station;
}
