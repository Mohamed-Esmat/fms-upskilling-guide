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
          "pt-20 min-h-screen transition-all duration-300",
          isCollapsed ? "pl-20" : "pl-64"
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
