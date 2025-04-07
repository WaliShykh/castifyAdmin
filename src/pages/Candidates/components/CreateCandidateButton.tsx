import { useState } from "react";
import Button from "../../../components/ui/button/Button";
import { Plus } from "lucide-react";
import CreateCandidateModal from "./CreateCandidateModal";

interface CreateCandidateButtonProps {
  onCandidateCreated: (candidate: any) => void;
}

const CreateCandidateButton: React.FC<CreateCandidateButtonProps> = ({
  onCandidateCreated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (candidateData: any) => {
    onCandidateCreated(candidateData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus size={16} />
        <span>Add Candidate</span>
      </Button>

      <CreateCandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default CreateCandidateButton;
