"use client";

import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import type { LatticeConfig, LatticeController, HexState, OffsetCoord, WaveAnimationConfig } from "../types";
import { generateHexPath, hexViewBox, hexWidth, hexHeight } from "../math/hex";
import { hexPosition, gridDimensions, coordKey, offsetToAxial, hexDistance } from "../math/grid";
import { seededRandom } from "../math/random";
import { useLatticeAnimation } from "./useLatticeAnimation";

export interface LatticeGridData {
  hexStates: Map<string, HexState>;
  path: string;
  viewBox: string;
  cellWidth: number;
  cellHeight: number;
  gridWidth: number;
  gridHeight: number;
  positions: Map<string, { x: number; y: number }>;
  version: number;
}

// ─── Randomization helpers ──────────────────────────────────────────

const isProtected = (row: number, col: number, protectedCoords?: OffsetCoord[]) =>
  protectedCoords?.some((c) => c.row === row && c.col === col) ?? false;

// ─── Hook ───────────────────────────────────────────────────────────

export const useLatticeController = (config: LatticeConfig) => {
  const {
    radius,
    gap,
    cols,
    rows,
    orientation = "pointy-top",
    cornerRadius = 0,
    defaultFill = "#3EA7D4",
    defaultOpacity = 0.5,
    hexOverrides,
    random,
    boot,
    ambient
  } = config;

  const [version, setVersion] = useState(0);

  const path = useMemo(() => generateHexPath(radius, orientation, cornerRadius), [radius, orientation, cornerRadius]);

  const viewBox = useMemo(() => hexViewBox(radius, orientation), [radius, orientation]);

  const cellWidth = useMemo(() => hexWidth(radius, orientation), [radius, orientation]);
  const cellHeight = useMemo(() => hexHeight(radius, orientation), [radius, orientation]);

  const hexStatesRef = useRef(new Map<string, HexState>());

  const gridData = useMemo(() => {
    const states = hexStatesRef.current;
    const positions = new Map<string, { x: number; y: number }>();
    const currentKeys = new Set<string>();

    const seed = random?.seed ?? 42;
    const missingRate = random?.missingRate ?? 0;
    const opacityRange = random?.opacityRange;
    const protectedCoords = random?.protectedCoords;
    const hasBoot = !!boot;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const key = coordKey({ row, col });
        currentKeys.add(key);
        const override = hexOverrides?.[key];
        const pos = hexPosition({ row, col }, radius, gap, orientation);
        positions.set(key, pos);

        const prev = states.get(key);
        const prot = isProtected(row, col, protectedCoords);

        // Random visibility — skip protected hexes
        if (!prot && missingRate > 0 && !override?.visible) {
          const rand = seededRandom(row * 31 + col * 17 + seed);
          if (rand < missingRate) {
            states.set(key, {
              coord: { row, col },
              fill: override?.fill ?? defaultFill,
              opacity: 0,
              scale: 1,
              baseOpacity: 0,
              baseScale: 1,
              gradient: null,
              visible: false,
              data: override?.data ?? null,
              element: prev?.element ?? null,
              pathElement: prev?.pathElement ?? null
            });
            continue;
          }
        }

        // Compute base opacity: override > random range > default
        let baseOpacity = override?.opacity ?? defaultOpacity;
        if (!override?.opacity && opacityRange) {
          const rand = seededRandom(row * 53 + col * 11 + seed + 3);
          const [min, max] = opacityRange;
          baseOpacity = min + rand * (max - min);
        }

        // If boot is configured, hexes start at opacity 0
        const initialOpacity = hasBoot ? 0 : (override?.opacity ?? baseOpacity);

        states.set(key, {
          coord: { row, col },
          fill: override?.fill ?? prev?.fill ?? defaultFill,
          opacity: prev?.opacity ?? initialOpacity,
          scale: prev?.scale ?? 1,
          baseOpacity,
          baseScale: 1,
          gradient: override?.gradient ?? prev?.gradient ?? null,
          visible: override?.visible ?? prev?.visible ?? true,
          data: override?.data ?? prev?.data ?? null,
          element: prev?.element ?? null,
          pathElement: prev?.pathElement ?? null
        });
      }
    }

    // Remove hexes that are no longer in the grid (except dynamically added ones)
    for (const key of states.keys()) {
      if (!currentKeys.has(key)) {
        states.delete(key);
      }
    }

    const dims = gridDimensions(rows, cols, radius, gap, orientation);

    return {
      hexStates: states,
      path,
      viewBox,
      cellWidth,
      cellHeight,
      gridWidth: dims.width,
      gridHeight: dims.height,
      positions,
      version
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    radius,
    gap,
    cols,
    rows,
    orientation,
    cornerRadius,
    defaultFill,
    defaultOpacity,
    hexOverrides,
    random,
    boot,
    path,
    viewBox,
    cellWidth,
    cellHeight,
    version
  ]);

  // Animation system
  const { triggerWave, stopWave, stopAll } = useLatticeAnimation(hexStatesRef);

  // Register a hex's DOM elements
  const registerCount = useRef(0);
  const registerHex = useCallback((coord: OffsetCoord, element: HTMLDivElement, pathElement: SVGPathElement) => {
    const key = coordKey(coord);
    const state = hexStatesRef.current.get(key);
    if (state) {
      state.element = element;
      state.pathElement = pathElement;
      registerCount.current++;
      if (registerCount.current <= 3 || registerCount.current % 20 === 0) {
        console.log(`[Lattice] registerHex #${registerCount.current}: ${key}`);
      }
    }
  }, []);

  // Build the controller object
  const controllerRef = useRef<LatticeController | null>(null);

  const getController = useCallback((): LatticeController => {
    if (controllerRef.current) return controllerRef.current;

    const controller: LatticeController = {
      getHex: (row, col) => hexStatesRef.current.get(coordKey({ row, col })),

      updateHex: (row, col, updates) => {
        const key = coordKey({ row, col });
        const state = hexStatesRef.current.get(key);
        if (!state) return;

        const { element, pathElement } = state;

        if (updates.fill !== undefined) {
          state.fill = updates.fill;
          if (pathElement) pathElement.setAttribute("fill", updates.fill);
        }
        if (updates.opacity !== undefined) {
          state.opacity = updates.opacity;
          if (element) element.style.opacity = String(updates.opacity);
        }
        if (updates.scale !== undefined) {
          state.scale = updates.scale;
          if (element) element.style.transform = `scale(${updates.scale})`;
        }
        if (updates.gradient !== undefined) {
          state.gradient = updates.gradient;
        }
        if (updates.visible !== undefined) {
          state.visible = updates.visible;
          if (element) element.style.display = updates.visible ? "" : "none";
        }
      },

      triggerWave: (waveConfig: WaveAnimationConfig) => triggerWave(waveConfig),
      stopWave: (waveId: string) => stopWave(waveId),
      stopAll: () => stopAll(),

      addHex: (coord, hexConfig) => {
        const key = coordKey(coord);
        if (hexStatesRef.current.has(key)) return;

        const baseOpacity = hexConfig?.opacity ?? defaultOpacity;
        hexStatesRef.current.set(key, {
          coord,
          fill: hexConfig?.fill ?? defaultFill,
          opacity: baseOpacity,
          scale: 1,
          baseOpacity,
          baseScale: 1,
          gradient: hexConfig?.gradient ?? null,
          visible: hexConfig?.visible ?? true,
          data: hexConfig?.data ?? null,
          element: null,
          pathElement: null
        });
        setVersion((v) => v + 1);
      },

      removeHex: (row, col) => {
        const key = coordKey({ row, col });
        if (hexStatesRef.current.delete(key)) {
          setVersion((v) => v + 1);
        }
      },

      reset: () => {
        stopAll();
        for (const [key, state] of hexStatesRef.current) {
          const override = hexOverrides?.[key];
          state.fill = override?.fill ?? defaultFill;
          state.opacity = override?.opacity ?? defaultOpacity;
          state.scale = 1;
          state.gradient = override?.gradient ?? null;

          if (state.element) {
            state.element.style.opacity = String(state.opacity);
            state.element.style.transform = "";
          }
          if (state.pathElement) {
            state.pathElement.setAttribute("fill", state.fill);
          }
        }
      },

      getGridDimensions: () => ({
        width: gridData.gridWidth,
        height: gridData.gridHeight
      }),

      offsetToAxial: (coord) => offsetToAxial(coord),
      hexDistance: (a, b) => hexDistance(a, b)
    };

    controllerRef.current = controller;
    return controller;
  }, [triggerWave, stopWave, stopAll, defaultFill, defaultOpacity, hexOverrides, gridData.gridWidth, gridData.gridHeight]);

  // ─── Auto boot + ambient animation ────────────────────────────────
  const bootFired = useRef(false);

  useEffect(() => {
    console.log("[Lattice] boot effect running, bootFired:", bootFired.current, "boot config:", !!boot);
    if (bootFired.current || !boot) return;

    // Poll until at least one hex has its DOM element registered
    let pollId: number;
    let pollCount = 0;
    const poll = () => {
      const hexes = [...hexStatesRef.current.values()];
      const visibleHexes = hexes.filter((s) => s.visible);
      const registeredHexes = visibleHexes.filter((s) => s.element !== null);
      pollCount++;

      if (pollCount <= 5 || pollCount % 60 === 0) {
        console.log(
          `[Lattice] poll #${pollCount}: ${hexes.length} total, ${visibleHexes.length} visible, ${registeredHexes.length} registered`
        );
      }

      if (registeredHexes.length === 0) {
        pollId = requestAnimationFrame(poll);
        return;
      }

      console.log("[Lattice] boot firing! registered hexes:", registeredHexes.length);
      bootFired.current = true;

      const ambientDir = ambient?.direction ?? boot.direction ?? "left-to-right";
      const ambientOpacity = ambient?.opacityRange ?? [0.7, 1.3];
      const ambientScale = ambient?.scaleRange ?? [0.985, 1.015];
      const ambientDuration = ambient?.hexDuration ?? 2500;
      const ambientStagger = ambient?.stagger ?? 120;

      const startAmbient = () => {
        if (ambient) {
          triggerWave({
            direction: ambientDir,
            hexDuration: ambientDuration,
            stagger: ambientStagger,
            property: "opacity",
            from: ambientOpacity[0],
            to: ambientOpacity[1],
            relative: true,
            yoyo: true,
            repeat: 0
          });
          if (ambientScale) {
            triggerWave({
              direction: ambientDir,
              hexDuration: ambientDuration,
              stagger: ambientStagger,
              property: "scale",
              from: ambientScale[0],
              to: ambientScale[1],
              relative: true,
              yoyo: true,
              repeat: 0
            });
          }
        }
      };

      // Boot opacity: fade from 0 to the ambient's starting opacity multiplier
      const bootTarget = ambient ? ambientOpacity[0] : 1;
      triggerWave({
        direction: boot.direction ?? "left-to-right",
        hexDuration: boot.hexDuration ?? 800,
        stagger: boot.stagger ?? 80,
        property: "opacity",
        from: 0,
        to: bootTarget,
        relative: true,
        repeat: 1,
        onComplete: startAmbient
      });

      // Boot scale: ease to the ambient's starting scale
      if (ambient?.scaleRange) {
        triggerWave({
          direction: boot.direction ?? "left-to-right",
          hexDuration: boot.hexDuration ?? 800,
          stagger: boot.stagger ?? 80,
          property: "scale",
          from: 1,
          to: ambientScale[0],
          relative: true,
          repeat: 1
        });
      }
    };

    pollId = requestAnimationFrame(poll);
    return () => {
      cancelAnimationFrame(pollId);
      bootFired.current = false;
    };
  }, [boot, ambient, triggerWave]);

  // Ambient without boot — start immediately
  useEffect(() => {
    if (boot || !ambient || bootFired.current) return;

    const ambientDir = ambient.direction ?? "left-to-right";
    const ambientOpacity = ambient.opacityRange ?? [0.7, 1.3];
    const ambientScale = ambient.scaleRange;
    const ambientDuration = ambient.hexDuration ?? 2500;
    const ambientStagger = ambient.stagger ?? 120;

    triggerWave({
      direction: ambientDir,
      hexDuration: ambientDuration,
      stagger: ambientStagger,
      property: "opacity",
      from: ambientOpacity[0],
      to: ambientOpacity[1],
      relative: true,
      yoyo: true,
      repeat: 0
    });

    if (ambientScale) {
      triggerWave({
        direction: ambientDir,
        hexDuration: ambientDuration,
        stagger: ambientStagger,
        property: "scale",
        from: ambientScale[0],
        to: ambientScale[1],
        relative: true,
        yoyo: true,
        repeat: 0
      });
    }
  }, [ambient, boot, triggerWave]);

  return { gridData, registerHex, getController };
};
