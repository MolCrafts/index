import claudeLogo from "@/assets/claude.svg";
import { motion } from "framer-motion";
import { slideUp } from "../lib/animations";

interface SponsorProps {
  name: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
}

const sponsors: SponsorProps[] = [
  {
    name: "Claude for Open Source Project",
    href: "https://claude.com/contact-sales/claude-for-oss",
    logoSrc: claudeLogo,
    logoAlt: "Claude",
  },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          <div className="flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-sm">
            <div className="w-12 h-[1px] bg-primary opacity-50" />
            Sponsor
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {sponsors.map(({ name, href, logoSrc, logoAlt }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card/30 px-5 py-4 transition-colors hover:border-primary/40 hover:bg-card/60"
              >
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-7 w-7 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-base md:text-lg font-semibold text-foreground/90 group-hover:text-foreground">
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
