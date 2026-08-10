import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionBody,
  sectionContainer,
  sectionHeader,
  sectionLabel,
  sectionLabelRule,
  sectionStack,
  sectionSubLabel,
  sectionTitle,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

const BOUNDARIES = [
  {
    label: "We build",
    items: [
      "Open packages for molecular simulation and materials work",
      "Composable libraries, workflows, and interfaces",
      "Contracts that keep scientific context alive across tools and agents",
    ],
  },
  {
    label: "We do not",
    items: [
      "Replace domain science with a black-box product",
      "Lock methods inside proprietary stacks",
      "Hide how a result was produced",
    ],
  },
] as const;

export const Approach = () => {
  return (
    <section
      id="approach"
      /* Reduced bottom padding — Approach and Projects read as one group. */
      className="relative overflow-hidden pb-10 pt-28 md:pb-12 md:pt-40"
      aria-labelledby="approach-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[380px] w-[380px] rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(sectionStack, "gap-16 md:gap-20")}
        >
          <motion.div
            variants={slideUp}
            className={cn(
              sectionHeader,
              "lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16",
            )}
          >
            <div className="flex flex-col gap-5 md:gap-6">
              <div className={sectionLabel}>
                <div className={sectionLabelRule} aria-hidden="true" />
                Approach
              </div>
              <h2 id="approach-heading" className={cn(sectionTitle, "max-w-xl lg:max-w-none")}>
                We build the infrastructure. The science stays yours.
              </h2>
            </div>

            <div
              className={cn(
                "grid gap-6 sm:grid-cols-2 sm:gap-10",
                sectionBody,
                "md:text-lg lg:pb-1",
              )}
            >
              <p className="text-foreground/90">
                MolCrafts exists so scientific work compounds. Structures, runs, models, and results
                should move to the next person — or agent — with context still intact.
              </p>
              <p>
                Methods, data, and workflows sit on one set of contracts: inspectable layers rather
                than disposable glue. Researchers turn ideas into studies others can trust; builders
                turn methods into tools others can extend.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="grid gap-10 border-t border-border/55 pt-12 md:grid-cols-2 md:gap-16 lg:gap-24"
          >
            {BOUNDARIES.map((column) => (
              <div key={column.label} className="flex flex-col gap-6">
                <h3 className={sectionSubLabel}>{column.label}</h3>
                <ul className="m-0 flex list-none flex-col gap-0 p-0">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "border-t border-border/40 py-4 text-base font-light leading-relaxed text-muted-foreground first:border-t-0 first:pt-0",
                        "md:text-[1.05rem] md:leading-[1.65]",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
