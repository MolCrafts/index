import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Penicillin (simplified) molecule model component
// This is a simplified representation focusing on the core beta-lactam and thiazolidine rings
export const PenicillinMolecule = () => {
  const groupRef = useRef<Group>(null);
  
  // Atom colors following standard CPK coloring
  const atomColors = {
    C: '#909090', // Carbon - dark gray
    H: '#FFFFFF', // Hydrogen - white (simplified, not all shown)
    N: '#3050F8', // Nitrogen - blue
    O: '#FF0D0D', // Oxygen - bright red
    S: '#FFFF30', // Sulfur - yellow
  };
  
  // Atom sizes based on van der Waals radii (relative scale)
  const atomSizes = {
    C: 0.35,    // Carbon
    H: 0.2,     // Hydrogen
    N: 0.35,    // Nitrogen
    O: 0.33,    // Oxygen
    S: 0.5,     // Sulfur (larger)
  };
  
  // Animation for the molecule
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      
      // Gentle rotation
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.07) * 0.05;
      
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.1;
    }
  });
  
  // Scale factor for positioning
  const sf = 0.6; // Scale factor to make model more compact
  
  // Define key atoms of the penicillin core structure
  // Core of penicillin is a beta-lactam ring fused to a thiazolidine ring
  const positions: Record<string, [number, number, number]> = {
    // Beta-lactam ring (4-membered ring with nitrogen)
    c1: [0, 0, 0],
    c2: [1 * sf, 0, 0],
    n3: [1 * sf, 1 * sf, 0],
    c4: [0, 1 * sf, 0],
    
    // Thiazolidine ring (5-membered ring with sulfur)
    s5: [-1 * sf, 0, 0],
    c6: [-2 * sf, 1 * sf, 0],
    c7: [-1 * sf, 2 * sf, 0],
    c8: [0, 2 * sf, 0],
    
    // Carboxyl group on C2
    c9: [2 * sf, -0.5 * sf, 0],
    o10: [3 * sf, 0, 0],
    o11: [2 * sf, -1.7 * sf, 0],
    
    // R group (phenyl) attached to amide on C7
    n12: [-1.5 * sf, 3 * sf, 0],
    c13: [-2.5 * sf, 3.5 * sf, 0],
    o14: [-3.5 * sf, 3 * sf, 0],
    c15: [-2.5 * sf, 5 * sf, 0],
    
    // Phenyl ring of the R group
    c16: [-1.5 * sf, 5.8 * sf, 0],
    c17: [-1.5 * sf, 7.2 * sf, 0],
    c18: [-2.5 * sf, 8 * sf, 0],
    c19: [-3.5 * sf, 7.2 * sf, 0],
    c20: [-3.5 * sf, 5.8 * sf, 0],
    
    // Methyl groups on C6
    c21: [-3 * sf, 0.5 * sf, 0.8 * sf],
    c22: [-3 * sf, 1 * sf, -0.8 * sf]
  };
  
  // Helper function to create bond between atoms
  const createBond = (start: [number, number, number], end: [number, number, number], order = 1) => {
    const midpoint = new Vector3(
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2
    );
    
    const direction = new Vector3(
      end[0] - start[0],
      end[1] - start[1],
      end[2] - start[2]
    );
    
    const length = direction.length();
    direction.normalize();
    
    // Calculate rotation to align cylinder with bond direction
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction);
    
    if (order === 1) {
      // Single bond
      return (
        <Cylinder
          position={[midpoint.x, midpoint.y, midpoint.z]}
          rotation={new THREE.Euler().setFromQuaternion(quaternion)}
          args={[0.04, 0.04, length, 8]}
        >
          <meshStandardMaterial 
            color="#FFFFFF" 
            roughness={0.3}
            metalness={0.2}
          />
        </Cylinder>
      );
    } else {
      // Double bond
      return (
        <Cylinder
          position={[midpoint.x, midpoint.y, midpoint.z]}
          rotation={new THREE.Euler().setFromQuaternion(quaternion)}
          args={[0.06, 0.06, length, 8]}
        >
          <meshStandardMaterial 
            color="#FFFFFF" 
            roughness={0.3}
            metalness={0.2}
          />
        </Cylinder>
      );
    }
  };
  
  // Atom component
  const Atom = ({ 
    position, 
    type, 
    size = 1 
  }: { 
    position: [number, number, number]; 
    type: 'C' | 'H' | 'N' | 'O' | 'S'; 
    size?: number 
  }) => (
    <Sphere position={position} args={[atomSizes[type] * size, 16, 16]}>
      <meshStandardMaterial
        color={atomColors[type]}
        roughness={0.2}
        metalness={0.4}
        emissive={atomColors[type]}
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
  
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
      {/* Beta-lactam ring atoms */}
      <Atom position={positions.c1} type="C" />
      <Atom position={positions.c2} type="C" />
      <Atom position={positions.n3} type="N" />
      <Atom position={positions.c4} type="C" />
      
      {/* Thiazolidine ring atoms */}
      <Atom position={positions.s5} type="S" />
      <Atom position={positions.c6} type="C" />
      <Atom position={positions.c7} type="C" />
      <Atom position={positions.c8} type="C" />
      
      {/* Carboxyl group */}
      <Atom position={positions.c9} type="C" />
      <Atom position={positions.o10} type="O" />
      <Atom position={positions.o11} type="O" />
      
      {/* R group - amide and phenyl */}
      <Atom position={positions.n12} type="N" />
      <Atom position={positions.c13} type="C" />
      <Atom position={positions.o14} type="O" />
      <Atom position={positions.c15} type="C" />
      
      {/* Phenyl ring */}
      <Atom position={positions.c16} type="C" />
      <Atom position={positions.c17} type="C" />
      <Atom position={positions.c18} type="C" />
      <Atom position={positions.c19} type="C" />
      <Atom position={positions.c20} type="C" />
      
      {/* Methyl groups */}
      <Atom position={positions.c21} type="C" />
      <Atom position={positions.c22} type="C" />
      
      {/* Beta-lactam ring bonds */}
      {createBond(positions.c1, positions.c2)}
      {createBond(positions.c2, positions.n3)}
      {createBond(positions.n3, positions.c4)}
      {createBond(positions.c4, positions.c1)}
      
      {/* Thiazolidine ring bonds */}
      {createBond(positions.c1, positions.s5)}
      {createBond(positions.s5, positions.c6)}
      {createBond(positions.c6, positions.c7)}
      {createBond(positions.c7, positions.c8)}
      {createBond(positions.c8, positions.c4)}
      
      {/* Connection between rings */}
      {createBond(positions.c4, positions.c8)}
      
      {/* Carboxyl group bonds */}
      {createBond(positions.c2, positions.c9)}
      {createBond(positions.c9, positions.o10, 2)} // Double bond to oxygen
      {createBond(positions.c9, positions.o11)}
      
      {/* R group bonds */}
      {createBond(positions.c7, positions.n12)}
      {createBond(positions.n12, positions.c13)}
      {createBond(positions.c13, positions.o14, 2)} // Double bond to oxygen
      {createBond(positions.c13, positions.c15)}
      
      {/* Phenyl ring bonds */}
      {createBond(positions.c15, positions.c16)}
      {createBond(positions.c16, positions.c17)}
      {createBond(positions.c17, positions.c18)}
      {createBond(positions.c18, positions.c19)}
      {createBond(positions.c19, positions.c20)}
      {createBond(positions.c20, positions.c15)}
      
      {/* Methyl group bonds */}
      {createBond(positions.c6, positions.c21)}
      {createBond(positions.c6, positions.c22)}
    </group>
  );
}; 