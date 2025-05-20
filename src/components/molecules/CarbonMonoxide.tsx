import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Carbon Monoxide (CO) molecule model component
export const CarbonMonoxideMolecule = () => {
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
      
      // Vibration along bond axis
      const vibration = Math.sin(t * 8) * 0.02; // High frequency, small amplitude
      
      // Apply vibration to atoms in the group
      if (groupRef.current.children.length > 1) {
        // Apply to carbon atom
        if (groupRef.current.children[0]) {
          groupRef.current.children[0].position.x = -0.6 - vibration;
        }
        // Apply to oxygen atom
        if (groupRef.current.children[1]) {
          groupRef.current.children[1].position.x = 0.6 + vibration;
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
    
    // Triple bond (simplified as a thick single bond)
    return (
      <Cylinder
        position={[midpoint.x, midpoint.y, midpoint.z]}
        rotation={new THREE.Euler().setFromQuaternion(quaternion)}
        args={[0.08, 0.08, length, 8]}
      >
        <meshStandardMaterial 
          color="#FFFFFF" 
          roughness={0.3}
          metalness={0.4}
          emissive="#BBBBBB"
          emissiveIntensity={0.1}
        />
      </Cylinder>
    );
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
    <group ref={groupRef} position={[0, 0, 0]} scale={2.0}>
      {/* Carbon atom */}
      <Atom position={[-0.6, 0, 0]} type="C" />
      
      {/* Oxygen atom */}
      <Atom position={[0.6, 0, 0]} type="O" />
      
      {/* Triple bond (C≡O) */}
      {createBond([-0.6, 0, 0], [0.6, 0, 0], 3)}
      
      {/* Glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial 
          color="#FF5040" 
          opacity={0.05} 
          transparent 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}; 