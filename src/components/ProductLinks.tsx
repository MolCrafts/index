import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import { PACKAGE_INSTALL } from "../lib/packages";
import { cn } from "../lib/utils";

/**
 * The exit every product page was missing. Nine of eleven landing pages had zero
 * outbound links: a visitor who arrived from search read the whole page and had the
 * browser back button as their only next step.
 *
 * `install` is set from the package REGISTRY, verified 2026-08-09 — never from a README
 * badge, which was wrong three times. Packages with no published artifact deliberately
 * show no command rather than a plausible-looking one that would fail.
 */
export const ProductLinks = ({ slug }: { slug: string }) => {
  const product = PACKAGE_INSTALL[slug];
  if (!product) return null;

  return (
    <section className="border-border/60 border-t py-16 md:py-20" aria-label="Get started">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="container mx-auto flex max-w-5xl flex-col gap-8 px-4 lg:px-8"
      >
        <motion.div variants={slideUp} className="flex flex-col gap-4">
          {product.command ? (
            <>
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Install
              </span>
              <code className="w-fit max-w-full overflow-x-auto rounded-sm bg-zinc-900/70 px-4 py-3 font-mono text-sm text-zinc-100">
                {product.command}
              </code>
            </>
          ) : (
            <p className="text-base font-light text-muted-foreground">{product.note}</p>
          )}
        </motion.div>

        <motion.div
          variants={slideUp}
          className="flex flex-wrap items-center gap-x-8 gap-y-4 border-border/60 border-t pt-8"
        >
          <a
            href={`https://docs.molcrafts.org/${slug}/`}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "group inline-flex items-center gap-2 text-sm font-semibold uppercase",
              "tracking-[0.18em] text-primary no-underline transition-opacity hover:opacity-90",
            )}
          >
            Read the docs
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href={`https://github.com/MolCrafts/${product.repo}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            View on GitHub
          </a>
          <a
            href="/#projects"
            className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground sm:ml-auto"
          >
            All MolCrafts projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
