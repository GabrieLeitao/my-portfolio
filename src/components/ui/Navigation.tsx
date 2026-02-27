import React from 'react';
import { useStore } from '../../store';
import { personalInfo } from '../../data/experiences';

const Navigation: React.FC = () => {
  const setAboutOpen = useStore((state) => state.setAboutOpen);
  const isMuted = useStore((state) => state.isMuted);
  const toggleMute = useStore((state) => state.toggleMute);

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAboutOpen(true);
  };

  return (
    <nav style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        gap: '15px',
      }}>
        <li>
          <a 
            href="#about" 
            onClick={handleAboutClick}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            About
          </a>
        </li>
        <li><a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>GitHub</a></li>
        <li><a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>LinkedIn</a></li>
      </ul>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={toggleMute}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
            opacity: 0.7,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
