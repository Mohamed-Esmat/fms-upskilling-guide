# Food Management System (FMS)

A comprehensive Food Management System built with React, TypeScript, and modern web technologies. This project serves as a reference implementation for students learning feature-based architecture and modern React development patterns.

## 🌐 Demo

Check out the live demo hosted on Netlify:

🔗 **[Live Demo](https://fms-upskilling-esmat.netlify.app/)**

## 🚀 Features

### Authentication Module

- **Login Page** - User authentication with email and password
- **Register Page** - New user registration with form validation
- **Forgot Password** - Password reset request via email
- **Reset Password** - OTP-based password reset
- **Verify Account** - Email verification for new accounts

### Admin Portal

- **Dashboard** - Welcome screen with navigation
- **Users Management** - View and manage system users
- **Recipes Management** - Full CRUD operations for recipes
- **Categories Management** - Add, edit, and delete categories
- **Change Password** - Update account password

### User Portal

- **Dashboard** - Welcome screen with personalized content
- **Recipes** - Browse all available recipes
- **Favorites** - Manage favorite recipes
- **Change Password** - Update account password

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router v7** - Client-side routing
- **TanStack Query** - Server state management
- **TanStack Table** - Headless table component
- **Zustand** - Client state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, icons)
├── components/
│   ├── layout/          # Layout components (Sidebar, TopBar, PageHeader)
│   ├── shared/          # Shared components (DataTable, TableFilters, etc.)
│   └── ui/              # Base UI components (Button, Input, Modal, etc.)
├── features/
│   ├── auth/            # Authentication feature
│   │   ├── api/         # Auth API calls
│   │   ├── components/  # Auth-specific components
│   │   ├── hooks/       # Auth hooks (useLogin, useRegister, etc.)
│   │   └── pages/       # Auth pages
│   ├── categories/      # Categories feature
│   ├── dashboard/       # Dashboard feature
│   ├── favorites/       # Favorites feature (user only)
│   ├── recipes/         # Recipes feature
│   └── users/           # Users feature (admin only)
├── lib/
│   ├── axios.ts         # Axios instance configuration
│   ├── queryClient.ts   # TanStack Query client
│   ├── utils.ts         # Utility functions
│   └── validations.ts   # Zod schemas
├── routes/
│   ├── index.tsx        # Route definitions
│   └── ProtectedRoute.tsx # Route guards
├── store/
│   └── index.ts         # Zustand stores
├── types/
│   └── index.ts         # TypeScript types
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd fms

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://upskilling-egypt.com:3006/api/v1
```

## 🔐 Authentication Flow

1. User visits the app and is redirected to login
2. User can register a new account or login
3. After registration, user must verify their email
4. Upon successful login, user is redirected to dashboard
5. Based on user role (admin/user), different routes are accessible

## 🎨 Key Patterns Used

### Feature-Based Architecture

Each feature is self-contained with its own:

- API layer (`api/`)
- Custom hooks (`hooks/`)
- Components (`components/`)
- Pages (`pages/`)

### Custom Hooks

- `useLogin`, `useRegister` - Auth mutations
- `useRecipes`, `useCreateRecipe` - Recipe operations
- `useCategories` - Category operations
- `useFavorites` - Favorite operations

### State Management

- **Server State**: TanStack Query for API data
- **Client State**: Zustand for UI state (auth, sidebar)

### Form Handling

- React Hook Form for form state
- Zod for validation schemas
- Custom Input components with error handling

## 📝 API Endpoints

The application connects to the Upskilling Egypt API (`https://upskilling-egypt.com:3006/api/v1`):

### Authentication

| Method | Endpoint                | Description                  | Body                                                                                   |
| ------ | ----------------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| POST   | `/Users/Login`          | User login                   | `{ email, password }`                                                                  |
| POST   | `/Users/Register`       | User registration (FormData) | `userName*, email*, country*, phoneNumber*, password*, confirmPassword*, profileImage` |
| PUT    | `/Users/verify`         | Verify account               | `{ email, code }`                                                                      |
| POST   | `/Users/Reset/Request`  | Request password reset       | `{ email }`                                                                            |
| POST   | `/Users/Reset`          | Reset password               | `{ email, password, confirmPassword, seed }`                                           |
| PUT    | `/Users/ChangePassword` | Change password              | `{ oldPassword, newPassword, confirmNewPassword }`                                     |

