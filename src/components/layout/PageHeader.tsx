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
        "relative overflow-hidden rounded-2xl bg-green-500 p-6 md:p-8",
        className
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-32 w-32 rounded-full border-2 border-green-400/30" />
        <div className="absolute left-1/4 top-0 h-24 w-24 rounded-full border-2 border-green-400/30" />
        <div className="absolute right-1/4 bottom-0 h-20 w-20 rounded-full border-2 border-green-400/30" />
      </div>

      <div className="relative flex items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {title}{" "}
            {highlightedText && (
              <span className="text-green-100">{highlightedText}</span>
            )}
          </h1>
          <p className="mt-2 text-green-100">{description}</p>
        </div>

        {/* Right side image */}
        <div className="hidden md:block">
          <img
            src={headerBgImg}
            alt="Header illustration"
            className="h-32 w-auto object-contain"
          />
        </div>
      </div>

      {/* Additional content */}
      {children && <div className="relative mt-4">{children}</div>}
    </div>
  );
}
