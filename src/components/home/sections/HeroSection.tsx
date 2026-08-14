import { MOTION_EASE, prefersReducedMotion } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { BRAND_GRADIENT_TEXT } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HomeSection } from "../HomeSection";

/**
 * The MolCrafts brand curtain: centred wordmark, gradient and glow.
 *
 * The field and glows it used to own are now the page's shared background
 * (`HomeAtmosphere`), so this block carries type alone.
 */
export function HeroSection() {
  const { brandHero } = useHomeCopy();
  const { locale } = useLocale();
  const reduceMotion = prefersReducedMotion();

  return (
    <HomeSection id="hero" aria-labelledby="main-heading" className="overflow-hidden">
      <motion.header
        lang={locale}
        className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col items-center px-6 pb-24 pt-16 text-center font-brand [font-optical-sizing:auto] sm:px-10"
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
    </HomeSection>
  );
}
