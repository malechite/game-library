export const bool = (value: string | null | undefined) => value?.toLowerCase() === "true";

export const isSet = (value: any) => value !== null && value !== undefined;

/**
 * Capitalizes the first letter of a string.
 * @example capitalize("hello") // "Hello"
 * @example capitalize("zone") // "Zone"
 */
export const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Checks if an event target is an input element (input, textarea, or contentEditable).
 * Useful for keyboard event handlers that should not interfere with text input.
 */
export const isInputElement = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || target.isContentEditable;
};

/**
 * Converts a string to a URL-friendly slug.
 * - Converts to lowercase
 * - Removes all special characters (keeps only alphanumeric and spaces)
 * - Replaces spaces with dashes
 * - Removes consecutive dashes
 * - Trims leading/trailing dashes
 *
 * @example stringToSlug("Albrook: Exterior") // "albrook-exterior"
 * @example stringToSlug("Hello World!") // "hello-world"
 */
export const stringToSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove all special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-") // Remove consecutive dashes
    .replace(/^-|-$/g, ""); // Trim leading/trailing dashes
