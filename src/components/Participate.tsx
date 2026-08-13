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
  sectionLabelRule,
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
    secondary: { href: "https://github.com/MolCrafts", label: "Contribute on GitHub" },
  },
  {
    title: "Consulting",
    audience: "Groups with a workflow to move",
    description:
      "Help getting the stack into an existing simulation workflow — integration, method implementation, and training for your team.",
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
  return (
    <section id="participate" className={sectionShellTall} aria-labelledby="participate-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 30%, rgba(var(--accent-rgb), 0.08), transparent 55%), radial-gradient(ellipse 40% 35% at 90% 70%, hsl(var(--primary) / 5%), transparent 50%)",
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
            className={cn(
              sectionHeader,
              "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16",
            )}
          >
            <div className="flex flex-col gap-5 md:gap-6">
              <div className={sectionLabel}>
                <div className={sectionLabelRule} aria-hidden="true" />
                Work with us
              </div>
              <h2 id="participate-heading" className={cn(sectionTitle, "lg:max-w-none")}>
                The stack is open. The help is optional.
              </h2>
            </div>
            <p className={cn(sectionLead, "lg:max-w-none lg:pb-1")}>
              Everything MolCrafts builds stays open source. Some teams want it running inside their
              own environment, on their own methods — that part we do together.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            className="m-0 grid list-none gap-0 p-0 md:grid-cols-3"
          >
            {PATHS.map((path, index) => {
              const Icon = path.Icon;
              return (
                <motion.li
                  key={path.title}
                  variants={slideUp}
                  className={cn(
                    "flex flex-col py-8 md:px-6 md:py-10 lg:px-8",
                    index === 0 && "md:pl-0",
                    index === PATHS.length - 1 && "md:pr-0",
                  )}
                >
                  <a
                    href={path.href}
                    target={path.external ? "_blank" : undefined}
                    rel={path.external ? "noreferrer noopener" : undefined}
                    className={cn(
                      "group flex h-full flex-col gap-5 no-underline outline-none",
                      "rounded-sm focus-visible:ring-2 focus-visible:ring-primary/40",
                      "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <Icon
                      className="h-5 w-5 text-primary/85 transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-2.5">
                      <h3 className={sectionH3}>{path.title}</h3>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                        {path.audience}
                      </p>
                      <p className={cn(sectionBody, "max-w-sm")}>{path.description}</p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                      {path.cta}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                  {path.secondary && (
                    <a
                      href={path.secondary.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-4 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
                    >
                      {path.secondary.label}
                    </a>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.p variants={slideUp} className="text-sm font-light text-muted-foreground/80">
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
