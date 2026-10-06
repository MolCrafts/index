import { homeReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useScreenMotion } from "./ScreenMotion";

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay, for staggering siblings without a variant container. */
  delay?: number;
  className?: string;
}

/**
 * Replays the shared focus-and-gather entrance when its screen is selected.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { visible, reduced } = useScreenMotion();
  return (
    <motion.div
      className={cn("min-w-0", className)}
      variants={homeReveal}
      initial={reduced ? false : "hidden"}
      animate={reduced || visible ? "visible" : "hidden"}
      transition={{ delay: reduced ? 0 : 0.3 + delay, duration: reduced ? 0 : 1.05 }}
    >
      {children}
    </motion.div>
  );
}
