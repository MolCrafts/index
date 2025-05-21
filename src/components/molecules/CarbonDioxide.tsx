import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Carbon Dioxide (CO2) molecule model component
export const CarbonDioxideMolecule = () => {
  const groupRef = useRef<Group>(null);
  
  // Atom colors following standard CPK coloring
  const atomColors = {
    C: '#909090', // Carbon - dark gray
    O: '#FF0D0D', // Oxygen - bright red
  };
  
  // Atom sizes based on van der Waals radii (relative scale)
  const atomSizes = {
    C: 0.38,    // Carbon
    O: 0.35,    // Oxygen
  };
  
  // Animation for the molecule
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      
      // Gentle rotation
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
      
      // Vibration along bond axis
      const vibrationStretch = Math.sin(t * 6) * 0.015; // Stretching vibration
      const vibrationBend = Math.sin(t * 4) * 0.005;    // Bending vibration
      
      // Apply vibrations to atoms in the group
      if (groupRef.current.children.length > 2) {
        // Apply to oxygen atoms
        if (groupRef.current.children[0]) {
          // Left oxygen - stretches away from center, bends slightly up/down
          groupRef.current.children[0].position.x = -1.2 - vibrationStretch;
          groupRef.current.children[0].position.y = vibrationBend;
        }
        if (groupRef.current.children[1]) {
          // Right oxygen - stretches away from center, bends slightly up/down (opposite to first O)
          groupRef.current.children[1].position.x = 1.2 + vibrationStretch;
          groupRef.current.children[1].position.y = -vibrationBend;
        }
      }
      
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });
  
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
    
    if (order === 2) {
      // Double bond (simplified as one thicker bond for this model)
      return (
        <Cylinder
          position={[midpoint.x, midpoint.y, midpoint.z]}
          rotation={new THREE.Euler().setFromQuaternion(quaternion)}
          args={[0.07, 0.07, length, 12]}
        >
          <meshStandardMaterial 
            color="#FFFFFF" 
            roughness={0.3}
            metalness={0.2}
            emissive="#BBBBBB"
            emissiveIntensity={0.1}
          />
        </Cylinder>
      );
    } else {
      // Single bond (should not be used for CO2, but included for completeness)
      return (
        <Cylinder
          position={[midpoint.x, midpoint.y, midpoint.z]}
          rotation={new THREE.Euler().setFromQuaternion(quaternion)}
          args={[0.05, 0.05, length, 12]}
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
    type: 'C' | 'O'; 
    size?: number 
  }) => (
    <Sphere position={position} args={[atomSizes[type] * size, 24, 24]}>
      <meshStandardMaterial
        color={atomColors[type]}
        roughness={0.2}
        metalness={0.5}
        emissive={atomColors[type]}
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
  
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.5}>
      {/* Oxygen atoms */}
      <Atom position={[-1.2, 0, 0]} type="O" />
      <Atom position={[1.2, 0, 0]} type="O" />
      
      {/* Carbon atom (center) */}
      <Atom position={[0, 0, 0]} type="C" />
      
      {/* Double bonds (O=C=O) */}
      {createBond([0, 0, 0], [-1.2, 0, 0], 2)}
      {createBond([0, 0, 0], [1.2, 0, 0], 2)}
      
      {/* Subtle glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial 
          color="#FF3030" 
          opacity={0.03} 
          transparent 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}; 