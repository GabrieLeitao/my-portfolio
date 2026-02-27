// src/components/solar-system/Planet.tsx
import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Select } from '@react-three/postprocessing';
import { Experience } from '../../types';
import { useStore } from '../../store';
import Satellite from './Satellite';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useDynamicOrbit } from '../../hooks/useDynamicOrbit';
import { renderDescription } from '../../utils/textUtils';

interface PlanetProps {
  experience: Experience;
}

const Planet: React.FC<PlanetProps> = ({ experience }) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(0);
  
  useEffect(() => {
    angleRef.current = Math.random() * Math.PI * 2;
  }, []);
  
  const { playHover, playClick } = useSoundEffects();
  const { getOrbitData } = useDynamicOrbit();

  // Stable state selection
  const motionState = useStore((state) => state.motionState);
  const selectedExperience = useStore((state) => state.selectedExperience);
  const aboutOpen = useStore((state) => state.aboutOpen);
  const dynamicDistancing = useStore((state) => state.dynamicDistancing);

  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedExperience?.data.name === experience.name;

  const geometry = useMemo(() => new THREE.SphereGeometry(experience.radius, 32, 32), [experience.radius]);

  const color = useMemo(() => {
    switch (experience.type) {
      case 'job':
        return new THREE.Color('#ff8c00');
      case 'education':
        return new THREE.Color('#6495ed');
      case 'project':
        return new THREE.Color('#98fb98');
      case 'general':
        return new THREE.Color('#ff69b4');
      default:
        return new THREE.Color('white');
    }
  }, [experience.type]);

  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    if (selectedExperience) return;

    if (planetRef.current) {
      playClick();
      const planetPosition = new THREE.Vector3();
      planetRef.current.getWorldPosition(planetPosition);
      
      const cameraOffset = new THREE.Vector3(0, experience.radius * 2, experience.radius * 5);
      const targetPosition = planetPosition.clone().add(cameraOffset);
      
      useStore.getState().selectExperience({ type: 'planet', data: experience }, targetPosition, planetPosition);
    }
  }, [experience, selectedExperience, playClick]);

  const handlePointerOver = useCallback((event: any) => {
    event.stopPropagation();
    if (selectedExperience) return;
    
    playHover();
    setIsHovered(true);
    useStore.getState().setHoveredExperience({ type: 'planet', data: experience });
  }, [experience, selectedExperience, playHover]);

  const handlePointerOut = useCallback((event: any) => {
    event.stopPropagation();
    setIsHovered(false);
    useStore.getState().setHoveredExperience(null);
  }, []);
  
  const targetScaleVector = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    // 1. Calculate target orbit parameters
    const orbitData = dynamicDistancing ? getOrbitData(experience.name) : null;
    const targetDistance = orbitData ? orbitData.distance : experience.distanceFromStar;
    const targetOrbitalSpeed = orbitData ? orbitData.speed : experience.orbitalSpeed;

    // 2. Determine motion multiplier
    let speedMultiplier = 1.0;
    if (motionState === 'selected') speedMultiplier = 0.05;
    else if (motionState === 'hover') speedMultiplier = 0.3;

    const currentSpeed = targetOrbitalSpeed * 60 * speedMultiplier;

    // 3. Update position
    if (groupRef.current) {
      angleRef.current += currentSpeed * delta;
      
      const x = Math.sin(angleRef.current) * targetDistance;
      const z = Math.cos(angleRef.current) * targetDistance;
      const inclination = experience.inclination || 0;

      groupRef.current.position.set(
        x,
        Math.sin(inclination) * z,
        Math.cos(inclination) * z
      );
    }

    // 4. Update mesh effects
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.5 * delta;
      const targetScale = isHovered ? 1.1 : 1;
      targetScaleVector.set(targetScale, targetScale, targetScale);
      planetRef.current.scale.lerp(targetScaleVector, delta * 8);
    }
  });

  return (
    <group ref={groupRef} name={experience.name}>
      <Select enabled={isSelected}>
        <mesh
          ref={planetRef}
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isHovered ? 0.6 : (isSelected ? 1.2 : 0.2)}
          />
          {isHovered && !isSelected && !aboutOpen && (
            <Html pointerEvents="none" zIndexRange={[100, 0]}>
              <div className="tooltip" style={{ 
                background: 'rgba(0,0,0,0.9)', 
                color: 'white', 
                padding: '16px', 
                borderRadius: '10px',
                border: `2px solid ${color.getStyle()}`,
                width: 'max-content',
                maxWidth: '350px',
                transform: 'translate(15px, 15px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.7)',
                fontFamily: 'sans-serif'
              }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1em' }}>{experience.name}</h3>
                <p style={{ margin: '0 0 8px 0', opacity: 0.8, fontSize: '0.9em' }}>
                  {experience.startDate} - {experience.endDate}
                </p>
                <div style={{ margin: 0, fontSize: '0.85em', lineHeight: '1.4' }}>
                  {renderDescription(experience.description)}
                </div>
              </div>
            </Html>
          )}
        </mesh>
      </Select>
      {experience.satellites && experience.satellites.map((sat, index) => (
        <Satellite
          key={sat.name}
          satellite={sat}
          parentPlanetName={experience.name}
          index={index}
        />
      ))}
    </group>
  );
};

export default Planet;
