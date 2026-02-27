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
  }, [camera]);

  // Save camera state only when a transition starts
  useEffect(() => {
    if (cameraState === 'transition' && prevCameraStateRef.current === 'free') {
      if (controlsRef.current) {
        useStore.getState().saveCameraState(camera.position, controlsRef.current.target);
      }
    }
    prevCameraStateRef.current = cameraState;
  }, [cameraState, camera.position]);

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
      // Return to the original speed that was smooth
      const speed = cameraState === 'exit' ? 4.0 : 3.0;
      const alpha = 1 - Math.exp(-speed * delta);
      
      camera.position.lerp(targetCameraPos, alpha);
      controlsRef.current.target.lerp(targetLookAt, alpha);
      controlsRef.current.update();

      const dist = camera.position.distanceTo(targetCameraPos);
      const targetDist = controlsRef.current.target.distanceTo(targetLookAt);
      
      if (dist < 0.01 && targetDist < 0.01) {
        camera.position.copy(targetCameraPos);
        controlsRef.current.target.copy(targetLookAt);
        controlsRef.current.update();
        
        const state = useStore.getState();
        if (cameraState === 'transition') {
          state.setCameraState('locked');
        } else {
          state.setCameraState('free');
        }
      }
    } else if (cameraState === 'locked') {
      camera.position.copy(targetCameraPos);
      controlsRef.current.target.copy(targetLookAt);
      controlsRef.current.update();
    } else if (cameraState === 'free') {
      // In free mode, we only ensure the target stays centered on the sun
      // but we DON'T force camera position so OrbitControls can work
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
