/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve("@game-library/eslint-config/react-internal")],
  env: { browser: true, es2020: true },
  parserOptions: {
    project: "./tsconfig.json"
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts", "**/*.test.tsx"]
};
