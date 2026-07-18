import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import { cn } from "../lib/utils";

// Brand display accent — theme-aware via the --accent-rgb token (see tailwind.css).
const ACCENT = "rgb(var(--accent-rgb))";
const accentAlpha = (alpha: number) => `rgba(var(--accent-rgb), ${alpha})`;

export const Cta = () => {
  return (
    <section id="cta" className="py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-3"
        >
          <div className="grid md:grid-cols-2 md:items-end gap-6">
            <motion.div variants={slideUp} className="flex flex-col gap-3 shrink-0">
              <div className="flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-sm">
                <div className="w-12 h-[1px] bg-primary opacity-50" />
                Explore
              </div>
              <p className="text-xl md:text-2xl text-foreground font-light leading-snug">
                Wander in, use what you need.
              </p>
            </motion.div>

            <motion.a
              href="https://github.com/MolCrafts"
              target="_blank"
              rel="noreferrer noopener"
              variants={slideUp}
              className="group flex items-center gap-4 shrink-0 no-underline md:justify-self-end"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: accentAlpha(0.12),
                  boxShadow: `0 0 24px ${accentAlpha(0.19)}`,
                }}
              >
                <Github className="w-5 h-5" style={{ color: ACCENT }} />
              </div>

              <div className="flex flex-col">
                <span
                  className="text-[10px] font-bold tracking-[0.35em] uppercase"
                  style={{ color: ACCENT }}
                >
                  github.com/MolCrafts
                </span>
                <span className="text-base font-light text-foreground transition-colors group-hover:text-primary">
                  Browse all repos
                </span>
              </div>

              <ArrowUpRight
                className={cn(
                  "w-4 h-4 ml-1 transition-transform",
                  "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                )}
                style={{ color: ACCENT }}
              />
            </motion.a>
          </div>

          <motion.div variants={slideUp} className="hidden md:flex items-center gap-2">
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${accentAlpha(0.19)} 30%, ${accentAlpha(0.8)} 100%)`,
                boxShadow: `0 0 12px ${accentAlpha(0.5)}, 0 0 24px ${accentAlpha(0.25)}`,
              }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: ACCENT,
                boxShadow: `0 0 8px ${ACCENT}, 0 0 16px ${accentAlpha(0.5)}`,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
