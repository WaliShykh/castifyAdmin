import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

interface Election {
  id: string;
  name: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  totalVotes: number;
  startDate: string;
  endDate: string;
}

const mockElections: Election[] = [
  {
    id: "1",
    name: "Student Council Election 2024",
    status: "Ongoing",
    totalVotes: 450,
    startDate: "2024-03-01T09:00:00",
    endDate: "2024-03-02T17:00:00",
  },
  {
    id: "2",
    name: "Department Head Election",
    status: "Completed",
    totalVotes: 280,
    startDate: "2024-02-15T09:00:00",
    endDate: "2024-02-16T17:00:00",
  },
  {
    id: "3",
    name: "Class Representative Election",
    status: "Completed",
    totalVotes: 150,
    startDate: "2024-01-10T09:00:00",
    endDate: "2024-01-11T17:00:00",
  },
];

const ElectionResults = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredElections = mockElections.filter((election) =>
    election.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewResults = (electionId: string) => {
    navigate(`/electionResults/${electionId}`);
  };

  const getStatusColor = (status: string): "success" | "error" | "info" => {
    switch (status) {
      case "Ongoing":
        return "success";
      case "Completed":
        return "info";
      case "Upcoming":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <div className="overflow-y-auto rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.02] sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Election Results
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View and analyze election results
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search elections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 dark:border-gray-700 dark:bg-white/[0.02] dark:text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredElections.length > 0 ? (
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
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total Votes
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
              {filteredElections.map((election) => (
                <TableRow key={election.id}>
                  <TableCell className="py-3">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {election.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge size="sm" color={getStatusColor(election.status)}>
                      {election.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {election.totalVotes}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewResults(election.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Results"
                      >
                        <Eye className="text-yellow-500" size={18} />
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-800 dark:text-white">
              No elections found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredElections.length === 0
                ? "There are no elections yet. Add your first election to get started."
                : "No elections match your search criteria. Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectionResults;
