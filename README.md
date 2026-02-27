# My Interactive Solar System Portfolio

This project is a unique and engaging personal portfolio website, designed to showcase professional experiences and projects in an interactive 3D solar system visualization. Each major experience is represented as a planet orbiting a central star, with sub-experiences or specific skills depicted as satellites revolving around their respective planets.

## Features

*   **Interactive 3D Solar System**: Navigate through a dynamic and visually appealing solar system where each celestial body represents a part of your professional journey.
*   **Intelligent Motion Tiering**:
    *   **Idle**: Slow orbital drift for a "living" scene.
    *   **Hover**: Global slowdown when inspecting any planet.
    *   **Selected**: Motion freezes on the selected planet for optimal readability.
*   **Advanced Camera System**: Smoothly transitions between a free-orbit overview, focused inspection, and return-to-home states using cubic easing.
*   **Realistic Orbital Physics**: 
    *   **Keplerian Orbits**: Elliptical paths with variable speed (faster at periapsis, slower at apoapsis) based on 1st-order True Anomaly approximations.
    *   **Kepler's Third Law**: Orbital periods $T \propto a^{1.5}$ ($v \propto 1/\sqrt{r}$) for consistent celestial mechanics.
    *   **Axial Tilt (Obliquity)**: Planets, rings, and satellites align to each planet's unique equatorial plane.
    *   **Inclination**: 3D orbital planes for diverse celestial arrangements.
*   **Polished UI/UX**:
    *   **HTML Tooltips**: Camera-facing, lightweight HTML overlays for instant project summaries.
    *   **Experience Detail**: A sliding panel for deep dives into specific roles.
    *   **Timeline Grid**: Subtle background rings encoding experience recency by distance.
*   **Advanced Visuals**: 
    *   **Atmospheric Halos**: Optimized glowing atmospheres using stable additive blending and back-side rendering for a realistic gaseous limb effect.
    *   **Planetary Rings**: Configurable, semi-transparent rings that respect axial tilt and lighting.
    *   **Selective Bloom & DOF**: Optimized bloom for stars and selected bodies, with smooth Depth-of-Field transitions.
*   **Modern Tech Stack**: Built with React, Vite, TypeScript, Three.js, @react-three/fiber, and Zustand.

## Project Structure Highlights

*   **`src/store.ts`**: Centralized Zustand state management for camera, motion, and selection logic.
*   **`src/components/solar-system/`**: 3D logic and components (`Planet`, `Satellite`, `Star`, `CameraController`, `TimelineGrid`).
*   **`src/components/ui/`**: 2D overlays (`ExperienceDetail`, `Navigation`, `Layout`).
*   **`src/data/experiences.ts`**: Content definitions.

## Getting Started

### Prerequisites

*   Node.js (LTS version)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/my-portfolio.git
    cd my-portfolio
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Deployment to GitHub Pages

1.  **Configure `homepage` in `package.json`**:
    Ensure the `homepage` field matches your GitHub Pages URL.
2.  **Deploy**:
    ```bash
    npm run build
    # Follow your preferred deployment method for Vite (e.g., gh-pages)
    ```

## License

MIT License
