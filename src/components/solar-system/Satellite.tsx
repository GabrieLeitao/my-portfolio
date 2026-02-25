import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Select } from '@react-three/postprocessing';
import { Satellite as SatelliteType } from '../../types';
import { useStore } from '../../store';

interface SatelliteProps {
  satellite: SatelliteType;
  parentPlanetId: string;
  index: number;
}

const Satellite: React.FC<SatelliteProps> = ({ satellite, parentPlanetId, index }) => {
  const satelliteRef = useRef<THREE.Mesh>(null);
  
  // Select state values individually for stability
  const motionState = useStore((state) => state.motionState);
  const selectedExperience = useStore((state) => state.selectedExperience);

  const geometry = useMemo(() => new THREE.SphereGeometry(satellite.radius, 16, 16), [satellite.radius]);
  const isParentSelected = selectedExperience?.type === 'planet' && selectedExperience.data.id === parentPlanetId;

  // Use higher base speed for visibility
  const angleRef = useRef(index * (Math.PI * 2 / 3));
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const isInitialized = useRef(false);

  useFrame((_, delta) => {
    if (satelliteRef.current) {
      let currentSpeed = satellite.speed * 20; // Increased speed multiplier
      let targetDistance = satellite.distanceFromPlanet;

      if (motionState === 'selected') {
        currentSpeed *= 0.1;
        if (isParentSelected) {
          currentSpeed = 0;
          targetDistance *= 1.4;
        }
      } else if (motionState === 'hover') {
        currentSpeed *= 0.3;
      }
      
      angleRef.current += currentSpeed * delta;

      // Simple orbital calculation
      const x = Math.sin(angleRef.current) * targetDistance;
      const z = Math.cos(angleRef.current) * targetDistance;
      
      // Slight variation in Y for each satellite
      const y = Math.sin(index * 1.5) * (targetDistance * 0.2);

      targetPosition.set(x, y, z);

      if (!isInitialized.current) {
        satelliteRef.current.position.copy(targetPosition);
        isInitialized.current = true;
      } else {
        satelliteRef.current.position.lerp(targetPosition, delta * 5);
      }
      
      satelliteRef.current.rotation.y += delta;
    }
  });

  return (
    <Select enabled={isParentSelected}>
      <mesh
        ref={satelliteRef}
        geometry={geometry}
        onClick={(e) => e.stopPropagation()}
      >
        <meshStandardMaterial 
          color="#aaa" 
          emissive="#ffffff" 
          emissiveIntensity={isParentSelected ? 0.5 : 0.1} 
        />
      </mesh>
    </Select>
  );
};

export default Satellite;
