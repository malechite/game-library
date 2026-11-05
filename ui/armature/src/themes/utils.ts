import { themeContract } from "./contract.css";

/**
 * Apply theme classes to an element
 */
export const applyTheme = (element: HTMLElement, themeClass: string): void => {
  // Remove any existing theme classes
  element.classList.forEach((className) => {
    if (className.startsWith("theme_")) {
      element.classList.remove(className);
    }
  });

  // Add the new theme class
  element.classList.add(themeClass);
};

/**
 * Get theme variable values for programmatic access
 */
export const getThemeVars = () => themeContract;

/**
 * Create a CSS custom property name from a theme path
 */
export const createCSSVar = (path: string[]): string => {
  return `var(--${path.join("-")})`;
};

/**
 * Get a theme color by path
 */
export const getThemeColor = (path: string[]): string => {
  return createCSSVar(path);
};

/**
 * Helper to create theme-aware style objects
 */
export const themeStyle = (styles: Record<string, any>) => styles;
