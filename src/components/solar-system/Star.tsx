// src/components/solar-system/Star.tsx
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface StarProps {
  size?: number;
  color?: string;
}

const Star: React.FC<StarProps> = ({ size = 1, color = 'gold' }) => {
  const starRef = React.useRef<Mesh>(null);

  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.001; // Gentle rotation
    }
  });

  return (
    <>
      <mesh ref={starRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial emissive={color} emissiveIntensity={10} color={color} />
      </mesh>
      {/* Primary light source from the star - significantly boosted */}
      <pointLight intensity={50} distance={200} decay={1} color="white" />
      <pointLight intensity={20} distance={50} decay={0.5} color={color} />
    </>
  );
};

export default Star;
