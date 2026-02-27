// src/types/images.d.ts
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
