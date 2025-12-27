import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  setAuth: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: null,
      setAuth: (user, token) => {
        const role: UserRole =
          user.group.name === "SuperAdmin" ? "admin" : "user";
        set({ user, token, isAuthenticated: true, role });
        localStorage.setItem("token", token);
      },
      updateUser: (user) => {
        const role: UserRole =
          user.group.name === "SuperAdmin" ? "admin" : "user";
        set({ user, role });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, role: null });
        localStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    }
  )
);

// Sidebar state
interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
  openMobile: () => void;
  closeMobile: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      toggleSidebar: () =>
        set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      openMobile: () => set({ isMobileOpen: true }),
      closeMobile: () => set({ isMobileOpen: false }),
    }),
    {
      name: "sidebar-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isCollapsed: state.isCollapsed,
      }),
    }
  )
);

// Modal state for global modals
interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: unknown;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  type: null,
  data: null,
  openModal: (type, data = null) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false, type: null, data: null }),
}));
