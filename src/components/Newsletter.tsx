import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionBandRow,
  sectionContainer,
  sectionLabel,
  sectionShellBand,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

export const Newsletter = () => {
  return (
    <section id="newsletter" className={sectionShellBand}>
      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(sectionBandRow, "border-t border-border/60 pt-10")}
        >
          <motion.div variants={slideUp} className="flex shrink-0 flex-col gap-2">
            <p className={sectionLabel}>Updates</p>
            <p className="text-xl font-medium leading-snug text-foreground md:text-2xl">
              Release notes when packages change.
            </p>
          </motion.div>

          <motion.div variants={slideUp} className="flex shrink-0 items-center md:justify-self-end">
            {/* Until a real email provider is wired, link to something that works. */}
            <a
              href="https://github.com/MolCrafts/index/releases"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "group inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline",
                "transition-opacity hover:opacity-85",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              Watch releases on GitHub
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
