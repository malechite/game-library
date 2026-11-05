// Lightweight theme runtime entry: theme class names + the contract, plus the
// global body styles as a side-effect. Importing this (via "@game-library/cinder/theme")
// pulls only the theme — no components, no heavy component deps.
import "./globals.css";
export { lightTheme } from "./lightTheme.css";
export { darkTheme } from "./darkTheme.css";
export { vars } from "./contract.css";
