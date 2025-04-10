import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Badge from "../../../components/ui/badge/Badge";

interface Voter {
  id: string;
  serialNo: string;
  name: string;
  email: string;
  cnic: string;
  electionId: string;
  electionName: string;
  status: string;
}

interface ViewVoterModalProps {
  isOpen: boolean;
  onClose: () => void;
  voter: Voter;
}

const ViewVoterModal: React.FC<ViewVoterModalProps> = ({
  isOpen,
  onClose,
  voter,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Voter Details
          </h5>
        </div>

        <div className="px-2">
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                Serial Number
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {voter.serialNo}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                Status
              </p>
              <Badge
                variant="light"
                color={voter.status === "Active" ? "success" : "error"}
              >
                {voter.status}
              </Badge>
            </div>

            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {voter.name}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {voter.email}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                CNIC/ID
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {voter.cnic}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                Assigned Election
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {voter.electionName}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-2 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewVoterModal;
