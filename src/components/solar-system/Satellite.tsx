// src/components/solar-system/Satellite.tsx
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Satellite as SatelliteType } from '../../types';
import { useStore } from '../../store';

interface SatelliteProps {
  satellite: SatelliteType;
  parentPlanetId: string;
}

const Satellite: React.FC<SatelliteProps> = ({ satellite, parentPlanetId }) => {
  const satelliteRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  
  // Select state values individually for stability
  const motionState = useStore((state) => state.motionState);
  const selectedExperience = useStore((state) => state.selectedExperience);

  const geometry = useMemo(() => new THREE.SphereGeometry(satellite.radius, 16, 16), [satellite.radius]);
  const isParentSelected = selectedExperience?.type === 'planet' && selectedExperience.data.id === parentPlanetId;

  const targetPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    if (satelliteRef.current) {
      let currentSpeed = satellite.speed * 5; // Base speed multiplier
      let targetDistance = satellite.distanceFromPlanet;

      if (motionState === 'selected') {
        currentSpeed *= 0.1; // Slow down satellites too
        if (isParentSelected) {
          currentSpeed = 0; // Freeze if parent selected
          targetDistance *= 1.5; // Expand
        }
      } else if (motionState === 'hover') {
        currentSpeed *= 0.3; // Slow down on hover
      }
      
      angleRef.current += currentSpeed * delta;

      // Local coordinates (relative to planet group)
      targetPosition.set(
        Math.sin(angleRef.current) * targetDistance,
        0,
        Math.cos(angleRef.current) * targetDistance
      );

      satelliteRef.current.position.lerp(targetPosition, delta * 5);
      satelliteRef.current.rotation.y += 0.5 * delta;
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <mesh
      ref={satelliteRef}
      geometry={geometry}
      onClick={handleClick}
    >
      <meshStandardMaterial color="#c0c0c0" emissive="#444" />
    </mesh>
  );
};

export default Satellite;
