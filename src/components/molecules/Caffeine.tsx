import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Caffeine (C8H10N4O2) molecule model component
export const CaffeineMolecule = () => {
  const groupRef = useRef<Group>(null);
  
  // Atom colors following standard CPK coloring
  const atomColors = {
    C: '#909090', // Carbon - dark gray
    H: '#FFFFFF', // Hydrogen - white (simplified, not all shown)
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
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
      groupRef.current.rotation.z = Math.sin(t * 0.08) * 0.05;
      
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });
  
  // Scale factor for positioning
  const sf = 0.6; // Scale factor to make model more compact
  
  // Define the key atoms of caffeine
  // Positions of all atoms in the molecule
  const positions: Record<string, [number, number, number]> = {
    // First 5-membered ring (imidazole)
    n1: [0, 0, 0],
    c2: [0.8 * sf, 0.8 * sf, 0],
    n3: [1.6 * sf, 0, 0],
    c4: [0.8 * sf, -0.8 * sf, 0],
    c5: [0, -0.4 * sf, 0],
    
    // Second 6-membered ring (pyrimidinedione)
    c6: [2.4 * sf, 0.8 * sf, 0],
    o6: [2.4 * sf, 2.0 * sf, 0],  // Oxygen attached to C6
    n7: [3.2 * sf, 0, 0],
    c8: [3.2 * sf, -1.2 * sf, 0],
    n9: [2.4 * sf, -1.8 * sf, 0],
    c10: [1.6 * sf, -1.2 * sf, 0],
    o10: [0.8 * sf, -2.0 * sf, 0], // Oxygen attached to C10
    
    // Methyl groups
    c11: [-0.8 * sf, 0.8 * sf, 0], // Methyl on N1
    c12: [4.0 * sf, 0.8 * sf, 0],  // Methyl on N7
    c13: [2.4 * sf, -3.0 * sf, 0]  // Methyl on N9
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
      // Double bond (simplified as a thicker single bond)
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
    <group ref={groupRef} position={[0, 0, 0]} scale={1.0}>
      {/* First ring (imidazole) */}
      <Atom position={positions.n1} type="N" />
      <Atom position={positions.c2} type="C" />
      <Atom position={positions.n3} type="N" />
      <Atom position={positions.c4} type="C" />
      <Atom position={positions.c5} type="C" />
      
      {/* Second ring (pyrimidinedione) */}
      <Atom position={positions.c6} type="C" />
      <Atom position={positions.o6} type="O" />
      <Atom position={positions.n7} type="N" />
      <Atom position={positions.c8} type="C" />
      <Atom position={positions.n9} type="N" />
      <Atom position={positions.c10} type="C" />
      <Atom position={positions.o10} type="O" />
      
      {/* Methyl groups */}
      <Atom position={positions.c11} type="C" />
      <Atom position={positions.c12} type="C" />
      <Atom position={positions.c13} type="C" />
      
      {/* First ring bonds */}
      {createBond(positions.n1, positions.c2)}
      {createBond(positions.c2, positions.n3)}
      {createBond(positions.n3, positions.c4)}
      {createBond(positions.c4, positions.c5)}
      {createBond(positions.c5, positions.n1)}
      
      {/* Second ring bonds */}
      {createBond(positions.n3, positions.c6)}
      {createBond(positions.c6, positions.n7)}
      {createBond(positions.n7, positions.c8)}
      {createBond(positions.c8, positions.n9)}
      {createBond(positions.n9, positions.c10)}
      {createBond(positions.c10, positions.c4)}
      
      {/* Carbonyl bonds (double bonds to oxygen) */}
      {createBond(positions.c6, positions.o6, 2)}
      {createBond(positions.c10, positions.o10, 2)}
      
      {/* Methyl group bonds */}
      {createBond(positions.n1, positions.c11)}
      {createBond(positions.n7, positions.c12)}
      {createBond(positions.n9, positions.c13)}
    </group>
  );
}; 