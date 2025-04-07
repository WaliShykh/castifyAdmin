import { BarChart2 } from "lucide-react";
import { useNavigate } from "react-router";

interface Election {
  id: string;
  name: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  totalVotes: number;
  startDate: string;
  endDate: string;
}

interface ElectionResultsTableProps {
  elections: Election[];
}

const ElectionResultsTable: React.FC<ElectionResultsTableProps> = ({
  elections,
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Election Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Votes
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {elections.map((election) => (
            <tr key={election.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {election.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    election.status
                  )}`}
                >
                  {election.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {election.totalVotes}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => navigate(`/election-results/${election.id}`)}
                  className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-2"
                >
                  <BarChart2 size={18} />
                  <span>View Results</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {elections.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No elections found</div>
        </div>
      )}
    </div>
  );
};

export default ElectionResultsTable;
