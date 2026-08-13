import { MOTION_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Use block-level element when the reveal wraps a section of layout. */
  as?: "div" | "header" | "li" | "p" | "span";
  /** Loosen the trigger for short elements pinned near a scroll edge — the
      default -8% bottom margin never fires for content living in that band. */
  viewport?: { amount?: number; margin?: string };
}

/**
 * Fade + rise when entering the viewport.
 * Replays every time the element leaves and re-enters (no once: true).
 */
export function Reveal({ children, className, delay = 0, as = "div", viewport }: RevealProps) {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{
        once: false,
        amount: viewport?.amount ?? 0.28,
        margin: viewport?.margin ?? "0px 0px -6% 0px",
      }}
      transition={{ duration: 0.42, delay, ease: MOTION_EASE }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
}

/** Parent that staggers children — replays on every re-entry. */
export function Stagger({
  children,
  className,
  delayChildren = 0.1,
  stagger = 0.12,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.22, margin: "0px 0px -6% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: MOTION_EASE },
  },
};

export function StaggerItem({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div className={cn(className)} variants={staggerItem} {...rest}>
      {children}
    </motion.div>
  );
}

/** Hero word-by-word entrance (not whileInView — plays on mount). */
export function WordReveal({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-flex flex-wrap justify-center gap-x-[0.28em]", className)}>
      {words.map((word, i) => (
        <motion.span
          // Static hero phrase — order is fixed, index is stable.
          key={`w-${word}-${String(i).padStart(2, "0")}`}
          className={cn("inline-block", wordClassName)}
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: MOTION_EASE }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
