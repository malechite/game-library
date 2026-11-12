import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiRoulettePick } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { RoulettePickData } from "../../client/services/roulette-pick";

/**
 * Log that the user chose to play the copy the roulette landed on.
 *
 * @example
 * const createPick = useCreateRoulettePick();
 * createPick.mutate({ collectionItemId: winner.id });
 */
export const useCreateRoulettePick = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiRoulettePick, Error, RoulettePickData>({
    mutationFn: async (data) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(ApiServicePath.RoulettePicks).create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roulette-picks"] });
    }
  });
};
