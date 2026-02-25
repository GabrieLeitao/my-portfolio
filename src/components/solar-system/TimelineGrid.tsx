import React from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { Experience } from '../../types';
import { useStore } from '../../store';

interface TimelineGridProps {
  experiences: Experience[];
}

const TimelineGrid: React.FC<TimelineGridProps> = ({ experiences }) => {
  const aboutOpen = useStore((state) => state.aboutOpen);

  // Create a set of unique years from the experience data
  const years = Array.from(new Set(experiences.map(e => new Date(e.startDate).getFullYear())));

  const rings = years.map(year => {
    // Find the experience closest to the start of this year to determine the ring's distance
    const expForYear = experiences.find(e => new Date(e.startDate).getFullYear() === year);
    return { year, distance: expForYear?.distanceFromStar || 0 };
  }).filter(ring => ring.distance > 0);

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
            >
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'monospace',
                fontSize: '12px',
                userSelect: 'none',
                pointerEvents: 'none',
                whiteSpace: 'nowrap'
              }}>
                {year.toString()}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
};

export default TimelineGrid;

