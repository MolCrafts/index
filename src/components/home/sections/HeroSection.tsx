import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { BrandName } from "@/components/BrandName";
import { FORCE_FULL_MOTION, MOTION_EASE } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { HomeSection } from "../HomeSection";

/** A quiet brand inscription; the shared atmosphere stays beneath the surface. */
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
      <motion.header
        ref={stageRef}
        lang={locale}
        className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col items-center px-6 py-28 text-center font-brand [font-optical-sizing:auto] sm:px-12"
        initial={reduceMotion ? false : { opacity: 0.25, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: MOTION_EASE }}
      >
        <h1
          id="main-heading"
          lang="en"
          className="max-w-full whitespace-nowrap text-[clamp(2.1rem,7.2vw,6.6rem)] font-medium leading-[1.05] tracking-[-0.025em] [font-kerning:normal]"
        >
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
