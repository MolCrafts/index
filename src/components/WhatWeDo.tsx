import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionBody,
  sectionContainer,
  sectionH3,
  sectionHeader,
  sectionLabel,
  sectionLabelRule,
  sectionLead,
  sectionShell,
  sectionStack,
  sectionTitle,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

/**
 * The first thing after the Hero: what the company actually does, in concrete terms.
 * Deliberately distinct from its neighbours — Manifesto states beliefs, Approach states
 * how we work and where the boundaries are. This section only states activity.
 */
const PILLARS = [
  {
    title: "Build and run",
    body: "Construct and pack molecular systems, export them to simulation engines, and submit the runs to any scheduler.",
  },
  {
    title: "Keep the context",
    body: "Parameters, environment, and provenance stay attached to the result, instead of living in a script nobody kept.",
  },
  {
    title: "Open to agents",
    body: "The structured records a researcher works with are the same ones an AI agent reads and writes. There is no separate integration layer.",
  },
] as const;

export const WhatWeDo = () => {
  return (
    <section id="what-we-do" className={sectionShell} aria-labelledby="what-we-do-heading">
      {/* Soft stage glow — depth without competing with type. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(55%,420px)] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(var(--accent-rgb), 0.09), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={sectionStack}
        >
          <motion.div
            variants={slideUp}
            className={cn(sectionHeader, "md:max-w-[min(100%,52rem)]")}
          >
            <div className={sectionLabel}>
              <div className={sectionLabelRule} aria-hidden="true" />
              What we do
            </div>
            <h2 id="what-we-do-heading" className={sectionTitle}>
              We build the software layer underneath molecular simulation.
            </h2>
            <p className={sectionLead}>
              Not one product — a set of open-source packages covering the path from a structure on
              your screen to a result someone else can rerun.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            className="m-0 grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:gap-16"
          >
            {PILLARS.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                variants={slideUp}
                className="group relative flex flex-col gap-4 border-t border-border/50 pt-6"
              >
                <span
                  className="font-['Outfit',sans-serif] text-[11px] font-semibold tabular-nums tracking-[0.22em] text-primary/70"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className="h-px w-12 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent transition-[width] duration-300 group-hover:w-20"
                  aria-hidden="true"
                />
                <h3 className={sectionH3}>{pillar.title}</h3>
                <p className={cn(sectionBody, "max-w-sm")}>{pillar.body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};
