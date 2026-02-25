// src/components/solar-system/Planet.tsx
import React, { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Select } from '@react-three/postprocessing';
import { Experience } from '../../types';
import { useStore, SelectedExperience } from '../../store';
import { shallow } from 'zustand/shallow';
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
  const aboutOpen = useStore((state) => state.aboutOpen);

  // Select action creators separately for stable references
  const selectExperience = useStore((state) => state.selectExperience);
  const setHoveredExperience = useStore((state) => state.setHoveredExperience);

  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedExperience?.data.id === experience.id;

  const geometry = useMemo(() => new THREE.SphereGeometry(experience.radius, 32, 32), [experience.radius]);

  const color = useMemo(() => {
    switch (experience.type) {
      case 'job':
        return new THREE.Color('#ff8c00'); // Warmer color for jobs
      case 'education':
        return new THREE.Color('#6495ed'); // Cooler color for education
      case 'project':
        return new THREE.Color('#98fb98'); // Neon/stylized for projects
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

      const planetPosition = new THREE.Vector3();
      planetRef.current.getWorldPosition(planetPosition);
      
      const cameraOffset = new THREE.Vector3(0, experience.radius * 2, experience.radius * 5);
      const targetPosition = planetPosition.clone().add(cameraOffset);
      
      // Use the atomic action to update all related state at once
      selectExperience(selection, targetPosition, planetPosition);
    }
  }, [experience, selectedExperience, selectExperience]);

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
  
  // Create a single, reusable vector for scaling
  const targetScaleVector = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const isHoveredInStore = hoveredExperience?.data.id === experience.id;

    // Determine current speed multiplier based on global motionState ONLY
    let speedMultiplier = 1.0;
    
    if (motionState === 'selected') {
      speedMultiplier = 0.05; // Global slowdown for everything
    } else if (motionState === 'hover') {
      speedMultiplier = 0.3; // Global slowdown for everything
    }

    let speed = experience.orbitalSpeed * 60 * speedMultiplier;

    if (groupRef.current) {
      // Update accumulated angle to prevent "jump" when speed changes
      angleRef.current += speed * delta;
      
      const x = Math.sin(angleRef.current) * experience.distanceFromStar;
      const z = Math.cos(angleRef.current) * experience.distanceFromStar;
      const inclination = experience.inclination || 0;

      // Apply inclination (rotate around X axis)
      groupRef.current.position.set(
        x,
        Math.sin(inclination) * z,
        Math.cos(inclination) * z
      );
    }

    if (planetRef.current) {
      // Self-rotation
      planetRef.current.rotation.y += 0.5 * delta;
      
      // Hover scale effect (1 -> 1.1)
      const targetScale = isHovered ? 1.1 : 1;
      targetScaleVector.set(targetScale, targetScale, targetScale); // Update reusable vector
      planetRef.current.scale.lerp(targetScaleVector, delta * 8); // Lerp to stable vector
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
          {isHovered && !isSelected && !aboutOpen && (
            <Html distanceFactor={15} pointerEvents="none">
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
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.4em' }}>{experience.name}</h3>
                <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '1.1em' }}>{experience.startDate} - {experience.endDate}</p>
                <p style={{ margin: 0, fontSize: '1.0em', lineHeight: '1.5' }}>{experience.description}</p>
              </div>
            </Html>
          )}
        </mesh>
      </Select>
      {experience.satellites && experience.satellites.map((sat, index) => (
        <Satellite
          key={sat.id}
          satellite={sat}
          parentPlanetId={experience.id}
          index={index}
        />
      ))}
    </group>
  );
};

export default Planet;
