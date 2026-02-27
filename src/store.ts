import { create } from 'zustand';
import * as THREE from 'three';
import { Experience, Satellite } from './types';

import { CONFIG } from './config';

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
  aboutOpen: boolean;
  selectExperience: (experience: SelectedExperience | null, cameraPos?: THREE.Vector3, lookAt?: THREE.Vector3) => void;
  setSelectedExperience: (experience: SelectedExperience | null) => void;
  setHoveredExperience: (experience: SelectedExperience | null) => void;
  setAboutOpen: (open: boolean) => void;

  // Motion control
  motionState: MotionState;
  setMotionState: (state: MotionState) => void;

  // Camera control
  cameraState: CameraState;
  cameraTargetPosition: THREE.Vector3;
  cameraLookAt: THREE.Vector3;
  cameraOffset: THREE.Vector3 | null;
  savedCameraPosition: THREE.Vector3 | null;
  savedCameraLookAt: THREE.Vector3 | null;
  isMuted: boolean;
  isAudioInitialized: boolean;
  dynamicDistancing: boolean;
  setCameraState: (state: CameraState) => void;
  setCameraTarget: (position: THREE.Vector3, lookAt: THREE.Vector3) => void;
  saveCameraState: (position: THREE.Vector3, lookAt: THREE.Vector3) => void;
  toggleMute: () => void;
  setAudioInitialized: (initialized: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  selectedExperience: null,
  hoveredExperience: null,
  aboutOpen: false,
  motionState: 'idle',
  cameraState: 'free',
  cameraTargetPosition: new THREE.Vector3(0, 20, 50),
  cameraLookAt: new THREE.Vector3(0, 0, 0),
  cameraOffset: null,
  savedCameraPosition: null,
  savedCameraLookAt: null,
  isMuted: CONFIG.initialMuted,
  isAudioInitialized: false,
  dynamicDistancing: CONFIG.dynamicDistancing,

  // Actions
  selectExperience: (experience, cameraPos?, lookAt?) => set((state) => {
    if (experience === null) {
      return { 
        selectedExperience: null, 
        cameraState: 'exit',
        cameraTargetPosition: state.savedCameraPosition || new THREE.Vector3(0, 20, 50),
        cameraLookAt: state.savedCameraLookAt || new THREE.Vector3(0, 0, 0),
        cameraOffset: null,
        motionState: 'idle'
      };
    }
    
    let offset = null;
    if (cameraPos && lookAt) {
      offset = cameraPos.clone().sub(lookAt);
    }

    return {
      selectedExperience: experience,
      motionState: 'selected',
      aboutOpen: false,
      cameraState: 'transition',
      cameraTargetPosition: cameraPos || state.cameraTargetPosition,
      cameraLookAt: lookAt || state.cameraLookAt,
      cameraOffset: offset
    };
  }),
  setSelectedExperience: (experience) => set((state) => {
    if (experience === null) {
      return { 
        selectedExperience: null, 
        cameraState: 'exit',
        cameraTargetPosition: state.savedCameraPosition || new THREE.Vector3(0, 20, 50),
        cameraLookAt: state.savedCameraLookAt || new THREE.Vector3(0, 0, 0),
        cameraOffset: null,
        motionState: 'idle'
      };
    }
    if (state.selectedExperience?.data.name !== experience.data.name) {
      return { 
        selectedExperience: experience,
        motionState: 'selected',
        aboutOpen: false,
        cameraState: 'transition',
        cameraOffset: null // Signal to CameraController to calculate a new offset
      };
    }
    return {};
  }),
  setHoveredExperience: (experience) => set((state) => {
    if (experience === null) {
      if (state.hoveredExperience === null) return {};
      return { hoveredExperience: null, motionState: state.selectedExperience ? 'selected' : 'idle' };
    }
    if (state.hoveredExperience?.data.name !== experience.data.name) {
      return { hoveredExperience: experience, motionState: 'hover' };
    }
    return {};
  }),
  setAboutOpen: (open) => set((state) => ({ 
    aboutOpen: open,
    selectedExperience: open ? null : state.selectedExperience,
    cameraState: open ? 'exit' : state.cameraState,
    cameraTargetPosition: open ? (state.savedCameraPosition || new THREE.Vector3(0, 20, 50)) : state.cameraTargetPosition,
    cameraLookAt: open ? (state.savedCameraLookAt || new THREE.Vector3(0, 0, 0)) : state.cameraLookAt
  })),
  setMotionState: (state) => set({ motionState: state }),
  setCameraState: (state) => set({ cameraState: state }),
  setCameraTarget: (position, lookAt) => set({
    cameraTargetPosition: position,
    cameraLookAt: lookAt,
  }),
  saveCameraState: (position, lookAt) => set({
    savedCameraPosition: position.clone(),
    savedCameraLookAt: lookAt.clone(),
  }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setAudioInitialized: (initialized) => set({ isAudioInitialized: initialized }),
}));
