import type { Paginated, Params } from "@feathersjs/feathers";
import type { ApiGame } from "@game-library/types";

type GameWritable = Omit<ApiGame, "id" | "createdAt" | "updatedAt">;

/** A catalog game to create. Title and platform are required; the category defaults to "Games". */
export type GameData = Pick<GameWritable, "title" | "platformId"> & Partial<Omit<GameWritable, "title" | "platformId">>;

export type GamePatch = Partial<GameData>;

export interface GameQuery {
  id?: string;
  title?: string | { $ilike?: string };
  platformId?: string;
  categoryId?: string;
  countryId?: string;
  releaseTypeId?: string;
  publisherId?: string;
  developerId?: string;
  $limit?: number;
  $skip?: number;
  $sort?: Record<string, 1 | -1>;
}

export interface GameService {
  find(params?: Params<GameQuery>): Promise<Paginated<ApiGame>>;
  get(id: string, params?: Params<GameQuery>): Promise<ApiGame>;
  create(data: GameData, params?: Params<GameQuery>): Promise<ApiGame>;
  patch(id: string, data: GamePatch, params?: Params<GameQuery>): Promise<ApiGame>;
  remove(id: string, params?: Params<GameQuery>): Promise<ApiGame>;
}

export const gameMethods = ["find", "get", "create", "patch", "remove"] as const;
