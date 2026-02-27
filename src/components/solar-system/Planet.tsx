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
import { calculateOrbitalPosition, PHYSICS_CONSTANTS } from '../../utils/physics';

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

  const motionState = useStore((state) => state.motionState);
  const selectedExperience = useStore((state) => state.selectedExperience);
  const aboutOpen = useStore((state) => state.aboutOpen);
  const dynamicDistancing = useStore((state) => state.dynamicDistancing);

  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedExperience?.data.name === experience.name;

  const color = useMemo(() => {
    switch (experience.type) {
      case 'job': return new THREE.Color('#ff8c00');
      case 'education': 
      case 'main-education': return new THREE.Color('#6495ed');
      case 'project': return new THREE.Color('#98fb98');
      case 'general': return new THREE.Color('#ff69b4');
      default: return new THREE.Color('white');
    }
  }, [experience.type]);

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    if (selectedExperience || !planetRef.current) return;
    playClick();
    const pos = new THREE.Vector3();
    planetRef.current.getWorldPosition(pos);
    const offset = new THREE.Vector3(0, experience.radius * 2, experience.radius * 5);
    useStore.getState().selectExperience({ type: 'planet', data: experience }, pos.clone().add(offset), pos);
  }, [experience, selectedExperience, playClick]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    if (selectedExperience) return;
    playHover();
    setIsHovered(true);
    useStore.getState().setHoveredExperience({ type: 'planet', data: experience });
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    useStore.getState().setHoveredExperience(null);
  };

  useFrame((_, delta) => {
    const orbitData = dynamicDistancing ? getOrbitData(experience.name) : null;
    const dist = orbitData ? orbitData.distance : experience.distanceFromStar;
    const speed = orbitData ? orbitData.speed : experience.orbitalSpeed;

    let multiplier = 1.0;
    if (motionState === 'selected') multiplier = 0.05;
    else if (motionState === 'hover') multiplier = 0.3;

    if (groupRef.current) {
      angleRef.current += speed * PHYSICS_CONSTANTS.ORBIT_SPEED_MULTIPLIER * multiplier * delta;
      const { distance, trueAnomaly } = calculateOrbitalPosition(angleRef.current, experience.eccentricity, dist);
      const inc = (experience.inclination || 0) * (Math.PI / 180);
      groupRef.current.position.set(Math.sin(trueAnomaly) * distance, Math.sin(inc) * Math.cos(trueAnomaly) * distance, Math.cos(trueAnomaly) * distance);
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.5 * delta;
      const s = isHovered ? 1.1 : 1;
      planetRef.current.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.exp(-8 * delta));
    }
  });

  const tilt = (experience.axialTilt || 0) * (Math.PI / 180);

  return (
    <group ref={groupRef}>
      <group rotation={[tilt, 0, 0]}>
        <Select enabled={isSelected}>
          {/* Main Planet */}
          <mesh
            ref={planetRef}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <sphereGeometry args={[experience.radius, 32, 32]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={isSelected ? 1.2 : (isHovered ? 0.6 : 0.2)} 
              roughness={0.8}
            />
            
            {/* Simple Glow Atmosphere */}
            <mesh scale={[1.05, 1.05, 1.05]} raycast={() => null}>
              <sphereGeometry args={[experience.radius, 32, 32]} />
              <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.3 : 0.15} side={THREE.BackSide} />
            </mesh>

            {/* Rings */}
            {experience.rings && (
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[experience.rings.innerRadius, experience.rings.outerRadius, 64]} />
                <meshStandardMaterial 
                  color={experience.rings.color || color} 
                  transparent 
                  opacity={0.4} 
                  side={THREE.DoubleSide} 
                  emissive={experience.rings.color || color}
                  emissiveIntensity={isSelected ? 0.5 : 0.2}
                />
              </mesh>
            )}
          </mesh>
        </Select>

        {isHovered && !isSelected && !aboutOpen && (
          <Html pointerEvents="none" zIndexRange={[100, 0]} position={[0, experience.radius * 1.5, 0]}>
            <div style={{ 
              background: 'rgba(0,0,0,0.9)', color: 'white', padding: '12px', borderRadius: '8px',
              border: `2px solid ${color.getStyle()}`, width: 'max-content', maxWidth: '300px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)', fontFamily: 'sans-serif'
            }}>
              <h4 style={{ margin: '0 0 4px 0' }}>{experience.name}</h4>
              <div style={{ fontSize: '0.8em', opacity: 0.8 }}>{experience.startDate} - {experience.endDate}</div>
              <div style={{ fontSize: '0.85em', marginTop: '8px', lineHeight: '1.4' }}>{renderDescription(experience.description)}</div>
            </div>
          </Html>
        )}

        {experience.satellites?.map((sat, i) => (
          <Satellite key={sat.name} satellite={sat} parentPlanetName={experience.name} index={i} />
        ))}
      </group>
    </group>
  );
};

export default Planet;
