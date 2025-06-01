import { Modal } from "../../../components/ui/modal";
import Badge from "../../../components/ui/badge/Badge";
import { format } from "date-fns";
import { Users, UserCheck, Clock } from "lucide-react";

interface Election {
  id: number;
  name: string;
  status: "Upcoming" | "Ongoing" | "Ended";
  totalCandidates: number;
  totalVoters: number;
  startDate: string;
  endDate: string;
  voters?: { id: string; name: string }[];
  candidates?: { id: string; name: string }[];
  results?: { candidateId: string; votes: number }[];
}

interface ViewElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  election: Election | null;
}

const ViewElectionModal: React.FC<ViewElectionModalProps> = ({
  isOpen,
  onClose,
  election,
}) => {
  if (!election) return null;

  const voters = election.voters || [
    { id: "v1", name: "John Doe" },
    { id: "v2", name: "Jane Smith" },
    { id: "v3", name: "Robert Johnson" },
    { id: "v4", name: "Emily Davis" },
    { id: "v5", name: "Michael Wilson" },
  ];

  const candidates = election.candidates || [
    { id: "c1", name: "Alice Brown" },
    { id: "c2", name: "Bob Green" },
    { id: "c3", name: "Carol White" },
    { id: "c4", name: "David Black" },
  ];

  const results =
    election.results ||
    (election.status === "Ended"
      ? [
          { candidateId: "c1", votes: 120 },
          { candidateId: "c2", votes: 85 },
          { candidateId: "c3", votes: 95 },
          { candidateId: "c4", votes: 110 },
        ]
      : []);

  const formattedStartDate = election.startDate
    ? format(new Date(election.startDate), "MMM dd, yyyy hh:mm a")
    : "Not set";

  const formattedEndDate = election.endDate
    ? format(new Date(election.endDate), "MMM dd, yyyy hh:mm a")
    : "Not set";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "info";
      case "Ongoing":
        return "warning";
      case "Ended":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Election Details
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View complete information about this election
        </p>
      </div>

      <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-6">
          <div className="bg-white dark:bg-white/[0.02] shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {election.name}
                </h3>
                <Badge size="sm" color={getStatusColor(election.status)}>
                  {election.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Start Date
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {formattedStartDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <Clock className="h-5 w-5 text-red-500 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      End Date
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {formattedEndDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Users className="h-5 w-5 text-green-500 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Voters
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {election.totalVoters}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <UserCheck className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Candidates
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {election.totalCandidates}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/[0.02] shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 p-5">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Status Timeline
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    election.status !== "Upcoming"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  } text-white shadow-md`}
                >
                  <span className="text-sm">1</span>
                </div>
                <p className="text-xs mt-2 dark:text-white font-medium">
                  Created
                </p>
              </div>
              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 mx-2"></div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    election.status === "Ongoing" || election.status === "Ended"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  } text-white shadow-md`}
                >
                  <span className="text-sm">2</span>
                </div>
                <p className="text-xs mt-2 dark:text-white font-medium">
                  Ongoing
                </p>
              </div>
              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 mx-2"></div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    election.status === "Ended" ? "bg-green-500" : "bg-gray-300"
                  } text-white shadow-md`}
                >
                  <span className="text-sm">3</span>
                </div>
                <p className="text-xs mt-2 dark:text-white font-medium">
                  Ended
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white h-[300px] overflow-y-auto dark:bg-white/[0.02] shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Voters List
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr key="voters-header">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {voters.map((voter) => (
                    <tr
                      key={`voter-${voter.id}`}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {voter.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                        {voter.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-white/[0.02] shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Candidates List
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr key="candidates-header">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {candidates.map((candidate) => (
                    <tr
                      key={`candidate-${candidate.id}`}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {candidate.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                        {candidate.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {election.status === "Ended" && (
            <div className="bg-white dark:bg-white/[0.02] shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Election Results
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr key="results-header">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Votes
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {results.map((result) => {
                      const candidate = candidates.find(
                        (c) => c.id === result.candidateId
                      );
                      const totalVotes = results.reduce(
                        (sum, r) => sum + r.votes,
                        0
                      );
                      const percentage =
                        totalVotes > 0
                          ? ((result.votes / totalVotes) * 100).toFixed(1)
                          : 0;

                      return (
                        <tr
                          key={`result-${result.candidateId}`}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                            {candidate?.name || "Unknown"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                            {result.votes}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                            {percentage}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewElectionModal;
