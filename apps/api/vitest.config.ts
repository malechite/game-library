import { defineConfig } from "vitest/config";

// Runs against a real Postgres (NODE_ENV=test → config/test.json). The `test`
// script migrates first; `docker compose up postgres` creates the test database.
export default defineConfig({
  test: {
    name: "api",
    environment: "node",
    include: ["test/**/*.test.ts"],
    fileParallelism: false,
    testTimeout: 15000,
    hookTimeout: 30000
  }
});
