import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionContainer,
  sectionHeader,
  sectionLabel,
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
      className="relative overflow-hidden pb-10 pt-24 md:pb-12 md:pt-32"
      aria-labelledby="approach-heading"
    >
      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(sectionStack, "gap-12 md:gap-16")}
        >
          <motion.div variants={slideUp} className={cn(sectionHeader, "max-w-2xl")}>
            <p className={sectionLabel}>Approach</p>
            <h2 id="approach-heading" className={sectionTitle}>
              We build the infrastructure. The science stays yours.
            </h2>
            <p className="max-w-xl text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
              Packages and contracts only — methods stay yours and stay inspectable.
            </p>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="grid gap-10 border-t border-border/60 pt-10 md:grid-cols-2 md:gap-16 lg:gap-24"
          >
            {BOUNDARIES.map((column, colIndex) => (
              <div key={column.label} className="flex flex-col gap-5">
                <h3 className={cn(sectionSubLabel, colIndex === 1 && "text-muted-foreground")}>
                  {column.label}
                </h3>
                <ul className="m-0 flex list-none flex-col gap-0 p-0">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "border-t border-border/40 py-3.5 text-base font-normal leading-relaxed first:border-t-0 first:pt-0",
                        colIndex === 0 ? "text-foreground/90" : "text-muted-foreground",
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
