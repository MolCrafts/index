import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionBandRow,
  sectionContainer,
  sectionLabel,
  sectionLabelRule,
  sectionShellBand,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

// Brand display accent — theme-aware via the --accent-rgb token (see tailwind.css).
const ACCENT = "rgb(var(--accent-rgb))";
const accentAlpha = (alpha: number) => `rgba(var(--accent-rgb), ${alpha})`;

export const Cta = () => {
  return (
    <section id="cta" className={sectionShellBand}>
      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-3"
        >
          <div className={sectionBandRow}>
            <motion.div variants={slideUp} className="flex shrink-0 flex-col gap-3">
              <div className={sectionLabel}>
                <div className={sectionLabelRule} aria-hidden="true" />
                Start here
              </div>
              <p className="text-xl font-light leading-snug text-foreground md:text-2xl">
                Pick the package you need and install it.
              </p>
            </motion.div>

            {/* Was the seventh link to the bare GitHub org on one page. The positioning
                doc ranks docs above the org list as a conversion action. */}
            <motion.a
              href="https://docs.molcrafts.org/"
              target="_blank"
              rel="noreferrer noopener"
              variants={slideUp}
              className="group flex shrink-0 items-center gap-4 no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:justify-self-end"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: accentAlpha(0.12),
                  boxShadow: `0 0 24px ${accentAlpha(0.19)}`,
                }}
              >
                <BookOpen className="h-5 w-5" style={{ color: ACCENT }} />
              </div>

              <div className="flex flex-col">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.35em]"
                  style={{ color: ACCENT }}
                >
                  docs.molcrafts.org
                </span>
                <span className="text-base font-light text-foreground transition-colors group-hover:text-primary">
                  Read the docs
                </span>
              </div>

              <ArrowUpRight
                className={cn(
                  "ml-1 h-4 w-4 transition-transform",
                  "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                )}
                style={{ color: ACCENT }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
