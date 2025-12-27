import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    },
    mutations: {
      retry: 0,
    },
  },
});

// Query keys factory
export const queryKeys = {
  // Auth
  auth: {
    all: ["auth"] as const,
    currentUser: () => [...queryKeys.auth.all, "currentUser"] as const,
  },

  // Recipes
  recipes: {
    all: ["recipes"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.recipes.all, "list", params] as const,
    detail: (id: number) => [...queryKeys.recipes.all, "detail", id] as const,
  },

  // Categories
  categories: {
    all: ["categories"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.categories.all, "list", params] as const,
    detail: (id: number) =>
      [...queryKeys.categories.all, "detail", id] as const,
  },

  // Tags
  tags: {
    all: ["tags"] as const,
    list: () => [...queryKeys.tags.all, "list"] as const,
  },

  // Users
  users: {
    all: ["users"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.users.all, "list", params] as const,
    detail: (id: number) => [...queryKeys.users.all, "detail", id] as const,
  },

  // Favorites
  favorites: {
    all: ["favorites"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.favorites.all, "list", params] as const,
  },
};

export default queryClient;
