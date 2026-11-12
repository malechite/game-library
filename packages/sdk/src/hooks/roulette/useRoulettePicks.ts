import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Paginated } from "@feathersjs/feathers";
import { ApiServicePath, type ApiRoulettePick } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { RoulettePickQuery } from "../../client/services/roulette-pick";

/**
 * The signed-in user's roulette history, newest first. Returns the full
 * paginated envelope and keeps the previous page while the next loads.
 *
 * @example
 * const { data } = useRoulettePicks({ $limit: 10 });
 */
export const useRoulettePicks = (query?: RoulettePickQuery) => {
  const { client } = useGameLibraryApi();

  return useQuery<Paginated<ApiRoulettePick>>({
    queryKey: ["roulette-picks", query],
    queryFn: () => client!.service(ApiServicePath.RoulettePicks).find({ query }),
    enabled: !!client,
    placeholderData: keepPreviousData
  });
};
