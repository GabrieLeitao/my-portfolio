// src/components/solar-system/CameraController.tsx
import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useStore } from '../../store';
import * as THREE from 'three';

const CameraController: React.FC = () => {
  const { camera, scene } = useThree();
  const controlsRef = useRef<any>(null);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  // Subscribe to state individually
  const cameraState = useStore((state) => state.cameraState);
  const cameraTargetPosition = useStore((state) => state.cameraTargetPosition);
  const cameraLookAt = useStore((state) => state.cameraLookAt);
  const selectedExperience = useStore((state) => state.selectedExperience);
  const setCameraState = useStore((state) => state.setCameraState);

  useEffect(() => {
    // Set initial camera position once
    camera.position.set(0, 20, 50);
  }, [camera]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // Determine the dynamic target to look at
    let currentLookAt = cameraLookAt;
    if (selectedExperience) {
      const targetObj = scene.getObjectByName(selectedExperience.data.id);
      if (targetObj) {
        targetObj.getWorldPosition(tempVec);
        currentLookAt = tempVec;
      }
    }

    if (cameraState === 'transition' || cameraState === 'exit') {
      // Transition back to overview is faster for better responsiveness
      const lerpSpeed = cameraState === 'exit' ? 6.0 : 3.0;
      camera.position.lerp(cameraTargetPosition, lerpSpeed * delta);
      
      controlsRef.current.target.lerp(currentLookAt, lerpSpeed * delta);
      controlsRef.current.update();

      const dist = camera.position.distanceTo(cameraTargetPosition);
      const targetDist = controlsRef.current.target.distanceTo(currentLookAt);
      
      // Separate thresholds: 
      // - Transition (entering): needs to be tighter (0.1) for a smooth arrival.
      // - Exit (leaving): can be loose (2.0) for a fast handoff.
      const threshold = cameraState === 'transition' ? 0.1 : 2.0;
      
      if (dist < threshold && targetDist < threshold) {
        if (cameraState === 'transition') {
          setCameraState('locked');
        } else if (cameraState === 'exit') {
          setCameraState('free');
        }
      }
    } else if (cameraState === 'locked') {
      // In locked mode, keep the target perfectly centered on the moving planet
      controlsRef.current.target.copy(currentLookAt);
      controlsRef.current.update();
      // WE DO NOT LERP POSITION HERE - this allows the user to rotate/zoom freely
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

