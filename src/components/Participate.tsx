import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, BookOpen, Building2, Wrench } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import { contactHref } from "../lib/contact";
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

interface Path {
  title: string;
  audience: string;
  description: string;
  href: string;
  cta: string;
  Icon: LucideIcon;
  external?: boolean;
  secondary?: { href: string; label: string };
  primary?: boolean;
}

const PATHS: Path[] = [
  {
    title: "Open source",
    audience: "Researchers, students, developers",
    description:
      "Every package is open source and installable today. Read the docs, open an issue, send a patch — the work is built in public.",
    href: "https://docs.molcrafts.org/",
    cta: "Open the docs",
    Icon: BookOpen,
    external: true,
    primary: true,
    secondary: { href: "https://github.com/MolCrafts", label: "Contribute on GitHub" },
  },
  {
    title: "Consulting",
    audience: "Groups with a workflow to move",
    description:
      "Integration into an existing simulation workflow: implementation, deployment, and training.",
    href: contactHref("Consulting"),
    cta: "Tell us what you need",
    Icon: Wrench,
  },
  {
    title: "Enterprise",
    audience: "Private R&D organisations",
    description:
      "Private deployment, custom integration, and audit trails for regulated work. Your own methods stay yours, and stay private — ours stay open.",
    href: contactHref("Enterprise"),
    cta: "Start a conversation",
    Icon: Building2,
  },
];

export const Participate = () => {
  const primary = PATHS.find((p) => p.primary) ?? PATHS[0];
  const secondary = PATHS.filter((p) => !p.primary);

  return (
    <section id="participate" className={sectionShellTall} aria-labelledby="participate-heading">
      <div className={sectionContainer}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={sectionStack}
        >
          <motion.div variants={slideUp} className={cn(sectionHeader, "max-w-3xl")}>
            <p className={sectionLabel}>Work with us</p>
            <h2 id="participate-heading" className={sectionTitle}>
              The stack is open. The help is optional.
            </h2>
            <p className={sectionLead}>
              Everything MolCrafts builds stays open source. Some teams want it running inside their
              own environment, on their own methods — that part we do together.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-0 border-t border-border/60 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
          >
            {/* Primary path — open source takes the weight */}
            <motion.div
              variants={slideUp}
              className="flex flex-col border-b border-border/60 py-8 pr-0 md:border-b-0 md:border-r md:py-10 md:pr-10 lg:pr-14"
            >
              <a
                href={primary.href}
                target={primary.external ? "_blank" : undefined}
                rel={primary.external ? "noreferrer noopener" : undefined}
                className={cn(
                  "group flex h-full flex-col gap-4 no-underline outline-none",
                  "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <primary.Icon
                  className="h-5 w-5 text-primary transition-colors"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-2">
                  <h3 className={cn(sectionH3, "md:text-2xl")}>{primary.title}</h3>
                  <p className="text-xs font-medium text-muted-foreground">{primary.audience}</p>
                  <p className={cn(sectionBody, "max-w-md")}>{primary.description}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
                  {primary.cta}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
              {primary.secondary && (
                <a
                  href={primary.secondary.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
                >
                  {primary.secondary.label}
                </a>
              )}
            </motion.div>

            {/* Secondary paths — quieter */}
            <motion.ul
              variants={staggerContainer}
              className="m-0 flex list-none flex-col gap-0 p-0 md:pl-10 lg:pl-14"
            >
              {secondary.map((path, index) => {
                const Icon = path.Icon;
                return (
                  <motion.li
                    key={path.title}
                    variants={slideUp}
                    className={cn(
                      "flex flex-col py-7",
                      index < secondary.length - 1 && "border-b border-border/50",
                    )}
                  >
                    <a
                      href={path.href}
                      className={cn(
                        "group flex flex-col gap-2.5 no-underline outline-none",
                        "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                          aria-hidden="true"
                        />
                        <h3 className={sectionH3}>{path.title}</h3>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground/80">
                        {path.audience}
                      </p>
                      <p className={cn(sectionBody, "max-w-sm text-sm")}>{path.description}</p>
                      <span className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-primary">
                        {path.cta}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          <motion.p variants={slideUp} className="text-sm font-normal text-muted-foreground/80">
            Not ready to talk?{" "}
            <a
              href="#newsletter"
              className="text-primary no-underline transition-opacity hover:opacity-80"
            >
              Follow what ships
            </a>{" "}
            instead.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
