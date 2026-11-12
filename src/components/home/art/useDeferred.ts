import { useEffect, useState } from "react";

/**
 * A value that is expensive to build and not needed for the first paint:
 * `null` until the browser has a quiet moment, then the built value.
 *
 * The drawings behind the lower screens are generated on the client. Building
 * them while the page first renders would hold up the hero for screens the
 * reader has not reached, so they wait their turn.
 */
export function useDeferred<T>(build: () => T): T | null {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    const run = () => setValue(build());
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(run, { timeout: 1200 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = window.setTimeout(run, 200);
    return () => window.clearTimeout(handle);
  }, [build]);
  return value;
}