### Users

| Method | Endpoint             | Description               | Params                                                                       |
| ------ | -------------------- | ------------------------- | ---------------------------------------------------------------------------- |
| GET    | `/Users/currentUser` | Get current user          | -                                                                            |
| GET    | `/Users/`            | Get all users (filtered)  | `pageSize*, pageNumber*, userName?, email?, country?, groups[]?`             |
| GET    | `/Users/{id}`        | Get user by ID            | -                                                                            |
| PUT    | `/Users/`            | Update profile (FormData) | `userName?, email?, country?, phoneNumber?, confirmPassword?, profileImage?` |
| DELETE | `/Users/{id}`        | Delete user (Admin only)  | -                                                                            |

> **Note:** Groups filter: 1 = SuperAdmin, 2 = SystemUser

### Recipes

| Method | Endpoint       | Description              | Body/Params                                                           |
| ------ | -------------- | ------------------------ | --------------------------------------------------------------------- |
| GET    | `/Recipe/`     | Get all recipes          | `pageSize*, pageNumber*, name?, tagId?, categoryId?`                  |
| GET    | `/Recipe/{id}` | Get recipe by ID         | -                                                                     |
| POST   | `/Recipe/`     | Create recipe (FormData) | `name*, description*, price*, tagId*, categoriesIds[]*, recipeImage?` |
| PUT    | `/Recipe/{id}` | Update recipe (FormData) | `name*, description*, price*, tagId*, recipeImage*, categoriesIds[]?` |
| DELETE | `/Recipe/{id}` | Delete recipe            | -                                                                     |

### Categories

| Method | Endpoint         | Description               | Body/Params                     |
| ------ | ---------------- | ------------------------- | ------------------------------- |
| GET    | `/Category/`     | Get all categories        | `pageSize?, pageNumber?, name?` |
| GET    | `/Category/{id}` | Get category with recipes | -                               |
| POST   | `/Category/`     | Create category           | `{ name }`                      |
| PUT    | `/Category/{id}` | Update category           | `{ name }`                      |
| DELETE | `/Category/{id}` | Delete category           | -                               |

### Tags

| Method | Endpoint | Description  |
| ------ | -------- | ------------ | --- |
| GET    | `/tag/`  | Get all tags | -   |

### Favorites (User only)

| Method | Endpoint           | Description           | Body                     |
| ------ | ------------------ | --------------------- | ------------------------ |
| GET    | `/userRecipe/`     | Get my favorites      | `pageSize?, pageNumber?` |
| POST   | `/userRecipe/`     | Add to favorites      | `{ recipeId }`           |
| DELETE | `/userRecipe/{id}` | Remove from favorites | -                        |

> **Note:** Favorites API returns "Access Denied" for admin users.

## 📊 API Response Formats

### Paginated Response

```json
{
  "pageNumber": 1,
  "pageSize": 10,
  "data": [...],
  "totalNumberOfRecords": 100,
  "totalNumberOfPages": 10
}
```

### Error Response

```json
{
  "message": "Error message",
  "statusCode": 400,
  "additionalInfo": {
    "errors": {
      "fieldName": ["Validation error message"]
    }
  }
}
```

### Login Response

```json
{
  "token": "JWT_TOKEN",
  "expiresIn": "Sat Feb 07 2026 05:59:00 GMT+0000"
}
```

### JWT Token Payload

```json
{
  "userId": 30,
  "roles": ["Admin", "canAddUser", ...],
  "userName": "username",
  "userEmail": "email@example.com",
  "userGroup": "SuperAdmin" | "SystemUser",
  "iat": 1766843951,
  "exp": 1770443951
}
```

## 🔒 Role-Based Access

| Route           | Admin | User |
| --------------- | ----- | ---- |
| Dashboard       | ✅    | ✅   |
| Recipes (View)  | ✅    | ✅   |
| Add/Edit Recipe | ✅    | ❌   |
| Categories      | ✅    | ❌   |
| Users           | ✅    | ❌   |
| Favorites       | ❌    | ✅   |
| Change Password | ✅    | ✅   |

## ⚠️ Known Issues

- **SMTP Service**: The email verification and password reset features require SMTP activation. You may see a 500 error with code "EMESSAGE" when registering or requesting password reset.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

---

Built with ❤️ for learning React development
