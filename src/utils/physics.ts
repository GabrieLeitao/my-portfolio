// src/utils/physics.ts

/**
 * Calculates the position of a body in an elliptical orbit.
 * Uses a 1st order approximation of the True Anomaly.
 * 
 * @param meanAnomaly The mean anomaly in radians
 * @param eccentricity The orbital eccentricity (0 to 1)
 * @param semiMajorAxis The semi-major axis (base distance)
 * @returns { distance, trueAnomaly }
 */
export const calculateOrbitalPosition = (
  meanAnomaly: number,
  eccentricity: number = 0,
  semiMajorAxis: number
) => {
  if (eccentricity === 0) {
    return { distance: semiMajorAxis, trueAnomaly: meanAnomaly };
  }

  // 1st order approximation of True Anomaly (nu) from Mean Anomaly (M)
  // nu = M + 2e*sin(M) + 1.25e^2*sin(2M)
  const trueAnomaly = meanAnomaly + 
    (2 * eccentricity - Math.pow(eccentricity, 3) / 4) * Math.sin(meanAnomaly) + 
    (1.25 * Math.pow(eccentricity, 2)) * Math.sin(2 * meanAnomaly);

  // Standard Ellipse Equation (Polar): r = a(1-e^2) / (1 + e*cos(nu))
  const distance = (semiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(trueAnomaly));

  return { distance, trueAnomaly };
};

/**
 * Constants for simulation speed and scaling
 */
export const PHYSICS_CONSTANTS = {
  ORBIT_SPEED_MULTIPLIER: 60,
  SATELLITE_SPEED_MULTIPLIER: 30,
  LERP_SMOOTHING_BASE: 10,
  AXIAL_TILT_SMOOTHING: 8,
};
