import type { Paginated, Params } from "@feathersjs/feathers";
import type { ApiRoulettePick } from "@game-library/types";

/** A pick names the copy the roulette landed on; the API derives the owner and the game. */
export interface RoulettePickData {
  collectionItemId: string;
}

export interface RoulettePickQuery {
  id?: string;
  gameId?: string;
  collectionItemId?: string;
  $limit?: number;
  $skip?: number;
  $sort?: { createdAt?: 1 | -1 };
}

// A history log: picks are created and removed, never edited.
export interface RoulettePickService {
  find(params?: Params<RoulettePickQuery>): Promise<Paginated<ApiRoulettePick>>;
  get(id: string, params?: Params<RoulettePickQuery>): Promise<ApiRoulettePick>;
  create(data: RoulettePickData, params?: Params<RoulettePickQuery>): Promise<ApiRoulettePick>;
  remove(id: string, params?: Params<RoulettePickQuery>): Promise<ApiRoulettePick>;
}

export const roulettePickMethods = ["find", "get", "create", "remove"] as const;
