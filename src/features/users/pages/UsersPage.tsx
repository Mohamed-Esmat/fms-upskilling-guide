import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/layout";
import {
  DataTable,
  TableHeader,
  TableFilters,
  DeleteConfirmationModal,
} from "@/components/shared";
import { Modal, Avatar } from "@/components/ui";
import { useUsers, useDeleteUser } from "../hooks";
import { formatDate, getImageUrl, getInitials } from "@/lib/utils";
import type { User } from "@/types";
import noDataImg from "@/assets/images/no-data.svg";

export function UsersPage() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // API queries
  const { data: usersData, isLoading } = useUsers({
    pageNumber: currentPage,
    pageSize: 10,
    userName: searchQuery || undefined,
  });

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  // Table columns
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "userName",
        header: "User Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar
              src={
                row.original.imagePath
                  ? getImageUrl(row.original.imagePath)
                  : undefined
              }
              fallback={getInitials(row.original.userName)}
              size="sm"
            />
            <span>{row.original.userName}</span>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
      },
      {
        accessorKey: "group",
        header: "Role",
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              row.original.group.name === "SuperAdmin"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {row.original.group.name === "SuperAdmin" ? "Admin" : "User"}
          </span>
        ),
      },
    ],
    []
  );

  // Handlers
  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        },
      });
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <PageHeader
        title="Users"
        highlightedText="List"
        description="You can now view and manage all users in the system"
      />

      <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6">
        <TableHeader
          title="User Table Details"
          subtitle="You can check all details"
        />

        <TableFilters
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search by name..."
        />

        <DataTable
          columns={columns}
          data={usersData?.data || []}
          pageCount={usersData?.totalNumberOfPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
          emptyMessage="No users found."
          emptyImage={noDataImg}
          onView={handleView}
          onDelete={handleDelete}
          showActions={true}
        />
      </div>

      {/* View User Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="User Details"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar
                src={
                  selectedUser.imagePath
                    ? getImageUrl(selectedUser.imagePath)
                    : undefined
                }
                fallback={getInitials(selectedUser.userName)}
                size="lg"
              />
              <div>
                <h3 className="text-xl font-bold">{selectedUser.userName}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedUser.group.name === "SuperAdmin"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {selectedUser.group.name === "SuperAdmin" ? "Admin" : "User"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Email</span>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Country</span>
                <p className="font-medium">{selectedUser.country}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone Number</span>
                <p className="font-medium">{selectedUser.phoneNumber}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Created</span>
                <p className="font-medium">
                  {formatDate(selectedUser.creationDate)}
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
