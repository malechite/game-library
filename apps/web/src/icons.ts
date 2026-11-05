import {
  Camera,
  CheckCircle,
  ClipboardText,
  DotsThreeVertical,
  FileCsv,
  GameController,
  Heart,
  Image,
  ListBullets,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  SignOut,
  SquaresFour,
  Trash,
  UploadSimple,
  User
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { registerIcons, type PhosphorIconName } from "@game-library/icon";

/**
 * Every icon this app renders by name. Import it here from `@phosphor-icons/react`
 * (tree-shaken per icon) and it becomes a valid `icon` / `type` prop value
 * everywhere; anything else is a type error, so nothing unbundled can slip in.
 */
export const appIcons = {
  Camera,
  CheckCircle,
  ClipboardText,
  DotsThreeVertical,
  FileCsv,
  GameController,
  Heart,
  Image,
  ListBullets,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  SignOut,
  SquaresFour,
  Trash,
  UploadSimple,
  User
} satisfies Partial<Record<PhosphorIconName, Icon>>;

registerIcons(appIcons);

declare module "@game-library/icon" {
  interface SFIconRegistry extends Record<keyof typeof appIcons, true> {}
}
