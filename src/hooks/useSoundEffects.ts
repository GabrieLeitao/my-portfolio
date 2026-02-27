// src/hooks/useSoundEffects.ts
import { useCallback, useMemo } from 'react';
import { useStore } from '../store';

export const useSoundEffects = () => {
  const isMuted = useStore((state) => state.isMuted);

  const hoverSound = useMemo(() => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    audio.volume = 0.15;
    audio.onerror = (e) => console.error('Hover audio source error:', e);
    return audio;
  }, []);

  const clickSound = useMemo(() => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
    audio.volume = 0.4;
    audio.onerror = (e) => console.error('Click audio source error:', e);
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
