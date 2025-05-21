import { useState, useEffect, FC } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const LazyImage: FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Resetuj stan przy zmianie źródła
    if (src !== imageSrc) {
      setIsLoaded(false);
      setImageSrc(null);
      
      // Tworzenie nowego obrazu do wstępnego załadowania
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        setIsLoaded(true); // Pokaż fallback lub placeholder
      };
    }
  }, [src, imageSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder pokazywany podczas ładowania */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 lazy-placeholder" 
          style={{ width: "100%", height: "100%" }}
        />
      )}
      
      {/* Właściwy obraz */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}; 