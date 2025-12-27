import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store";
import { Button } from "@/components/ui";
import headerBgImg from "@/assets/images/header-bg.png";

export function HomePage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl lg:rounded-2xl bg-green-500 p-4 sm:p-6 lg:p-8">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <div className="absolute -left-10 top-10 h-20 lg:h-32 w-20 lg:w-32 rounded-full border-2 border-green-400/30" />
          <div className="absolute left-1/4 top-0 h-16 lg:h-24 w-16 lg:w-24 rounded-full border-2 border-green-400/30" />
          <div className="absolute right-1/3 top-1/2 h-14 lg:h-20 w-14 lg:w-20 rounded-full border-2 border-green-400/30" />
        </div>

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Welcome{" "}
              <span className="text-green-100">
                {user?.userName || "User"}!
              </span>
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-green-100">
              This is a welcoming screen for the entry of the application, you
              can now see the options
            </p>
          </div>

          <div className="hidden lg:block flex-shrink-0">
            <img
              src={headerBgImg}
              alt="Welcome illustration"
              className="h-28 xl:h-40 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Fill Recipes Card */}
      <div className="bg-green-50 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-gray-900">
            Fill the <span className="text-green-600">Recipes!</span>
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            you can now fill the meals easily using the table and form, click
            here and fill it with the table!
          </p>
        </div>
        <Link to="/dashboard/recipes" className="flex-shrink-0">
          <Button rightIcon={<ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />} className="w-full sm:w-auto">
            Fill Recipes
          </Button>
        </Link>
      </div>
    </div>
  );
}
