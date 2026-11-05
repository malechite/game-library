import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

export const useLogout = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!client) throw new Error("GameLibrary API client not initialized");
      await client.logout();
    },
    onSuccess: () => {
      queryClient.clear();
    }
  });
};
