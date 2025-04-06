import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateElectionButton from "./CreateElectionButton";
import ViewElectionModal from "./ViewElectionModal";
import EditElectionModal from "./EditElectionModal";

interface Election {
  id: number;
  name: string;
  type: string;
  status: "Upcoming" | "Ongoing" | "Ended";
  totalCandidates: number;
  totalVoters: number;
  startDate: string;
  endDate: string;
  voters?: { id: string; name: string }[];
  candidates?: { id: string; name: string }[];
  results?: { candidateId: string; votes: number }[];
}

const tableData: Election[] = [
  {
    id: 1,
    name: "Student Council Election 2023",
    type: "Student",
    status: "Upcoming",
    totalCandidates: 5,
    totalVoters: 1200,
    startDate: "2023-10-15",
    endDate: "2023-10-20",
  },
  {
    id: 2,
    name: "Employee Union Election",
    type: "Employee",
    status: "Ongoing",
    totalCandidates: 3,
    totalVoters: 500,
    startDate: "2023-10-10",
    endDate: "2023-10-15",
  },
  {
    id: 3,
    name: "Department Head Election",
    type: "Employee",
    status: "Ended",
    totalCandidates: 4,
    totalVoters: 300,
    startDate: "2023-09-01",
    endDate: "2023-09-05",
  },
  {
    id: 4,
    name: "Class Representative Election",
    type: "Student",
    status: "Upcoming",
    totalCandidates: 8,
    totalVoters: 800,
    startDate: "2023-11-01",
    endDate: "2023-11-05",
  },
  {
    id: 5,
    name: "Faculty Senate Election",
    type: "Employee",
    status: "Ongoing",
    totalCandidates: 6,
    totalVoters: 150,
    startDate: "2023-10-12",
    endDate: "2023-10-18",
  },
];

export default function ElectionResults() {
  const [elections, setElections] = useState<Election[]>(tableData);
  const [selectedElection, setSelectedElection] = useState<
    Election | undefined
  >(undefined);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleViewClick = (election: Election) => {
    setSelectedElection(election);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (election: Election) => {
    setSelectedElection(election);
    setIsEditModalOpen(true);
  };

  const handleSaveElection = (electionData: any) => {
    console.log("Saving election:", electionData);

    if (electionData.id) {
      setElections((prevElections) =>
        prevElections.map((election) =>
          election.id === electionData.id
            ? { ...election, ...electionData }
            : election
        )
      );
    } else {
      const newElection: Election = {
        id:
          elections.length > 0
            ? Math.max(...elections.map((e) => e.id)) + 1
            : 1,
        name: electionData.name,
        type: electionData.type,
        status: electionData.status || "Upcoming",
        totalCandidates: electionData.candidates?.length || 0,
        totalVoters: electionData.voters?.length || 0,
        startDate: electionData.startDate || "",
        endDate: electionData.endDate || "",
      };
      setElections((prevElections) => [...prevElections, newElection]);
    }
  };

  const handleDeleteElection = (id: number) => {
    console.log("Deleting election:", id);

    setElections((prevElections) =>
      prevElections.filter((election) => election.id !== id)
    );
  };

  return (
    <div className="overflow-y-auto rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.02] sm:px-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Elections
        </h2>
        <CreateElectionButton onElectionCreated={handleSaveElection} />
      </div>

      <div className="max-w-full overflow-x-auto">
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
                className="py-3 px-8 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
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
                Total Voters
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-5 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
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
              <TableRow key={election.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {election.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-8 text-gray-500 text-theme-sm dark:text-gray-400">
                  {election.type}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      election.status === "Ended"
                        ? "success"
                        : election.status === "Ongoing"
                        ? "warning"
                        : "info"
                    }
                  >
                    {election.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-5 text-gray-500 text-theme-sm dark:text-gray-400">
                  {election.totalCandidates}
                </TableCell>
                <TableCell className="py-3 px-2 text-gray-500 text-theme-sm dark:text-gray-400">
                  {election.totalVoters}
                </TableCell>
                <TableCell className="py-3 px-5 text-gray-500 text-theme-sm dark:text-gray-400">
                  {election.startDate}
                </TableCell>
                <TableCell className="py-3 px-5 text-gray-500 text-theme-sm dark:text-gray-400">
                  {election.endDate}
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
                      className="text-amber-500 hover:text-amber-700 transition-colors"
                      title="Edit Election"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteElection(election.id)}
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
      </div>

      <ViewElectionModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        election={selectedElection || null}
      />

      <EditElectionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveElection}
        election={selectedElection || null}
      />
    </div>
  );
}
