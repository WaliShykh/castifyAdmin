import { useState } from "react";
import Button from "../../../components/ui/button/Button";
import { Plus } from "lucide-react";
import CreateElectionModal from "./CreateElectionModal";

interface CreateElectionButtonProps {
  onElectionCreated: (electionData: any) => void;
}

const CreateElectionButton: React.FC<CreateElectionButtonProps> = ({
  onElectionCreated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (electionData: any) => {
    onElectionCreated(electionData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus size={16} />
        Create Election
      </Button>

      <CreateElectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default CreateElectionButton;
