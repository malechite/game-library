// Components
export { Lattice } from "./components/Lattice";
export { Hex } from "./components/Hex";

// Hooks
export { useLatticeController } from "./hooks/useLatticeController";
export type { LatticeGridData } from "./hooks/useLatticeController";
export { useLatticeAnimation } from "./hooks/useLatticeAnimation";
export { useContainerSize } from "./hooks/useContainerSize";

// Math utilities
export { generateHexPath, hexVertices, hexViewBox, hexWidth, hexHeight } from "./math/hex";
export { seededRandom, createRng } from "./math/random";
export {
  hexPosition,
  gridDimensions,
  coordKey,
  offsetToAxial,
  axialToOffset,
  axialToCube,
  offsetToCube,
  hexDistance
} from "./math/grid";

// Types
export type {
  OffsetCoord,
  AxialCoord,
  CubeCoord,
  HexOrientation,
  HexConfig,
  HexState,
  LatticeConfig,
  LatticeRandomConfig,
  LatticeBootConfig,
  LatticeAmbientConfig,
  WaveDirection,
  AnimatableProperty,
  WaveAnimationConfig,
  ActiveWave,
  LatticeAnimationState,
  LatticeController,
  CustomHex,
  HexProps,
  LatticeProps
} from "./types";
