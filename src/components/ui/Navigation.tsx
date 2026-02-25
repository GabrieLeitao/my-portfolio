import React from 'react';
import { useStore } from '../../store';

interface NavigationProps {
  // Add props for navigation links if needed
}

const Navigation: React.FC<NavigationProps> = () => {
  const setAboutOpen = useStore((state) => state.setAboutOpen);

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
        <li><a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>GitHub</a></li>
        <li><a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>LinkedIn</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
