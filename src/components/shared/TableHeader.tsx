import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

interface TableHeaderProps {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
}

export function TableHeader({
  title,
  subtitle,
  buttonLabel,
  onButtonClick,
  children,
}: TableHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {buttonLabel && (
          <Button
            onClick={onButtonClick}
            leftIcon={<Plus className="h-5 w-5" />}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
