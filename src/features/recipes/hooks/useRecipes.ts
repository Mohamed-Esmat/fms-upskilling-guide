import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recipesApi } from "../api";
import { queryKeys } from "@/lib/queryClient";
import type { RecipeParams, CategoryParams } from "@/types";

// Get recipes
export function useRecipes(params?: RecipeParams) {
  return useQuery({
    queryKey: queryKeys.recipes.list(params as Record<string, unknown>),
    queryFn: () => recipesApi.getRecipes(params),
  });
}

// Get recipe by ID
export function useRecipe(id: number) {
  return useQuery({
    queryKey: queryKeys.recipes.detail(id),
    queryFn: () => recipesApi.getRecipeById(id),
    enabled: !!id,
  });
}

// Create recipe
export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => recipesApi.createRecipe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      toast.success("Recipe created successfully!");
    },
  });
}

// Update recipe
export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      recipesApi.updateRecipe(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      toast.success("Recipe updated successfully!");
    },
  });
}

// Delete recipe
export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => recipesApi.deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      toast.success("Recipe deleted successfully!");
    },
  });
}

// Get tags
export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.list(),
    queryFn: () => recipesApi.getTags(),
  });
}

// Get categories for recipe form
export function useCategories(params?: CategoryParams) {
  return useQuery({
    queryKey: queryKeys.categories.list(params as Record<string, unknown>),
    queryFn: () => recipesApi.getCategories(params),
  });
}
