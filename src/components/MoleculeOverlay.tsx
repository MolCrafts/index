import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import aspirinMolecule from "@/assets/molecules/aspirin.webp";
import caffeineMolecule from "@/assets/molecules/caffeine.webp";
import dopamineMolecule from "@/assets/molecules/dopamine.webp";
import ibuprofenMolecule from "@/assets/molecules/ibuprofen.webp";
import nicotineMolecule from "@/assets/molecules/nicotine.webp";
import quinineMolecule from "@/assets/molecules/quinine.webp";

const MOLECULES = [
  aspirinMolecule,
  caffeineMolecule,
  dopamineMolecule,
  ibuprofenMolecule,
  nicotineMolecule,
  quinineMolecule,
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface SlotState {
  visible: boolean;
  uid: number;
  imgIdx: number;
  top: string;
  left: string;
}

function useSlot(
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  showMs: number,
  periodMs: number,
  initialDelayMs: number,
): SlotState {
  const [state, setState] = useState<SlotState>({
    visible: false,
    uid: 0,
    imgIdx: 0,
    top: "50%",
    left: "10%",
  });

  // Track the hide-timer so it can be cleared on unmount
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    const top = `${rand(yMin, yMax).toFixed(1)}%`;
    const left = `${rand(xMin, xMax).toFixed(1)}%`;
    const imgIdx = Math.floor(Math.random() * MOLECULES.length);
    setState((s) => ({ visible: true, uid: s.uid + 1, imgIdx, top, left }));
    if (hideTimerRef.current !== null) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setState((s) => ({ ...s, visible: false })), showMs);
  }, [xMin, xMax, yMin, yMax, showMs]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const initTimer = setTimeout(() => {
      show();
      intervalId = setInterval(show, periodMs);
    }, initialDelayMs);

    return () => {
      clearTimeout(initTimer);
      if (intervalId !== null) clearInterval(intervalId);
      if (hideTimerRef.current !== null) clearTimeout(hideTimerRef.current);
    };
  }, [show, periodMs, initialDelayMs]);

  return state;
}

export const MoleculeOverlay = () => {
  // Left edge slot — cycles every 7.5s, visible 4.5s
  const leftSlot = useSlot(3, 16, 15, 78, 4500, 7500, 700);
  // Right edge slot — cycles every 8.5s, visible 4.5s, offset start
  const rightSlot = useSlot(81, 93, 15, 78, 4500, 8500, 2800);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {leftSlot.visible && (
          <motion.img
            key={`left-${leftSlot.uid}`}
            src={MOLECULES[leftSlot.imgIdx]}
            alt="Molecule"
            className="absolute pointer-events-none z-10 w-36 h-36 md:w-44 md:h-44 object-contain select-none molecule-glow-effect"
            style={{
              top: leftSlot.top,
              left: leftSlot.left,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.82, y: 0, rotate: -8 }}
            animate={{
              opacity: 0.82,
              scale: 1,
              y: [0, -22, 0, 22, 0],
              rotate: [-8, 8],
            }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              scale: { duration: 1, ease: "easeOut" },
              y: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              rotate: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.88,
              transition: { duration: 1, ease: "easeIn" },
            }}
            draggable="false"
          />
        )}
        {rightSlot.visible && (
          <motion.img
            key={`right-${rightSlot.uid}`}
            src={MOLECULES[rightSlot.imgIdx]}
            alt="Molecule"
            className="absolute pointer-events-none z-10 w-40 h-40 md:w-52 md:h-52 object-contain select-none molecule-glow-effect"
            style={{
              top: rightSlot.top,
              left: rightSlot.left,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.82, y: 0, rotate: 6 }}
            animate={{
              opacity: 0.88,
              scale: 1,
              y: [0, 24, 0, -24, 0],
              rotate: [6, -6],
            }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              scale: { duration: 1, ease: "easeOut" },
              y: {
                duration: 9,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              rotate: {
                duration: 11,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.88,
              transition: { duration: 1, ease: "easeIn" },
            }}
            draggable="false"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoleculeOverlay;
