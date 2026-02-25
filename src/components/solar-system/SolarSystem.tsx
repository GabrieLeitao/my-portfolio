import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, SelectiveBloom, DepthOfField, Selection } from '@react-three/postprocessing';
import Star from './Star';
import Planet from './Planet';
import { experiences } from '../../data/experiences';
import CameraController from './CameraController';
import TimelineGrid from './TimelineGrid';
import { useStore } from '../../store';

const SceneContent: React.FC = () => {
  const isSelected = useStore((state) => state.selectedExperience !== null);
  const dofRef = useRef<any>(null);
  const bloomRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (dofRef.current) {
      const targetBokeh = isSelected ? 2 : 0;
      dofRef.current.bokehScale = THREE.MathUtils.lerp(
        dofRef.current.bokehScale,
        targetBokeh,
        delta * 2
      );
    }
  });

  return (
    <Selection>
      <ambientLight intensity={0.6} />
      <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade />

      <TimelineGrid experiences={experiences} />

      <Star size={2} color="#ffd700" />

      {experiences.map((exp) => (
        <Planet
          key={exp.id}
          experience={exp}
        />
      ))}
      
      <EffectComposer>
        <SelectiveBloom
          ref={bloomRef}
          selectionLayer={10}
          luminanceThreshold={0.01}
          luminanceSmoothing={0.9}
          height={300}
          intensity={1.5}
        />
        <DepthOfField
          ref={dofRef}
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={0}
          height={480}
        />
      </EffectComposer>

      <CameraController />
    </Selection>
  );
};

const SolarSystem: React.FC = () => {
  return (
    <Canvas camera={{ fov: 60 }} shadows>
      <SceneContent />
    </Canvas>
  );
};

export default SolarSystem;



