import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebarStore, useAuthStore } from "@/store";
import {
  Home,
  Users,
  ChefHat,
  FolderKanban,
  KeyRound,
  LogOut,
  ChevronLeft,
  Heart,
  X,
} from "lucide-react";
import logoImg from "@/assets/images/logo1.svg";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
  userOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
  {
    label: "Users",
    path: "/dashboard/users",
    icon: <Users className="h-5 w-5" />,
    adminOnly: true,
  },
  {
    label: "Recipes",
    path: "/dashboard/recipes",
    icon: <ChefHat className="h-5 w-5" />,
  },
  {
    label: "Categories",
    path: "/dashboard/categories",
    icon: <FolderKanban className="h-5 w-5" />,
    adminOnly: true,
  },
  {
    label: "Favorites",
    path: "/dashboard/favorites",
    icon: <Heart className="h-5 w-5" />,
    userOnly: true,
  },
  {
    label: "Change Password",
    path: "/dashboard/change-password",
    icon: <KeyRound className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { isCollapsed, isMobileOpen, toggleSidebar, closeMobile } =
    useSidebarStore();
  const { role, logout } = useAuthStore();

  const filteredNavItems = navItems.filter((item) => {
    if (item.adminOnly && role !== "admin") return false;
    if (item.userOnly && role !== "user") return false;
    return true;
  });

  // Close mobile sidebar on route change
  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeMobile]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-[#1F263E] transition-all duration-300 rounded-tr-[50px]",
          // Desktop: show based on collapsed state
          "hidden lg:block",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          // Mobile: show/hide based on isMobileOpen
          isMobileOpen && "block w-64"
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={closeMobile}
          className="absolute right-3 top-3 p-2 text-gray-400 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div
          className={cn(
            "flex items-center justify-center border-b border-gray-700 px-4 transition-all duration-300",
            isCollapsed && !isMobileOpen ? "h-20 lg:h-20" : "h-24"
          )}
        >
          <Link
            to="/dashboard"
            className="flex items-center justify-center"
            onClick={closeMobile}
          >
            <img
              src={logoImg}
              alt="Food Management System"
              className={cn(
                "object-contain transition-all duration-300",
                isCollapsed && !isMobileOpen ? "h-10 w-auto" : "h-14 w-auto"
              )}
            />
            {(!isCollapsed || isMobileOpen) && (
              <span className="ml-2 text-2xl font-bold text-white">FoodMS</span>
            )}
          </Link>
        </div>

        {/* Toggle Button - Desktop only */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute -right-3 top-24 z-50 hidden h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition-transform hover:bg-green-600 lg:flex",
            isCollapsed && "rotate-180"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMobile}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-gray-300 transition-colors",
                      "hover:bg-green-500/10 hover:text-green-400",
                      isActive && "bg-green-500/20 text-green-400",
                      isCollapsed && !isMobileOpen && "lg:justify-center"
                    )}
                  >
                    {item.icon}
                    {(!isCollapsed || isMobileOpen) && (
                      <span>{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-0 right-0 px-3">
          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-gray-300 transition-colors",
              "hover:bg-red-500/10 hover:text-red-400",
              isCollapsed && !isMobileOpen && "lg:justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
