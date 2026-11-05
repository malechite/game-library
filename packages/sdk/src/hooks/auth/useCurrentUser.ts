import { useQuery } from "@tanstack/react-query";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { ApiUser } from "@game-library/types";

export const useCurrentUser = () => {
  const { client } = useGameLibraryApi();

  return useQuery<ApiUser | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!client) return null;
      try {
        const result = await client.reAuthenticate();
        return (result as { user?: ApiUser })?.user ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!client
  });
};
