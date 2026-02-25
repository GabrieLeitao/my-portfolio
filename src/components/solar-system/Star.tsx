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
        <meshStandardMaterial emissive={color} emissiveIntensity={5} />
      </mesh>
      {/* Primary light source from the star */}
      <pointLight intensity={10} distance={100} decay={2} color="white" />
    </>
  );
};

export default Star;
