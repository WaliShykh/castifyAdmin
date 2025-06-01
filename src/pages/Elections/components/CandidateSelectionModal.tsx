import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import InputField from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

interface Candidate {
  value: string;
  text: string;
}

interface CandidateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedCandidates: string[]) => void;
  candidates: Candidate[];
  defaultSelected?: string[];
}

// MongoDB ObjectId validation regex
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const CandidateSelectionModal: React.FC<CandidateSelectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  candidates,
  defaultSelected = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>(
    defaultSelected.filter((id) => objectIdRegex.test(id))
  );
  const [error, setError] = useState<string | null>(null);

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (value: string) => {
    if (!objectIdRegex.test(value)) {
      setError("Invalid candidate ID format");
      return;
    }
    setError(null);
    setSelectedCandidates((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSave = () => {
    // Validate all selected candidates before saving
    const invalidCandidates = selectedCandidates.filter(
      (id) => !objectIdRegex.test(id)
    );

    if (invalidCandidates.length > 0) {
      setError("All candidate IDs must be valid MongoDB ObjectIds");
      return;
    }

    onSave(selectedCandidates);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Select Candidates
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Search and select candidates for the election
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <InputField
          type="text"
          placeholder="Search candidates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="max-h-[400px] overflow-y-auto border rounded-lg">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.value}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                selectedCandidates.includes(candidate.value)
                  ? "bg-primary/10"
                  : ""
              }`}
              onClick={() => handleSelect(candidate.value)}
            >
              <div className="flex items-center justify-center w-5 h-5 mr-3 border rounded">
                {selectedCandidates.includes(candidate.value) && (
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {candidate.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Selection
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CandidateSelectionModal;
