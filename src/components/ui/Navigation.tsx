// src/components/ui/Navigation.tsx
import React from 'react';

interface NavigationProps {
  // Add props for navigation links if needed
}

const Navigation: React.FC<NavigationProps> = () => {
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
        <li><a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a></li>
        <li><a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
        <li><a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>GitHub</a></li>
        <li><a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>LinkedIn</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
