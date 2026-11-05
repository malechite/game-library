module.exports = {
  extends: [require.resolve("@game-library/eslint-config/library")],
  root: true,
  parserOptions: {
    project: "./tsconfig.eslint.json"
  }
};
