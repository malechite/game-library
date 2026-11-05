import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    // One React for the app and every workspace UI package.
    dedupe: ["react", "react-dom"]
  },
  server: {
    port: 5173
  },
  build: {
    // Vite's default "assets/" would collide with the API's `assets` service
    // path once the build is served by Feathers from the same origin.
    assetsDir: "static"
  }
});
