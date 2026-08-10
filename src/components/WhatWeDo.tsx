import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionBody,
  sectionContainer,
  sectionH3,
  sectionHeader,
  sectionLabel,
  sectionLead,
  sectionShell,
  sectionStack,
  sectionTitle,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

/**
 * First concrete activity section after Hero.
 * Distinct job: what we do — not beliefs (Manifesto) or boundaries (Approach).
 */
const PILLARS = [
  {
    title: "Build and run",
    body: "Construct and pack molecular systems, export them to simulation engines, and submit the runs to any scheduler — from Python or Rust.",
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
            className={cn(sectionHeader, "md:max-w-[min(100%,40rem)]")}
          >
            <p className={sectionLabel}>What we do</p>
            <h2 id="what-we-do-heading" className={sectionTitle}>
              We build the software layer underneath molecular simulation.
            </h2>
            <p className={sectionLead}>
              Not one product — open-source packages for the full path: build a system, run it, keep
              the result reusable. Nine packages install today; use one, or the stack.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            className="m-0 grid list-none gap-0 border-t border-border/60 p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PILLARS.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                variants={slideUp}
                className={cn(
                  "flex flex-col gap-3 border-border/60 py-8 sm:px-6 lg:px-8",
                  "border-b sm:border-b-0",
                  index > 0 && "sm:border-l",
                  index === 0 && "sm:pl-0",
                  index === PILLARS.length - 1 && "sm:pr-0 lg:pr-0",
                  /* On 2-col, third item spans cleanly without a lonely cell */
                  index === 2 &&
                    "sm:col-span-2 sm:border-l-0 sm:border-t sm:pl-0 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-8",
                )}
              >
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
