// src/components/solar-system/CameraController.tsx
import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useStore } from '../../store';
import * as THREE from 'three';

const CameraController: React.FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Subscribe to state individually
  const cameraState = useStore((state) => state.cameraState);
  const cameraTargetPosition = useStore((state) => state.cameraTargetPosition);
  const cameraLookAt = useStore((state) => state.cameraLookAt);
  const setCameraState = useStore((state) => state.setCameraState);

  useEffect(() => {
    // Set initial camera position once
    camera.position.set(0, 20, 50);
  }, [camera]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (cameraState === 'transition' || cameraState === 'exit') {
      // Transition back to overview is faster for better responsiveness
      const lerpSpeed = cameraState === 'exit' ? 6.0 : 3.0;
      camera.position.lerp(cameraTargetPosition, lerpSpeed * delta);
      
      controlsRef.current.target.lerp(cameraLookAt, lerpSpeed * delta);
      controlsRef.current.update();

      // Increased threshold to 2.0 for faster handoff to user controls
      const dist = camera.position.distanceTo(cameraTargetPosition);
      const targetDist = controlsRef.current.target.distanceTo(cameraLookAt);
      
      if (dist < 2.0 && targetDist < 2.0) {
        if (cameraState === 'transition') {
          setCameraState('locked');
        } else if (cameraState === 'exit') {
          setCameraState('free');
        }
      }
    } else if (cameraState === 'locked') {
      // In locked mode, we still want to keep the target updated if the planet moves
      // (though planets freeze when selected, so this is just for safety)
      controlsRef.current.target.copy(cameraLookAt);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      // Enable controls in free, locked, and exit states to maximize responsiveness
      enabled={cameraState === 'free' || cameraState === 'locked' || cameraState === 'exit'}
      onStart={() => {
        // If the user starts interacting during an exit transition, 
        // immediately give them full control.
        if (cameraState === 'exit') {
          setCameraState('free');
        }
      }}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      minDistance={5}
      maxDistance={100}
    />
  );
};

export default CameraController;

