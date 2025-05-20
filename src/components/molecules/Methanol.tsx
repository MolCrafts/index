import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

// Methanol (CH3OH) molecule model component
export const MethanolMolecule = () => {
  const groupRef = useRef<Group>(null);
  
  // Atom colors following standard CPK coloring
  const atomColors = {
    C: '#909090', // Carbon - dark gray
    H: '#FFFFFF', // Hydrogen - white
    O: '#FF0D0D', // Oxygen - bright red
  };
  
  // Atom sizes based on van der Waals radii (relative scale)
  const atomSizes = {
    C: 0.4,    // Carbon
    H: 0.25,   // Hydrogen
    O: 0.35,   // Oxygen
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
  
  // Define methanol atoms - CH3OH
  // The structure is tetrahedral around carbon
  // Carbon at center, 3 hydrogen atoms at 3 corners of tetrahedron
  // Oxygen at the 4th corner, with hydrogen attached to oxygen
  
  // Tetrahedron configuration
  const tetrahedralAngle = 109.5 * (Math.PI / 180); // ~109.5° tetrahedral angle
  const bondLength = 0.8; // Standard bond length
  
  // Carbon position (center)
  const carbonPosition: [number, number, number] = [0, 0, 0];
  
  // Calculate positions for tetrahedron vertices
  // Hydrogen positions (3 corners of tetrahedron)
  const h1Position: [number, number, number] = [
    bondLength * Math.sin(0) * Math.cos(0),
    bondLength * Math.sin(0) * Math.sin(0),
    bondLength * Math.cos(0),
  ];
  
  const h2Position: [number, number, number] = [
    bondLength * Math.sin(tetrahedralAngle) * Math.cos(0),
    bondLength * Math.sin(tetrahedralAngle) * Math.sin(0),
    -bondLength * Math.cos(tetrahedralAngle),
  ];
  
  const h3Position: [number, number, number] = [
    bondLength * Math.sin(tetrahedralAngle) * Math.cos((2 * Math.PI) / 3),
    bondLength * Math.sin(tetrahedralAngle) * Math.sin((2 * Math.PI) / 3),
    -bondLength * Math.cos(tetrahedralAngle),
  ];
  
  // Oxygen position (4th corner of tetrahedron)
  const oPosition: [number, number, number] = [
    bondLength * Math.sin(tetrahedralAngle) * Math.cos((4 * Math.PI) / 3),
    bondLength * Math.sin(tetrahedralAngle) * Math.sin((4 * Math.PI) / 3),
    -bondLength * Math.cos(tetrahedralAngle),
  ];
  
  // Hydroxyl hydrogen (attached to oxygen)
  const hOPosition: [number, number, number] = [
    oPosition[0] + bondLength * Math.sin(tetrahedralAngle) * Math.cos((4 * Math.PI) / 3),
    oPosition[1] + bondLength * Math.sin(tetrahedralAngle) * Math.sin((4 * Math.PI) / 3),
    oPosition[2] - bondLength * Math.cos(tetrahedralAngle) * 0.8,
  ];
  
  // Helper function to create bond between atoms
  const createBond = (start: [number, number, number], end: [number, number, number]) => {
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
      {/* Carbon atom (center) */}
      <Atom position={carbonPosition} type="C" />
      
      {/* Hydrogen atoms (three corners) */}
      <Atom position={h1Position} type="H" />
      <Atom position={h2Position} type="H" />
      <Atom position={h3Position} type="H" />
      
      {/* Oxygen atom (fourth corner) */}
      <Atom position={oPosition} type="O" />
      
      {/* Hydroxyl hydrogen (attached to oxygen) */}
      <Atom position={hOPosition} type="H" />
      
      {/* C-H bonds */}
      {createBond(carbonPosition, h1Position)}
      {createBond(carbonPosition, h2Position)}
      {createBond(carbonPosition, h3Position)}
      
      {/* C-O bond */}
      {createBond(carbonPosition, oPosition)}
      
      {/* O-H bond */}
      {createBond(oPosition, hOPosition)}
    </group>
  );
}; 