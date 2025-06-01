import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Badge from "../../../components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import ViewCandidateModal from "./ViewCandidateModal";
import EditCandidateModal from "./EditCandidateModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface Candidate {
  _id: string;
  name: string;
  party: string;
  image: string;
  status: string;
  recentElection: string;
}

interface CandidateTableProps {
  candidates: Candidate[];
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: string) => void;
}

const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  onEdit,
  onDelete,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleViewClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCandidate) {
      onDelete(selectedCandidate._id);
    }
  };

  const handleSaveEdit = (updatedCandidate: Candidate) => {
    onEdit(updatedCandidate);
    setIsEditModalOpen(false);
  };

  const getStatusColor = (status: string): "success" | "error" | "info" => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        {candidates.length > 0 ? (
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Image
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Party
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Recent Elections
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {candidates.map((candidate) => (
                <TableRow key={candidate._id}>
                  <TableCell className="py-3">
                    <div className="flex items-center">
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {candidate.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {candidate.party}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {candidate.recentElection}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge size="sm" color={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewClick(candidate)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Candidate"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditClick(candidate)}
                        className="text-amber-500 hover:text-amber-700 transition-colors"
                        title="Edit Candidate"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(candidate)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Candidate"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <svg
                className="h-8 w-8 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-800 dark:text-white">
              No candidates found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {candidates.length === 0
                ? "There are no candidates yet. Add your first candidate to get started."
                : "No candidates match your search criteria. Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>

      {selectedCandidate && (
        <>
          <ViewCandidateModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            candidate={selectedCandidate}
          />

          <EditCandidateModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveEdit}
            candidate={selectedCandidate}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            candidateName={selectedCandidate.name}
          />
        </>
      )}
    </>
  );
};

export default CandidateTable;
