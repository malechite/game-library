import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiUser } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { UserData } from "../../client/services/user";

/** Create a new user account (open registration). Does not log the user in. */
export const useRegister = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiUser, Error, UserData>({
    mutationFn: async (data) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(ApiServicePath.Users).create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });
};
