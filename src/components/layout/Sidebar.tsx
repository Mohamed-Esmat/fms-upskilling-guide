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
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const { role, logout } = useAuthStore();

  const filteredNavItems = navItems.filter((item) => {
    if (item.adminOnly && role !== "admin") return false;
    if (item.userOnly && role !== "user") return false;
    return true;
  });

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-[#1F263E] transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center justify-center border-b border-gray-700 px-4 transition-all duration-300",
          isCollapsed ? "h-20" : "h-24"
        )}
      >
        <Link to="/dashboard" className="flex items-center justify-center">
          <img
            src={logoImg}
            alt="Food Management System"
            className={cn(
              "object-contain transition-all duration-300",
              isCollapsed ? "h-10 w-auto" : "h-14 w-auto"
            )}
          />
          {!isCollapsed && (
            <span className="ml-2 text-2xl font-bold text-white">FoodMS</span>
          )}
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute -right-3 top-24 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition-transform hover:bg-green-600",
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
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-gray-300 transition-colors",
                    "hover:bg-green-500/10 hover:text-green-400",
                    isActive && "bg-green-500/20 text-green-400",
                    isCollapsed && "justify-center"
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
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
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
