import type { RoulettePickService } from "./roulette-pick.class";

export type { RoulettePick, RoulettePickData, RoulettePickQuery } from "./roulette-pick.class";

// A history log: picks are created and removed, never edited.
export const roulettePickMethods: Array<keyof RoulettePickService> = ["find", "get", "create", "remove"];
