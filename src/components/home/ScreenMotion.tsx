import { useReducedMotion } from "framer-motion";
import { createContext, useContext } from "react";
import { FORCE_FULL_MOTION } from "@/lib/animations";

export const ScreenMotionContext = createContext(true);

export function useScreenMotion() {
  const visible = useContext(ScreenMotionContext);
  const reduced = useReducedMotion() && !FORCE_FULL_MOTION;
  return { visible, reduced };
}
