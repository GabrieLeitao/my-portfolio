// src/components/common/BackgroundMusic.tsx
import React, { useEffect, useRef } from 'react';
import { useStore } from '../../store';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMuted = useStore((state) => state.isMuted);
  const isAudioInitialized = useStore((state) => state.isAudioInitialized);
  const setAudioInitialized = useStore((state) => state.setAudioInitialized);

  useEffect(() => {
    // Function to initialize audio on first interaction
    const initAudio = () => {
      if (!isAudioInitialized) {
        console.log('Audio initialized via user interaction');
        setAudioInitialized(true);
        // Remove listeners once initialized
        window.removeEventListener('click', initAudio);
        window.removeEventListener('keydown', initAudio);
        window.removeEventListener('touchstart', initAudio);
      }
    };

    if (!isAudioInitialized) {
      window.addEventListener('click', initAudio);
      window.addEventListener('keydown', initAudio);
      window.addEventListener('touchstart', initAudio);
    }

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, [isAudioInitialized, setAudioInitialized]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (isMuted || !isAudioInitialized) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
    }
  }, [isMuted, isAudioInitialized]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
    >
      <source src="https://raw.githubusercontent.com/the-hyphen/audio-assets/main/space-ambient.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;
