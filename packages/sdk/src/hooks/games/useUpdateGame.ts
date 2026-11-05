import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiGame } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { GamePatch } from "../../client/services/game";

export interface UpdateGameInput {
  id: string;
  data: GamePatch;
}

/** Correct a catalog game (title, platform, genres, cover, …). The catalog is shared across users. */
export const useUpdateGame = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiGame, Error, UpdateGameInput>({
    mutationFn: async ({ id, data }) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(ApiServicePath.Games).patch(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiServicePath.Games] });
      queryClient.invalidateQueries({ queryKey: ["library"] });
    }
  });
};
