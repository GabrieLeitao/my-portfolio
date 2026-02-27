import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Select } from '@react-three/postprocessing';
import { Satellite as SatelliteType } from '../../types';
import { useStore } from '../../store';

interface SatelliteProps {
  satellite: SatelliteType;
  parentPlanetName: string;
  index: number;
}

const Satellite: React.FC<SatelliteProps> = ({ satellite, parentPlanetName, index }) => {
  const satelliteRef = useRef<THREE.Mesh>(null);
  
  // Select state values individually for stability
  const motionState = useStore((state) => state.motionState);
  const selectedExperience = useStore((state) => state.selectedExperience);

  const geometry = useMemo(() => new THREE.SphereGeometry(satellite.radius, 16, 16), [satellite.radius]);
  const isParentSelected = selectedExperience?.type === 'planet' && selectedExperience.data.name === parentPlanetName;

  // Use higher base speed for visibility
  const angleRef = useRef(index * (Math.PI * 2 / 3));
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const isInitialized = useRef(false);

  useFrame((_, delta) => {
    if (satelliteRef.current) {
      let speedMultiplier = 1.0;

      if (motionState === 'selected') {
        speedMultiplier = 0.05;
      } else if (motionState === 'hover') {
        speedMultiplier = 0.3;
      }

      const currentSpeed = satellite.speed * 30 * speedMultiplier;
      let targetDistance = satellite.distanceFromPlanet;

      if (motionState === 'selected' && isParentSelected) {
        targetDistance *= 1.4; // Still expand if parent selected
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
        name={satellite.name}
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
