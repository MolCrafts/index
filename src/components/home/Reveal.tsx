import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useScreenMotion } from "./ScreenMotion";

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay, for staggering siblings without a variant container. */
  delay?: number;
  className?: string;
}

/**
 * A short fade keeps product and commercial content readable on arrival.
 * The hero, Foundation and AI screens own their expressive entrances separately.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { visible, reduced } = useScreenMotion();
  return (
    <motion.div
      className={cn("min-w-0", className)}
      variants={fadeIn}
      initial={reduced ? false : "hidden"}
      animate={reduced || visible ? "visible" : "hidden"}
      transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.45 }}
    >
      {children}
    </motion.div>
  );
}
