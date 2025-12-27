import { createBrowserRouter, Navigate } from "react-router-dom";

// Auth pages
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyAccountPage,
} from "@/features/auth";

// Dashboard
import {
  DashboardLayout,
  HomePage,
  ChangePasswordPage,
} from "@/features/dashboard";

// Recipes
import { RecipesPage, AddRecipePage, EditRecipePage } from "@/features/recipes";

// Categories
import { CategoriesPage } from "@/features/categories";

// Users
import { UsersPage } from "@/features/users";

// Favorites
import { FavoritesPage } from "@/features/favorites";

// Route guards
import {
  ProtectedRoute,
  PublicRoute,
  AdminRoute,
  UserRoute,
} from "./ProtectedRoute";

export const router = createBrowserRouter([
  // Public routes (auth)
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/verify-account",
        element: <VerifyAccountPage />,
      },
    ],
  },

  // Protected routes (dashboard)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "recipes",
            element: <RecipesPage />,
          },
          // Admin only routes
          {
            element: <AdminRoute />,
            children: [
              {
                path: "recipes/add",
                element: <AddRecipePage />,
              },
              {
                path: "recipes/:id/edit",
                element: <EditRecipePage />,
              },
              {
                path: "categories",
                element: <CategoriesPage />,
              },
              {
                path: "users",
                element: <UsersPage />,
              },
            ],
          },
          // User only routes
          {
            element: <UserRoute />,
            children: [
              {
                path: "favorites",
                element: <FavoritesPage />,
              },
            ],
          },
          {
            path: "change-password",
            element: <ChangePasswordPage />,
          },
        ],
      },
    ],
  },

  // Default redirect
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // 404
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
