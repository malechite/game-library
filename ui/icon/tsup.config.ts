import { defineConfig } from "tsup";
import { reactLibraryConfig } from "@game-library/typescript-config/tsup.base";

export default defineConfig({
  ...reactLibraryConfig,
  // `all` is a separate entry so apps never pull the whole Phosphor set by accident.
  entry: ["src/index.ts", "src/all.ts"]
});
