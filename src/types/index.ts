// src/types/index.ts

export interface Satellite {
  name: string;
  description: string;
  technologies: string[];
  radius: number; // For rendering size
  distanceFromPlanet: number; // Distance from its parent planet
  speed: number; // Orbital speed around the planet
}

export interface Experience {
  name: string;
  type: 'job' | 'project' | 'main-education' | 'education' | 'general';
  description: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  radius: number; // For rendering size of the planet
  distanceFromStar: number; // Distance from the central star
  orbitalSpeed: number; // Orbital speed around the star
  inclination?: number; // Optional orbital inclination in degrees
  axialTilt?: number; // Optional axial tilt in degrees (obliquity)
  eccentricity?: number; // Optional orbital eccentricity (0 = circle, < 1 = ellipse)
  satellites?: Satellite[];
  rings?: {
    innerRadius: number;
    outerRadius: number;
    color?: string;
  };
}

export interface SelectedExperience {
  type: 'planet' | 'satellite';
  data: Experience | Satellite;
}
