import { Modal, Button } from "@/components/ui";
import deleteImg from "@/assets/images/no-data.svg";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete This Item ?",
  message = "Are you sure you want to delete this item? If you are sure just click on delete it.",
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex flex-col items-center text-center py-4">
        <img src={deleteImg} alt="Delete" className="h-40 w-40 mb-4" />
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-500 mt-2 max-w-xs">{message}</p>
        <Button
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
          className="mt-6"
        >
          Delete this item
        </Button>
      </div>
    </Modal>
  );
}
