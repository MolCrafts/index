import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { BrandName } from "@/components/BrandName";
import { FORCE_FULL_MOTION, MOTION_EASE } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { LatticeField } from "../art/LatticeField";
import { HomeSection } from "../HomeSection";

/** One arc of the halo: an ellipse centred on the wordmark, kept only above it. */
const HERO_ARC =
  "pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-[2.5/1] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border [mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_52%)]";

/**
 * A quiet brand inscription; the shared atmosphere stays beneath the surface.
 *
 * The name, then the claim, and nothing else: no buttons, no second focal
 * point. The page itself is the way on.
 */
export function HeroSection() {
  const { brandHero } = useHomeCopy();
  const { locale } = useLocale();
  const systemReducedMotion = useReducedMotion();
  const reduceMotion = !FORCE_FULL_MOTION && systemReducedMotion;
  const stageRef = useRef<HTMLElement>(null);
  const onScreen = useInView(stageRef, { amount: 0.05 });

  return (
    <HomeSection id="hero" aria-labelledby="main-heading" className="overflow-hidden">
      <div aria-hidden="true" className="hero-veil pointer-events-none absolute inset-0" />
      {/* The sheet opens around the wordmark and gathers toward the lower edge:
          the name stands in a clearing of the structure it is about. */}
      <LatticeField variant="hero" />
      <motion.header
        ref={stageRef}
        lang={locale}
        className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col items-center px-6 py-28 text-center font-brand [font-optical-sizing:auto] sm:px-12"
        initial={reduceMotion ? false : { opacity: 0.25, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: MOTION_EASE }}
      >
        {/* Everything on this screen is centred on the name. Two arcs of light
            rise over it and fade before they reach the lines below, so the eye
            is led to the wordmark and nothing else competes with it. */}
        <h1
          id="main-heading"
          lang="en"
          className="relative isolate max-w-full whitespace-nowrap text-[clamp(2.8rem,10vw,8.75rem)] font-medium leading-[1.05] tracking-[-0.035em] [font-kerning:normal]"
        >
          <span
            aria-hidden="true"
            className={cn(HERO_ARC, "w-[136%] border-[rgb(var(--accent-rgb))]/25")}
          />
          <span
            aria-hidden="true"
            className={cn(HERO_ARC, "w-[188%] border-[rgb(var(--accent-rgb))]/12")}
          />
          <BrandName
            glow="hero"
            className={onScreen ? undefined : "[animation-play-state:paused]"}
          />
        </h1>
        <p className="mt-7 max-w-[72rem] text-balance text-[clamp(1.125rem,2.5vw,2.75rem)] font-book leading-copy tracking-[-0.015em] text-foreground/85 sm:mt-8">
          {brandHero.kicker} {brandHero.subtitle}
        </p>
      </motion.header>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-10"
        aria-hidden="true"
      >
        <span className="relative block h-12 w-px overflow-hidden">
          <span className="absolute inset-0 bg-[rgb(var(--accent-rgb))]/15" />
          <span
            className={cn(
              "absolute left-0 top-0 h-4 w-full bg-[rgb(var(--accent-rgb))]/60",
              !reduceMotion &&
                "animate-hero-descent motion-reduce:animate-none force-motion:animate-hero-descent",
              !onScreen && "[animation-play-state:paused]",
            )}
          />
        </span>
      </div>
    </HomeSection>
  );
}
