// src/config.ts

/**
 * Global configuration for the portfolio.
 * Change these values during development to test different behaviors.
 */
export const CONFIG = {
  // When true, planets are positioned automatically based on recency (Present first, then Past).
  // When false, manual distanceFromStar from experiences.ts is used.
  dynamicDistancing: true,
  
  // Default mute state for background music
  initialMuted: false,

  // Base path for assets (matches vite.config.ts base)
  basePath: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '/',
};
