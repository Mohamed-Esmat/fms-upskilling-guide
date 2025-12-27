import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageHeader } from "@/components/layout";
import {
  DataTable,
  TableHeader,
  TableFilters,
  DeleteConfirmationModal,
} from "@/components/shared";
import { Modal, Input, Button } from "@/components/ui";
import {
  useCategoriesList,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../hooks";
import { formatDate } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";
import type { CategoryFormValues } from "@/lib/validations";
import type { Category } from "@/types";
import noDataImg from "@/assets/images/no-data.svg";

export function CategoriesPage() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // API queries
  const { data: categoriesData, isLoading } = useCategoriesList({
    pageNumber: currentPage,
    pageSize: 10,
    name: searchQuery || undefined,
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  // Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  // Table columns
  const columns: ColumnDef<Category>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "creationDate",
        header: "Creation Date",
        cell: ({ row }) => formatDate(row.original.creationDate),
      },
      {
        accessorKey: "modificationDate",
        header: "Modification Date",
        cell: ({ row }) => formatDate(row.original.modificationDate),
      },
    ],
    []
  );

  // Handlers
  const handleAddClick = () => {
    reset({ name: "" });
    setIsAddModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setValue("name", category.name);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = (data: CategoryFormValues) => {
    createCategory(data, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        reset();
      },
    });
  };

  const handleEditSubmit = (data: CategoryFormValues) => {
    if (selectedCategory) {
      updateCategory(
        { id: selectedCategory.id, data },
        {
          onSuccess: () => {
            setIsEditModalOpen(false);
            setSelectedCategory(null);
            reset();
          },
        }
      );
    }
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        highlightedText="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <div className="bg-white rounded-2xl p-6">
        <TableHeader
          title="Category Table Details"
          subtitle="You can check all details"
          buttonLabel="Add New Category"
          onButtonClick={handleAddClick}
        />

        <TableFilters
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search here..."
        />

        <DataTable
          columns={columns}
          data={categoriesData?.data || []}
          pageCount={categoriesData?.totalNumberOfPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
          emptyMessage="No categories found. Click 'Add New Category' to create one."
          emptyImage={noDataImg}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
        />
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Category"
        size="md"
      >
        <form onSubmit={handleSubmit(handleAddSubmit)} className="space-y-4">
          <Input
            label="Category Name"
            placeholder="Enter category name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Button type="submit" isLoading={isCreating} className="w-full">
            Add Category
          </Button>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Category"
        size="md"
      >
        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
          <Input
            label="Category Name"
            placeholder="Enter category name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Button type="submit" isLoading={isUpdating} className="w-full">
            Update Category
          </Button>
        </form>
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
