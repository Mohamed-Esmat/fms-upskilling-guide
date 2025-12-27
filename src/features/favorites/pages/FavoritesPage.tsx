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

export function FavoritesPage() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // API queries
  const { data: favoritesData, isLoading } = useFavorites({
    pageNumber: currentPage,
    pageSize: 10,
  });

  const { mutate: removeFavorite, isPending: isDeleting } =
    useRemoveFromFavorites();

  // Table columns
  const columns: ColumnDef<Favorite>[] = useMemo(
    () => [
      {
        accessorKey: "recipe.name",
        header: "Item Name",
        cell: ({ row }) => row.original.recipe.name,
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
        cell: ({ row }) => formatPrice(row.original.recipe.price),
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="My"
        highlightedText="Favorites"
        description="View all your favorite recipes in one place"
      />

      <div className="bg-white rounded-2xl p-6">
        <TableHeader title="Favorite Recipes" subtitle="Your saved recipes" />

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
