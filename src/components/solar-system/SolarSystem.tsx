import React, { useRef } from 'react';
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
  const dofRef = useRef<any>(null);
  const bloomRef = useRef<any>(null);
  const lightsInitializedRef = useRef(false);
  const { scene } = useThree();

  const dummyLight = React.useMemo(() => new THREE.PointLight(), []);

  useFrame((_, delta) => {
    // 1. Initialize lights once in a frame
    if (bloomRef.current && !lightsInitializedRef.current) {
      const lights: THREE.Light[] = [];
      scene.traverse((obj) => {
        if ((obj as any).isLight) lights.push(obj as THREE.Light);
      });
      if (lights.length > 0) {
        bloomRef.current.lights = lights;
        lightsInitializedRef.current = true;
      }
    }

    // 2. Update DOF effects - Access store directly to avoid triggering parent re-render
    const isSelected = useStore.getState().selectedExperience !== null;
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
      <ambientLight intensity={0.7} />
      <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade />

      <TimelineGrid experiences={experiences} />

      {/* The Sun */}
      <Star size={2} color="#ffd700" />

      {experiences.map((exp) => (
        <Planet
          key={exp.name}
          experience={exp}
        />
      ))}
      
      <EffectComposer>
        {/* Adjusted intensity to 1.2 to reduce blooming effect on sun */}
        <SelectiveBloom
          ref={bloomRef}
          lights={[dummyLight]} 
          selectionLayer={1} 
          luminanceThreshold={0.01}
          luminanceSmoothing={0.9}
          height={300}
          intensity={1.2}
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
