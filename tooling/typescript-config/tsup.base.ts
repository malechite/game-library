import type { Options } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";

/**
 * Base tsup config for simple library packages.
 * Used by: types, util, tokens
 */
export const baseConfig: Options = {
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true
};

/**
 * tsup config for React component libraries with Vanilla Extract.
 * Used by: armature, icon, lattice (cinder has its own multi-entry config)
 */
export const reactLibraryConfig: Options = {
  ...baseConfig,
  banner: { js: '"use client";' },
  esbuildPlugins: [vanillaExtractPlugin()],
  external: ["react", "react-dom"]
};
