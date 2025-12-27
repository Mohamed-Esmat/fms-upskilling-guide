import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { favoritesApi } from "../api";
import { queryKeys } from "@/lib/queryClient";

interface FavoriteParams {
  pageSize?: number;
  pageNumber?: number;
}

// Get favorites
export function useFavorites(params?: FavoriteParams) {
  return useQuery({
    queryKey: queryKeys.favorites.list(params as Record<string, unknown>),
    queryFn: () => favoritesApi.getFavorites(params),
  });
}

// Add to favorites
export function useAddToFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: number) => favoritesApi.addToFavorites(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
      toast.success("Added to favorites!");
    },
  });
}

// Remove from favorites
export function useRemoveFromFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => favoritesApi.removeFromFavorites(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
      toast.success("Removed from favorites!");
    },
  });
}
