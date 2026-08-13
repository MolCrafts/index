import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionBandRow,
  sectionContainer,
  sectionLabel,
  sectionLabelRule,
  sectionShellBand,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

/** Section accent — intentional purple, not theme primary. */
const ACCENT = "#a855f7";

export const Newsletter = () => {
  return (
    <section id="newsletter" className={sectionShellBand}>
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
                Updates
              </div>
              <p className="text-xl font-light leading-snug text-foreground md:text-2xl">
                Follow the work as it ships.
              </p>
            </motion.div>

            <motion.div
              variants={slideUp}
              className="flex shrink-0 items-center gap-4 md:justify-self-end"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${ACCENT}1f`,
                  boxShadow: `0 0 24px ${ACCENT}30`,
                }}
                aria-hidden="true"
              >
                <Mail className="h-5 w-5" style={{ color: ACCENT }} />
              </div>

              {/* The previous email form had no endpoint: it set local state, cleared the
                  field, and told the visitor "Subscribed". It collected addresses and threw
                  them away. Until a real provider is wired up, this links to something that
                  actually works and needs no backend. */}
              <a
                href="https://github.com/MolCrafts/index/releases"
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em]",
                  "no-underline transition-all hover:gap-3",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                style={{ color: ACCENT }}
              >
                Watch releases on GitHub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
