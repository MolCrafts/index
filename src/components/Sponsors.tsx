import claudeLogoUrl from "@/assets/claude.svg";
import { motion } from "framer-motion";
import { slideUp } from "../lib/animations";
import { sectionContainer, sectionLabel, sectionLabelRule } from "../lib/sectionStyles";

interface SponsorProps {
  name: string;
  href: string;
  /** Asset URL from Rsbuild SVG import (not an SVGR component). */
  logoSrc: string;
  logoAlt: string;
}

const sponsors: SponsorProps[] = [
  {
    name: "Claude for Open Source Project",
    href: "https://claude.com/contact-sales/claude-for-oss",
    logoSrc: claudeLogoUrl,
    logoAlt: "Claude",
  },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="relative py-20 md:py-28" aria-labelledby="sponsors-heading">
      <div className={sectionContainer}>
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-4">
            <div className={sectionLabel}>
              <div className={sectionLabelRule} aria-hidden="true" />
              Support
            </div>
            <h2 id="sponsors-heading" className="sr-only">
              Supporters
            </h2>
            <p className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              Organizations funding the open work.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {sponsors.map(({ name, href, logoSrc, logoAlt }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card/30 px-5 py-4 no-underline outline-none transition-colors hover:border-primary/40 hover:bg-card/60 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  width={32}
                  height={32}
                  className="h-8 w-8 opacity-90 transition-opacity group-hover:opacity-100"
                />
                <span className="text-base font-semibold text-foreground/90 transition-colors group-hover:text-foreground md:text-lg">
                  {name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
