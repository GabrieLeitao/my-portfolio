// src/components/solar-system/CameraController.tsx
import React, { useRef, useEffect, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useStore } from '../../store';
import * as THREE from 'three';

const CameraController: React.FC = () => {
  const { camera, scene } = useThree();
  const controlsRef = useRef<any>(null);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const tempVec2 = useMemo(() => new THREE.Vector3(), []);
  const sunPos = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  // Subscribe to state individually
  const cameraState = useStore((state) => state.cameraState);
  const cameraTargetPosition = useStore((state) => state.cameraTargetPosition);
  const cameraLookAt = useStore((state) => state.cameraLookAt);
  const cameraOffset = useStore((state) => state.cameraOffset);
  const selectedExperience = useStore((state) => state.selectedExperience);
  const setCameraState = useStore((state) => state.setCameraState);
  const saveCameraState = useStore((state) => state.saveCameraState);
  const prevCameraStateRef = useRef(cameraState);

  // Save camera state before starting a transition from 'free' mode
  useEffect(() => {
    if (cameraState === 'transition' && prevCameraStateRef.current === 'free' && controlsRef.current) {
      // Use useStore.getState() to avoid extra re-renders from the function reference itself
      const state = useStore.getState();
      state.saveCameraState(camera.position, controlsRef.current.target);
    }
    prevCameraStateRef.current = cameraState;
  }, [cameraState]);

  useEffect(() => {
    // Set initial camera position once
    camera.position.set(0, 20, 50);
  }, [camera]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // Determine the dynamic target to look at and position to follow
    let currentLookAt = cameraLookAt;
    let currentCameraPos = cameraTargetPosition;

    if (selectedExperience) {
      const targetObj = scene.getObjectByName(selectedExperience.data.name);
      if (targetObj) {
        targetObj.getWorldPosition(tempVec);
        currentLookAt = tempVec;
        
        // If we have an offset, the camera position is relative to the moving planet
        if (cameraOffset) {
          tempVec2.copy(tempVec).add(cameraOffset);
          currentCameraPos = tempVec2;
        }
      }
    } else if (cameraState === 'free') {
      // Always center on the sun when in free mode
      currentLookAt = sunPos;
    }

    if (cameraState === 'transition' || cameraState === 'exit') {
      // Slower, more graceful speed
      const speed = 2.5;
      const alpha = 1 - Math.exp(-speed * delta);
      
      camera.position.lerp(currentCameraPos, alpha);
      controlsRef.current.target.lerp(currentLookAt, alpha);
      controlsRef.current.update();

      const dist = camera.position.distanceTo(currentCameraPos);
      const targetDist = controlsRef.current.target.distanceTo(currentLookAt);
      
      const threshold = 0.05;
      
      if (dist < threshold && targetDist < threshold) {
        if (cameraState === 'transition') {
          setCameraState('locked');
        } else if (cameraState === 'exit') {
          setCameraState('free');
        }
      }
    } else if (cameraState === 'locked') {
      // In locked mode, follow the target precisely every frame
      camera.position.copy(currentCameraPos);
      controlsRef.current.target.copy(currentLookAt);
      controlsRef.current.update();
    } else if (cameraState === 'free') {
      // Ensure we stay centered on the sun even if controls attempt to drift
      controlsRef.current.target.copy(sunPos);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={cameraState === 'free'}
      enablePan={false} // Disable right-click panning
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

