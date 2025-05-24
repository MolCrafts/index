import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MethanolMolecule } from './Methanol';
import { CocaineMolecule } from './Cocaine';
import { CaffeineMolecule } from './Caffeine';
import { NitrobenzeneMolecule } from './Nitrobenzene';
import { FormicAcidMolecule } from './FormicAcid';
import { PenicillinMolecule } from './Penicillin';
import { NitricAcidMolecule } from './NitricAcid';
import { CarbonMonoxideMolecule } from './CarbonMonoxide';
import { CarbonDioxideMolecule } from './CarbonDioxide';

export type MoleculeType = 
  | 'methanol' 
  | 'cocaine' 
  | 'caffeine' 
  | 'nitrobenzene' 
  | 'formicAcid' 
  | 'penicillin'
  | 'nitricAcid'
  | 'carbonMonoxide'
  | 'carbonDioxide';

interface MoleculeViewerProps {
  moleculeType: MoleculeType;
  autoRotate?: boolean;
  enableZoom?: boolean;
  width?: string;
  height?: string;
  background?: string;
}

export const MoleculeViewer = ({
  moleculeType,
  autoRotate = true,
  enableZoom = true,
  width = '100%',
  height = '100%',
  background = 'transparent'
}: MoleculeViewerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Only render on client, avoid SSR issues
  if (!isMounted) return null;
  
  const renderMolecule = () => {
    switch (moleculeType) {
      case 'methanol':
        return <MethanolMolecule />;
      case 'cocaine':
        return <CocaineMolecule />;
      case 'caffeine':
        return <CaffeineMolecule />;
      case 'nitrobenzene':
        return <NitrobenzeneMolecule />;
      case 'formicAcid':
        return <FormicAcidMolecule />;
      case 'penicillin':
        return <PenicillinMolecule />;
      case 'nitricAcid':
        return <NitricAcidMolecule />;
      case 'carbonMonoxide':
        return <CarbonMonoxideMolecule />;
      case 'carbonDioxide':
        return <CarbonDioxideMolecule />;
      default:
        return <MethanolMolecule />;
    }
  };
  
  return (
    <div style={{
      width,
      height,
      position: 'relative',
      background,
      zIndex: 10
    }}>
      <Canvas 
        style={{
          background: 'transparent !important',
          backgroundColor: 'transparent !important',
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 50
        }}
        className="molecule-canvas"
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.2}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[10, -10, 10]} intensity={0.7} color="hsl(var(--primary))" />
        
        {renderMolecule()}
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={enableZoom}
          minDistance={3}
          maxDistance={10}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}; 