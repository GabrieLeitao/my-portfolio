// src/components/solar-system/Planet.tsx
import React, { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Select } from '@react-three/postprocessing';
import { Experience } from '../../types';
import { useStore, SelectedExperience } from '../../store';
import Satellite from './Satellite';

interface PlanetProps {
  experience: Experience;
}

const Planet: React.FC<PlanetProps> = ({ experience }) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2); // Random start position
  
  // Select state values individually for stability
  const motionState = useStore((state) => state.motionState);
  const selectedExperience = useStore((state) => state.selectedExperience);
  const hoveredExperience = useStore((state) => state.hoveredExperience);

  // Select action creators separately for stable references
  const setSelectedExperience = useStore((state) => state.setSelectedExperience);
  const setHoveredExperience = useStore((state) => state.setHoveredExperience);
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const setCameraState = useStore((state) => state.setCameraState);

  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedExperience?.data.id === experience.id;

  const geometry = useMemo(() => new THREE.SphereGeometry(experience.radius, 32, 32), [experience.radius]);

  const color = useMemo(() => {
    switch (experience.type) {
      case 'job':
        return new THREE.Color('#ff8c00'); // Warmer for jobs
      case 'education':
        return new THREE.Color('#6495ed'); // Cooler for education
      case 'project':
        return new THREE.Color('#98fb98'); // Neon for projects
      default:
        return new THREE.Color('white');
    }
  }, [experience.type]);

  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    // Do not allow selection if something is already selected
    if (selectedExperience) return;

    if (planetRef.current) {
      const selection: SelectedExperience = { type: 'planet', data: experience };
      setSelectedExperience(selection);

      const planetPosition = new THREE.Vector3();
      planetRef.current.getWorldPosition(planetPosition);
      
      const cameraOffset = new THREE.Vector3(0, experience.radius * 2, experience.radius * 5);
      const targetPosition = planetPosition.clone().add(cameraOffset);
      
      setCameraTarget(targetPosition, planetPosition);
      setCameraState('transition');
    }
  }, [experience, selectedExperience, setSelectedExperience, setCameraTarget, setCameraState]);

  const handlePointerOver = useCallback((event: any) => {
    event.stopPropagation();
    // Do not show hover effects if something is selected
    if (selectedExperience) return;
    
    setIsHovered(true);
    setHoveredExperience({ type: 'planet', data: experience });
  }, [experience, selectedExperience, setHoveredExperience]);

  const handlePointerOut = useCallback((event: any) => {
    event.stopPropagation();
    setIsHovered(false);
    setHoveredExperience(null);
  }, [setHoveredExperience]);
  
  const targetScaleVector = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const isHoveredInStore = hoveredExperience?.data.id === experience.id;
    const isAnySelected = selectedExperience !== null;
    const isAnyHovered = hoveredExperience !== null;

    // Determine current speed
    let speed = experience.orbitalSpeed * 50; // Base multiplier for visible speed
    
    // 3) maybe all orbits could slow down when we enter a planet or we hover also
    if (isAnySelected) {
      speed *= 0.05; // Significant slow down for all if something is selected
    } else if (isAnyHovered) {
      speed *= 0.3; // General slow down if hovering anything
    }

    // Individual override
    if (isSelected) {
      speed = 0; // Freeze if selected
    } else if (isHoveredInStore) {
      speed *= 0.1; // Extra slow down for the hovered one
    }

    if (groupRef.current) {
      // Update accumulated angle to prevent "jump" when speed changes
      angleRef.current += speed * delta;
      
      groupRef.current.position.x = Math.sin(angleRef.current) * experience.distanceFromStar;
      groupRef.current.position.z = Math.cos(angleRef.current) * experience.distanceFromStar;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.5 * delta;
      
      // Hover scale effect (1 -> 1.1)
      const targetScale = isHovered ? 1.1 : 1;
      targetScaleVector.set(targetScale, targetScale, targetScale);
      planetRef.current.scale.lerp(targetScaleVector, delta * 8);
    }
  });

  return (
    <group ref={groupRef}>
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
          {isHovered && !isSelected && (
            <Html distanceFactor={10} pointerEvents="none">
              <div className="tooltip" style={{ 
                background: 'rgba(0,0,0,0.85)', 
                color: 'white', 
                padding: '12px', 
                borderRadius: '8px',
                border: `1px solid ${color.getStyle()}`,
                width: 'max-content',
                maxWidth: '250px',
                transform: 'translate(10px, 10px)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                fontFamily: 'sans-serif'
              }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1em' }}>{experience.name}</h3>
                <p style={{ margin: '0 0 8px 0', opacity: 0.8, fontSize: '0.9em' }}>{experience.startDate} - {experience.endDate}</p>
                <p style={{ margin: 0, fontSize: '0.85em', lineHeight: '1.4' }}>{experience.description}</p>
              </div>
            </Html>
          )}
        </mesh>
      </Select>
      {experience.satellites && experience.satellites.map((sat) => (
        <Satellite
          key={sat.id}
          satellite={sat}
          parentPlanetId={experience.id}
        />
      ))}
    </group>
  );
};

export default Planet;



