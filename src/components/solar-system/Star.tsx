// src/components/solar-system/Star.tsx
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Select } from '@react-three/postprocessing';

interface StarProps {
  size?: number;
  color?: string;
}

const Star: React.FC<StarProps> = ({ size = 2, color = '#ffd700' }) => {
  const starRef = React.useRef<Mesh>(null);

  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.001; // Gentle rotation
    }
  });

  return (
    <>
      <Select enabled>
        <mesh ref={starRef}>
          <sphereGeometry args={[size, 32, 32]} />
          {/* Reduced emissive intensity to prevent excessive bloom */}
          <meshStandardMaterial emissive={color} emissiveIntensity={3} color={color} />
        </mesh>
      </Select>
      {/* Keeping point light relatively strong to illuminate the system */}
      <pointLight intensity={60} distance={220} decay={1.2} color="white" />
      <pointLight intensity={25} distance={50} decay={1} color={color} />
    </>
  );
};

export default Star;
