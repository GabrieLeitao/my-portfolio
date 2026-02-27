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

  const cameraState = useStore((state) => state.cameraState);
  const selectedExperience = useStore((state) => state.selectedExperience);
  const cameraOffset = useStore((state) => state.cameraOffset);
  const cameraLookAt = useStore((state) => state.cameraLookAt);
  const cameraTargetPosition = useStore((state) => state.cameraTargetPosition);
  
  const prevCameraStateRef = useRef(cameraState);

  // Initialize initial camera position ONCE on mount
  useEffect(() => {
    const initialPos = useStore.getState().cameraTargetPosition;
    camera.position.copy(initialPos);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
    // We only want this on mount, but if camera changes (rarely) it's okay
  }, [camera]);

  // Save camera state only when a transition starts
  useEffect(() => {
    // Only save if we are ENTERING a transition from free state
    if (cameraState === 'transition' && prevCameraStateRef.current === 'free') {
      if (controlsRef.current) {
        useStore.getState().saveCameraState(camera.position, controlsRef.current.target);
      }
    }
    prevCameraStateRef.current = cameraState;
    // Removing camera.position from deps to avoid running every frame during transition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraState]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    let targetLookAt = cameraLookAt;
    let targetCameraPos = cameraTargetPosition;

    if (selectedExperience) {
      const targetObj = scene.getObjectByName(selectedExperience.data.name);
      if (targetObj) {
        targetObj.getWorldPosition(tempVec);
        targetLookAt = tempVec;
        if (cameraOffset) {
          tempVec2.copy(tempVec).add(cameraOffset);
          targetCameraPos = tempVec2;
        }
      }
    } else if (cameraState === 'free') {
      targetLookAt = sunPos;
    }

    if (cameraState === 'transition' || cameraState === 'exit') {
      const speed = cameraState === 'exit' ? 4.0 : 3.0;
      const alpha = 1 - Math.exp(-speed * delta);
      
      camera.position.lerp(targetCameraPos, alpha);
      controlsRef.current.target.lerp(targetLookAt, alpha);
      controlsRef.current.update();

      const dist = camera.position.distanceTo(targetCameraPos);
      const targetDist = controlsRef.current.target.distanceTo(targetLookAt);
      
      // Threshold for completing transition
      if (dist < 0.005 && targetDist < 0.005) {
        // Force snap to final position to prevent any jitter
        camera.position.copy(targetCameraPos);
        controlsRef.current.target.copy(targetLookAt);
        controlsRef.current.update();
        
        const state = useStore.getState();
        // Only set state if it hasn't changed already to prevent loops
        if (cameraState === 'transition' && state.cameraState !== 'locked') {
          state.setCameraState('locked');
        } else if (cameraState === 'exit' && state.cameraState !== 'free') {
          state.setCameraState('free');
        }
      }
    } else if (cameraState === 'locked') {
      // In locked mode, we strictly follow the target position and lookAt
      camera.position.copy(targetCameraPos);
      controlsRef.current.target.copy(targetLookAt);
      controlsRef.current.update();
    } else if (cameraState === 'free') {
      // In free mode, ensure the target stays centered on the sun for OrbitControls
      if (!controlsRef.current.target.equals(sunPos)) {
        controlsRef.current.target.copy(sunPos);
        controlsRef.current.update();
      }
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
