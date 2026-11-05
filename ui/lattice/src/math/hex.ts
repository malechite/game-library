import type { HexOrientation } from "../types";

// ─── Vertex Generation ──────────────────────────────────────────────

interface Point {
  x: number;
  y: number;
}

/**
 * Compute the 6 vertices of a hexagon centered at the origin.
 *
 * Pointy-top: first vertex at 30° (top-right)
 * Flat-top:   first vertex at 0°  (right)
 */
export const hexVertices = (radius: number, orientation: HexOrientation = "pointy-top"): Point[] => {
  const startAngle = orientation === "pointy-top" ? 30 : 0;
  return Array.from({ length: 6 }, (_, i) => {
    const angleDeg = 60 * i + startAngle;
    const angleRad = (Math.PI / 180) * angleDeg;
    return {
      x: radius * Math.cos(angleRad),
      y: radius * Math.sin(angleRad)
    };
  });
};

// ─── Hex Dimensions ─────────────────────────────────────────────────

export const hexWidth = (radius: number, orientation: HexOrientation = "pointy-top") =>
  orientation === "pointy-top" ? Math.sqrt(3) * radius : 2 * radius;

export const hexHeight = (radius: number, orientation: HexOrientation = "pointy-top") =>
  orientation === "pointy-top" ? 2 * radius : Math.sqrt(3) * radius;

// ─── SVG Path Generation ────────────────────────────────────────────

/**
 * Direction vector from point `a` toward point `b`, normalized to length `len`.
 */
const toward = (a: Point, b: Point, len: number): Point => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  return { x: a.x + (dx / d) * len, y: a.y + (dy / d) * len };
};

/**
 * Generate an SVG path `d` attribute for a hexagon.
 *
 * The path is centered at (0, 0). Callers should set the SVG viewBox
 * to offset into positive coordinate space.
 *
 * @param radius       Circumradius (center to vertex) in px
 * @param orientation  "pointy-top" or "flat-top"
 * @param cornerRadius Corner rounding radius in px (0 = sharp)
 */
export const generateHexPath = (radius: number, orientation: HexOrientation = "pointy-top", cornerRadius = 0): string => {
  const verts = hexVertices(radius, orientation);

  if (cornerRadius <= 0) {
    // Sharp corners — simple polygon
    return verts.map((v, i) => `${i === 0 ? "M" : "L"}${v.x.toFixed(3)},${v.y.toFixed(3)}`).join(" ") + " Z";
  }

  // Rounded corners — for each vertex, stop short along incoming edge,
  // draw a quadratic bezier through the vertex, continue along outgoing edge.
  const cr = Math.min(cornerRadius, radius * 0.4); // clamp to avoid overlap
  const parts: string[] = [];

  for (let i = 0; i < 6; i++) {
    const prev = verts[(i + 5) % 6]!;
    const curr = verts[i]!;
    const next = verts[(i + 1) % 6]!;

    // Point on the incoming edge, `cr` px before the vertex
    const p1 = toward(curr, prev, cr);
    // Point on the outgoing edge, `cr` px after the vertex
    const p2 = toward(curr, next, cr);

    if (i === 0) {
      parts.push(`M${p1.x.toFixed(3)},${p1.y.toFixed(3)}`);
    } else {
      parts.push(`L${p1.x.toFixed(3)},${p1.y.toFixed(3)}`);
    }

    // Quadratic bezier with control point at the actual vertex
    parts.push(`Q${curr.x.toFixed(3)},${curr.y.toFixed(3)} ${p2.x.toFixed(3)},${p2.y.toFixed(3)}`);
  }

  parts.push("Z");
  return parts.join(" ");
};

/**
 * Compute the SVG viewBox string for a hex path centered at (0, 0).
 * Returns "minX minY width height" with a small padding.
 */
export const hexViewBox = (radius: number, orientation: HexOrientation = "pointy-top"): string => {
  const w = hexWidth(radius, orientation);
  const h = hexHeight(radius, orientation);
  return `${(-w / 2).toFixed(3)} ${(-h / 2).toFixed(3)} ${w.toFixed(3)} ${h.toFixed(3)}`;
};
