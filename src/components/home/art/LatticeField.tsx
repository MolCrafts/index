import { type MotionValue, useInView, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animations";
import {
  HERO_LATTICE,
  honeycomb,
  LATTICE_FRAME,
  type LatticeArt,
  type LatticeSpec,
  SUPPORT_LATTICE,
} from "@/lib/home/art/lattice";
import { BREATH_SECONDS } from "@/lib/home/art/loop";
import { buildTrace, type Trace } from "@/lib/home/art/trace";
import { cn } from "@/lib/utils";
import { TraceLight } from "./TraceLight";
import { useLoop } from "./useLoop";

type LatticeVariant = "hero" | "support";

const SPECS: Readonly<Record<LatticeVariant, LatticeSpec>> = {
  hero: HERO_LATTICE,
  support: SUPPORT_LATTICE,
};

/** The hero is centred on the wordmark; the support band keeps its lattice to the right. */
const ANCHOR: Readonly<Record<LatticeVariant, string>> = {
  hero: "xMidYMid slice",
  support: "xMaxYMid slice",
};

/** A signal sets off every half breath and takes one breath to cross its walk. */
const STAGGER_SECONDS = BREATH_SECONDS / 2;
const SIGNAL_TAIL = 0.4;

const cache = new Map<LatticeVariant, LatticeArt>();

/** Built once per variant: the sheet is tens of thousands of projected sites. */
function latticeArt(variant: LatticeVariant): LatticeArt {
  const cached = cache.get(variant);
  if (cached) return cached;
  const art = honeycomb(SPECS[variant]);
  cache.set(variant, art);
  return art;
}

interface SignalProps {
  trace: Trace;
  progress: MotionValue<number>;
  /** When in the loop this walk's signal sets off, 0–1. */
  start: number;
  /** Share of the loop one crossing takes. */
  share: number;
}

/** One signal crossing one lit walk, then waiting out the rest of the loop. */
function Signal({ trace, progress, start, share }: SignalProps) {
  const head = useTransform(progress, (value) => {
    const local = (value - start + 1) % 1;
    return Math.min(local / share, 1) * (1 + SIGNAL_TAIL + 0.1);
  });
  return <TraceLight trace={trace} head={head} tail={SIGNAL_TAIL} size={0.75} />;
}

/**
 * The honeycomb sheet behind the hero and the support band, with signals
 * travelling the walks that are lit on it.
 */
export function LatticeField({
  variant,
  className,
}: {
  variant: LatticeVariant;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const onScreen = useInView(ref, { amount: 0.05 });
  const still = prefersReducedMotion();
  const art = useMemo(() => latticeArt(variant), [variant]);
  const traces = useMemo(() => art.walks.map((walk) => buildTrace(walk)), [art]);
  const seconds = Math.max(traces.length, 2) * STAGGER_SECONDS;
  const progress = useLoop(seconds, onScreen && !still);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox={`0 0 ${LATTICE_FRAME.width} ${LATTICE_FRAME.height}`}
      preserveAspectRatio={ANCHOR[variant]}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <g fill="none" stroke="hsl(var(--primary))" strokeWidth="1">
        {art.bonds.map((layer) => (
          <path key={layer.opacity} d={layer.d} strokeOpacity={layer.opacity} />
        ))}
      </g>
      <g fill="var(--home-blue-tint)">
        {art.atoms.map((layer) => (
          <path key={layer.opacity} d={layer.d} fillOpacity={layer.opacity} />
        ))}
      </g>
      <g fill="none" stroke="rgb(var(--accent-rgb))">
        {art.litBonds.map((layer) => (
          <path key={layer.opacity} d={layer.d} strokeOpacity={layer.opacity} strokeWidth="1.5" />
        ))}
        {art.litRings.map((layer) => (
          <path key={layer.opacity} d={layer.d} strokeOpacity={layer.opacity} strokeWidth="1" />
        ))}
      </g>
      <g fill="var(--home-blue-tint)">
        {art.litAtoms.map((layer) => (
          <path key={layer.opacity} d={layer.d} fillOpacity={layer.opacity} />
        ))}
      </g>
      {still
        ? null
        : traces.map((trace, index) => (
            <Signal
              key={index}
              trace={trace}
              progress={progress}
              start={index / traces.length}
              share={BREATH_SECONDS / seconds}
            />
          ))}
    </svg>
  );
}
