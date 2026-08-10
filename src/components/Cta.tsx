import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionBandRow,
  sectionContainer,
  sectionLabel,
  sectionShellBand,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

export const Cta = () => {
  return (
    <section id="cta" className={sectionShellBand}>
      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(sectionBandRow, "border-t border-border/60 pt-10")}
        >
          <motion.div variants={slideUp} className="flex shrink-0 flex-col gap-2">
            <p className={sectionLabel}>Start here</p>
            <p className="text-xl font-medium leading-snug text-foreground md:text-2xl">
              Start with the package that matches the job.
            </p>
          </motion.div>

          <motion.a
            href="#projects"
            variants={slideUp}
            className={cn(
              "group inline-flex shrink-0 items-center gap-2 justify-self-start rounded-md px-5 py-3 text-sm font-semibold no-underline md:justify-self-end",
              "bg-primary text-primary-foreground shadow-[var(--molcrafts-shadow)]",
              "transition-[transform,box-shadow,background-color] duration-200",
              "hover:bg-primary/90 hover:-translate-y-px hover:shadow-[var(--molcrafts-shadow-lg)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            Browse the packages
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
