import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Form from "../../../components/form/Form";
import InputField from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { X } from "lucide-react";

interface ElectionType {
  value: string;
  label: string;
}

interface ElectionTypePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddType: (type: ElectionType) => void;
}

const ElectionTypePopup: React.FC<ElectionTypePopupProps> = ({
  isOpen,
  onClose,
  onAddType,
}) => {
  const [typeLabel, setTypeLabel] = useState("");
  const [typeValue, setTypeValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeLabel && typeValue) {
      const newType = {
        value: typeValue.toLowerCase().replace(/\s+/g, "_"),
        label: typeLabel,
      };

      onAddType(newType);
      setTypeLabel("");
      setTypeValue("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Add Election Type
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Create a new election type
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Type Name
          </label>
          <InputField
            type="text"
            name="typeLabel"
            placeholder="Enter type name (e.g. Student Council)"
            value={typeLabel}
            onChange={(e) => setTypeLabel(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Type Value
          </label>
          <InputField
            type="text"
            name="typeValue"
            placeholder="Enter type value (e.g. student_council)"
            value={typeValue}
            onChange={(e) => setTypeValue(e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            This will be used as the internal identifier
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Type</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ElectionTypePopup;
