import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersApi } from "../api";
import { queryKeys } from "@/lib/queryClient";
import type { UserParams } from "@/types";

// Get users - requires pageSize and pageNumber
export function useUsers(params: UserParams) {
  return useQuery({
    queryKey: queryKeys.users.list(
      params as unknown as Record<string, unknown>
    ),
    queryFn: () => usersApi.getUsers(params),
  });
}

// Get user by ID
export function useUser(id: number) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
}

// Delete user
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("User deleted successfully!");
    },
  });
}
