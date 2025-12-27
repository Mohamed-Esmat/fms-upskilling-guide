import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import type { ApiErrorResponse } from "@/types";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to format error messages from API response
const formatErrorMessage = (error: AxiosError<ApiErrorResponse>): string => {
  const data = error.response?.data;

  if (!data) return "An error occurred";

  // Check for validation errors in additionalInfo.errors
  if (data.additionalInfo?.errors) {
    const errorMessages = Object.entries(data.additionalInfo.errors)
      .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
      .join("\n");
    return errorMessages || data.message;
  }

  return data.message || "An error occurred";
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = formatErrorMessage(error);
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      // Invalid credentials or session expired
      const isLoginPage = window.location.pathname === "/login";
      if (!isLoginPage) {
        localStorage.removeItem("token");
        localStorage.removeItem("auth-storage");
        window.location.href = "/login";
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(message);
      }
    } else if (statusCode === 403) {
      toast.error(
        "Access Denied. You do not have permission to perform this action."
      );
    } else if (statusCode === 404) {
      toast.error("Resource not found.");
    } else if (statusCode === 409) {
      // Conflict - e.g., username or email already exists
      toast.error(message);
    } else if (statusCode === 400) {
      // Validation errors
      toast.error(message);
    } else if (statusCode === 500) {
      // Check for SMTP error
      const additionalInfo = error.response?.data?.additionalInfo;
      if (additionalInfo?.code === "EMESSAGE") {
        toast.error(
          "Email service is temporarily unavailable. Please try again later."
        );
      } else {
        toast.error("Server error. Please try again later.");
      }
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

// Axios instance for multipart/form-data
export const axiosMultipart = axios.create({
  baseURL: BASE_URL,
});

axiosMultipart.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      // Don't set Content-Type manually - let axios set it automatically with the correct boundary
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosMultipart.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = formatErrorMessage(error);
    const statusCode = error.response?.status;

    if (statusCode === 400) {
      toast.error(message);
    } else if (statusCode === 500) {
      const additionalInfo = error.response?.data?.additionalInfo;
      if (additionalInfo?.code === "EMESSAGE") {
        toast.error(
          "Email service is temporarily unavailable. Please try again later."
        );
      } else {
        toast.error("Server error. Please try again later.");
      }
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
