import { Outlet } from "react-router-dom";
import { Sidebar, TopBar } from "@/components/layout";
import { useSidebarStore } from "@/store";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopBar />
      <main
        className={cn(
          "pt-16 lg:pt-20 min-h-screen transition-all duration-300",
          // No left padding on mobile, responsive on desktop
          "pl-0 lg:pl-64",
          isCollapsed && "lg:pl-20"
        )}
      >
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
