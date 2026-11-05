import type { GameService } from "./game.class";

export type { Game, GameData, GamePatch, GameQuery } from "./game.class";

// `findOrCreate` is deliberately absent: it is a server-side helper only.
export const gameMethods: Array<keyof GameService> = ["find", "get", "create", "patch", "remove", "syncCovers"];

/**
 * The category every library entry belongs to. The app tracks games only:
 * new catalog entries default to it, and the importer skips anything else
 * (consoles and other hardware in a GAMEYE export are category "Systems").
 */
export const GAME_CATEGORY = "Games";
