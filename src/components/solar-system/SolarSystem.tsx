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
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const starLightRef = useRef<THREE.PointLight>(null);
  const { scene } = useThree();

  const dummyLight = React.useMemo(() => new THREE.PointLight(), []);

  // Initialize bloom lights once on mount or when lights are ready
  React.useEffect(() => {
    if (bloomRef.current) {
      const lights: THREE.Light[] = [];
      if (ambientLightRef.current) lights.push(ambientLightRef.current);
      // We can also find lights by traversing once if they are dynamic, 
      // but here we have static references
      bloomRef.current.lights = lights;
    }
  }, []);

  useFrame((_, delta) => {
    // Update DOF effects - Access store directly to avoid triggering parent re-render
    const isSelected = useStore.getState().selectedExperience !== null;
    if (dofRef.current) {
      const targetBokeh = isSelected ? 2 : 0;
      const smoothing = 1 - Math.exp(-2 * delta);
      dofRef.current.bokehScale = THREE.MathUtils.lerp(
        dofRef.current.bokehScale,
        targetBokeh,
        smoothing
      );
    }
  });

  return (
    <Selection>
      <ambientLight ref={ambientLightRef} intensity={0.7} />
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
