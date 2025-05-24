import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoleculeViewer, MoleculeType } from './molecules/MoleculeViewer';

// Lista molekuł do losowego wyświetlania podczas ładowania
const loadingMolecules: MoleculeType[] = [
  'methanol',
  'caffeine',
  'penicillin',
  'carbonDioxide'
];

interface LoadingScreenProps {
  isLoading: boolean;
  text?: string;
  color?: string;
}

export const LoadingScreen = ({ 
  isLoading, 
  text = 'Loading...', 
  color = 'hsl(var(--primary))' 
}: LoadingScreenProps) => {
  const [molecule, setMolecule] = useState<MoleculeType>(
    loadingMolecules[Math.floor(Math.random() * loadingMolecules.length)]
  );
  
  // Zmiana molekuły co 2 sekundy podczas ładowania
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      const newMolecule = loadingMolecules[Math.floor(Math.random() * loadingMolecules.length)];
      setMolecule(newMolecule);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isLoading]);
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50 loading-screen-backdrop"
        >
          <div className="loading-molecule-container">
            {/* Pulsujący element w tle */}
            <div className="loading-pulse"></div>
            
            {/* Dodatkowy pulsujący element z przesunięciem czasowym */}
            <motion.div
              className="loading-pulse"
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            ></motion.div>
            
            {/* Molekuła */}
            <MoleculeViewer 
              moleculeType={molecule} 
              autoRotate={true}
              enableZoom={false}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-medium mt-8 tracking-wide"
          >
            {text}
          </motion.div>
          
          {/* Animowane kropki */}
          <div className="mt-4 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
          
          {/* Wersja aplikacji */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="absolute bottom-4 text-sm"
          >
            MolCrafts v1.2.0
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 