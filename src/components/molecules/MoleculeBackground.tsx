import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoleculeType, MoleculeViewer } from './MoleculeViewer';

// Wszystkie dostępne typy molekuł
const AVAILABLE_MOLECULES: MoleculeType[] = [
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

interface MoleculeInstanceProps {
  id: number;
  moleculeType: MoleculeType;
  position: { x: number; y: number };
  size: number;
  duration: number;
  onRemove: (id: number) => void;
}

// Pojedyncza instancja molekuły z animacją
const MoleculeInstance = ({ 
  id, 
  moleculeType, 
  position, 
  size, 
  duration, 
  onRemove 
}: MoleculeInstanceProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Ustawienie czasu życia molekuły
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      // Czas na animację fadeout
      setTimeout(() => onRemove(id), 1000);
    }, duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [duration, id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: visible ? 0.8 : 0, scale: visible ? 1 : 0.5 }}
      transition={{ duration: 1 }}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: 'none', // Zapobieganie blokowania interakcji z tłem
        zIndex: 5,
        transformOrigin: 'center center',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <MoleculeViewer 
        moleculeType={moleculeType} 
        autoRotate={true} 
        enableZoom={false}
        width="100%" 
        height="100%" 
      />
    </motion.div>
  );
};

interface MoleculeBackgroundProps {
  /** Częstotliwość pojawiania się nowych molekuł (w ms) */
  frequency?: number;
  /** Maksymalna liczba molekuł widocznych jednocześnie */
  maxMolecules?: number;
  /** Minimalny czas życia molekuły (w ms) */
  minDuration?: number;
  /** Maksymalny czas życia molekuły (w ms) */
  maxDuration?: number;
  /** Minimalny rozmiar molekuły (w px) */
  minSize?: number;
  /** Maksymalny rozmiar molekuły (w px) */
  maxSize?: number;
  /** Czy pokazywać molekuły (można użyć do wstrzymania renderowania) */
  enabled?: boolean;
}

export const MoleculeBackground = ({
  frequency = 3000,
  maxMolecules = 8,
  minDuration = 5000,
  maxDuration = 15000,
  minSize = 80,
  maxSize = 150,
  enabled = true
}: MoleculeBackgroundProps) => {
  const [molecules, setMolecules] = useState<Array<{
    id: number;
    moleculeType: MoleculeType;
    position: { x: number; y: number };
    size: number;
    duration: number;
  }>>([]);
  
  const nextIdRef = useRef(1);

  // Funkcja usuwająca molekułę
  const removeMolecule = (id: number) => {
    setMolecules(prev => prev.filter(m => m.id !== id));
  };

  // Funkcja generująca losowe wartości
  const getRandomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Funkcja generująca losową molekułę
  const generateRandomMolecule = () => {
    const moleculeType = AVAILABLE_MOLECULES[Math.floor(Math.random() * AVAILABLE_MOLECULES.length)];
    const position = {
      x: getRandomValue(5, 95), // 5% - 95% szerokości kontenera
      y: getRandomValue(5, 95)  // 5% - 95% wysokości kontenera
    };
    const size = getRandomValue(minSize, maxSize);
    const duration = getRandomValue(minDuration, maxDuration);
    const id = nextIdRef.current++;

    return { id, moleculeType, position, size, duration };
  };

  // Efekt dodający nowe molekuły zgodnie z ustawioną częstotliwością
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setMolecules(prev => {
        // Jeśli osiągnięto maksymalną liczbę molekuł, nie dodawaj nowych
        if (prev.length >= maxMolecules) return prev;
        
        return [...prev, generateRandomMolecule()];
      });
    }, frequency);

    return () => clearInterval(interval);
  }, [frequency, maxMolecules, enabled, minDuration, maxDuration, minSize, maxSize]);

  // Zainicjuj tło kilkoma molekułami
  useEffect(() => {
    if (!enabled) return;
    
    // Dodaj kilka początkowych molekuł
    const initialMolecules = Array.from({ length: Math.min(3, maxMolecules) }, () => 
      generateRandomMolecule()
    );
    
    setMolecules(initialMolecules);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1
    }}>
      <AnimatePresence>
        {molecules.map(molecule => (
          <MoleculeInstance
            key={molecule.id}
            id={molecule.id}
            moleculeType={molecule.moleculeType}
            position={molecule.position}
            size={molecule.size}
            duration={molecule.duration}
            onRemove={removeMolecule}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}; 