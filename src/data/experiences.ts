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
    { name: 'C/C++', strength: 60 },
    { name: 'Python', strength: 50},
    { name: 'TypeScript/JavaScript', strength: 20 }
  ],
  frameworks: ['React', 'Node.js', 'FastAPI', 'Three.js'],
  tools: ['FreeRTOS', 'Docker', 'Linux'],
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
    inclination: 0.05,
    satellites: [],
  },
  {
    name: 'CDH Department Member @ LISAT Team',
    type: 'job',
    description: 'I am responsible for data handling and memory management on CDH Department. LISAT is made up of 39 students mostly from Instituto Superior Técnico, working together on Portugal\'s next CubeSat.',
    startDate: '02/09/2024',
    endDate: 'Present',
    technologies: [],
    radius: 1.4,
    distanceFromStar: 12,
    orbitalSpeed: 0.001, 
    inclination: 0.05,
    satellites: [],
  },
  {
    name: 'BSc Aerospace Engineering',
    type: 'education',
    description: 'Finishing Bachelor of Aerospace Engineering.',
    startDate: '11/09/2023',
    endDate: 'Present',
    technologies: ['SolidWorks', 'Xilinx Vivado', 'MATLAB', 'Simulink'],
    radius: 1.3,
    distanceFromStar: 14,
    orbitalSpeed: 0.00085,
    inclination: 0.02,
    satellites: [],
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
    radius: 0.7,
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
    radius: 0.8,
    distanceFromStar: 8,
    orbitalSpeed: 0.0015,
    inclination: 0.02,
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
    radius: 0.6,
    distanceFromStar: 18,
    orbitalSpeed: 0.0007,
    inclination: 0.02,
    satellites: [],
  },
  {
    name: 'Online Courses on AfterSchool by TreeTree2',
    type: 'education',
    description: 'Explored my curiosity outside highschool curriculum.',
    startDate: '01/01/2022',
    endDate: '01/05/2023',
    technologies: ['Python', 'Pandas'],
    radius: 0.5,
    distanceFromStar: 22,
    orbitalSpeed: 0.0006,
    inclination: 7,
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
    startDate: '01/02/2022',
    endDate: '01/08/2023',
    technologies: ['C', 'Python', 'HTML', 'CSS'],
    radius: 0.5,
    distanceFromStar: 26,
    orbitalSpeed: 0.00055,
    inclination: 14,
    satellites: []
  },
  {
    name: 'Project Quark!',
    type: 'education',
    description: 'Project Quark! is an extracurricular physics school for highschool students.',
    startDate: '01/02/2022',
    endDate: '01/04/2022',
    technologies: [],
    radius: 0.5,
    distanceFromStar: 26,
    orbitalSpeed: 0.00055,
    inclination: 20,
    satellites: []
  },
];
