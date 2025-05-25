import { Modal } from "../../../components/ui/modal";
import Badge from "../../../components/ui/badge/Badge";
import { User, Award, Calendar, CheckCircle, XCircle } from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  election: string;
  votes: number;
  status: "Active" | "Inactive";
  image: string;
}

interface ViewCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
}

const ViewCandidateModal: React.FC<ViewCandidateModalProps> = ({
  isOpen,
  onClose,
  candidate,
}) => {
  const getStatusColor = (status: string): "success" | "error" | "info" => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Candidate Details
        </h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-700">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {candidate.name}
          </h3>
          <Badge size="sm" color={getStatusColor(candidate.status)}>
            {candidate.status}
          </Badge>
        </div>

        <div className="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-white/[0.02]">
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
              <User className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {candidate.name}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
              <Calendar className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Recent Elections
              </p>
              <p className="font-medium text-gray-800 dark:text-white">
                {candidate.election}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
              <Award className="h-5 w-5 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Votes</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {candidate.votes}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/30">
              {candidate.status === "Active" ? (
                <CheckCircle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              ) : (
                <XCircle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {candidate.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewCandidateModal;
