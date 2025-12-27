import axiosInstance, { axiosMultipart } from "@/lib/axios";
import type {
  LoginFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  VerifyAccountFormData,
  ChangePasswordFormData,
  User,
  LoginResponse,
} from "@/types";

interface MessageResponse {
  message: string;
}

// Auth API service
export const authApi = {
  // Login - POST /Users/Login
  login: async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/Users/Login",
      data
    );
    return response.data;
  },

  // Register - POST /Users/Register (formData)
  register: async (data: FormData): Promise<MessageResponse> => {
    const response = await axiosMultipart.post<MessageResponse>(
      "/Users/Register",
      data
    );
    return response.data;
  },

  // Verify account - PUT /Users/verify
  verifyAccount: async (
    data: VerifyAccountFormData
  ): Promise<MessageResponse> => {
    const response = await axiosInstance.put<MessageResponse>(
      "/Users/verify",
      data
    );
    return response.data;
  },

  // Forgot password (request reset) - POST /Users/Reset/Request
  forgotPassword: async (
    data: ForgotPasswordFormData
  ): Promise<MessageResponse> => {
    const response = await axiosInstance.post<MessageResponse>(
      "/Users/Reset/Request",
      data
    );
    return response.data;
  },

  // Reset password - POST /Users/Reset
  resetPassword: async (
    data: ResetPasswordFormData
  ): Promise<MessageResponse> => {
    const response = await axiosInstance.post<MessageResponse>(
      "/Users/Reset",
      data
    );
    return response.data;
  },

  // Get current user - GET /Users/currentUser
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<User>("/Users/currentUser");
    return response.data;
  },

  // Get user by ID - GET /Users/{id}
  getUserById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get<User>(`/Users/${id}`);
    return response.data;
  },

  // Change password - PUT /Users/ChangePassword
  changePassword: async (
    data: ChangePasswordFormData
  ): Promise<MessageResponse> => {
    const response = await axiosInstance.put<MessageResponse>(
      "/Users/ChangePassword",
      data
    );
    return response.data;
  },

  // Update my profile - PUT /Users/ (formData)
  updateProfile: async (data: FormData): Promise<User> => {
    const response = await axiosMultipart.put<User>("/Users/", data);
    return response.data;
  },
};
