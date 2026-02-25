import { create } from 'zustand';
import * as THREE from 'three';
import { Experience, Satellite } from './types';

export type SelectedExperience = {
  type: 'planet' | 'satellite';
  data: Experience | Satellite;
};

export type MotionState = 'idle' | 'hover' | 'selected';

export type CameraState = 'free' | 'transition' | 'locked' | 'exit';

interface AppState {
  // Selection and hover state
  selectedExperience: SelectedExperience | null;
  hoveredExperience: SelectedExperience | null;
  setSelectedExperience: (experience: SelectedExperience | null) => void;
  setHoveredExperience: (experience: SelectedExperience | null) => void;

  // Motion control
  motionState: MotionState;
  setMotionState: (state: MotionState) => void;

  // Camera control
  cameraState: CameraState;
  cameraTargetPosition: THREE.Vector3;
  cameraLookAt: THREE.Vector3;
  setCameraState: (state: CameraState) => void;
  setCameraTarget: (position: THREE.Vector3, lookAt: THREE.Vector3) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  selectedExperience: null,
  hoveredExperience: null,
  motionState: 'idle',
  cameraState: 'free',
  cameraTargetPosition: new THREE.Vector3(0, 20, 50), // Initial overview position
  cameraLookAt: new THREE.Vector3(0, 0, 0), // Initial look-at target

  // Actions
  setSelectedExperience: (experience) => set((state) => {
    if (experience === null) {
      return { 
        selectedExperience: null, 
        cameraState: 'exit',
        cameraTargetPosition: new THREE.Vector3(0, 20, 50),
        cameraLookAt: new THREE.Vector3(0, 0, 0),
        motionState: 'idle'
      };
    }
    if (state.selectedExperience?.data.id !== experience.data.id) {
      return { 
        selectedExperience: experience,
        motionState: 'selected'
      };
    }
    return {};
  }),
  setHoveredExperience: (experience) => set((state) => {
    if (experience === null) {
      if (state.hoveredExperience === null) return {};
      return { hoveredExperience: null, motionState: state.selectedExperience ? 'selected' : 'idle' };
    }
    if (state.hoveredExperience?.data.id !== experience.data.id) {
      return { hoveredExperience: experience, motionState: 'hover' };
    }
    return {};
  }),
  setMotionState: (state) => set({ motionState: state }),
  setCameraState: (state) => set({ cameraState: state }),
  setCameraTarget: (position, lookAt) => set({
    cameraTargetPosition: position,
    cameraLookAt: lookAt,
  }),
}));
