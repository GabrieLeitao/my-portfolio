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

  // Use getState() in useFrame to avoid ANY re-renders from state changes
  const cameraState = useStore((state) => state.cameraState);
  const prevCameraStateRef = useRef(cameraState);

  // Initialize initial camera position ONCE on mount
  useEffect(() => {
    const initialPos = useStore.getState().cameraTargetPosition;
    camera.position.copy(initialPos);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
    }
  }, [camera]);

  // Use a very stable transition save logic
  useEffect(() => {
    if (cameraState === 'transition' && prevCameraStateRef.current === 'free') {
      const state = useStore.getState();
      if (controlsRef.current) {
        state.saveCameraState(camera.position, controlsRef.current.target);
      }
    }
    prevCameraStateRef.current = cameraState;
  }, [cameraState, camera.position]); // Stable dependency

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // Pull current state directly to avoid triggering React updates
    const state = useStore.getState();
    const currentCameraState = state.cameraState;
    const currentSelectedExperience = state.selectedExperience;
    const currentCameraOffset = state.cameraOffset;
    const currentCameraLookAt = state.cameraLookAt;
    const currentCameraTargetPosition = state.cameraTargetPosition;

    let targetLookAt = currentCameraLookAt;
    let targetCameraPos = currentCameraTargetPosition;

    if (currentSelectedExperience) {
      const targetObj = scene.getObjectByName(currentSelectedExperience.data.name);
      if (targetObj) {
        targetObj.getWorldPosition(tempVec);
        targetLookAt = tempVec;
        
        if (currentCameraOffset) {
          tempVec2.copy(tempVec).add(currentCameraOffset);
          targetCameraPos = tempVec2;
        }
      }
    } else if (currentCameraState === 'free') {
      targetLookAt = sunPos;
    }

    if (currentCameraState === 'transition' || currentCameraState === 'exit') {
      // Much faster exit transition
      const speed = currentCameraState === 'exit' ? 8.0 : 4.0;
      const alpha = 1 - Math.exp(-speed * delta);
      
      camera.position.lerp(targetCameraPos, alpha);
      controlsRef.current.target.lerp(targetLookAt, alpha);
      controlsRef.current.update();

      const dist = camera.position.distanceTo(targetCameraPos);
      const targetDist = controlsRef.current.target.distanceTo(targetLookAt);
      
      const threshold = currentCameraState === 'exit' ? 0.2 : 0.05;
      
      if (dist < threshold && targetDist < threshold) {
        if (currentCameraState === 'transition') {
          state.setCameraState('locked');
        } else if (currentCameraState === 'exit') {
          state.setCameraState('free');
        }
      }
    } else if (currentCameraState === 'locked') {
      camera.position.copy(targetCameraPos);
      controlsRef.current.target.copy(targetLookAt);
      controlsRef.current.update();
    } else if (currentCameraState === 'free') {
      controlsRef.current.target.copy(sunPos);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={cameraState === 'free'}
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      minDistance={5}
      maxDistance={150}
    />
  );
};

export default CameraController;
