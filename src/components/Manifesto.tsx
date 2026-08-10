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
  sectionShellTall,
  sectionStack,
  sectionTitle,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

const PRINCIPLES = [
  {
    title: "Open by default",
    body: "Methods, data contracts, and tooling ship in the open — so trust can be inspected, not asserted.",
  },
  {
    title: "FAIR and reproducible",
    body: "A structure, a run, a model, a result should travel with enough context to be reused without reconstruction.",
  },
  {
    title: "Foundations that compose",
    body: "Shared layers for representation, workflow, and interfaces — not one-off scripts that die with a project.",
  },
  {
    title: "Humans and agents together",
    body: "People and AI agents work on the same ground: readable artifacts, typed contracts, and explicit lineage.",
  },
  {
    title: "Science first",
    body: "Infrastructure exists to extend the frontiers of knowledge — tooling is the means, not the product.",
  },
] as const;

export const Manifesto = () => {
  return (
    <section id="principles" className={sectionShellTall} aria-labelledby="principles-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 85% 20%, rgba(var(--accent-rgb), 0.07), transparent 60%), radial-gradient(ellipse 40% 35% at 10% 80%, hsl(var(--primary) / 6%), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(sectionStack, "md:gap-24")}
        >
          <motion.div
            variants={slideUp}
            className={cn(
              sectionHeader,
              "lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16",
            )}
          >
            <div className="flex flex-col gap-5 md:gap-6">
              <div className={sectionLabel}>
                <div className={sectionLabelRule} aria-hidden="true" />
                Principles
              </div>
              <h2 id="principles-heading" className={cn(sectionTitle, "max-w-3xl lg:max-w-none")}>
                We build open infrastructure so structures, runs, models, and decisions stay
                reusable — across people, labs, and agents.
              </h2>
            </div>
            <p className={cn(sectionLead, "max-w-xl lg:max-w-none lg:justify-self-end lg:pb-1")}>
              Molecular and materials science is full of brilliant work trapped between formats,
              folders, cluster jobs, and half-remembered decisions. Discovery should compound. These
              are the principles we hold when we build.
            </p>
          </motion.div>

          <motion.ol
            variants={staggerContainer}
            className="m-0 grid list-none gap-0 p-0 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:gap-x-20"
            aria-label="MolCrafts principles"
          >
            {PRINCIPLES.map((item, index) => (
              <motion.li
                key={item.title}
                variants={slideUp}
                className={cn(
                  "grid gap-3 border-t border-border/55 py-8 md:gap-4 md:py-10",
                  /* Last odd item spans full width on md+ so the grid does not leave a hole. */
                  index === PRINCIPLES.length - 1 &&
                    PRINCIPLES.length % 2 === 1 &&
                    "md:col-span-2 md:max-w-xl",
                )}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-['Outfit',sans-serif] text-sm font-semibold tabular-nums tracking-[0.18em] text-primary/75"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={cn(sectionH3, "md:text-xl")}>{item.title}</h3>
                </div>
                <p className={cn(sectionBody, "pl-0 md:pl-[3.25rem]")}>{item.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
};
