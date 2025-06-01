import { useState, useEffect } from "react";
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

interface Winner {
  name: string;
  party: string;
  votesSecured: number;
}

interface Election {
  id: string;
  name: string;
  status: "pending" | "active" | "completed";
  startDate: string;
  endDate: string;
  totalCandidates: number;
  totalVotesCast: number;
  winner: Winner;
}

const ElectionResults = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          "http://localhost:5174/api/admin/elections",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Session expired. Please login again.");
          }
          throw new Error("Failed to fetch elections");
        }
        const data = await response.json();
        setElections(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  const filteredElections = elections.filter((election) =>
    election.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewResults = (electionId: string) => {
    navigate(`/electionResults/${electionId}`);
  };

  const getStatusColor = (status: string): "success" | "error" | "info" => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "info";
      case "pending":
        return "error";
      default:
        return "info";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">
          Loading elections...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 dark:text-red-400">{error}</div>
      </div>
    );
  }

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
                  Candidates
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Winner
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
                      {election.status.charAt(0).toUpperCase() +
                        election.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {election.totalVotesCast}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {election.totalCandidates}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {election.winner
                      ? `${election.winner.name} (${election.winner.party})`
                      : "No winner yet"}
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
              {elections.length === 0
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
