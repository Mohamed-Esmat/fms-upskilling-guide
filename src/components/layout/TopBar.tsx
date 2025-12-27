import { useState } from "react";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { Avatar } from "@/components/ui";
import { useAuthStore, useSidebarStore } from "@/store";
import { cn, getImageUrl, getInitials } from "@/lib/utils";

interface TopBarProps {
  onSearch?: (query: string) => void;
}

export function TopBar({ onSearch }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuthStore();
  const { isCollapsed, openMobile } = useSidebarStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 lg:h-20 bg-white border-b border-gray-200 transition-all duration-300",
        // Desktop: adjust left position based on sidebar state
        "left-0 lg:left-64",
        isCollapsed && "lg:left-20"
      )}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={openMobile}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Search - Hidden on mobile, visible on tablet+ */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:block flex-1 max-w-xl"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 lg:h-12 w-full rounded-full border border-gray-300 bg-gray-50 pl-12 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Mobile Search Button */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors sm:hidden">
            <Search className="h-5 w-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 lg:gap-3 rounded-lg px-2 lg:px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              <Avatar
                src={user?.imagePath ? getImageUrl(user.imagePath) : undefined}
                fallback={user?.userName ? getInitials(user.userName) : "U"}
                size="md"
              />
              <span className="hidden md:block font-medium text-gray-700 max-w-[120px] truncate">
                {user?.userName || "User"}
              </span>
              <ChevronDown
                className={cn(
                  "hidden md:block h-4 w-4 text-gray-500 transition-transform",
                  showDropdown && "rotate-180"
                )}
              />
            </button>

            {showDropdown && (
              <>
                {/* Backdrop to close dropdown */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                    <p className="font-medium text-gray-900 truncate">
                      {user?.userName || "User"}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
