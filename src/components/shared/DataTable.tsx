import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { cn, generatePaginationNumbers } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  emptyImage?: string;
  onView?: (row: TData) => void;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  showActions?: boolean;
}

export function DataTable<TData>({
  columns,
  data,
  pageCount = 1,
  currentPage = 1,
  onPageChange,
  isLoading = false,
  emptyMessage = "No data available",
  emptyImage,
  onView,
  onEdit,
  onDelete,
  showActions = true,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeActionRow, setActiveActionRow] = useState<number | null>(null);

  // Add actions column if needed
  const tableColumns: ColumnDef<TData>[] = showActions
    ? [
        ...columns,
        {
          id: "actions",
          header: "",
          cell: ({ row }) => (
            <div className="relative">
              <button
                onClick={() =>
                  setActiveActionRow(
                    activeActionRow === row.index ? null : row.index
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>

              {activeActionRow === row.index && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  {onView && (
                    <button
                      onClick={() => {
                        onView(row.original);
                        setActiveActionRow(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => {
                        onEdit(row.original);
                        setActiveActionRow(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => {
                        onDelete(row.original);
                        setActiveActionRow(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ),
        },
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount,
  });

  const paginationNumbers = generatePaginationNumbers(currentPage, pageCount);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 lg:py-20">
        {emptyImage && (
          <img
            src={emptyImage}
            alt="No data"
            className="h-28 w-28 lg:h-40 lg:w-40 mb-4"
          />
        )}
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
          No Data !
        </h3>
        <p className="text-gray-500 mt-2 text-center max-w-sm text-sm lg:text-base px-4">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 -mx-4 sm:mx-0">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 lg:px-4 py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 lg:px-4 py-3 text-xs lg:text-sm text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-1 sm:gap-2 mt-4 lg:mt-6 flex-wrap">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg border transition-colors",
              currentPage === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            )}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {paginationNumbers.map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => onPageChange?.(page)}
                className={cn(
                  "flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg border transition-colors text-sm",
                  currentPage === page
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                )}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-1 sm:px-2 text-gray-400 text-sm">
                {page}
              </span>
            )
          )}

          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === pageCount}
            className={cn(
              "flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg border transition-colors",
              currentPage === pageCount
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            )}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
