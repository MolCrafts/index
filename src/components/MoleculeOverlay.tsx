import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Import the molecule images
import ethanolMolecule from "../assets/molecules/Ethanol_Conformer3D_small.webp";
import methanolMolecule from "../assets/molecules/Methanol_Conformer3D_small.webp";
import cocaineMolecule from "../assets/molecules/Cocaine_Conformer3D_small.webp";
import carbonDioxideMolecule from "../assets/molecules/Carbon-Dioxide_Conformer3D_small.webp";

// Array of molecule images
const moleculeImages = [
  ethanolMolecule,
  methanolMolecule,
  cocaineMolecule,
  carbonDioxideMolecule
];

// Define safe zones where molecules shouldn't appear
const ZONES = {
  // Avoid center area (text and buttons)
  CENTER: {
    widthPercent: 70, // Center area width percentage
    heightPercent: 60, // Center area height percentage
    topOffset: 30 // Percentage from top
  }
};

export const MoleculeOverlay = () => {
  const [showMolecule, setShowMolecule] = useState(false);
  const [currentMolecule, setCurrentMolecule] = useState(0);
  const [moleculePosition, setMoleculePosition] = useState({ top: "30%", left: "70%" });
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to calculate random position based on viewport and avoid content areas
  const getRandomPosition = () => {
    // Get viewport width and height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate center safe zone (where text/buttons are)
    const centerWidth = (ZONES.CENTER.widthPercent / 100) * viewportWidth;
    const centerLeft = (viewportWidth - centerWidth) / 2;
    const centerTop = (ZONES.CENTER.topOffset / 100) * viewportHeight;
    const centerBottom = centerTop + ((ZONES.CENTER.heightPercent / 100) * viewportHeight);
    
    // Define left, right, top regions where molecules can appear
    const regions = [
      // Left side
      { 
        minX: 10, 
        maxX: centerLeft - 50, // Leave some margin
        minY: 10,
        maxY: viewportHeight - 100
      },
      // Right side
      {
        minX: centerLeft + centerWidth + 50, // Leave some margin
        maxX: viewportWidth - 100, // Right margin
        minY: 10,
        maxY: viewportHeight - 100
      },
      // Top area
      {
        minX: centerLeft,
        maxX: centerLeft + centerWidth,
        minY: 5,
        maxY: centerTop - 30 // Space above content
      },
      // Bottom area
      {
        minX: centerLeft,
        maxX: centerLeft + centerWidth,
        minY: centerBottom + 30, // Space below content
        maxY: viewportHeight - 100
      }
    ];
    
    // Filter out regions that are too small
    const validRegions = regions.filter(r => 
      r.maxX - r.minX > 100 && r.maxY - r.minY > 100
    );
    
    // If no valid regions, use fallback position
    if (validRegions.length === 0) {
      return { top: "10%", left: "10%" };
    }
    
    // Select random region
    const region = validRegions[Math.floor(Math.random() * validRegions.length)];
    
    // Calculate random position within the selected region
    const randomX = Math.floor(Math.random() * (region.maxX - region.minX)) + region.minX;
    const randomY = Math.floor(Math.random() * (region.maxY - region.minY)) + region.minY;
    
    // Convert to percentage (for responsive positioning)
    const leftPercent = (randomX / viewportWidth) * 100;
    const topPercent = (randomY / viewportHeight) * 100;
    
    return { 
      top: `${topPercent}%`, 
      left: `${leftPercent}%` 
    };
  };

  // Flash molecule effect
  useEffect(() => {
    // Show molecule for 3 seconds, then hide for 2 seconds
    const showTimer = setInterval(() => {
      // Pick random molecule first (while hidden)
      const randomIndex = Math.floor(Math.random() * moleculeImages.length);
      setCurrentMolecule(randomIndex);
      
      // Generate random position and show
      setMoleculePosition(getRandomPosition());
      setShowMolecule(true);
      
      // Hide after 3 seconds
      setTimeout(() => setShowMolecule(false), 3000);
    }, 5000); // Every 5 seconds
    
    // Start with showing a molecule, after a slight delay
    setTimeout(() => {
      setMoleculePosition(getRandomPosition());
      setCurrentMolecule(Math.floor(Math.random() * moleculeImages.length));
      setShowMolecule(true);
    }, 800);
    
    return () => clearInterval(showTimer);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {showMolecule && (
        <motion.img
          src={moleculeImages[currentMolecule]}
          alt="Molecule"
          className="absolute pointer-events-none z-10 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain molecule-glow-effect select-none"
          style={{ ...moleculePosition }}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 10,
            transition: {
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              rotate: { 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }
            }
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          draggable="false"
        />
      )}
    </div>
  );
};

// Default export for lazy loading
export default MoleculeOverlay; 