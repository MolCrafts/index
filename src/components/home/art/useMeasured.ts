import { type RefObject, useLayoutEffect, useRef, useState } from "react";

interface MeasureOptions {
  /** Which descendants to hand to `read` and watch; the direct children when omitted. */
  selector?: string;
  /** Changes when the watched parts are replaced, so they are found and watched again. */
  key?: unknown;
}

/**
 * A layout measurement, as state: `read` runs once the element is laid out and
 * again whenever it or one of its parts changes size.
 *
 * The parts are looked up on every measurement rather than once: a language
 * switch replaces a list's items in place, and a measurement taken from the
 * old nodes reads zero.
 */
export function useMeasured<T>(
  ref: RefObject<HTMLElement | null>,
  read: (root: HTMLElement, parts: readonly HTMLElement[]) => T | null,
  initial: T,
  { selector, key }: MeasureOptions = {},
): T {
  const [value, setValue] = useState(initial);
  const reader = useRef(read);
  useLayoutEffect(() => {
    reader.current = read;
  });

  /* `key` is not read below: it is the signal to look the parts up again. */
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const parts = () =>
      Array.from(selector ? root.querySelectorAll<HTMLElement>(selector) : root.children).filter(
        (part): part is HTMLElement => part instanceof HTMLElement,
      );
    const measure = () => {
      const next = reader.current(root, parts());
      if (next !== null) setValue(next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    for (const part of parts()) observer.observe(part);
    measure();
    return () => observer.disconnect();
  }, [ref, selector, key]);

  return value;
}
