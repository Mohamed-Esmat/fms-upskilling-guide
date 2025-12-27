import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/layout";
import {
  DataTable,
  TableHeader,
  DeleteConfirmationModal,
} from "@/components/shared";
import { useFavorites, useRemoveFromFavorites } from "../hooks";
import {
  getImageUrl,
  formatPrice,
  truncateText,
  formatDate,
} from "@/lib/utils";
import type { Favorite } from "@/types";
import noDataImg from "@/assets/images/no-data.svg";
import { Heart, Grid, List, Trash2 } from "lucide-react";

type ViewMode = "table" | "grid";

export function FavoritesPage() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // API queries
  const { data: favoritesData, isLoading } = useFavorites({
    pageNumber: currentPage,
    pageSize: viewMode === "grid" ? 12 : 10,
  });

  const { mutate: removeFavorite, isPending: isDeleting } =
    useRemoveFromFavorites();

  // Table columns
  const columns: ColumnDef<Favorite>[] = useMemo(
    () => [
      {
        accessorKey: "recipe.name",
        header: "Item Name",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {row.original.recipe.name}
          </span>
        ),
      },
      {
        accessorKey: "recipe.imagePath",
        header: "Image",
        cell: ({ row }) => (
          <img
            src={getImageUrl(row.original.recipe.imagePath)}
            alt={row.original.recipe.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ),
      },
      {
        accessorKey: "recipe.price",
        header: "Price",
        cell: ({ row }) => (
          <span className="text-green-600 font-semibold">
            {formatPrice(row.original.recipe.price)}
          </span>
        ),
      },
      {
        accessorKey: "recipe.description",
        header: "Description",
        cell: ({ row }) => truncateText(row.original.recipe.description, 30),
      },
      {
        accessorKey: "creationDate",
        header: "Added On",
        cell: ({ row }) => formatDate(row.original.creationDate),
      },
    ],
    []
  );

  // Handlers
  const handleDelete = (favorite: Favorite) => {
    setSelectedFavorite(favorite);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedFavorite) {
      removeFavorite(selectedFavorite.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedFavorite(null);
        },
      });
    }
  };

  // Render card view
  const renderCardView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
        </div>
      );
    }

    if (!favoritesData?.data || favoritesData.data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 lg:py-20">
          <img
            src={noDataImg}
            alt="No favorites"
            className="h-28 w-28 lg:h-40 lg:w-40 mb-4"
          />
          <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
            No Favorites Yet!
          </h3>
          <p className="text-gray-500 mt-2 text-center max-w-sm text-sm lg:text-base px-4">
            You haven't added any recipes to favorites yet. Browse recipes and
            click the heart icon to add them here.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {favoritesData.data.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative">
                <img
                  src={getImageUrl(favorite.recipe.imagePath)}
                  alt={favorite.recipe.name}
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={() => handleDelete(favorite)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 transition-colors group"
                  title="Remove from favorites"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">
                  {favorite.recipe.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {favorite.recipe.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-green-600 font-bold text-lg">
                    {formatPrice(favorite.recipe.price)}
                  </span>
                  <button
                    onClick={() => handleDelete(favorite)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Added {formatDate(favorite.creationDate)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination for grid view */}
        {favoritesData.totalNumberOfPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {favoritesData.totalNumberOfPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(favoritesData.totalNumberOfPages, p + 1)
                )
              }
              disabled={currentPage === favoritesData.totalNumberOfPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <PageHeader
        title="My"
        highlightedText="Favorites"
        description="View and manage all your favorite recipes in one place"
      />

      <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <TableHeader
            title="Favorite Recipes"
            subtitle={`${
              favoritesData?.totalNumberOfRecords || 0
            } saved recipes`}
          />

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Grid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>

        {viewMode === "table" ? (
          <DataTable
            columns={columns}
            data={favoritesData?.data || []}
            pageCount={favoritesData?.totalNumberOfPages || 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
            emptyMessage="You haven't added any recipes to favorites yet."
            emptyImage={noDataImg}
            onDelete={handleDelete}
            showActions={true}
          />
        ) : (
          renderCardView()
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Remove from Favorites?"
        message="Are you sure you want to remove this recipe from your favorites?"
      />
    </div>
  );
}
