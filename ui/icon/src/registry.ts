import type { Icon } from "@phosphor-icons/react";
import type { PhosphorIconName } from "./phosphor-icons";

/**
 * Augmentable registry of icon names an app has registered.
 *
 * Empty by default, so `SFIconType` is the full Phosphor union (library code,
 * Storybook). An app narrows it to exactly the icons it bundles:
 *
 * @example
 * // apps/web/src/icons.ts
 * import { Gear, Star } from "@phosphor-icons/react";
 * export const appIcons = { Gear, Star };
 * registerIcons(appIcons);
 * declare module "@game-library/icon" {
 *   interface SFIconRegistry extends Record<keyof typeof appIcons, true> {}
 * }
 */
export interface SFIconRegistry {}

/**
 * SFIconType — the icon names accepted by `type` / `icon` props.
 * Full Phosphor set until an app augments `SFIconRegistry`; then only the registered names.
 */
export type SFIconType = keyof SFIconRegistry extends never ? PhosphorIconName : keyof SFIconRegistry;

const registry = new Map<string, Icon>();
const warned = new Set<string>();

/**
 * Register Phosphor icon components by name. Only registered icons end up in
 * the bundle — import exactly what you use from `@phosphor-icons/react`.
 */
export const registerIcons = (icons: Partial<Record<PhosphorIconName, Icon>>): void => {
  for (const [name, icon] of Object.entries(icons)) {
    if (icon) registry.set(name, icon);
  }
};

/** Look up a registered icon component. Warns once per missing name. */
export const getIcon = (name: string): Icon | undefined => {
  const icon = registry.get(name);
  if (!icon && !warned.has(name)) {
    warned.add(name);
    console.warn(`[SFIcon] "${name}" is not registered — add it to your registerIcons() call.`);
  }
  return icon;
};

/** Names currently registered (useful for galleries and tests). */
export const getRegisteredIconNames = (): string[] => [...registry.keys()];

/** Remove every registered icon (tests). */
export const clearIcons = (): void => {
  registry.clear();
  warned.clear();
};
