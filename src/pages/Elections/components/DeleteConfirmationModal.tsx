import { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import InputField from "../../../components/form/input/InputField";
import Alert from "../../../components/ui/alert/Alert";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  electionName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  electionName,
}) => {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText.toLowerCase() === "confirm";

  // Reset confirm text when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setConfirmText("");
    }
  }, [isOpen]);

  const handleClose = () => {
    setConfirmText("");
    onClose();
  };

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm();
      setConfirmText("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Delete Election
        </h2>
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete the election{" "}
          <span className="font-bold italic">"{electionName}"</span>?
        </p>
      </div>
      <Alert
        variant="error"
        title="Warning!"
        message="This action cannot be undone"
        showLink={false}
      />
      <div className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Type "confirm" to proceed
          </label>
          <InputField
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type confirm"
            className="w-full"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            className={`${
              isConfirmed
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            } text-white`}
            onClick={handleConfirm}
            disabled={!isConfirmed}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
