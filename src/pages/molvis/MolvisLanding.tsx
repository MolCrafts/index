import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef } from "react";
import { ProductCapabilities } from "../../components/ProductCapabilities";
import { ProductLinks } from "../../components/ProductLinks";
import { fadeIn, slideUp, staggerContainer } from "../../lib/animations";
import { GRADIENT_TEXT, PRODUCT_ACCENTS } from "../../lib/productAccents";
import {
  MOLECULAR_GLOW,
  MOLECULE_BLOB,
  PRODUCT_DISPLAY_HEADING,
  PRODUCT_HERO_SECTION,
  PRODUCT_SECTION_AURA,
} from "../../lib/styleTokens";
import { cn } from "../../lib/utils";

const MoleculeOverlay = lazy(() =>
  import("../../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

const ACCENT = PRODUCT_ACCENTS.molvis;

export const MolVisLanding = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <motion.section
        className={PRODUCT_HERO_SECTION}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div
          className={cn(MOLECULE_BLOB, "right-1/4 top-[35%] [animation-delay:2s]")}
          aria-hidden="true"
        />
        <div
          className={cn(MOLECULE_BLOB, "bottom-[15%] left-[15%] [animation-delay:6s]")}
          aria-hidden="true"
        />
        <div
          className={cn(MOLECULAR_GLOW, "left-[60%] top-1/2 size-[12.5rem]")}
          aria-hidden="true"
        />

        <Suspense fallback={null}>
          <MoleculeOverlay
            href="https://docs.molcrafts.org/molvis/"
            hintLabel="Try It Live ↗"
            placement="spotlight"
          />
        </Suspense>

        <motion.div
          className="text-center w-full max-w-7xl mx-auto px-4 z-10 mb-32"
          variants={slideUp}
        >
          <motion.header className="flex flex-col items-center justify-center w-full">
            <motion.h3
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl",
                GRADIENT_TEXT,
                ACCENT.kicker,
                "font-playfair italic font-medium mb-4 sm:mb-6 pb-2",
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              See it before you trust it.
            </motion.h3>

            <motion.h1
              className={cn(
                "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-product-hero font-sans font-extrabold text-center mx-auto tracking-tighter leading-headline w-full mb-4 sm:mb-6 pb-4",
                GRADIENT_TEXT,
                ACCENT.title,
                "pt-2",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              MolVis
            </motion.h1>

            <motion.h2
              className={cn(PRODUCT_DISPLAY_HEADING, GRADIENT_TEXT, ACCENT.subhead, "pb-2")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Interactive 3D molecular visualization for web, VS Code, and Jupyter
            </motion.h2>
          </motion.header>
        </motion.div>
      </motion.section>

      <section id="toolkit" className={cn(PRODUCT_SECTION_AURA, "py-24 sm:py-32")}>
        <motion.div
          ref={sectionRef}
          className="container mx-auto px-4 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-20" variants={slideUp}>
            <motion.h2
              className={cn(PRODUCT_DISPLAY_HEADING, GRADIENT_TEXT, ACCENT.heading, "pb-2")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              What you can do in the <span className={ACCENT.headingSpanText}>viewer</span>
            </motion.h2>
          </motion.div>

          <ProductCapabilities
            accentText={ACCENT.headingSpanText}
            items={[
              {
                title: "Browser, editor, and notebook",
                description:
                  "Runs in the browser, your editor, and notebooks, with hardware-accelerated 3D rendering over a fast molecular data core.",
              },
              {
                title: "Interactive rendering",
                description:
                  "View, select, edit, manipulate, measure, and scrub trajectories through one interactive 3D toolkit.",
              },
              {
                title: "Multiple interfaces",
                description:
                  "One codebase ships a core package, a web app, a notebook widget, and an editor extension with a modular modifier pipeline.",
              },
            ]}
          />
        </motion.div>
      </section>

      <ProductLinks slug="molvis" />
    </div>
  );
};
