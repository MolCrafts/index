import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { slideUp, staggerContainer } from "../lib/animations";
import { cn } from "../lib/utils";

export interface Capability {
  title: string;
  description: string;
  /** Present in the page data; deliberately unused — see the note below. */
  icon?: ReactNode;
}

/**
 * Shared capability index for every product page except Atomiverse.
 *
 * Replaces the centred icon-over-title-over-text grid. That grid had no borders, but an
 * even row of equal, centred tiles reads as cards regardless — which is the layout this
 * project does not want. This is a ledger instead: capability on the left, what it does on
 * the right, hairline between rows, nothing boxed and nothing centred. It also stops
 * caring how many items a page has, so three and six look like the same page.
 *
 * Icons are dropped on purpose. A large centred glyph is the single strongest card signal,
 * and in a two-column index it has nowhere to sit that is not decorative.
 */
export const ProductCapabilities = ({
  items,
  accentText,
}: {
  items: readonly Capability[];
  /** Per-product accent class for the capability name. */
  accentText: string;
}) => {
  return (
    <motion.dl
      variants={staggerContainer}
      /* Constrained inside the page's max-w-7xl shell: a two-column index at full
         width would run description lines far past a readable measure. */
      className="m-0 mx-auto flex max-w-4xl flex-col p-0 text-left"
      aria-label="Capabilities"
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={slideUp}
          className={cn(
            "group grid grid-cols-1 gap-x-10 gap-y-2 border-border/50 border-t py-7",
            "md:grid-cols-[minmax(0,20ch)_1fr] md:py-8",
          )}
        >
          <dt
            className={cn(
              "font-outfit text-xs font-bold uppercase tracking-[0.22em]",
              "transition-opacity group-hover:opacity-80",
              accentText,
            )}
          >
            {item.title}
          </dt>
          <dd className="m-0 text-base font-light leading-relaxed text-zinc-400 md:text-lg">
            {item.description}
          </dd>
        </motion.div>
      ))}
    </motion.dl>
  );
};
