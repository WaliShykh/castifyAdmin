import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../../../components/ui/button/Button";
import AddVoterModal from "./AddVoterModal";

const AddVoterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        className="flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={16} />
        Add Voter
      </Button>

      <AddVoterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AddVoterButton;
