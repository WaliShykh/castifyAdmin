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
import ViewVoterModal from "./ViewVoterModal";
import EditVoterModal from "./EditVoterModal";

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

interface VoterTableProps {
  voters: Voter[];
  onEdit?: (voter: Voter) => void;
  onDelete?: (id: string) => void;
}

const VoterTable: React.FC<VoterTableProps> = ({
  voters,
  onEdit,
  onDelete,
}) => {
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleViewVoter = (voter: Voter) => {
    setSelectedVoter(voter);
    setIsViewModalOpen(true);
  };

  const handleEditVoter = (voter: Voter) => {
    setSelectedVoter(voter);
    setIsEditModalOpen(true);
  };

  const handleDeleteVoter = (voterId: string) => {
    if (window.confirm("Are you sure you want to delete this voter?")) {
      if (onDelete) {
        onDelete(voterId);
      } else {
        console.log("Deleting voter:", voterId);
      }
    }
  };

  const handleSaveEdit = (updatedVoter: Voter) => {
    if (onEdit) {
      onEdit(updatedVoter);
    }
    setIsEditModalOpen(false);
  };

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
    <>
      <div className="overflow-x-auto">
        {voters.length > 0 ? (
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  S.No
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
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  CNIC/ID
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Assigned Election
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
              {voters.map((voter) => (
                <TableRow key={voter.id}>
                  <TableCell className="py-3">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {voter.serialNo}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {voter.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {voter.email}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {voter.cnic}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {voter.electionName}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge size="sm" color={getStatusColor(voter.status)}>
                      {voter.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewVoter(voter)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Voter"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditVoter(voter)}
                        className="text-amber-500 hover:text-amber-700 transition-colors"
                        title="Edit Voter"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteVoter(voter.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Voter"
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
              No voters found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {voters.length === 0
                ? "There are no voters yet. Add your first voter to get started."
                : "No voters match your search criteria. Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>

      {selectedVoter && (
        <>
          <ViewVoterModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            voter={selectedVoter}
          />
          <EditVoterModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            voter={selectedVoter}
            onSave={handleSaveEdit}
          />
        </>
      )}
    </>
  );
};

export default VoterTable;
