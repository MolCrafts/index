import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoIcon } from './Icons';

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
  const [dotCount, setDotCount] = useState(0);
  
  // Animacja kropek ładowania
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    
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
          className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-background/90 backdrop-blur-sm"
        >
          <div className="relative">
            {/* Pulsujące koło w tle */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              style={{ 
                width: '120px', 
                height: '120px',
                left: '-35px',
                top: '-35px'
              }}
            />
            
            {/* Dodatkowy pulsujący element z przesunięciem czasowym */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/5"
              animate={{ 
                scale: [1, 1.5, 1], 
                opacity: [0.2, 0.4, 0.2] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity, 
                repeatType: "reverse",
                delay: 0.5
              }}
              style={{ 
                width: '150px', 
                height: '150px',
                left: '-50px',
                top: '-50px'
              }}
            />
            
            {/* Logo bez obracania */}
            <motion.div
              animate={{ 
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{ 
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              style={{ width: '50px', height: '50px' }}
            >
              <LogoIcon />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-medium mt-8 tracking-wide flex items-center"
          >
            <span>{text}</span>
            <span className="w-12 text-left ml-1">
              {'.'.repeat(dotCount)}
            </span>
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