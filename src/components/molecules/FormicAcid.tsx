import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Formic Acid (HCOOH) molecule model component
export const FormicAcidMolecule = () => {
  const groupRef = useRef<Group>(null);
  
  // Atom colors following standard CPK coloring
  const atomColors = {
    C: '#909090', // Carbon - dark gray
    H: '#FFFFFF', // Hydrogen - white
    O: '#FF0D0D', // Oxygen - bright red
  };
  
  // Atom sizes based on van der Waals radii (relative scale)
  const atomSizes = {
    C: 0.38,    // Carbon
    H: 0.25,    // Hydrogen
    O: 0.35,    // Oxygen
  };
  
  // Animation for the molecule
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      
      // Gentle rotation
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
      groupRef.current.rotation.z = Math.cos(t * 0.1) * 0.1;
      
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });
  
  // Scale factor for positioning
  const sf = 0.8; // Scale factor for bonds
  
  // Positions of atoms in the formic acid molecule (HCOOH)
  const positions: Record<string, [number, number, number]> = {
    // Carbon atom (center)
    c: [0, 0, 0],
    
    // Hydrogen attached to carbon
    h1: [-0.8 * sf, -0.5 * sf, 0],
    
    // Carbonyl oxygen (double bonded to carbon)
    o1: [0.8 * sf, 0.5 * sf, 0],
    
    // Hydroxyl group
    o2: [0.5 * sf, -1 * sf, 0],     // Oxygen
    h2: [1.3 * sf, -1.2 * sf, 0]    // Hydrogen (attached to oxygen)
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
          args={[0.05, 0.05, length, 8]}
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
          args={[0.07, 0.07, length, 8]}
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
    type: 'C' | 'H' | 'O'; 
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
    <group ref={groupRef} position={[0, 0, 0]} scale={1.5}>
      {/* Carbon atom */}
      <Atom position={positions.c} type="C" />
      
      {/* Hydrogen attached to carbon */}
      <Atom position={positions.h1} type="H" />
      
      {/* Carbonyl oxygen */}
      <Atom position={positions.o1} type="O" />
      
      {/* Hydroxyl group */}
      <Atom position={positions.o2} type="O" />
      <Atom position={positions.h2} type="H" />
      
      {/* C-H bond */}
      {createBond(positions.c, positions.h1)}
      
      {/* C=O double bond */}
      {createBond(positions.c, positions.o1, 2)}
      
      {/* C-O bond */}
      {createBond(positions.c, positions.o2)}
      
      {/* O-H bond */}
      {createBond(positions.o2, positions.h2)}
    </group>
  );
}; 