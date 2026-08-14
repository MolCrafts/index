import { MOTION_EASE, prefersReducedMotion } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { BRAND_GRADIENT_TEXT, HOME_STAGE_ARRIVE } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MoleculeField } from "../MoleculeField";
import { SnapSection } from "../fullpage/SnapSection";

/**
 * The original MolCrafts brand curtain: centred wordmark, gradient and glow.
 * The commercial explanation now begins on the following screen.
 */
export function HeroSection() {
  const { brandHero } = useHomeCopy();
  const { locale } = useLocale();
  const reduceMotion = prefersReducedMotion();

  return (
    <SnapSection
      id="hero"
      aria-labelledby="main-heading"
      className="h-[var(--home-view,100cqb)] justify-center overflow-hidden"
    >
      <MoleculeField intensity={0.2} interactive className="z-0 opacity-45" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(38rem,68vw)] w-[min(62rem,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(var(--accent-rgb),0.16),hsl(var(--primary)/0.07)_42%,transparent_72%)] blur-[36px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-[12%] top-[12%] z-0 size-[min(44rem,68vw)] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.24),transparent_68%)] blur-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[18%] -right-[10%] z-0 size-[min(50rem,72vw)] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.2),transparent_70%)] blur-glow"
        aria-hidden="true"
      />

      <motion.header
        lang={locale}
        className={cn(
          HOME_STAGE_ARRIVE,
          "relative z-10 mx-auto flex w-full max-w-[100rem] flex-col items-center px-6 pb-24 pt-16 text-center font-brand [font-optical-sizing:auto] sm:px-10",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: MOTION_EASE }}
      >
        <motion.p
          className={cn(
            "mb-[clamp(2rem,2.5vw,2.5rem)] flex min-h-[2.8em] max-w-3xl items-end justify-center text-balance text-[clamp(1.125rem,1.25vw,1.25rem)] font-medium leading-copy text-brand-kicker sm:min-h-[1.4em]",
            locale === "zh" ? "tracking-normal" : "tracking-[-0.01em]",
          )}
          initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.52, ease: MOTION_EASE }}
        >
          {brandHero.kicker}
        </motion.p>

        <motion.h1
          id="main-heading"
          lang="en"
          className={cn(
            BRAND_GRADIENT_TEXT,
            "min-w-0 max-w-full whitespace-nowrap text-[clamp(4.25rem,9vw,9rem)] font-wordmark leading-[0.9] tracking-tighter [font-kerning:normal]",
          )}
          initial={{ opacity: 0, y: 22, filter: "blur(9px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.68, ease: MOTION_EASE }}
        >
          {brandHero.title}
        </motion.h1>

        <motion.p
          className="relative isolate mt-[clamp(1.75rem,2vw,2rem)] flex min-h-[4.65em] max-w-[52rem] items-start justify-center text-balance text-[1.25rem] font-normal leading-[1.55] tracking-normal text-foreground/75 sm:min-h-[3.1em] sm:text-[clamp(1.25rem,1.65vw,1.5rem)] lg:min-h-[1.55em]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5, ease: MOTION_EASE }}
        >
          <span className="relative z-0">{brandHero.subtitle}</span>
          <motion.span
            key={locale}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-start justify-center bg-[linear-gradient(105deg,transparent_28%,var(--color-sheen-core)_47%,var(--color-sheen-edge)_52%,transparent_72%)] bg-[length:220%_100%] bg-clip-text text-balance text-transparent mix-blend-screen [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            initial={{ backgroundPosition: "160% 50%", opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0 }
                : {
                    backgroundPosition: ["160% 50%", "-60% 50%"],
                    opacity: [0, 0.95, 0.95, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    backgroundPosition: {
                      delay: 1.05,
                      duration: 1.55,
                      ease: [0.4, 0, 0.2, 1],
                    },
                    opacity: {
                      delay: 1.05,
                      duration: 1.55,
                      ease: "linear",
                      times: [0, 0.12, 0.76, 1],
                    },
                  }
            }
          >
            {brandHero.subtitle}
          </motion.span>
        </motion.p>
      </motion.header>
    </SnapSection>
  );
}
