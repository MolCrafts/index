import { blockAuraReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useScreenMotion } from "./ScreenMotion";

/**
 * The soft light a block's header sits in.
 *
 * The AI screen carried the page's only aura, which is why the blocks around it
 * read as a different, flatter design. This is the same gradient recipe at about
 * half the alpha and anchored to the header rather than the viewport centre — so
 * the whole page shares one atmosphere and that screen still peaks.
 *
 * It reveals once with the block; `MotionConfig` in `main.tsx` reduces it for
 * readers who asked for less motion.
 */
export function BlockAura({ className }: { className?: string }) {
  const { visible, reduced } = useScreenMotion();
  return (
    <motion.div
      aria-hidden="true"
      variants={blockAuraReveal}
      initial={reduced ? false : "hidden"}
      animate={reduced || visible ? "visible" : "hidden"}
      transition={reduced ? { duration: 0 } : undefined}
      className={cn(
        "pointer-events-none absolute left-0 top-1/4 -z-10 h-[min(30vw,26rem)] w-[min(64vw,60rem)] -translate-y-1/3 rounded-full blur-[30px]",
        "home-aura bg-[radial-gradient(ellipse_at_center,rgba(var(--accent-rgb),0.16)_0%,rgba(var(--accent-rgb),0.08)_38%,hsl(var(--primary)/0.055)_56%,transparent_74%)]",
        className,
      )}
    />
  );
}
