// User Group type
export interface UserGroup {
  id: number;
  name: "SuperAdmin" | "SystemUser";
  creationDate: string;
  modificationDate: string;
}

// User types
export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  group: UserGroup;
  creationDate: string;
  modificationDate: string;
}

export type UserRole = "admin" | "user";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
}

// Tag type
export interface Tag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

// Category types
export interface Category {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

// Category with recipes (from getCategoryById response)
export interface CategoryWithRecipes extends Category {
  recipe: Recipe[];
}

// Recipe types
export interface Recipe {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  tag: Tag;
  category: Category[];
  creationDate: string;
  modificationDate: string;
}

// Favorite types
export interface Favorite {
  id: number;
  recipe: Recipe;
  creationDate: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

// API Error Response types
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  additionalInfo: {
    errors?: Record<string, string[]>;
    [key: string]: unknown;
  };
}

// Login Response
export interface LoginResponse {
  token: string;
  expiresIn: string;
}

// Token Payload (decoded JWT)
export interface TokenPayload {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: "SuperAdmin" | "SystemUser";
  iat: number;
  exp: number;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: File;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyAccountFormData {
  email: string;
  code: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdateProfileFormData {
  userName?: string;
  email?: string;
  country?: string;
  phoneNumber?: string;
  confirmPassword?: string;
  profileImage?: File;
}

export interface RecipeFormData {
  name: string;
  description: string;
  price: number;
  tagId: number;
  categoriesIds: number[];
  recipeImage?: File;
}

export interface CategoryFormData {
  name: string;
}

// API params types
export interface RecipeParams {
  pageSize?: number;
  pageNumber?: number;
  name?: string;
  tagId?: number;
  categoryId?: number;
}

export interface CategoryParams {
  pageSize?: number;
  pageNumber?: number;
  name?: string;
}

export interface UserParams {
  pageSize: number;
  pageNumber: number;
  userName?: string;
  email?: string;
  country?: string;
  groups?: number[];
}

export interface FavoriteParams {
  pageSize?: number;
  pageNumber?: number;
}

// Table types
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (value: T) => React.ReactNode;
}
