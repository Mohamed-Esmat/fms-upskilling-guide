import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "../api";
import { useAuthStore } from "@/store";
import { queryKeys } from "@/lib/queryClient";
import type {
  LoginFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  VerifyAccountFormData,
  ChangePasswordFormData,
} from "@/types";

// Login mutation
export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(data),
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token);
      // Fetch current user after login
      const user = await authApi.getCurrentUser();
      setAuth(user, data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: () => {
      // Error is handled by axios interceptor
    },
  });
}

// Register mutation - now uses FormData
export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: FormData) => authApi.register(data),
    onSuccess: (_data, variables) => {
      const email = variables.get("email") as string;
      toast.success("Registration successful! Please verify your email.");
      navigate("/verify-account", { state: { email } });
    },
  });
}

// Verify account mutation
export function useVerifyAccount() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VerifyAccountFormData) => authApi.verifyAccount(data),
    onSuccess: () => {
      toast.success("Account verified successfully! Please login.");
      navigate("/login");
    },
  });
}

// Forgot password mutation
export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) => authApi.forgotPassword(data),
    onSuccess: (_data, variables) => {
      toast.success("Password reset link sent to your email.");
      navigate("/reset-password", { state: { email: variables.email } });
    },
  });
}

// Reset password mutation
export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordFormData) => authApi.resetPassword(data),
    onSuccess: () => {
      toast.success("Password reset successfully! Please login.");
      navigate("/login");
    },
  });
}

// Get current user query
export function useCurrentUser() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: () => authApi.getCurrentUser(),
    enabled: isAuthenticated,
  });
}

// Change password mutation
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordFormData) => authApi.changePassword(data),
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
  });
}

// Update profile mutation
export function useUpdateProfile() {
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (data: FormData) => authApi.updateProfile(data),
    onSuccess: (user) => {
      updateUser(user);
      toast.success("Profile updated successfully!");
    },
  });
}
