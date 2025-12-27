import axiosInstance from "@/lib/axios";
import axios from "axios";
import type {
  Recipe,
  PaginatedResponse,
  Tag,
  Category,
  RecipeParams,
  CategoryParams,
} from "@/types";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://upskilling-egypt.com:3006/api/v1";

interface MessageResponse {
  message: string;
}

interface DeleteResponse {
  raw: unknown[];
  affected: number;
}

// Recipes API service
export const recipesApi = {
  // Get all recipes - GET /Recipe/
  getRecipes: async (
    params?: RecipeParams
  ): Promise<PaginatedResponse<Recipe>> => {
    const response = await axiosInstance.get<PaginatedResponse<Recipe>>(
      "/Recipe/",
      {
        params: {
          pageSize: params?.pageSize || 10,
          pageNumber: params?.pageNumber || 1,
          ...(params?.name && { name: params.name }),
          ...(params?.tagId && { tagId: params.tagId }),
          ...(params?.categoryId && { categoryId: params.categoryId }),
        },
      }
    );
    return response.data;
  },

  // Get recipe by ID - GET /Recipe/{id}
  getRecipeById: async (id: number): Promise<Recipe | null> => {
    const response = await axiosInstance.get<Recipe>(`/Recipe/${id}`);
    return response.data;
  },

  // Create recipe - POST /Recipe/ (formData)
  createRecipe: async (data: FormData): Promise<MessageResponse> => {
    const token = localStorage.getItem("token");
    const response = await axios.post<MessageResponse>(
      `${BASE_URL}/Recipe/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Let axios set Content-Type automatically for FormData
        },
      }
    );
    return response.data;
  },

  // Update recipe - PUT /Recipe/{id} (formData)
  // Note: All fields are required for update
  updateRecipe: async (id: number, data: FormData): Promise<Recipe> => {
    const token = localStorage.getItem("token");
    const response = await axios.put<Recipe>(`${BASE_URL}/Recipe/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Delete recipe - DELETE /Recipe/{id}
  deleteRecipe: async (id: number): Promise<DeleteResponse> => {
    const response = await axiosInstance.delete<DeleteResponse>(
      `/Recipe/${id}`
    );
    return response.data;
  },

  // Get all tags - GET /tag/
  getTags: async (): Promise<Tag[]> => {
    const response = await axiosInstance.get<Tag[]>("/tag/");
    return response.data;
  },

  // Get all categories for recipe form - GET /Category/
  getCategories: async (
    params?: CategoryParams
  ): Promise<PaginatedResponse<Category>> => {
    const response = await axiosInstance.get<PaginatedResponse<Category>>(
      "/Category/",
      {
        params: {
          pageSize: params?.pageSize || 100,
          pageNumber: params?.pageNumber || 1,
          ...(params?.name && { name: params.name }),
        },
      }
    );
    return response.data;
  },
};

export default recipesApi;
