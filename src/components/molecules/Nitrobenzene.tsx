import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Nitrobenzene (C6H5NO2) molecule model component
export const NitrobenzeneMolecule = () => {
  const groupRef = useRef<Group>(null);
  
  // Atom colors following standard CPK coloring
  const atomColors = {
    C: '#909090', // Carbon - dark gray
    H: '#FFFFFF', // Hydrogen - white
    N: '#3050F8', // Nitrogen - blue
    O: '#FF0D0D', // Oxygen - bright red
  };
  
  // Atom sizes based on van der Waals radii (relative scale)
  const atomSizes = {
    C: 0.35,    // Carbon
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
      
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });
  
  // Scale factor for positioning
  const sf = 0.7; // Scale factor to make model more compact
  
  // Positions of all atoms in the nitrobenzene molecule
  // Benzene ring with attached nitro group
  const positions: Record<string, [number, number, number]> = {
    // Benzene ring carbons (hexagonal arrangement)
    c1: [0, 0, 0],
    c2: [0.866 * sf, 0.5 * sf, 0],
    c3: [0.866 * sf, 1.5 * sf, 0],
    c4: [0, 2 * sf, 0],
    c5: [-0.866 * sf, 1.5 * sf, 0],
    c6: [-0.866 * sf, 0.5 * sf, 0],
    
    // Hydrogen atoms attached to carbon atoms (except C1 which has nitro group)
    h2: [1.732 * sf, 0.3 * sf, 0],
    h3: [1.732 * sf, 1.7 * sf, 0],
    h4: [0, 3 * sf, 0],
    h5: [-1.732 * sf, 1.7 * sf, 0],
    h6: [-1.732 * sf, 0.3 * sf, 0],
    
    // Nitro group (NO2) attached to C1
    n: [0, -1 * sf, 0],
    o1: [0.8 * sf, -1.6 * sf, 0],
    o2: [-0.8 * sf, -1.6 * sf, 0]
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
      // Double bond (simplified as a thicker single bond for this model)
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
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* Carbon atoms in benzene ring */}
      <Atom position={positions.c1} type="C" />
      <Atom position={positions.c2} type="C" />
      <Atom position={positions.c3} type="C" />
      <Atom position={positions.c4} type="C" />
      <Atom position={positions.c5} type="C" />
      <Atom position={positions.c6} type="C" />
      
      {/* Hydrogen atoms */}
      <Atom position={positions.h2} type="H" />
      <Atom position={positions.h3} type="H" />
      <Atom position={positions.h4} type="H" />
      <Atom position={positions.h5} type="H" />
      <Atom position={positions.h6} type="H" />
      
      {/* Nitro group */}
      <Atom position={positions.n} type="N" />
      <Atom position={positions.o1} type="O" />
      <Atom position={positions.o2} type="O" />
      
      {/* Benzene ring bonds - alternating single and double bonds 
          Simplified as 1.5 order bonds (all the same thickness) */}
      {createBond(positions.c1, positions.c2)}
      {createBond(positions.c2, positions.c3)}
      {createBond(positions.c3, positions.c4)}
      {createBond(positions.c4, positions.c5)}
      {createBond(positions.c5, positions.c6)}
      {createBond(positions.c6, positions.c1)}
      
      {/* C-H bonds */}
      {createBond(positions.c2, positions.h2)}
      {createBond(positions.c3, positions.h3)}
      {createBond(positions.c4, positions.h4)}
      {createBond(positions.c5, positions.h5)}
      {createBond(positions.c6, positions.h6)}
      
      {/* Nitro group bonds */}
      {createBond(positions.c1, positions.n)}
      {createBond(positions.n, positions.o1, 2)} // Double bond to oxygen
      {createBond(positions.n, positions.o2, 2)} // Double bond to oxygen
    </group>
  );
}; 