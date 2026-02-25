import React from 'react';
import './App.css'; // Keep this import, though the file is now empty

import Layout from './components/ui/Layout';
import Navigation from './components/ui/Navigation';
import ExperienceDetail from './components/ui/ExperienceDetail';
import SolarSystem from './components/solar-system/SolarSystem';
import About from './components/ui/About';

function App() {
  return (
    <Layout>
      <Navigation />
      <SolarSystem />
      <ExperienceDetail />
      <About />
    </Layout>
  );
}

export default App;

