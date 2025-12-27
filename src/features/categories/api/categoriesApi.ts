import axiosInstance from "@/lib/axios";
import type {
  Category,
  CategoryWithRecipes,
  PaginatedResponse,
  CategoryParams,
} from "@/types";

interface DeleteResponse {
  raw: unknown[];
  affected: number;
}

// Categories API service
export const categoriesApi = {
  // Get all categories - GET /Category/
  getCategories: async (
    params?: CategoryParams
  ): Promise<PaginatedResponse<Category>> => {
    const response = await axiosInstance.get<PaginatedResponse<Category>>(
      "/Category/",
      {
        params: {
          pageSize: params?.pageSize || 10,
          pageNumber: params?.pageNumber || 1,
          ...(params?.name && { name: params.name }),
        },
      }
    );
    return response.data;
  },

  // Get category by ID - GET /Category/{id}
  // Returns category with associated recipes
  getCategoryById: async (id: number): Promise<CategoryWithRecipes | null> => {
    const response = await axiosInstance.get<CategoryWithRecipes>(
      `/Category/${id}`
    );
    return response.data;
  },

  // Create category - POST /Category/
  createCategory: async (data: { name: string }): Promise<Category> => {
    const response = await axiosInstance.post<Category>("/Category/", data);
    return response.data;
  },

  // Update category - PUT /Category/{id}
  updateCategory: async (
    id: number,
    data: { name: string }
  ): Promise<Category> => {
    const response = await axiosInstance.put<Category>(`/Category/${id}`, data);
    return response.data;
  },

  // Delete category - DELETE /Category/{id}
  deleteCategory: async (id: number): Promise<DeleteResponse> => {
    const response = await axiosInstance.delete<DeleteResponse>(
      `/Category/${id}`
    );
    return response.data;
  },
};

export default categoriesApi;
