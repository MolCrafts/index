import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import { type EcosystemItem, ecosystemCategories } from "../lib/ecosystem";
import {
  sectionBody,
  sectionContainer,
  sectionHeader,
  sectionLabel,
  sectionLead,
  sectionTitle,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

/**
 * Dense catalog row — name, role, status, one-line pitch.
 * No mascot grid, no rainbow hover fog: curated index, not logo farm.
 */
function ProjectRow({ item }: { item: EcosystemItem }) {
  return (
    <motion.a
      variants={slideUp}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer noopener" : undefined}
      className={cn(
        "group grid gap-1 border-t border-border/50 py-4 no-underline outline-none sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:py-3.5",
        "transition-colors hover:bg-card/40",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        item.status && "opacity-80",
      )}
      draggable={false}
    >
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1 sm:flex-col sm:gap-1">
        <span className="inline-flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {item.title}
          {item.external && (
            <ArrowUpRight
              className="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-90"
              aria-hidden="true"
            />
          )}
        </span>
        <span className="text-xs font-medium text-muted-foreground">{item.role}</span>
        {item.status && (
          <span className="text-[11px] font-medium text-muted-foreground/80">{item.status}</span>
        )}
      </div>
      <p className="text-sm font-normal leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/85 sm:text-[0.9375rem]">
        {item.description}
      </p>
    </motion.a>
  );
}

export const EcosystemArchitecture = () => {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent pb-24 pt-4 md:pb-32 md:pt-8"
    >
      <div className={sectionContainer}>
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(sectionHeader, "mb-12 max-w-3xl md:mb-16")}
        >
          <p className={sectionLabel}>Projects</p>
          <h2 className={sectionTitle}>Take one package. Or take the stack.</h2>
          <p className={sectionLead}>
            Each package installs and runs on its own. They share one record format, so output from
            one tool is input to the next.
          </p>
        </motion.div>

        <div className="flex flex-col gap-14 md:gap-16">
          {ecosystemCategories.map((group) => (
            <div key={group.title} className="flex flex-col">
              <div className="mb-1 flex flex-col gap-1 border-b border-border/70 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/85">
                  {group.title}
                </h3>
                <p className={cn(sectionBody, "text-sm sm:text-right")}>{group.blurb}</p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-col"
              >
                {group.items.map((item: EcosystemItem) => (
                  <ProjectRow key={item.title} item={item} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/60 pt-8 md:mt-16"
        >
          <a
            href="https://docs.molcrafts.org/"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline transition-opacity hover:opacity-90"
          >
            Read the docs
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href="https://github.com/MolCrafts"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            All repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};
