import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import CreateElectionButton from "./CreateElectionButton";
import ViewElectionModal from "./ViewElectionModal";
import EditElectionModal from "./EditElectionModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import axios from "axios";
import { format } from "date-fns";

interface Candidate {
  _id: string;
  name: string;
}

interface Election {
  _id: string;
  name: string;
  status: "pending" | "active" | "completed";
  candidates: Candidate[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  assignedVoters: string[];
  totalCandidates: number;
  totalVoters: number;
}

export default function ElectionTable() {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(
    null
  );
  const [modalState, setModalState] = useState({
    view: false,
    edit: false,
    delete: false,
  });
  const [electionToDelete, setElectionToDelete] = useState<Election | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  //@ts-ignore
  const [error, setError] = useState<string | null>(null);

  // Reset all modal states
  const resetModalState = () => {
    setModalState({
      view: false,
      edit: false,
      delete: false,
    });
    setSelectedElection(null);
    setElectionToDelete(null);
    setError(null);
  };

  const fetchElections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5174/api/elections", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setElections(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch elections");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const handleViewClick = (election: Election) => {
    resetModalState(); // Reset all modal states first
    // Transform API election to view modal format
    const viewElection = {
      id: parseInt(election._id),
      name: election.name,
      status: mapApiStatusToUiStatus(election.status),
      totalCandidates: election.totalCandidates,
      totalVoters: election.totalVoters,
      startDate: election.startDate,
      endDate: election.endDate,
      candidates: election.candidates.map((c) => ({ id: c._id, name: c.name })),
      voters: election.assignedVoters.map((id) => ({
        id,
        name: `Voter ${id}`,
      })),
      results: [],
    };
    setSelectedElection(viewElection as any);
    setModalState((prev) => ({ ...prev, view: true }));
  };

  const handleEditClick = (election: Election) => {
    resetModalState(); // Reset all modal states first
    // Transform API election to edit modal format
    const editElection = {
      _id: election._id,
      name: election.name,
      status: mapApiStatusToUiStatus(election.status),
      totalCandidates: election.totalCandidates,
      totalVoters: election.totalVoters,
      startDate: election.startDate,
      endDate: election.endDate,
      type: "Election",
      candidates: election.candidates.map((c) => c._id),
    };
    setSelectedElection(editElection as any);
    setModalState((prev) => ({ ...prev, edit: true }));
  };

  const handleDeleteClick = (election: Election) => {
    resetModalState(); // Reset all modal states first
    setElectionToDelete(election);
    setModalState((prev) => ({ ...prev, delete: true }));
  };

  const handleDeleteConfirm = async () => {
    if (electionToDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:5174/api/elections/${electionToDelete._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await fetchElections();
        resetModalState();
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete election");
      }
    }
  };

  const handleSaveElection = async (electionData: any) => {
    try {
      const token = localStorage.getItem("token");
      if (electionData._id) {
        // Update existing election
        await axios.put(
          `http://localhost:5174/api/elections/${electionData._id}`,
          electionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new election
        await axios.post("http://localhost:5174/api/elections", electionData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      await fetchElections();
      resetModalState();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save election");
    }
  };

  const mapApiStatusToUiStatus = (
    status: string
  ): "Upcoming" | "Ongoing" | "Ended" => {
    switch (status) {
      case "pending":
        return "Upcoming";
      case "active":
        return "Ongoing";
      case "completed":
        return "Ended";
      default:
        return "Upcoming";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "info";
      case "active":
        return "warning";
      case "completed":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <div className="overflow-y-auto rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.02] sm:px-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Elections
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchElections}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
            title="Refresh elections list"
          >
            Refresh
          </button>
          <CreateElectionButton onElectionCreated={handleSaveElection} />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-4">Loading elections...</div>
        ) : (
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Election Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-6 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total Candidates
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Start Date
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-5 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  End Date
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-8 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {elections.map((election) => (
                <TableRow key={election._id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {election.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-3 px-4 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={getStatusColor(election.status)}>
                      {mapApiStatusToUiStatus(election.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-5 text-gray-500 text-theme-sm dark:text-gray-400">
                    {election.totalCandidates}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {format(
                      new Date(election.startDate),
                      "MMM dd, yyyy hh:mm a"
                    )}
                  </TableCell>
                  <TableCell className="py-3 px-5 text-gray-500 text-theme-sm dark:text-gray-400">
                    {format(new Date(election.endDate), "MMM dd, yyyy hh:mm a")}
                  </TableCell>
                  <TableCell className="py-3 px-8 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewClick(election)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Election"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditClick(election)}
                        className="text-yellow-500 hover:text-yellow-700 transition-colors"
                        title="Edit Election"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(election)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Election"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ViewElectionModal
        isOpen={modalState.view}
        onClose={() => resetModalState()}
        election={selectedElection as any}
      />

      <EditElectionModal
        isOpen={modalState.edit}
        onClose={() => resetModalState()}
        onSave={handleSaveElection}
        election={selectedElection as any}
      />

      <DeleteConfirmationModal
        isOpen={modalState.delete}
        onClose={() => resetModalState()}
        onConfirm={handleDeleteConfirm}
        electionName={electionToDelete?.name || ""}
      />
    </div>
  );
}
