import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import headerBgImg from "@/assets/images/header-bg.png";

interface PageHeaderProps {
  title: string;
  highlightedText?: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  highlightedText,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl lg:rounded-2xl bg-green-500 p-4 sm:p-6 lg:p-8",
        className
      )}
    >
      {/* Background decorations - hidden on very small screens */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute -left-10 top-10 h-20 lg:h-32 w-20 lg:w-32 rounded-full border-2 border-green-400/30" />
        <div className="absolute left-1/4 top-0 h-16 lg:h-24 w-16 lg:w-24 rounded-full border-2 border-green-400/30" />
        <div className="absolute right-1/4 bottom-0 h-14 lg:h-20 w-14 lg:w-20 rounded-full border-2 border-green-400/30" />
      </div>

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {title}{" "}
            {highlightedText && (
              <span className="text-green-100">{highlightedText}</span>
            )}
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-green-100 line-clamp-2 sm:line-clamp-none">
            {description}
          </p>
        </div>

        {/* Right side image - hidden on mobile and small tablets */}
        <div className="hidden lg:block flex-shrink-0">
          <img
            src={headerBgImg}
            alt="Header illustration"
            className="h-24 xl:h-32 w-auto object-contain"
          />
        </div>
      </div>

      {/* Additional content */}
      {children && <div className="relative mt-3 sm:mt-4">{children}</div>}
    </div>
  );
}
