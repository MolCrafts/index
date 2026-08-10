import { motion } from "framer-motion";
import { ArrowDownRight, Github } from "lucide-react";
import { fadeIn, slideUp } from "../lib/animations";
import { BRAND_CATEGORY, BRAND_SUBHEAD } from "../lib/brandCopy";
import { ecosystemCategories } from "../lib/ecosystem";
import { cn } from "../lib/utils";

/** Quiet stack proof — layer names from the product catalog, not decoration. */
const STACK_LAYERS = ecosystemCategories.map((c) => ({
  title: c.title,
  blurb: c.blurb,
}));

export const Hero = () => {
  return (
    <motion.section
      id="hero"
      className="relative flex min-h-[min(100vh,920px)] w-full items-center overflow-hidden px-4 py-28 md:px-8 md:py-32 lg:px-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      aria-labelledby="main-heading"
    >
      {/* Single quiet vignette — no cyan fog stack */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--primary) / 6%), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16 xl:gap-20">
        <motion.header className="flex flex-col items-start text-left" variants={slideUp}>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:mb-6">
            {BRAND_CATEGORY}
          </p>

          <h1
            id="main-heading"
            className="mb-5 font-sans text-5xl font-bold leading-[0.98] tracking-tight text-foreground sm:text-6xl md:mb-6 md:text-7xl lg:text-[5.25rem]"
          >
            MolCrafts
          </h1>

          <p className="max-w-xl text-lg font-normal leading-snug text-muted-foreground md:text-xl md:leading-snug">
            {BRAND_SUBHEAD}
          </p>

          <nav
            className="mt-10 flex flex-wrap items-center gap-3 sm:mt-12 sm:gap-4"
            aria-label="Hero"
          >
            <a
              href="#projects"
              className={cn(
                "group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold no-underline",
                "bg-primary text-primary-foreground shadow-[var(--molcrafts-shadow)]",
                "transition-[transform,box-shadow,background-color] duration-200",
                "hover:bg-primary/90 hover:shadow-[var(--molcrafts-shadow-lg)] hover:-translate-y-px",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              Browse the packages
              <ArrowDownRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://github.com/MolCrafts"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "group inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground no-underline",
                "transition-[border-color,background-color,transform] duration-200",
                "hover:border-primary/35 hover:bg-card hover:-translate-y-px",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </nav>
        </motion.header>

        <motion.aside
          className="hidden w-full max-w-md justify-self-end lg:block xl:max-w-lg"
          variants={slideUp}
          aria-label="Stack layers"
        >
          <div
            className={cn(
              "overflow-hidden rounded-lg border border-border/80 bg-card/70",
              "shadow-[var(--molcrafts-shadow)]",
            )}
          >
            <div className="border-b border-border/70 px-5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Stack
              </p>
            </div>
            <ol className="m-0 list-none p-0">
              {STACK_LAYERS.map((layer, index) => (
                <li
                  key={layer.title}
                  className={cn(
                    "grid grid-cols-[2.5rem_1fr] gap-3 px-5 py-4",
                    index < STACK_LAYERS.length - 1 && "border-b border-border/60",
                  )}
                >
                  <span
                    className="pt-0.5 font-['Outfit',sans-serif] text-xs font-semibold tabular-nums tracking-[0.12em] text-primary/80"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-medium tracking-tight text-foreground">
                      {layer.title}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {layer.blurb}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.aside>
      </div>
    </motion.section>
  );
};
