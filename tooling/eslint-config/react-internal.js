const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["unused-imports", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project
  },
  globals: {
    React: true,
    JSX: true
  },
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  settings: {
    "import/resolver": {
      typescript: {
        project
      }
    }
  },
  rules: {
    // Unused imports - error level
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_"
      }
    ]
  },
  ignorePatterns: [".*.js", "node_modules/", "dist/"],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }]
};
