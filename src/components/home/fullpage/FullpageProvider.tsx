import {
  HOME_FLIP_LOCK_MS,
  HOME_FLIP_MS,
  HOME_GESTURE_IDLE_MS,
  HOME_WHEEL_THRESHOLD,
  easeHomeFlip,
  prefersReducedMotion,
} from "@/lib/animations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface FullpageContextValue {
  activeIndex: number;
  arrivingId: string | null;
  sectionIds: readonly string[];
  goTo: (index: number, align?: "start" | "end") => void;
  goNext: () => void;
  goPrev: () => void;
  registerSection: (id: string, el: HTMLElement | null) => void;
  registerTrack: (el: HTMLDivElement | null) => void;
}

const FullpageContext = createContext<FullpageContextValue | null>(null);

export function useFullpage() {
  const ctx = useContext(FullpageContext);
  if (!ctx) {
    throw new Error("useFullpage must be used within FullpageProvider");
  }
  return ctx;
}

interface FullpageProviderProps {
  sectionIds: readonly string[];
  children: ReactNode;
  className?: string;
}

const WHEEL_THRESHOLD = HOME_WHEEL_THRESHOLD;
const SMOOTH_MS = HOME_FLIP_MS;
const POST_GLIDE_LOCK_MS = HOME_FLIP_LOCK_MS;
const GESTURE_IDLE_MS = HOME_GESTURE_IDLE_MS;
const SECTION_EDGE_PX = 4;

type ScrollDirection = -1 | 0 | 1;

function sectionRange(el: HTMLElement, viewH: number): { top: number; max: number } {
  const top = el.offsetTop;
  const max = Math.max(top, top + el.offsetHeight - viewH);
  return { top, max };
}

function clampOffset(value: number, top: number, max: number): number {
  return Math.min(max, Math.max(top, value));
}

