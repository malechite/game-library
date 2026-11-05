// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/react-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../../../ui/cinder/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../ui/armature/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../ui/icon/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../ui/lattice/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [getAbsolutePath("@storybook/addon-vitest")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(vanillaExtractPlugin());

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@storybook-decorators": path.resolve(__dirname, "../src/decorators"),
      // Cinder internal aliases
      "@cinder/lib": path.resolve(__dirname, "../../../ui/cinder/src/lib"),
      "@cinder/themes": path.resolve(__dirname, "../../../ui/cinder/src/themes"),
      "@cinder/hooks": path.resolve(__dirname, "../../../ui/cinder/src/hooks"),
      // Resolve workspace packages to their TS source so Vite can handle ESM imports
      "@game-library/armature": path.resolve(__dirname, "../../../ui/armature/src/index.ts"),
      // Subpath alias must precede its root package so Vite matches it first.
      "@game-library/icon/all": path.resolve(__dirname, "../../../ui/icon/src/all.ts"),
      "@game-library/icon": path.resolve(__dirname, "../../../ui/icon/src/index.ts"),
      "@game-library/lattice": path.resolve(__dirname, "../../../ui/lattice/src/index.ts"),
      "@game-library/tokens": path.resolve(__dirname, "../../../ui/tokens/src/index.ts"),
      "@game-library/types": path.resolve(__dirname, "../../../packages/types/src/index.ts"),
      "@game-library/util": path.resolve(__dirname, "../../../packages/util/src/index.ts")
    };

    return config;
  }
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
