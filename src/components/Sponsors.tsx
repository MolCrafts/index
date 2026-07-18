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
          className="flex flex-col gap-14"
        >
          <div className="flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-sm">
            <div className="w-12 h-[1px] bg-primary opacity-50" />
            Sponsor
          </div>

          <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
            {sponsors.map(({ name, href, logoSrc, logoAlt }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col items-center gap-4 no-underline"
              >
                {/* Monochrome silhouette logo */}
                <span
                  role="img"
                  aria-label={logoAlt}
                  className="block h-12 w-12 bg-foreground/45 group-hover:bg-foreground/80 transition-colors duration-300"
                  style={{
                    maskImage: `url(${logoSrc})`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: `url(${logoSrc})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                />
                <span className="text-sm font-medium tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center max-w-[14rem]">
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
