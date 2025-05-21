import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Cocaine (C17H21NO4) molecule component - simplified representation
// Uses a simplified model focusing on the key structural elements
export const CocaineMolecule = () => {
  const groupRef = useRef<Group>(null);
  
  // Atom colors following standard CPK coloring
  const atomColors = {
    C: '#909090', // Carbon - dark gray
    H: '#FFFFFF', // Hydrogen - white (hidden in this simplified model)
    N: '#3050F8', // Nitrogen - blue
    O: '#FF0D0D', // Oxygen - bright red
  };
  
  // Atom sizes based on van der Waals radii (relative scale)
  const atomSizes = {
    C: 0.35,    // Carbon
    H: 0.2,     // Hydrogen (smaller in simplified model)
    N: 0.35,    // Nitrogen
    O: 0.33,    // Oxygen
  };
  
  // Animation for the molecule
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      
      // Gentle rotation
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.08) * 0.05;
      
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.1;
    }
  });
  
  // Define the key atoms of cocaine
  // Simplified model focusing on the key structural features
  
  // Scale factor for positioning
  const sf = 0.6; // Scale factor to make model more compact
  
  // Create the core structures - tropane ring system (two fused rings)
  // Position of key atoms
  const positions: Record<string, [number, number, number]> = {
    // Tropane ring (bicyclic structure)
    // First ring (6-membered)
    c1: [0, 0, 0],
    c2: [1 * sf, 0.5 * sf, 0],
    c3: [2 * sf, 0, 0],
    c4: [2 * sf, -1 * sf, 0],
    c5: [1 * sf, -1.5 * sf, 0],
    c6: [0, -1 * sf, 0],
    
    // Bridge (connects to form the second ring)
    c7: [1 * sf, -0.5 * sf, 1 * sf],
    
    // Nitrogen (part of the tropane ring)
    n1: [1 * sf, 0, 0.8 * sf],
    
    // Methyl group on nitrogen
    c8: [1 * sf, 1 * sf, 1.3 * sf],
    
    // Carbomethoxy group attached to C3
    c9: [3 * sf, 0.5 * sf, 0],
    o1: [3 * sf, 1.5 * sf, 0],
    o2: [4 * sf, 0, 0],
    c10: [5 * sf, 0.5 * sf, 0],
    
    // Benzoate ester attached to C2
    o3: [1 * sf, 1.5 * sf, -0.5 * sf],
    c11: [1.5 * sf, 2.5 * sf, -0.5 * sf],
    o4: [1 * sf, 3.5 * sf, -0.5 * sf],
    
    // Phenyl ring of benzoate
    c12: [3 * sf, 2.5 * sf, -0.5 * sf],
    c13: [3.5 * sf, 3 * sf, -1.5 * sf],
    c14: [4.8 * sf, 3 * sf, -1.5 * sf],
    c15: [5.6 * sf, 2.5 * sf, -0.5 * sf],
    c16: [5.1 * sf, 2 * sf, 0.5 * sf],
    c17: [3.8 * sf, 2 * sf, 0.5 * sf]
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
      // Double or triple bonds (simplified as one thicker bond for this model)
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
    type: 'C' | 'H' | 'N' | 'O'; 
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
      {/* Tropane ring system (bicyclic structure) */}
      <Atom position={positions.c1} type="C" />
      <Atom position={positions.c2} type="C" />
      <Atom position={positions.c3} type="C" />
      <Atom position={positions.c4} type="C" />
      <Atom position={positions.c5} type="C" />
      <Atom position={positions.c6} type="C" />
      <Atom position={positions.c7} type="C" />
      
      {/* Nitrogen in the tropane ring */}
      <Atom position={positions.n1} type="N" />
      
      {/* Methyl group on nitrogen */}
      <Atom position={positions.c8} type="C" />
      
      {/* Carbomethoxy group */}
      <Atom position={positions.c9} type="C" />
      <Atom position={positions.o1} type="O" />
      <Atom position={positions.o2} type="O" />
      <Atom position={positions.c10} type="C" />
      
      {/* Benzoate ester */}
      <Atom position={positions.o3} type="O" />
      <Atom position={positions.c11} type="C" />
      <Atom position={positions.o4} type="O" />
      
      {/* Phenyl ring */}
      <Atom position={positions.c12} type="C" />
      <Atom position={positions.c13} type="C" />
      <Atom position={positions.c14} type="C" />
      <Atom position={positions.c15} type="C" />
      <Atom position={positions.c16} type="C" />
      <Atom position={positions.c17} type="C" />
      
      {/* Tropane ring bonds */}
      {createBond(positions.c1, positions.c2)}
      {createBond(positions.c2, positions.c3)}
      {createBond(positions.c3, positions.c4)}
      {createBond(positions.c4, positions.c5)}
      {createBond(positions.c5, positions.c6)}
      {createBond(positions.c6, positions.c1)}
      
      {/* Bridge bonds */}
      {createBond(positions.c1, positions.c7)}
      {createBond(positions.c4, positions.c7)}
      
      {/* Nitrogen bonds */}
      {createBond(positions.n1, positions.c1)}
      {createBond(positions.n1, positions.c5)}
      {createBond(positions.n1, positions.c8)}
      
      {/* Carbomethoxy group bonds */}
      {createBond(positions.c3, positions.c9)}
      {createBond(positions.c9, positions.o1, 2)} // Double bond
      {createBond(positions.c9, positions.o2)}
      {createBond(positions.o2, positions.c10)}
      
      {/* Benzoate ester bonds */}
      {createBond(positions.c2, positions.o3)}
      {createBond(positions.o3, positions.c11)}
      {createBond(positions.c11, positions.o4, 2)} // Double bond
      
      {/* Phenyl ring bonds */}
      {createBond(positions.c11, positions.c12)}
      {createBond(positions.c12, positions.c13)}
      {createBond(positions.c13, positions.c14)}
      {createBond(positions.c14, positions.c15)}
      {createBond(positions.c15, positions.c16)}
      {createBond(positions.c16, positions.c17)}
      {createBond(positions.c17, positions.c12)}
    </group>
  );
}; 