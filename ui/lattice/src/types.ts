// ─── Coordinate Systems ─────────────────────────────────────────────

/** Offset coordinates — row/col with staggered odd rows (odd-r) */
export interface OffsetCoord {
  row: number;
  col: number;
}

/** Axial coordinates — more natural for hex algorithms */
export interface AxialCoord {
  q: number;
  r: number;
}

/** Cube coordinates — q + r + s = 0, used for distance calculations */
export interface CubeCoord {
  q: number;
  r: number;
  s: number;
}

// ─── Hex Configuration ──────────────────────────────────────────────

export type HexOrientation = "pointy-top" | "flat-top";

/** Static configuration for a single hex cell override */
export interface HexConfig {
  coord: OffsetCoord;
  fill?: string;
  opacity?: number;
  gradient?: string;
  visible?: boolean;
  data?: unknown;
}

/** Runtime state for a hex cell — mutated by animation loop, not React state */
export interface HexState {
  coord: OffsetCoord;
  fill: string;
  opacity: number;
  scale: number;
  /** Initial opacity before any animation — used by relative waves */
  baseOpacity: number;
  /** Initial scale before any animation — used by relative waves */
  baseScale: number;
  gradient: string | null;
  visible: boolean;
  data: unknown;
  element: HTMLDivElement | null;
  pathElement: SVGPathElement | null;
}

// ─── Grid Configuration ─────────────────────────────────────────────

/** Randomization settings for organic grid generation */
export interface LatticeRandomConfig {
  /** Seed for deterministic randomness (same seed = same layout) */
  seed?: number;
  /** Fraction of hexes to hide (0-1, e.g. 0.25 = 25% missing) */
  missingRate?: number;
  /** Opacity range — each hex gets a random opacity in [min, max] */
  opacityRange?: [min: number, max: number];
  /** Coordinates that are never hidden by missingRate (e.g. spark hex) */
  protectedCoords?: OffsetCoord[];
}

/** Boot animation — fades hexes in from 0, then chains to ambient loop */
export interface LatticeBootConfig {
  /** Duration per hex in ms */
  hexDuration?: number;
  /** Stagger between adjacent hexes in ms */
  stagger?: number;
  /** Wave direction for the boot sweep */
  direction?: WaveDirection;
}

/** Ambient loop animation — continuous breathing after boot completes */
export interface LatticeAmbientConfig {
  /** Opacity multiplier range [min, max] relative to base (e.g. [0.7, 1.3]) */
  opacityRange?: [min: number, max: number];
  /** Scale multiplier range [min, max] relative to base (e.g. [0.985, 1.015]) */
  scaleRange?: [min: number, max: number];
  /** Duration per hex in ms */
  hexDuration?: number;
  /** Stagger between adjacent hexes in ms */
  stagger?: number;
  /** Wave direction */
  direction?: WaveDirection;
}

export interface LatticeConfig {
  /** Circumradius in px (center to vertex) */
  radius: number;
  /** Gap between hexes in px */
  gap: number;
  /** Number of columns */
  cols: number;
  /** Number of rows */
  rows: number;
  /** Hex orientation — default "pointy-top" */
  orientation?: HexOrientation;
  /** Corner radius for rounded hexagons (0 = sharp) */
  cornerRadius?: number;
  /** Default fill color for all hexes */
  defaultFill?: string;
  /** Default opacity for all hexes (0-1) */
  defaultOpacity?: number;
  /** Per-hex overrides keyed by "row,col" */
  hexOverrides?: Record<string, Partial<HexConfig>>;
  /** Auto-size grid to fill container */
  autoSize?: boolean;
  /** Randomization — organic gaps and varied opacities */
  random?: LatticeRandomConfig;
  /** Boot animation — fade-in sweep on mount */
  boot?: LatticeBootConfig;
  /** Ambient loop — continuous breathing after boot */
  ambient?: LatticeAmbientConfig;
}

// ─── Animation ──────────────────────────────────────────────────────

export type WaveDirection = "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top" | "center-out" | "radial";

