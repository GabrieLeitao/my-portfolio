# My Interactive Solar System Portfolio

This project is a unique and engaging personal portfolio website, designed to showcase professional experiences and projects in an interactive 3D solar system visualization. Each major experience is represented as a planet orbiting a central star, with sub-experiences or specific skills depicted as satellites revolving around their respective planets. The further a planet is from the star, the more recent the experience.

## Features

*   **Interactive 3D Solar System**: Navigate through a dynamic and visually appealing solar system where each celestial body represents a part of your professional journey.
*   **Experience Planets**: Each planet corresponds to a significant job role, project, or educational period. Clicking on a planet reveals detailed information.
*   **Sub-Experience Satellites**: Smaller satellites orbiting planets highlight specific achievements, technologies, or detailed aspects within a larger experience.
*   **Responsive UI**: A clean and modular 2D user interface overlays the 3D scene, providing detailed descriptions, navigation, and contact information.
*   **Modern Technologies**: Built with React, TypeScript, Three.js, and @react-three/fiber for a robust, maintainable, and high-performance application.
*   **GitHub Pages Deployment Ready**: Configured for easy deployment and hosting via GitHub Pages.

## Project Structure Highlights

The project adheres to a clean, modular architecture to ensure scalability and ease of development:

*   **`src/components/solar-system/`**: Contains all 3D-related components (`SolarSystem`, `Star`, `Planet`, `Satellite`).
*   **`src/components/ui/`**: Houses 2D user interface components (`ExperienceDetail`, `Navigation`, `Layout`).
*   **`src/data/experiences.ts`**: A centralized data store defining all experiences, planets, and satellites, making content management straightforward.
*   **`src/types/`**: Dedicated for TypeScript interfaces, ensuring strong typing throughout the application.

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/my-portfolio.git
    cd my-portfolio
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the local development server:

```bash
npm start
# or
yarn start
```

This will open the application in your browser at `http://localhost:3000`.

## Deployment to GitHub Pages

This project is configured for deployment to GitHub Pages.

1.  **Configure `homepage` in `package.json`**:
    Add the `homepage` field to your `package.json` file, replacing `your-username` and `my-portfolio` with your GitHub username and repository name:
    ```json
    "homepage": "https://your-username.github.io/my-portfolio",
    ```
2.  **Install `gh-pages`**:
    ```bash
    npm install --save-dev gh-pages
    # or
    yarn add --dev gh-pages
    ```
3.  **Add `deploy` scripts to `package.json`**:
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build",
      // ... other scripts
    }
    ```
4.  **Deploy**:
    ```bash
    npm run deploy
    # or
    yarn deploy
    ```
    This will build the project and push it to the `gh-pages` branch of your repository.

## Customization

*   **Content**: Modify `src/data/experiences.ts` to add, edit, or remove your professional experiences, projects, and skills.
*   **Styling**: Adjust the look and feel by modifying CSS files in `src/styles/`.
*   **3D Assets**: Replace or add 3D models and textures in `src/assets/` to change the appearance of planets, satellites, and the star.
*   **3D Logic**: Fine-tune orbital mechanics, camera controls, and interactive animations within the `src/components/solar-system/` components.

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests.

## License

[Specify your license here, e.g., MIT License]

## Contact

[Your Name] - [Your Email] - [Your LinkedIn/GitHub Profile]
