// src/hooks/useDynamicOrbit.ts
import { useMemo } from 'react';
import { experiences } from '../data/experiences';

/**
 * Parses date string in DD/MM/YYYY format.
 * Returns a Date object.
 */
export const parseDate = (dateStr: string): Date => {
  if (dateStr === 'Present') return new Date();
  const [day, month, year] = dateStr.split('/').map(Number);
  // Month is 0-indexed in JS Date
  return new Date(year, month - 1, day);
};

export const useDynamicOrbit = () => {
  const dynamicExperiences = useMemo(() => {
    // 1. Sort ALL experiences strictly by startDate DESC (most recent first)
    const sorted = [...experiences].sort((a, b) => 
      parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime()
    );

    // 2. Calculate Distances based on Radii to prevent overlap
    const PADDING = 1.8; 
    const START_DISTANCE = 8;
    
    let currentEdge = START_DISTANCE;
    const result = [];

    for (const exp of sorted) {
      const distance = currentEdge + exp.radius;
      // Edge for next planet = current center + radius + padding
      currentEdge = distance + exp.radius + PADDING;

      // Kepler's Third Law: w = k * r^(-1.5)
      const baseK = 0.038;
      const speed = baseK * Math.pow(distance, -1.5);

      result.push({
        ...exp,
        distance,
        speed
      });
    }
    
    return result;
  }, []);

  const getOrbitData = (name: string) => {
    const data = dynamicExperiences.find(e => e.name === name);
    if (!data) return null;
    return { distance: data.distance, speed: data.speed };
  };

  // Group by Year for TimelineGrid - ring is at the center of the year's band
  const yearRings = useMemo(() => {
    const yearRanges: Record<string, number[]> = {};
    
    dynamicExperiences.forEach(exp => {
      const year = parseDate(exp.startDate).getFullYear().toString();
      if (!yearRanges[year]) yearRanges[year] = [];
      yearRanges[year].push(exp.distance);
    });

    return Object.entries(yearRanges).map(([year, distances]) => {
      const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
      return { year, distance: avgDistance };
    }).sort((a, b) => a.distance - b.distance);
  }, [dynamicExperiences]);

  return { 
    getOrbitData, 
    dynamicExperiences,
    yearRings
  };
};
