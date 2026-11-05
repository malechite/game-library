/**
 * Registers the entire Phosphor set. This pulls every icon into the bundle, so
 * it is a separate entry (`@game-library/icon/all`) meant for Storybook, galleries
 * and tests — never for an app bundle.
 */
import * as Phosphor from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { PHOSPHOR_ICON_NAMES, type PhosphorIconName } from "./phosphor-icons";
import { registerIcons } from "./registry";

export const registerAllIcons = (): void => {
  const all: Partial<Record<PhosphorIconName, Icon>> = {};
  for (const name of PHOSPHOR_ICON_NAMES) {
    const icon = (Phosphor as unknown as Record<string, Icon | undefined>)[name];
    if (icon) all[name] = icon;
  }
  registerIcons(all);
};
