// src/data/experiences.ts

import { Experience } from '../types';

export const personalInfo = {
  name: 'Your Name',
  title: 'Software Engineer | Space Enthusiast',
  email: 'your.email@example.com',
  phone: '+1 (555) 000-0000',
  location: 'City, Country',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-username',
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Portuguese', level: 'Native' },
    { name: 'Spanish', level: 'Intermediate' }
  ]
};

export const skills = {
  programmingLanguages: [
    { name: 'TypeScript/JavaScript', strength: 95 },
    { name: 'Python', strength: 90 },
    { name: 'C++', strength: 80 },
    { name: 'Java', strength: 75 },
    { name: 'Go', strength: 60 }
  ],
  frameworks: ['React', 'Node.js', 'FastAPI', 'Three.js', 'Express'],
  tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Linux'],
  otherQualifications: [
    'Certified Cloud Practitioner (AWS)',
    'Advanced Problem Solving Certificate',
    'Open Source Contributor of the Year 2025'
  ]
};

export const experiences: Experience[] = [
  {
    id: 'star-2024-present',
    name: 'Current Role/Project',
    type: 'job',
    description: 'A brief overview of my current professional focus and responsibilities.',
    startDate: '2024-01-01',
    endDate: 'Present',
    position: 'Software Engineer',
    technologies: ['React', 'TypeScript', 'Three.js', '@react-three/fiber'],
    radius: 0.9, // Represents the size of the "planet"
    distanceFromStar: 8, // Distance from the central star (closer to present)
    orbitalSpeed: 0.0012, 
    inclination: 0.05,
    satellites: [
      {
        id: 'current-feature-a',
        name: 'Feature Development A',
        description: 'Led the development of critical feature A, significantly improving user engagement by X%.',
        technologies: ['React', 'GraphQL'],
        radius: 0.2,
        distanceFromPlanet: 1.5,
        speed: 0.015,
      },
      {
        id: 'current-bug-fix',
        name: 'Performance Optimization Initiative',
        description: 'Optimized application performance, reducing load times by Y%.',
        technologies: ['Next.js', 'Webpack'],
        radius: 0.15,
        distanceFromPlanet: 2.0,
        speed: 0.012,
      },
    ],
  },
  {
    id: 'exp-2022-2023',
    name: 'Previous Company/Project',
    type: 'job',
    description: 'Details about a previous role where I gained valuable experience in Z.',
    startDate: '2022-03-01',
    endDate: '2023-12-31',
    position: 'Frontend Developer',
    technologies: ['Angular', 'RxJS', 'Node.js'],
    radius: 0.7,
    distanceFromStar: 15, // Further from star for older experiences
    orbitalSpeed: 0.0008,
    inclination: -0.03,
    satellites: [
      {
        id: 'prev-project-x',
        name: 'Project X Lead',
        description: 'Successfully delivered Project X on time and within budget, managing a team of 3 developers.',
        technologies: ['Angular', 'Firebase'],
        radius: 0.25,
        distanceFromPlanet: 2.5,
        speed: 0.008,
      },
    ],
  },
  {
    id: 'edu-2018-2022',
    name: 'University Education',
    type: 'education',
    description: 'Bachelor of Science in Computer Science with a focus on software engineering.',
    startDate: '2018-09-01',
    endDate: '2022-06-30',
    technologies: ['Java', 'Python', 'C++'], // Representing skills acquired
    radius: 0.6,
    distanceFromStar: 20, // Even further
    orbitalSpeed: 0.0007,
    inclination: 0.02,
    satellites: [
      {
        id: 'thesis-project',
        name: 'Thesis Project: AI in Gaming',
        description: 'Developed an AI agent for a real-time strategy game using reinforcement learning.',
        technologies: ['Python', 'TensorFlow'],
        radius: 0.2,
        distanceFromPlanet: 2.0,
        speed: 0.01,
      },
      {
        id: 'data-structures-course',
        name: 'Advanced Data Structures',
        description: 'Implemented various complex data structures and algorithms in C++.',
        technologies: ['C++'],
        radius: 0.1,
        distanceFromPlanet: 1.8,
        speed: 0.013,
      },
    ],
  },
  {
    id: 'side-project-alpha',
    name: 'Open Source Contribution Alpha',
    type: 'project',
    description: 'Contributed to an open-source library, improving its performance and adding new features.',
    startDate: '2023-05-01',
    endDate: '2023-08-31',
    technologies: ['JavaScript', 'Vue.js'],
    radius: 0.5,
    distanceFromStar: 12,
    orbitalSpeed: 0.001,
    inclination: -0.04,
    satellites: [],
  },
  {
    id: 'side-project-beta',
    name: 'Personal Portfolio Project',
    type: 'project',
    description: 'Developed this very solar system portfolio to showcase my skills.',
    startDate: '2024-02-01',
    endDate: 'Present',
    technologies: ['React', 'TypeScript', 'Three.js', '@react-three/fiber', '@react-three/drei'],
    radius: 0.75,
    distanceFromStar: 5,
    orbitalSpeed: 0.0015,
    inclination: 0.06,
    satellites: [
        {
            id: 'portfolio-design',
            name: '3D Design & Modeling',
            description: 'Designed and implemented the 3D models and scene composition for the solar system.',
            technologies: ['Blender', 'Three.js'],
            radius: 0.18,
            distanceFromPlanet: 1.2,
            speed: 0.02,
        },
        {
            id: 'portfolio-interaction',
            name: 'Interactive Controls',
            description: 'Developed intuitive camera controls and interactive elements for a seamless user experience.',
            technologies: ['@react-three/drei', 'Zustand'],
            radius: 0.15,
            distanceFromPlanet: 1.8,
            speed: 0.018,
        }
    ],
  },
];
