import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import { AlertTriangle } from "lucide-react";
import InputField from "../../../components/form/input/InputField";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  candidateName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  candidateName,
}) => {
  const [confirmationText, setConfirmationText] = useState("");
  const isConfirmed = confirmationText.toLowerCase() === "confirm";

  const handleClose = () => {
    setConfirmationText(""); // Reset confirmation text when closing
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Delete Candidate
        </h2>
      </div>

      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-red-100 p-4 dark:bg-red-900/30">
          <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-white">
          Are you sure you want to delete this candidate?
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          This action cannot be undone. This will permanently delete the
          candidate{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            {candidateName}
          </span>
          .
        </p>
        <div className="w-full">
          <label
            htmlFor="confirmation"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Type "confirm" to enable delete button
          </label>
          <InputField
            id="confirmation"
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder="Type 'confirm'"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          className="px-4 py-2"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            onConfirm();
            handleClose();
          }}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isConfirmed}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
