import axiosInstance from "@/lib/axios";
import type { User, PaginatedResponse, UserParams } from "@/types";

interface DeleteResponse {
  raw: unknown[];
  affected: number;
}

// Users API service
export const usersApi = {
  // Get and filter users - GET /Users/
  // groups: 1 = SuperAdmin, 2 = SystemUser
  getUsers: async (params: UserParams): Promise<PaginatedResponse<User>> => {
    // Build query params, handling the groups array specially
    const queryParams = new URLSearchParams();
    queryParams.append("pageSize", String(params.pageSize));
    queryParams.append("pageNumber", String(params.pageNumber));

    if (params.userName) queryParams.append("userName", params.userName);
    if (params.email) queryParams.append("email", params.email);
    if (params.country) queryParams.append("country", params.country);

    // Handle groups array (can have multiple values)
    if (params.groups && params.groups.length > 0) {
      params.groups.forEach((group) => {
        queryParams.append("groups", String(group));
      });
    }

    const response = await axiosInstance.get<PaginatedResponse<User>>(
      `/Users/?${queryParams.toString()}`
    );
    return response.data;
  },

  // Get user by ID - GET /Users/{id}
  getUserById: async (id: number): Promise<User | null> => {
    const response = await axiosInstance.get<User>(`/Users/${id}`);
    return response.data;
  },

  // Delete user - DELETE /Users/{id} (Admin only)
  deleteUser: async (id: number): Promise<DeleteResponse> => {
    const response = await axiosInstance.delete<DeleteResponse>(`/Users/${id}`);
    return response.data;
  },
};

export default usersApi;
