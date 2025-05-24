import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoleculeViewer, MoleculeType } from './MoleculeViewer';

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
  hideOnMobile?: boolean;
  avoidMolecules?: MoleculeType[]; // Optional list of molecules to avoid
  initialDelay?: number;
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
  hideOnMobile = false,
  avoidMolecules = [],
  initialDelay = 0
}: MoleculeFlashProps) => {
  // Lista dostępnych molekuł (z wykluczeniem tych, których chcemy unikać)
  const availableMolecules = useRef<MoleculeType[]>([]);
  
  // Store history of recently shown molecules (last 2)
  const recentMolecules = useRef<MoleculeType[]>([]);
  
  // Referencja do aktualnego timera
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Inicjalizacja stanu
  const [currentMolecule, setCurrentMolecule] = useState<MoleculeType | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicjalizacja dostępnych molekuł
  useEffect(() => {
    // Filtrujemy molekuły, które chcemy pokazywać
    availableMolecules.current = molecules.filter(m => !avoidMolecules.includes(m));
    
    // Opóźnione pierwsze pojawienie się molekuły
    const initialTimer = setTimeout(() => {
      // Wybierz losową molekułę z dostępnych
      selectRandomMolecule();
      setIsVisible(true);
      setIsInitialized(true);
    }, initialDelay);
    
    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, [avoidMolecules, initialDelay]);

  // Funkcja do wyboru losowej molekuły
  const selectRandomMolecule = () => {
    if (availableMolecules.current.length === 0) return;
    
    // Losujemy molekułę, która nie jest w ostatnio pokazywanych
    let attempts = 0;
    let selectedMolecule: MoleculeType | null = null;
    
    while (attempts < 10 && (selectedMolecule === null || 
           selectedMolecule === currentMolecule || 
           recentMolecules.current.includes(selectedMolecule))) {
      const randomIndex = Math.floor(Math.random() * availableMolecules.current.length);
      selectedMolecule = availableMolecules.current[randomIndex];
      attempts++;
    }
    
    // Jeśli nie znaleźliśmy nowej molekuły, wybierz dowolną inną niż aktualna
    if (selectedMolecule === currentMolecule) {
      const otherMolecules = availableMolecules.current.filter(m => m !== currentMolecule);
      if (otherMolecules.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherMolecules.length);
        selectedMolecule = otherMolecules[randomIndex];
      }
    }
    
    // Aktualizujemy stan tylko jeśli znaleźliśmy nową molekułę
    if (selectedMolecule && selectedMolecule !== currentMolecule) {
      // Dodaj aktualną molekułę do historii
      if (currentMolecule) {
        recentMolecules.current.push(currentMolecule);
        // Zachowaj tylko 2 ostatnie molekuły w historii
        if (recentMolecules.current.length > 2) {
          recentMolecules.current.shift();
        }
      }
      
      setCurrentMolecule(selectedMolecule);
    }
  };

  // Obsługa zmiany molekuły w interwałach
  useEffect(() => {
    if (!isInitialized) return;
    
    const rotateInterval = () => {
      setIsVisible(false);
      
      // Po zniknięciu wybierz nową molekułę i pokaż ją
      transitionTimerRef.current = setTimeout(() => {
        selectRandomMolecule();
        setIsVisible(true);
      }, 500); // Czas przejścia między molekułami
    };
    
    // Ustaw interwał rotacji molekuł
    timerRef.current = setInterval(rotateInterval, interval);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, [interval, isInitialized, currentMolecule]);

  // Obsługa responsywności
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Nie renderuj na urządzeniach mobilnych jeśli hideOnMobile=true
  if (isMobile && hideOnMobile) return null;

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
        padding: '0',
        boxSizing: 'border-box'
      }}
      className="molecule-flash-container"
    >
      <AnimatePresence mode="wait">
        {isVisible && currentMolecule && (
          <motion.div
            key={currentMolecule}
            initial={{ opacity: 0, scale: scale * 0.8 }}
            animate={{ 
              opacity, 
              scale: isMobile ? scale * 0.6 : scale,
              transition: { 
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: scale * 0.8,
              transition: { 
                duration: 0.4,
                ease: "easeOut"
              } 
            }}
            style={{ 
              width: '100%', 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="molecule-flash-content"
          >
            <MoleculeViewer
              moleculeType={currentMolecule}
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