import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiRoulettePick } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

/** Remove an entry from the roulette history (the game and the copy stay). */
export const useDeleteRoulettePick = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiRoulettePick, Error, string>({
    mutationFn: async (id) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(ApiServicePath.RoulettePicks).remove(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roulette-picks"] });
    }
  });
};
