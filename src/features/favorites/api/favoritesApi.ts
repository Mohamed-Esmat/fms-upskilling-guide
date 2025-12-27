import axiosInstance from "@/lib/axios";
import type { Favorite, PaginatedResponse, FavoriteParams } from "@/types";

interface DeleteResponse {
  raw: unknown[];
  affected: number;
}

// Favorites API service (SystemUser only - Access Denied for Admin)
export const favoritesApi = {
  // Get my favorite recipes - GET /userRecipe/
  getFavorites: async (
    params?: FavoriteParams
  ): Promise<PaginatedResponse<Favorite>> => {
    const response = await axiosInstance.get<PaginatedResponse<Favorite>>(
      "/userRecipe/",
      {
        params: {
          pageSize: params?.pageSize || 10,
          pageNumber: params?.pageNumber || 1,
        },
      }
    );
    return response.data;
  },

  // Add recipe to favorites - POST /userRecipe/
  addToFavorites: async (recipeId: number): Promise<Favorite> => {
    const response = await axiosInstance.post<Favorite>("/userRecipe/", {
      recipeId,
    });
    return response.data;
  },

  // Remove recipe from favorites - DELETE /userRecipe/{id}
  removeFromFavorites: async (id: number): Promise<DeleteResponse> => {
    const response = await axiosInstance.delete<DeleteResponse>(
      `/userRecipe/${id}`
    );
    return response.data;
  },
};

export default favoritesApi;
