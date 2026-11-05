import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "@storybook-decorators": path.resolve(__dirname, "./src/decorators")
    }
  },
  optimizeDeps: {
    // Crawl every story (and the preview) up front so all their dependencies are
    // pre-bundled before the first test runs. Without this, Vite discovers new
    // deps mid-run, re-optimizes and reloads the page — which fails whichever
    // story tests were in flight ("Vite unexpectedly reloaded a test").
    entries: [".storybook/preview.ts", "../../ui/*/src/**/*.stories.tsx", "../../packages/*/src/**/*.stories.tsx"],
    include: [
      "react",
      "react/jsx-dev-runtime",
      "react/jsx-runtime",
      "react-dom",
      "react-dom/client",
      // Vanilla Extract writes these two imports into the modules it compiles
      // (recipes and sprinkles respectively). They never appear in source, so the
      // scanner above can't find them — they must be listed by hand. These are
      // the only runtime imports Vanilla Extract serializes.
      "@vanilla-extract/recipes/createRuntimeFn",
      "@vanilla-extract/sprinkles/createRuntimeSprinkles"
    ]
  }
});
