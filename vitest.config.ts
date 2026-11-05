import path from "node:path";
import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: [
        "packages/*/src/**/*.{ts,tsx}",
        "ui/*/src/**/*.{ts,tsx}",
        "apps/web/src/**/*.{ts,tsx}",
        "!**/*.stories.tsx",
        "!**/*.test.ts",
        "!**/*.test.tsx"
      ]
    },
    projects: [
      // Unit tests for packages (node)
      {
        extends: true,
        test: {
          name: "unit",
          include: ["packages/*/src/**/*.test.ts", "ui/*/src/**/*.test.ts"],
          globals: true,
          environment: "node"
        }
      },
      // Component tests for the web app (jsdom)
      {
        extends: true,
        plugins: [react(), vanillaExtractPlugin()],
        test: {
          name: "web",
          include: ["apps/web/src/**/*.test.tsx"],
          globals: true,
          environment: "jsdom",
          setupFiles: ["./vitest.setup.components.ts"]
        }
      },
      // Storybook component tests (headless Chromium)
      {
        extends: "apps/storybook/vite.config.ts",
        plugins: [storybookTest({ configDir: "apps/storybook/.storybook" })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }]
          },
          // Resolved from this file: the project root is apps/storybook (via `extends`).
          setupFiles: [path.resolve(__dirname, "apps/storybook/.storybook/vitest.setup.ts")]
        }
      }
    ]
  }
});
