import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoleculeViewer, MoleculeType } from './molecules/MoleculeViewer';

const molecules: MoleculeType[] = [
  'methanol',
  'cocaine',
  'caffeine',
  'nitrobenzene',
  'formicAcid',
  'penicillin',
  'nitricAcid',
  'carbonMonoxide',
  'carbonDioxide'
];

interface MoleculeFlashProps {
  width?: string;
  height?: string;
  interval?: number;
  position?: 'absolute' | 'relative' | 'fixed';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
  scale?: number;
  opacity?: number;
  rotate?: boolean;
  rotateSpeed?: number;
  hideOnMobile?: boolean;
  avoidMolecules?: MoleculeType[]; // Optional list of molecules to avoid
}

export const MoleculeFlash = ({
  width = '300px',
  height = '300px',
  interval = 3000,
  position = 'absolute',
  top,
  left,
  right,
  bottom,
  zIndex = 5,
  scale = 1,
  opacity = 0.8,
  rotate = true,
  rotateSpeed = 1,
  hideOnMobile = false,
  avoidMolecules = []
}: MoleculeFlashProps) => {
  // Store history of recently shown molecules (last 3)
  const recentMolecules = useRef<MoleculeType[]>([]);
  
  // Initialize with a random molecule that isn't in avoidMolecules
  const getInitialMolecule = (): number => {
    const availableMolecules = molecules.filter(m => !avoidMolecules.includes(m));
    return Math.floor(Math.random() * availableMolecules.length);
  };
  
  const [currentIndex, setCurrentIndex] = useState(getInitialMolecule());
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle molecule rotation and switching
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      
      // After fade out, change molecule and fade in with a longer transition
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const currentMolecule = molecules[prev];
          
          // Add current molecule to history
          if (!recentMolecules.current.includes(currentMolecule)) {
            recentMolecules.current.push(currentMolecule);
            // Keep only the last 3 molecules in history
            if (recentMolecules.current.length > 3) {
              recentMolecules.current.shift();
            }
          }
          
          // Choose a molecule that's not in recent history or avoidMolecules
          let newIndex;
          let attempts = 0;
          const maxAttempts = 10;
          
          do {
            newIndex = Math.floor(Math.random() * molecules.length);
            attempts++;
            // If we've tried too many times, just accept any non-identical molecule
            if (attempts > maxAttempts) {
              if (newIndex !== prev) break;
            }
          } while (
            (newIndex === prev || // Not the same as current
            recentMolecules.current.includes(molecules[newIndex]) || // Not in recent history
            avoidMolecules.includes(molecules[newIndex])) && // Not in avoid list
            attempts <= maxAttempts
          );
          
          return newIndex;
        });
        setIsVisible(true);
      }, 600); // Longer wait before showing new molecule
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, avoidMolecules]);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount and when window resizes
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render on mobile if hideOnMobile is true
  if (isMobile && hideOnMobile) {
    return null;
  }

  // Calculate responsive scale based on screen size
  const getResponsiveScale = () => {
    if (window.innerWidth < 768) {
      return scale * 0.6; // Smaller on mobile
    } else if (window.innerWidth < 1024) {
      return scale * 0.8; // Medium on tablets
    } else {
      return scale; // Original scale on desktop
    }
  };

  return (
    <div 
      style={{
        position,
        width,
        height,
        top,
        left,
        right,
        bottom,
        zIndex,
        pointerEvents: 'none',
        overflow: 'visible',
        // Hide elements on very small screens to avoid clutter
        display: isMobile && hideOnMobile ? 'none' : 'block',
        // Ensure molecule is centered and fully visible
        padding: '5%',
        boxSizing: 'border-box'
      }}
      className="molecule-flash-container"
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: scale * 0.95 }}
            animate={{ opacity, scale: isMobile ? scale * 0.6 : scale }}
            exit={{ opacity: 0, scale: scale * 0.95 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeInOut" 
            }}
            style={{ 
              width: '100%', 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MoleculeViewer
              moleculeType={molecules[currentIndex]}
              autoRotate={rotate}
              enableZoom={false}
              width="100%"
              height="100%"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 