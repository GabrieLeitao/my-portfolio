import React from 'react';
import './App.css'; // Keep this import, though the file is now empty

import Layout from './components/ui/Layout';
import Navigation from './components/ui/Navigation';
import ExperienceDetail from './components/ui/ExperienceDetail';
import SolarSystem from './components/solar-system/SolarSystem';
import About from './components/ui/About';
import BackgroundMusic from './components/common/BackgroundMusic';

function App() {
  return (
    <Layout>
      <Navigation />
      <SolarSystem />
      <ExperienceDetail />
      <About />
      <BackgroundMusic />
    </Layout>
  );
}

export default App;