export type AnimatableProperty = "opacity" | "scale" | "fill";

export interface WaveAnimationConfig {
  /** Direction of the wave propagation */
  direction: WaveDirection;
  /** Duration of a single hex's animation in ms */
  hexDuration: number;
  /** Delay between adjacent hexes in ms (controls wave speed) */
  stagger: number;
  /** Which property to animate */
  property: AnimatableProperty;
  /** Start value */
  from: number | string;
  /** End/peak value */
  to: number | string;
  /** Custom easing function (defaults to easeInOut) */
  easing?: (t: number) => number;
  /** Number of repeats — 0 = infinite, 1 = once (default 1) */
  repeat?: number;
  /** Whether to reverse the animation on each repeat (ping-pong) */
  yoyo?: boolean;
  /** Origin coordinate for "center-out" and "radial" directions */
  origin?: OffsetCoord;
  /** When true, from/to are multipliers against each hex's base value */
  relative?: boolean;
  /** Called when the wave finishes (all hexes done, no more repeats) */
  onComplete?: () => void;
}

export interface ActiveWave {
  id: string;
  config: WaveAnimationConfig;
  startTime: number;
  /** Pre-computed delay per hex, keyed by "row,col" */
  delays: Map<string, number>;
  completed: boolean;
  repeatCount: number;
}

// ─── Animation State (ref-based) ────────────────────────────────────

export interface LatticeAnimationState {
  hexStates: Map<string, HexState>;
  waves: Map<string, ActiveWave>;
  running: boolean;
  rafId: number;
}

// ─── Controller ─────────────────────────────────────────────────────

export interface LatticeController {
  /** Get hex state by offset coordinate */
  getHex: (row: number, col: number) => HexState | undefined;
  /** Update properties of a single hex — writes directly to DOM */
  updateHex: (
    row: number,
    col: number,
    updates: Partial<Pick<HexState, "fill" | "opacity" | "scale" | "gradient" | "visible">>
  ) => void;
  /** Trigger a wave animation across the grid — returns wave ID */
  triggerWave: (config: WaveAnimationConfig) => string;
  /** Stop a specific wave by ID */
  stopWave: (waveId: string) => void;
  /** Stop all active animations */
  stopAll: () => void;
  /** Add a hex dynamically at the given coordinate */
  addHex: (coord: OffsetCoord, config?: Partial<HexConfig>) => void;
  /** Remove a hex at the given coordinate */
  removeHex: (row: number, col: number) => void;
  /** Reset all hexes to their initial state */
  reset: () => void;
  /** Get total grid dimensions in pixels */
  getGridDimensions: () => { width: number; height: number };
  /** Convert offset to axial coordinates */
  offsetToAxial: (coord: OffsetCoord) => AxialCoord;
  /** Hex distance in hex steps between two coordinates */
  hexDistance: (a: OffsetCoord, b: OffsetCoord) => number;
}

// ─── Custom Hex ─────────────────────────────────────────────────────

/** A custom hex tile — combines overrides, protection, and content in one place */
export interface CustomHex {
  coord: OffsetCoord;
  /** Fill color override */
  fill?: string;
  /** Opacity override */
  opacity?: number;
  /** React content to render inside this hex */
  render?: () => React.ReactNode;
}

// ─── Component Props ────────────────────────────────────────────────

export interface HexProps {
  coord: OffsetCoord;
  x: number;
  y: number;
  width: number;
  height: number;
  path: string;
  fill: string;
  opacity: number;
  onRegister?: (coord: OffsetCoord, element: HTMLDivElement, pathElement: SVGPathElement) => void;
  children?: React.ReactNode;
}

export interface LatticeProps {
  config: LatticeConfig;
  /** Custom hex tiles — auto-applies overrides, random protection, and content rendering */
  customHexes?: CustomHex[];
  /** Called once the controller is ready */
  onController?: (controller: LatticeController) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Per-hex render function for custom content inside each hex */
  renderHex?: (coord: OffsetCoord, state: HexState) => React.ReactNode;
}
