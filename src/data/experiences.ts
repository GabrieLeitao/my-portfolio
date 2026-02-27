// src/data/experiences.ts

import { Experience } from '../types';

export const personalInfo = {
  name: 'Gabriel Leitão',
  title: 'BSc Aerospace Engineering | Embedded Software | Machine Learning',
  email: 'gabriel.leitao@tecnico.ulisboa.pt',
  phone: '',
  location: 'Lisbon, Portugal',
  github: 'https://github.com/GabrieLeitao',
  linkedin: 'https://www.linkedin.com/in/gabriel-leit%C3%A3o-7a747a342/',
  languages: [
    { name: 'Portuguese', level: 'Native' },
    { name: 'English', level: 'C1' }
  ]
};

export const skills = {
  programmingLanguages: [
    { name: 'C', level: 4 },
    { name: 'Python', level: 3 },
    { name: 'C++', level: 3 },
    { name: 'TypeScript/JavaScript', level: 2 },
    { name: 'HTML/CSS', level: 2 },
    { name: 'SQL', level: 1}
  ],
  frameworks: ['React', 'Node.js', 'FastAPI', 'Three.js'],
  tools: ['Git', 'Linux'],
  otherQualifications: [
    'Cambridge English C1 Advanced 2023, Overall Score: 198'
  ]
};

export const experiences: Experience[] = [
  {
    name: 'Coordinator @ AfterSchool by TreeTree2',
    type: 'job',
    description: 'TreeTree2 is a non-profit organisation, enabling students to explore their curiosity outside basic and secondary school. \n \
                  TreeTree2: [www.treetree2.org](treetree2.org) \n \
                  AfterSchool: [treetree2.school](treetree2.school)',
    startDate: '26/12/2025',
    endDate: 'Present',
    technologies: [],
    radius: 0.9,
    distanceFromStar: 10,
    orbitalSpeed: 0.00115, 
    inclination: 3,
    axialTilt: 23.4,
    eccentricity: 0.048, // Jupiter-like
    satellites: []
  },
  {
    name: 'CDH Department Member @ LISAT Team',
    type: 'job',
    description: 'I am responsible for data handling and memory management in CDH Department of LISAT Team. LISAT is made up of 39 students mostly from Instituto Superior Técnico, working together on Portugal\'s next CubeSat.',
    startDate: '02/09/2024',
    endDate: 'Present',
    technologies: [],
    radius: 1.4,
    distanceFromStar: 12,
    orbitalSpeed: 0.001, 
    inclination: 3,
    axialTilt: 15,
    eccentricity: 0.02,
    satellites: [],
    rings: {
      innerRadius: 2,
      outerRadius: 2.8,
      color: '#ff8c00'
    }
  },
  {
    name: 'BSc Aerospace Engineering',
    type: 'main-education',
    description: 'Currently finishing my Bachelor\'s degree of Science in Aerospace Engineering at Instituto Superior Técnico, Lisboa, Portugal.',
    startDate: '11/09/2023',
    endDate: 'Present',
    technologies: ['SolidWorks', 'Xilinx Vivado', 'MATLAB', 'Simulink'],
    radius: 1.8,
    distanceFromStar: 14,
    orbitalSpeed: 0.00085,
    inclination: 1,
    axialTilt: 26.7,
    eccentricity: 0.056, // Saturn-like
    satellites: [],
    rings: {
      innerRadius: 2.4,
      outerRadius: 3.4,
      color: '#6495ed'
    }
  },
  {
    name: 'Monitor @ Primeiros Bits Summer School',
    type: 'general',
    description: 'Organized by TreeTree2.',
    startDate: '15/07/2025',
    endDate: '19/07/2025',
    technologies: [],
    radius: 0.7,
    distanceFromStar: 8,
    orbitalSpeed: 0.0015,
    inclination: 85,
    satellites: [],
  },
  {
    name: 'Corrector @ Náboj Physics Competition',
    type: 'general',
    description: 'Organized by TreeTree2.',
    startDate: '11/07/2025',
    endDate: '11/07/2025',
    technologies: [],
    radius: 0.4,
    distanceFromStar: 8,
    orbitalSpeed: 0.0015,
    inclination: 40,
    satellites: [],
  },
  {
    name: 'Sem Kernel: A simple x86 educational kernel',
    type: 'project',
    description: 'A simple x86 educational kernel inspired on os-tutorial by cfenollosa. \
                 \n Features: hierarchical filesystem, shell, user mode and a full-screen text editor.',
    startDate: '10/02/2026',
    endDate: '14/02/2026',
    technologies: ['asm', 'C'],
    radius: 0.6,
    distanceFromStar: 8,
    orbitalSpeed: 0.0015,
    inclination: 5,
    eccentricity: 0.11,
    satellites: [],
  },
  {
    name: '3D Incompressible LES Solver',
    type: 'project',
    description: 'CFD: 3D Incompressible Large-Eddy Simulation (LES) solver written in C++. \
                 \n Used OpenMP for parallelization. VTK for vizualization. \
                 \n Experimented with different Pressure Poisson solvers: Jacobi, GS SOR, PCG with Jacobi, IC and Chebyshev preconditioners.',
    startDate: '20/10/2025',
    endDate: '25/10/2025',
    technologies: ['C++'],
    radius: 0.7,
    distanceFromStar: 18,
    orbitalSpeed: 0.0007,
    inclination: -4,
    eccentricity: 0.093, // Mars-like
    satellites: [],
  },
  {
    name: 'Online Courses on AfterSchool by TreeTree2',
    type: 'education',
    description: 'Explored my curiosity outside highschool curriculum.',
    startDate: '01/01/2022',
    endDate: '01/05/2023',
    technologies: ['Python', 'Pandas'],
    radius: 0.7,
    distanceFromStar: 22,
    orbitalSpeed: 0.0006,
    inclination: 11,
    axialTilt: 25,
    eccentricity: 0.046, // Uranus-like
    satellites: [
      {
        name: 'Integral Calculus',
        description: '',
        technologies: [],
        radius: 0.18,
        distanceFromPlanet: 1.2,
        speed: 0.02,
      },
      {
        name: 'Machine Learning',
        description: '',
        technologies: [],
        radius: 0.15,
        distanceFromPlanet: 1.8,
        speed: 0.018,
      },
      {
        name: 'Relativity',
        description: '',
        technologies: [],
        radius: 0.15,
        distanceFromPlanet: 1.8,
        speed: 0.018,
      },
      {
        name: 'Programming',
        description: '',
        technologies: [],
        radius: 0.15,
        distanceFromPlanet: 1.8,
        speed: 0.018,
      }
    ],
  },
  {
    name: 'CS50\'s Introduction to Computer Science',
    type: 'education',
    description: 'CS50x: online course on edX from Harvard University.',
    startDate: '21/02/2022',
    endDate: '01/08/2023',
    technologies: ['C', 'Python', 'HTML', 'CSS'],
    radius: 0.6,
    distanceFromStar: 26,
    orbitalSpeed: 0.00055,
    inclination: 9,
    satellites: []
  },
  {
    name: 'Project Quark!',
    type: 'education',
    description: 'Project Quark! is an extracurricular physics school for highschool students.',
    startDate: '26/02/2022',
    endDate: '09/04/2022',
    technologies: [],
    radius: 0.5,
    distanceFromStar: 26,
    orbitalSpeed: 0.00055,
    inclination: 12,
    satellites: []
  },
];
