import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { ApiUser } from "@game-library/types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthenticationResult {
  accessToken: string;
  user: ApiUser;
  authentication: {
    strategy: string;
    [key: string]: unknown;
  };
}

export const useLogin = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<AuthenticationResult, Error, LoginCredentials>({
    mutationFn: async ({ email, password }) => {
      if (!client) throw new Error("GameLibrary API client not initialized");
      return (await client.authenticate({
        strategy: "local",
        email,
        password
      })) as AuthenticationResult;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    }
  });
};
