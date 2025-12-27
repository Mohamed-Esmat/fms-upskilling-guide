import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register schema
export const registerSchema = z
  .object({
    userName: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    country: z.string().min(2, "Country is required"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Reset password schema
export const resetPasswordSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    seed: z.string().min(4, "OTP is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Verify account schema
export const verifyAccountSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  code: z.string().min(4, "Verification code is required"),
});

// Recipe schema
export const recipeSchema = z.object({
  name: z.string().min(2, "Recipe name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  tagId: z.number().min(1, "Please select a tag"),
  categoriesIds: z
    .array(z.number())
    .min(1, "Please select at least one category"),
  recipeImage: z.any().optional(),
});

// Category schema
export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
});

// Change password schema
export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase, one lowercase, one number and one special character"
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

// Type exports
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type VerifyAccountFormValues = z.infer<typeof verifyAccountSchema>;
export type RecipeFormValues = z.infer<typeof recipeSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
