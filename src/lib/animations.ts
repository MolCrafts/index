import type { Variants } from "framer-motion";

/**
 * Site-wide motion switch.
 *
 * `npm run dev` sets `PUBLIC_FORCE_FULL_MOTION=true`, so CSS, Framer Motion,
 * and JS helpers ignore the OS “Reduce motion” preference during visual work.
 * Production builds omit the variable and continue to honor the system setting.
 * Applied as `html.force-full-motion` at boot (see `main.tsx`).
 */
export const FORCE_FULL_MOTION = import.meta.env.PUBLIC_FORCE_FULL_MOTION === "true";

/** Framer Motion `MotionConfig.reducedMotion` derived from {@link FORCE_FULL_MOTION}. */
export const FRAMER_REDUCED_MOTION: "never" | "user" = FORCE_FULL_MOTION ? "never" : "user";

/**
 * Whether the runtime should skip or simplify motion.
 * Always `false` when {@link FORCE_FULL_MOTION} is on.
 */
export function prefersReducedMotion(): boolean {
  if (FORCE_FULL_MOTION) return false;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Shared punchy ease — used by Reveal / product pages that import these variants. */
export const MOTION_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Homepage fullpage flip — silk glide, one screen per gesture. */
export const HOME_FLIP_MS = 580;
export const HOME_FLIP_LOCK_MS = 36;
export const HOME_WHEEL_THRESHOLD = 28;
/** After a flip, wait until the wheel/trackpad has been idle this long. */
export const HOME_GESTURE_IDLE_MS = 200;

/**
 * cubic-bezier(0.45, 0.05, 0.12, 1) — gentle takeoff, long settle.
 * Authored for the homepage page-turn; do not reuse as a generic ease.
 */
export function easeHomeFlip(x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const cx = 3 * 0.45;
  const bx = 3 * (0.12 - 0.45) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * 0.05;
  const by = 3 * (1 - 0.05) - cy;
  const ay = 1 - cy - by;
  let t = x;
  for (let i = 0; i < 6; i++) {
    const xt = ((ax * t + bx) * t + cx) * t - x;
    const dxt = (3 * ax * t + 2 * bx) * t + cx;
    if (Math.abs(dxt) < 1e-6) break;
    t = Math.min(1, Math.max(0, t - xt / dxt));
  }
  return ((ay * t + by) * t + cy) * t;
}

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: MOTION_EASE },
  },
};

// Slide up — decisive travel, spring settle
export const slideUp: Variants = {
  hidden: { y: 48, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
      mass: 0.75,
    },
  },
};

// Staggered container animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

// Scale animation
export const scaleIn: Variants = {
  hidden: { scale: 0.72, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 20,
      mass: 0.7,
    },
  },
};

// Button hover animation
export const buttonHover = {
  scale: 1.08,
  transition: { type: "spring", stiffness: 400, damping: 18 },
};

// Section transition animation
export const sectionTransition: Variants = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: MOTION_EASE,
    },
  },
};

export const assistWordOutlineReveal: Variants = {
  dormant: { opacity: 0.42, scale: 0.985 },
  illuminated: {
    opacity: 0.1,
    scale: 1,
    transition: { delay: 0.18, duration: 1.18, ease: MOTION_EASE },
  },
};

export const assistWordFillReveal: Variants = {
  dormant: { opacity: 0, scale: 0.985, filter: "blur(22px)" },
  illuminated: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: 0.46, duration: 1.28, ease: MOTION_EASE },
  },
};

export const assistSublineReveal: Variants = {
  dormant: { opacity: 0, y: 8, filter: "blur(4px)" },
  illuminated: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 1.08, duration: 0.62, ease: MOTION_EASE },
  },
};

export const assistStatementsReveal: Variants = {
  dormant: {},
  illuminated: {
    transition: {
      delayChildren: 0.72,
      staggerChildren: 0.08,
    },
  },
};

export const assistMicroStatementReveal: Variants = {
  dormant: { opacity: 0, scale: 0.97, filter: "blur(5px)" },
  illuminated: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: MOTION_EASE },
  },
};

export const assistAuraReveal: Variants = {
  dormant: { opacity: 0.15, scale: 0.78, x: "-50%", y: "-50%" },
  illuminated: {
    opacity: [0.15, 0.74, 0.52],
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 1.8, ease: MOTION_EASE, times: [0, 0.58, 1] },
  },
};

interface AssistContextMotion {
  delay: number;
  peak: number;
  settled: number;
  x: number;
  y: number;
}

export const assistContextGather: Variants = {
  dormant: ({ x, y }: AssistContextMotion) => ({
    x,
    y,
    scale: 0.82,
    filter: "blur(2px)",
    opacity: 0.02,
  }),
  illuminated: ({ delay, peak, settled }: AssistContextMotion) => ({
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    opacity: [0.02, peak, settled],
    transition: { delay, duration: 1.45, ease: MOTION_EASE, times: [0, 0.56, 1] },
  }),
};

export const assistMobileProductsReveal: Variants = {
  dormant: { y: 12, filter: "blur(3px)", opacity: 0 },
  illuminated: {
    y: 0,
    filter: "blur(0px)",
    opacity: 0.76,
    transition: { delay: 0.58, duration: 1.1, ease: MOTION_EASE },
  },
};
