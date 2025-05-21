import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Nitric Acid (HNO3) molecule model component
export const NitricAcidMolecule = () => {
  const groupRef = useRef<Group>(null);
  
  // Atom colors following standard CPK coloring
  const atomColors = {
    H: '#FFFFFF', // Hydrogen - white
    N: '#3050F8', // Nitrogen - blue
    O: '#FF0D0D', // Oxygen - bright red
  };
  
  // Atom sizes based on van der Waals radii (relative scale)
  const atomSizes = {
    H: 0.25,    // Hydrogen
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
      groupRef.current.rotation.z = Math.cos(t * 0.12) * 0.1;
      
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });
  
  // Scale factor for positioning
  const sf = 0.8; // Scale factor to make model more compact
  
  // Positions of atoms in the nitric acid molecule (HNO3)
  const positions: Record<string, [number, number, number]> = {
    // Nitrogen atom (center)
    n: [0, 0, 0],
    
    // Oxygen atoms
    o1: [0.8 * sf, 0.8 * sf, 0],    // Double-bonded oxygen
    o2: [-0.8 * sf, 0.8 * sf, 0],   // Double-bonded oxygen
    o3: [0, -1 * sf, 0],            // Single-bonded oxygen (hydroxyl)
    
    // Hydrogen atom (attached to O3)
    h: [0, -1.8 * sf, 0]
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
    type: 'H' | 'N' | 'O'; 
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
      {/* Nitrogen atom */}
      <Atom position={positions.n} type="N" />
      
      {/* Oxygen atoms */}
      <Atom position={positions.o1} type="O" />
      <Atom position={positions.o2} type="O" />
      <Atom position={positions.o3} type="O" />
      
      {/* Hydrogen atom */}
      <Atom position={positions.h} type="H" />
      
      {/* N=O double bonds */}
      {createBond(positions.n, positions.o1, 2)}
      {createBond(positions.n, positions.o2, 2)}
      
      {/* N-O single bond */}
      {createBond(positions.n, positions.o3)}
      
      {/* O-H bond */}
      {createBond(positions.o3, positions.h)}
    </group>
  );
}; 