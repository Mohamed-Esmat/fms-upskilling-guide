import { Search } from "lucide-react";
import { Select } from "@/components/ui";
import type { SelectOption } from "@/components/ui/Select";

interface TableFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
  }[];
}

export function TableFilters({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search here...",
  filters = [],
}: TableFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Filter dropdowns */}
      {filters.map((filter, index) => (
        <div key={index} className="w-full sm:w-40">
          <Select
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
            placeholder={filter.label}
          />
        </div>
      ))}
    </div>
  );
}
