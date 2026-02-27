// src/components/solar-system/TimelineGrid.tsx
import React from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { Experience } from '../../types';
import { useStore } from '../../store';
import { useDynamicOrbit, parseDate } from '../../hooks/useDynamicOrbit';

interface TimelineGridProps {
  experiences: Experience[];
}

const TimelineGrid: React.FC<TimelineGridProps> = ({ experiences }) => {
  const aboutOpen = useStore((state) => state.aboutOpen);
  const dynamicDistancing = useStore((state) => state.dynamicDistancing);
  const { yearRings } = useDynamicOrbit();

  // Extract rings logic
  const rings = dynamicDistancing ? yearRings : (() => {
    // Manual fallback logic
    const yearMap = new Map<number, number>();
    experiences.forEach(exp => {
      const year = parseDate(exp.startDate).getFullYear();
      const currentDist = yearMap.get(year);
      // Use the minimum distance for that year's orbital band to represent the ring.
      if (currentDist === undefined || exp.distanceFromStar < currentDist) {
        yearMap.set(year, exp.distanceFromStar);
      }
    });
    return Array.from(yearMap.entries())
      .map(([year, distance]) => ({ year, distance }))
      .filter(ring => ring.distance > 0)
      // Sort by distance ascending: closest to sun (most recent years) comes first
      .sort((a, b) => a.distance - b.distance);
  })();

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {rings.map(({ year, distance }) => (
        <group key={year}>
          <mesh>
            <ringGeometry args={[distance - 0.05, distance, 128]} />
            <meshBasicMaterial color="#444" side={THREE.DoubleSide} transparent opacity={0.5} />
          </mesh>
          {!aboutOpen && (
            <Html
              position={[distance, 0, 0]}
              distanceFactor={20}
              center
              zIndexRange={[1, 0]}
            >
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'monospace',
                fontSize: '20px',
                userSelect: 'none',
                pointerEvents: 'none',
                whiteSpace: 'nowrap'
              }}>
                {year}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
};

export default TimelineGrid;
