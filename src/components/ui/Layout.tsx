// src/components/ui/Layout.tsx
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'sans-serif',
      background: 'black', // Ensure a dark background for space theme
    }}>
      {children}
    </div>
  );
};

export default Layout;
