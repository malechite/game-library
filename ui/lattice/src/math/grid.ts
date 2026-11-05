import type { OffsetCoord, AxialCoord, CubeCoord, HexOrientation } from "../types";
import { hexWidth, hexHeight } from "./hex";

// ─── Coordinate Conversions ─────────────────────────────────────────

/** Offset (odd-r) → Axial */
export const offsetToAxial = (coord: OffsetCoord): AxialCoord => ({
  q: coord.col - (coord.row - (coord.row & 1)) / 2,
  r: coord.row
});

/** Axial → Offset (odd-r) */
export const axialToOffset = (coord: AxialCoord): OffsetCoord => ({
  col: coord.q + (coord.r - (coord.r & 1)) / 2,
  row: coord.r
});

/** Axial → Cube */
export const axialToCube = ({ q, r }: AxialCoord): CubeCoord => ({
  q,
  r,
  s: -q - r
});

/** Offset → Cube */
export const offsetToCube = (coord: OffsetCoord): CubeCoord => axialToCube(offsetToAxial(coord));

/** Hex distance between two offset coordinates (in hex steps) */
export const hexDistance = (a: OffsetCoord, b: OffsetCoord): number => {
  const ac = offsetToCube(a);
  const bc = offsetToCube(b);
  return (Math.abs(ac.q - bc.q) + Math.abs(ac.r - bc.r) + Math.abs(ac.s - bc.s)) / 2;
};

// ─── Grid Position Calculations ─────────────────────────────────────

/** Pixel position (top-left) of a hex at the given offset coordinate. */
export const hexPosition = (
  coord: OffsetCoord,
  radius: number,
  gap: number,
  orientation: HexOrientation = "pointy-top"
): { x: number; y: number } => {
  const w = hexWidth(radius, orientation);
  const h = hexHeight(radius, orientation);

  // Offset so the center of hex (0,0) sits at the container origin (0,0)
  const originX = -w / 2;
  const originY = -h / 2;

  if (orientation === "pointy-top") {
    // Odd-r: odd rows shift right by half a hex width + half gap
    const xOffset = coord.row % 2 === 1 ? (w + gap) / 2 : 0;
    return {
      x: originX + coord.col * (w + gap) + xOffset,
      y: originY + coord.row * (1.5 * radius + gap)
    };
  }

  // Flat-top (odd-q): odd columns shift down
  const yOffset = coord.col % 2 === 1 ? (h + gap) / 2 : 0;
  return {
    x: originX + coord.col * (1.5 * radius + gap),
    y: originY + coord.row * (h + gap) + yOffset
  };
};

/** Total pixel dimensions of the grid. */
export const gridDimensions = (
  rows: number,
  cols: number,
  radius: number,
  gap: number,
  orientation: HexOrientation = "pointy-top"
): { width: number; height: number } => {
  const w = hexWidth(radius, orientation);
  const h = hexHeight(radius, orientation);

  if (orientation === "pointy-top") {
    // Width: full columns + potential half-column stagger on odd rows
    const gridWidth = cols * (w + gap) - gap + (rows > 1 ? (w + gap) / 2 : 0);
    // Height: rows stacked at 3/4 height intervals
    const gridHeight = rows * (1.5 * radius + gap) - gap + 0.5 * radius;
    return { width: gridWidth, height: gridHeight };
  }

  // Flat-top
  const gridWidth = cols * (1.5 * radius + gap) - gap + 0.5 * radius;
  const gridHeight = rows * (h + gap) - gap + (cols > 1 ? (h + gap) / 2 : 0);
  return { width: gridWidth, height: gridHeight };
};

/** Generate the hex key from a coordinate. */
export const coordKey = ({ row, col }: OffsetCoord): string => `${row},${col}`;
