"use client";

import { useEffect, useMemo, useRef, type FC } from "react";
import clsx from "clsx";
import type { LatticeProps, LatticeConfig, CustomHex } from "../../types";
import { coordKey } from "../../math/grid";
import { useLatticeController } from "../../hooks/useLatticeController";
import { Hex } from "../Hex";
import { latticeContainer } from "./Lattice.css";

/**
 * Merge customHexes into a LatticeConfig — applies overrides and protectedCoords
 * so the controller handles everything from one source of truth.
 */
const mergeCustomHexes = (config: LatticeConfig, customHexes?: CustomHex[]): LatticeConfig => {
  if (!customHexes?.length) return config;

  const hexOverrides = { ...config.hexOverrides };
  const protectedCoords = [...(config.random?.protectedCoords ?? [])];

  for (const { coord, fill, opacity } of customHexes) {
    const key = coordKey(coord);
    hexOverrides[key] = {
      ...hexOverrides[key],
      ...(fill !== undefined && { fill }),
      ...(opacity !== undefined && { opacity })
    };
    protectedCoords.push(coord);
  }

  return {
    ...config,
    hexOverrides,
    random: config.random ? { ...config.random, protectedCoords } : undefined
  };
};

/** Build a lookup from customHexes for render functions */
const buildRenderMap = (customHexes?: CustomHex[]): Map<string, () => React.ReactNode> => {
  const map = new Map<string, () => React.ReactNode>();
  if (!customHexes) return map;
  for (const { coord, render } of customHexes) {
    if (render) map.set(coordKey(coord), render);
  }
  return map;
};

export const Lattice: FC<LatticeProps> = ({ config, customHexes, onController, className, style, children, renderHex }) => {
  // Merge customHexes into config
  const mergedConfig = useMemo(() => mergeCustomHexes(config, customHexes), [config, customHexes]);

  const renderMap = useMemo(() => buildRenderMap(customHexes), [customHexes]);

  const { gridData, registerHex, getController } = useLatticeController(mergedConfig);
  const { hexStates, path, cellWidth, cellHeight, gridWidth, gridHeight, positions } = gridData;

  // Expose controller to parent
  const controller = getController();
  const deliveredRef = useRef<ReturnType<typeof getController> | null>(null);
  useEffect(() => {
    if (onController && deliveredRef.current !== controller) {
      deliveredRef.current = controller;
      onController(controller);
    }
  }, [onController, controller]);

  const hexEntries = [...hexStates.entries()];

  return (
    <div
      className={clsx(latticeContainer, className)}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        minWidth: gridWidth,
        minHeight: gridHeight,
        ...style
      }}
    >
      {hexEntries.map(([key, state]) => {
        if (!state.visible) return null;
        const pos = positions.get(key);
        if (!pos) return null;

        // Custom hex render takes priority, then renderHex prop
        const customRender = renderMap.get(key);
        const content = customRender ? customRender() : renderHex?.(state.coord, state);

        return (
          <Hex
            key={key}
            coord={state.coord}
            x={pos.x}
            y={pos.y}
            width={cellWidth}
            height={cellHeight}
            path={path}
            fill={state.fill}
            opacity={state.opacity}
            onRegister={registerHex}
          >
            {content}
          </Hex>
        );
      })}
      {children}
    </div>
  );
};
