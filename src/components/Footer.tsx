import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeIn, staggerContainer } from "../lib/animations";
import { BRAND_TAGLINE } from "../lib/brandCopy";
import { contactHref } from "../lib/contact";
import { sectionContainer, sectionSubLabel } from "../lib/sectionStyles";
import { cn } from "../lib/utils";
import { LogoIcon } from "./Icons";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Deliberately does NOT re-list the packages. The nav dropdown and the homepage
 * Projects section already carry the full catalog; a third copy is what made this
 * footer read as noise.
 */
const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Projects", href: "/#projects" },
      { label: "What we do", href: "/#what-we-do" },
      { label: "Documentation", href: "https://docs.molcrafts.org/", external: true },
      { label: "GitHub", href: "https://github.com/MolCrafts", external: true },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Consulting", href: contactHref("Consulting") },
      { label: "Enterprise", href: contactHref("Enterprise") },
      { label: "Follow updates", href: "/#newsletter" },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "License",
        href: "https://github.com/MolCrafts/index/blob/master/LICENSE",
        external: true,
      },
    ],
  },
];

function FooterNavLink({ link }: { link: FooterLink }) {
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noreferrer noopener" : undefined}
      className={cn(
        "group inline-flex items-center gap-1 text-sm font-medium text-foreground/80 no-underline",
        "transition-colors hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      {link.label}
      {link.external && (
        <ArrowUpRight
          className="h-3.5 w-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-90"
          aria-hidden="true"
        />
      )}
      {link.external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="footer"
      className={cn(
        "mt-auto w-full border-t border-border/50 bg-background/80 backdrop-blur-sm",
        "shadow-[0_-1px_0_0_rgba(var(--accent-rgb),0.06)]",
      )}
    >
      <motion.div
        className={cn(sectionContainer, "grid gap-12 py-16 md:grid-cols-12 md:gap-10 md:py-20")}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="flex flex-col gap-5 md:col-span-4" variants={fadeIn}>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LogoIcon />
            <span className="text-foreground">MolCrafts</span>
          </a>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
            {BRAND_TAGLINE}
          </p>
          <a
            href="https://github.com/MolCrafts"
            rel="noreferrer noopener"
            target="_blank"
            aria-label="MolCrafts on GitHub (opens in a new tab)"
            className="self-start text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8 md:gap-8">
          {COLUMNS.map((column) => (
            <motion.nav
              key={column.title}
              className="flex flex-col gap-4"
              variants={fadeIn}
              aria-label={column.title}
            >
              <span className={cn(sectionSubLabel, "text-muted-foreground")}>{column.title}</span>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>
      </motion.div>

      <div
        className={cn(
          sectionContainer,
          "flex flex-col gap-3 border-t border-border/40 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <span>&copy; {currentYear} MolCrafts</span>
        <button
          type="button"
          onClick={scrollToTop}
          className="self-start text-left transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:self-auto"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
