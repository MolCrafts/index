import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../lib/animations";
import {
  sectionBody,
  sectionContainer,
  sectionH3,
  sectionHeader,
  sectionLabel,
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
    body: "Findable, accessible, interoperable, reusable — a structure, a run, a model, a result should travel with enough context to be reused without reconstruction.",
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
    body: "Packages serve methods and papers. If a layer blocks a legitimate method, the layer is wrong.",
  },
] as const;

export const Manifesto = () => {
  return (
    <section id="principles" className={sectionShellTall} aria-labelledby="principles-heading">
      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(sectionStack, "md:gap-16")}
        >
          {/* Statement peak — full measure title, short lead; no essay heat */}
          <motion.div variants={slideUp} className={cn(sectionHeader, "max-w-3xl")}>
            <p className={sectionLabel}>Principles</p>
            <h2 id="principles-heading" className={cn(sectionTitle, "max-w-2xl")}>
              Five rules for software that scientific work has to outlive.
            </h2>
            <p className={sectionLead}>
              Most simulation work still lives in scripts and jobs that do not travel. These rules
              keep structures, runs, and results reusable across people and tools.
            </p>
          </motion.div>

          <motion.ol
            variants={staggerContainer}
            className="m-0 grid list-none gap-0 border-t border-border/60 p-0 md:grid-cols-2 md:gap-x-12 lg:gap-x-16"
            aria-label="MolCrafts principles"
          >
            {PRINCIPLES.map((item, index) => (
              <motion.li
                key={item.title}
                variants={slideUp}
                className={cn(
                  "grid gap-2 border-b border-border/50 py-7 md:gap-3 md:py-8",
                  index === PRINCIPLES.length - 1 &&
                    PRINCIPLES.length % 2 === 1 &&
                    "md:col-span-2 md:max-w-xl",
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-['Outfit',sans-serif] text-xs font-semibold tabular-nums tracking-[0.12em] text-primary/75"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={sectionH3}>{item.title}</h3>
                </div>
                <p className={cn(sectionBody, "md:pl-8")}>{item.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
};
