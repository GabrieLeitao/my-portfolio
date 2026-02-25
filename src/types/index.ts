// src/types/index.ts

export interface Satellite {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  radius: number; // For rendering size
  distanceFromPlanet: number; // Distance from its parent planet
  speed: number; // Orbital speed around the planet
}

export interface Experience {
  id: string;
  name: string;
  type: 'job' | 'project' | 'education';
  description: string;
  startDate: string;
  endDate: string;
  position?: string; // Optional, for jobs
  technologies: string[];
  radius: number; // For rendering size of the planet
  distanceFromStar: number; // Distance from the central star
  orbitalSpeed: number; // Orbital speed around the star
  inclination?: number; // Optional orbital inclination in radians
  satellites?: Satellite[];
}

export interface SelectedExperience {
  type: 'planet' | 'satellite';
  data: Experience | Satellite;
}