export function FullpageProvider({ sectionIds, children, className }: FullpageProviderProps) {
  const { locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionMapRef = useRef<Map<string, HTMLElement>>(new Map());
  const [activeIndex, setActiveIndex] = useState(0);
  const [arrivingId, setArrivingId] = useState<string | null>(null);
  const [paging, setPaging] = useState(false);
  const activeIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const pageLockedRef = useRef(false);
  const unlockTimerRef = useRef(0);
  const accRef = useRef(0);
  const reducedRef = useRef(prefersReducedMotion());
  const rafRef = useRef(0);
  const didIntraRef = useRef(false);
  const offsetRef = useRef(0);
  const motionRef = useRef({ from: 0, dist: 0, start: 0, running: false });
  const lastWheelRef = useRef(0);
  const lockDirectionRef = useRef<ScrollDirection>(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const syncView = () => {
      root.style.setProperty("--home-view", `${root.clientHeight}px`);
    };
    syncView();
    const ro = new ResizeObserver(syncView);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedRef.current = prefersReducedMotion();
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    if (el) sectionMapRef.current.set(id, el);
    else sectionMapRef.current.delete(id);
  }, []);

  const registerTrack = useCallback((el: HTMLDivElement | null) => {
    trackRef.current = el;
  }, []);

  const getSectionEl = useCallback(
    (index: number) => {
      const id = sectionIds[index];
      if (!id) return null;
      return sectionMapRef.current.get(id) ?? null;
    },
    [sectionIds],
  );

  const viewH = useCallback(() => containerRef.current?.clientHeight ?? 0, []);

  const paint = useCallback((y: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(0, ${-y}px, 0)`;
  }, []);

  const currentOffset = useCallback(() => {
    const motion = motionRef.current;
    if (!motion.running) return offsetRef.current;
    const t = Math.min(1, (performance.now() - motion.start) / SMOOTH_MS);
    return motion.from + motion.dist * easeHomeFlip(t);
  }, []);

  const releasePageLock = useCallback(() => {
    const tryUnlock = () => {
      const quiet = performance.now() - lastWheelRef.current;
      if (quiet < GESTURE_IDLE_MS) {
        unlockTimerRef.current = window.setTimeout(tryUnlock, GESTURE_IDLE_MS - quiet);
        return;
      }
      pageLockedRef.current = false;
      animatingRef.current = false;
      lockDirectionRef.current = 0;
      accRef.current = 0;
      setPaging(false);
    };
    window.clearTimeout(unlockTimerRef.current);
    unlockTimerRef.current = window.setTimeout(tryUnlock, POST_GLIDE_LOCK_MS);
  }, []);

  const jumpTo = useCallback(
    (y: number) => {
      window.cancelAnimationFrame(rafRef.current);
      motionRef.current.running = false;
      animatingRef.current = false;
      offsetRef.current = y;
      paint(y);
    },
    [paint],
  );

  const animateTo = useCallback(
    (target: number) => {
      window.cancelAnimationFrame(rafRef.current);
      const from = currentOffset();
      offsetRef.current = target;
      const dist = target - from;

      if (Math.abs(dist) < 1 || reducedRef.current) {
        motionRef.current.running = false;
        animatingRef.current = false;
        paint(target);
        setArrivingId(null);
        releasePageLock();
        return;
      }

      animatingRef.current = true;
      setPaging(true);
      motionRef.current = {
        from,
        dist,
        start: performance.now(),
        running: true,
      };

      const step = (now: number) => {
        const t = Math.min(1, (now - motionRef.current.start) / SMOOTH_MS);
        paint(motionRef.current.from + motionRef.current.dist * easeHomeFlip(t));
        if (t < 1) {
          rafRef.current = window.requestAnimationFrame(step);
        } else {
          motionRef.current.running = false;
          animatingRef.current = false;
          paint(target);
          setArrivingId(null);
          releasePageLock();
        }
      };
      rafRef.current = window.requestAnimationFrame(step);
    },
    [currentOffset, paint, releasePageLock],
  );

  const goTo = useCallback(
    (index: number, align: "start" | "end" = "start") => {
      const next = Math.max(0, Math.min(sectionIds.length - 1, index));
      const el = getSectionEl(next);
      if (!el) return;

      const { top, max } = sectionRange(el, viewH());
      const target = align === "end" ? max : top;
      if (
        next === activeIndexRef.current &&
        !animatingRef.current &&
        Math.abs(currentOffset() - target) < 2
      ) {
        accRef.current = 0;
        return;
      }

      window.clearTimeout(unlockTimerRef.current);
      accRef.current = 0;
      didIntraRef.current = false;
      pageLockedRef.current = true;
      const distance = target - currentOffset();
      lockDirectionRef.current =
        distance === 0
          ? (Math.sign(next - activeIndexRef.current) as ScrollDirection)
          : distance > 0
            ? 1
            : -1;

      setActiveIndex(next);
      activeIndexRef.current = next;
      setArrivingId(sectionIds[next] ?? null);
      animateTo(target);
    },
    [sectionIds, getSectionEl, viewH, currentOffset, animateTo],
  );

  const goNext = useCallback(() => goTo(activeIndexRef.current + 1, "start"), [goTo]);
  const goPrev = useCallback(() => goTo(activeIndexRef.current - 1, "end"), [goTo]);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      const root = containerRef.current;
      if (!root) return;
      const target = e.target;
      if (!(target instanceof Node) || !root.contains(target)) return;
      if (e.ctrlKey || e.metaKey) return;

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      if (e.deltaMode === 2) delta *= root.clientHeight;

      e.preventDefault();
      e.stopPropagation();
      lastWheelRef.current = performance.now();

      if (animatingRef.current) {
        accRef.current = 0;
        return;
      }

      if (pageLockedRef.current) {
        const direction: ScrollDirection = delta === 0 ? 0 : delta > 0 ? 1 : -1;
        const lockDirection = lockDirectionRef.current;
        if (direction === 0 || lockDirection === 0 || direction === lockDirection) {
          accRef.current = 0;
          return;
        }

        window.clearTimeout(unlockTimerRef.current);
        pageLockedRef.current = false;
        lockDirectionRef.current = 0;
        accRef.current = 0;
        setPaging(false);
      }

      const section = getSectionEl(activeIndexRef.current);
      if (section && !animatingRef.current) {
        const { top, max } = sectionRange(section, viewH());
        const here = currentOffset();
        const roomDown = here < max - SECTION_EDGE_PX;
        const roomUp = here > top + SECTION_EDGE_PX;
        if ((delta > 0 && roomDown) || (delta < 0 && roomUp)) {
          jumpTo(clampOffset(here + delta, top, max));
          accRef.current = 0;
          didIntraRef.current = true;
          return;
        }
        if (didIntraRef.current) {
          didIntraRef.current = false;
          accRef.current = 0;
          if (e.deltaMode !== 1) {
            pageLockedRef.current = true;
            lockDirectionRef.current = delta > 0 ? 1 : -1;
            releasePageLock();
            return;
          }
        }
      }

      if (accRef.current !== 0 && Math.sign(accRef.current) !== Math.sign(delta)) {
        accRef.current = 0;
      }
      accRef.current += delta;
      if (Math.abs(accRef.current) < WHEEL_THRESHOLD) return;

      const dir = accRef.current > 0 ? 1 : -1;
      accRef.current = 0;
      const targetIndex = activeIndexRef.current + dir;
      if (targetIndex < 0 || targetIndex >= sectionIds.length) return;
      goTo(targetIndex, dir > 0 ? "start" : "end");
    },
    [getSectionEl, viewH, currentOffset, jumpTo, releasePageLock, goTo, sectionIds.length],
  );

  useEffect(() => {
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    return () => {
      window.removeEventListener("wheel", onWheel, {
        capture: true,
      } as EventListenerOptions);
      window.cancelAnimationFrame(rafRef.current);
      window.clearTimeout(unlockTimerRef.current);
    };
  }, [onWheel]);

  useEffect(() => {
    const root = containerRef.current;

    const onKey = (e: KeyboardEvent) => {
      const focused = e.target as HTMLElement | null;
      const tag = focused?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (focused?.isContentEditable) return;
      if (focused?.closest("button, a, [role='button'], [data-radix-collection-item]")) return;

      const down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!down && !up) return;

      e.preventDefault();
      if (pageLockedRef.current) return;

      if (root && !animatingRef.current) {
        const section = getSectionEl(activeIndexRef.current);
        if (section) {
          const { top, max } = sectionRange(section, viewH());
          const step = viewH() * 0.85;
          const here = currentOffset();
          if (down && here < max - SECTION_EDGE_PX) {
            jumpTo(clampOffset(here + step, top, max));
            didIntraRef.current = true;
            return;
          }
          if (up && here > top + SECTION_EDGE_PX) {
            jumpTo(clampOffset(here - step, top, max));
            didIntraRef.current = true;
            return;
          }
        }
      }

      if (down) goNext();
      else goPrev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, getSectionEl, viewH, currentOffset, jumpTo]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let startY = 0;
    let startX = 0;
    let lastY = 0;
    let tracking = false;
    let movedInside = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (pageLockedRef.current) return;
      const t = e.touches[0];
      if (!t) return;
      startY = t.clientY;
      startX = t.clientX;
      lastY = t.clientY;
      tracking = true;
      movedInside = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking) return;
      const t = e.touches[0];
      if (!t) return;
      const section = getSectionEl(activeIndexRef.current);
      if (section && !animatingRef.current) {
        const { top, max } = sectionRange(section, viewH());
        const delta = lastY - t.clientY;
        const here = currentOffset();
        const roomDown = here < max - SECTION_EDGE_PX;
        const roomUp = here > top + SECTION_EDGE_PX;
        if ((delta > 0 && roomDown) || (delta < 0 && roomUp)) {
          if (e.cancelable) e.preventDefault();
          jumpTo(clampOffset(here + delta, top, max));
          lastY = t.clientY;
          movedInside = true;
          didIntraRef.current = true;
          return;
        }
      }
      if (e.cancelable) e.preventDefault();
      lastY = t.clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      if (pageLockedRef.current || animatingRef.current) return;
      if (movedInside) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dy = startY - t.clientY;
      const dx = Math.abs(startX - t.clientX);
      if (Math.abs(dy) < 48 || Math.abs(dy) < dx * 1.15) return;
      if (dy > 0) goNext();
      else goPrev();
    };

    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev, getSectionEl, viewH, currentOffset, jumpTo]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const clampToActive = () => {
      if (animatingRef.current) return;
      const el = getSectionEl(activeIndexRef.current);
      if (!el) return;
      const { top, max } = sectionRange(el, viewH());
      jumpTo(clampOffset(currentOffset(), top, max));
    };

    const ro = new ResizeObserver(clampToActive);
    ro.observe(root);
    for (const id of sectionIds) {
      const el = sectionMapRef.current.get(id);
      if (el) ro.observe(el);
    }
    window.addEventListener("resize", clampToActive);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", clampToActive);
    };
  }, [getSectionEl, sectionIds, viewH, currentOffset, jumpTo]);

  useEffect(() => {
    const jumpToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const idx = sectionIds.indexOf(id);
      if (idx >= 0) goTo(idx, "start");
    };
    jumpToHash();
    window.addEventListener("hashchange", jumpToHash);
    return () => window.removeEventListener("hashchange", jumpToHash);
  }, [goTo, sectionIds]);

  const prevLocaleRef = useRef(locale);
  useEffect(() => {
    if (prevLocaleRef.current === locale) return;
    prevLocaleRef.current = locale;
    goTo(activeIndexRef.current, "start");
  }, [locale, goTo]);

  const value = useMemo(
    () => ({
      activeIndex,
      arrivingId,
      sectionIds,
      goTo,
      goNext,
      goPrev,
      registerSection,
      registerTrack,
    }),
    [activeIndex, arrivingId, sectionIds, goTo, goNext, goPrev, registerSection, registerTrack],
  );

  return (
    <FullpageContext.Provider value={value}>
      <div
        ref={containerRef}
        className={cn("home-fullpage-scroller relative h-full w-full overflow-hidden", className)}
        data-fullpage-root
        data-paging={paging ? "true" : undefined}
        style={{ overscrollBehavior: "none", touchAction: "pan-y pinch-zoom" }}
      >
        {children}
      </div>
    </FullpageContext.Provider>
  );
}

export function FullpageTrack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { registerTrack } = useFullpage();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerTrack(ref.current);
    return () => registerTrack(null);
  }, [registerTrack]);

  return (
    <div ref={ref} className={cn("home-fullpage-track", className)}>
      {children}
    </div>
  );
}
