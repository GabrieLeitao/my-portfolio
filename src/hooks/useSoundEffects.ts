// src/hooks/useSoundEffects.ts
import { useCallback, useMemo } from 'react';
import { useStore } from '../store';

export const useSoundEffects = () => {
  const isMuted = useStore((state) => state.isMuted);

  const hoverSound = useMemo(() => {
    // Using a more standard UI sound URL
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.15;
    return audio;
  }, []);

  const clickSound = useMemo(() => {
    // Using a more standard UI click sound URL
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.4;
    return audio;
  }, []);

  const playHover = useCallback(() => {
    if (isMuted) return;
    hoverSound.currentTime = 0;
    hoverSound.play().catch(e => console.log('Hover sound failed:', e));
  }, [isMuted, hoverSound]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log('Click sound failed:', e));
  }, [isMuted, clickSound]);

  return { playHover, playClick };
};
