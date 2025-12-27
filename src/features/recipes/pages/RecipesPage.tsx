import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/layout";
import {
  DataTable,
  TableHeader,
  TableFilters,
  DeleteConfirmationModal,
} from "@/components/shared";
import { Modal } from "@/components/ui";
import { useRecipes, useDeleteRecipe, useTags, useCategories } from "../hooks";
import { getImageUrl, formatPrice, truncateText } from "@/lib/utils";
import { useAuthStore } from "@/store";
import type { Recipe } from "@/types";
import noDataImg from "@/assets/images/no-data.svg";

export function RecipesPage() {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const isAdmin = role === "admin";

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // API queries
  const { data: recipesData, isLoading } = useRecipes({
    pageNumber: currentPage,
    pageSize: 10,
    name: searchQuery || undefined,
    tagId: selectedTag ? Number(selectedTag) : undefined,
    categoryId: selectedCategory ? Number(selectedCategory) : undefined,
  });

  const { data: tagsData } = useTags();
  const { data: categoriesData } = useCategories({ pageSize: 100 });
  const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe();

  // Table columns
  const columns: ColumnDef<Recipe>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Item Name",
      },
      {
        accessorKey: "imagePath",
        header: "Image",
        cell: ({ row }) => (
          <img
            src={getImageUrl(row.original.imagePath)}
            alt={row.original.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => formatPrice(row.original.price),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => truncateText(row.original.description, 30),
      },
      {
        accessorKey: "tag",
        header: "Tag",
        cell: ({ row }) => row.original.tag?.name || "-",
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) =>
          row.original.category?.map((c) => c.name).join(", ") || "-",
      },
    ],
    []
  );

  // Handlers
  const handleView = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsViewModalOpen(true);
  };

  const handleEdit = (recipe: Recipe) => {
    navigate(`/dashboard/recipes/${recipe.id}/edit`);
  };

  const handleDelete = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRecipe) {
      deleteRecipe(selectedRecipe.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedRecipe(null);
        },
      });
    }
  };

  // Filter options
  const tagOptions = (tagsData || []).map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const categoryOptions = (categoriesData?.data || []).map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recipes"
        highlightedText="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <div className="bg-white rounded-2xl p-6">
        <TableHeader
          title="Recipe Table Details"
          subtitle="You can check all details"
          buttonLabel={isAdmin ? "Add New Item" : undefined}
          onButtonClick={() => navigate("/dashboard/recipes/add")}
        />

        <TableFilters
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search here..."
          filters={[
            {
              label: "Tag",
              value: selectedTag,
              options: [{ value: "", label: "All Tags" }, ...tagOptions],
              onChange: setSelectedTag,
            },
            {
              label: "Category",
              value: selectedCategory,
              options: [
                { value: "", label: "All Categories" },
                ...categoryOptions,
              ],
              onChange: setSelectedCategory,
            },
          ]}
        />

        <DataTable
          columns={columns}
          data={recipesData?.data || []}
          pageCount={recipesData?.totalNumberOfPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
          emptyMessage="are you sure you want to delete this item? if you are sure just click on delete it"
          emptyImage={noDataImg}
          onView={handleView}
          onEdit={isAdmin ? handleEdit : undefined}
          onDelete={isAdmin ? handleDelete : undefined}
          showActions={true}
        />
      </div>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Recipe Details"
        size="lg"
      >
        {selectedRecipe && (
          <div className="space-y-4">
            <img
              src={getImageUrl(selectedRecipe.imagePath)}
              alt={selectedRecipe.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-bold">{selectedRecipe.name}</h3>
            <p className="text-green-600 font-semibold">
              {formatPrice(selectedRecipe.price)}
            </p>
            <p className="text-gray-600">{selectedRecipe.description}</p>
            <div className="flex gap-4">
              <div>
                <span className="text-sm text-gray-500">Tag:</span>
                <p className="font-medium">{selectedRecipe.tag?.name || "-"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Categories:</span>
                <p className="font-medium">
                  {selectedRecipe.category?.map((c) => c.name).join(", ") ||
                    "-"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
