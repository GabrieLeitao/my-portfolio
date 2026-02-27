// src/hooks/useSolarSystemControls.ts
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei'; // No longer used

const useSolarSystemControls = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    // You can customize OrbitControls here or add other camera control logic.
    // For now, it's just a placeholder to show where custom hooks could go.
    // OrbitControls component itself usually handles attachment automatically.

    // Example: If you wanted to manually instantiate controls:
    // const controls = new OrbitControls(camera, gl.domElement);
    // controls.minDistance = 5;
    // controls.maxDistance = 50;
    // return () => {
    //   controls.dispose();
    // };
  }, [camera, gl]);

  // The <OrbitControls /> component from drei handles most of this declaratively
  // This hook can be expanded for more complex, imperative camera behaviors or state.
  return null; // Or return values/functions if the hook provided specific API
};

export default useSolarSystemControls;
