import { useState } from "react";
import { useParams } from "react-router";
import { Download } from "lucide-react";
import Badge from "../../../components/ui/badge/Badge";
import Chart from "react-apexcharts";

interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
  votes: number;
  percentage: number;
  isWinner: boolean;
}

interface ElectionData {
  id: string;
  name: string;
  status: "Ongoing" | "Completed";
  totalVotes: number;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
}

const mockElectionData: Record<string, ElectionData> = {
  "1": {
    id: "1",
    name: "Student Council Election 2024",
    status: "Completed",
    totalVotes: 450,
    startDate: "2024-03-01T09:00:00",
    endDate: "2024-03-02T17:00:00",
    candidates: [
      {
        id: "1",
        name: "John Smith",
        party: "Progressive Party",
        symbol: "🌟",
        votes: 180,
        percentage: 40,
        isWinner: true,
      },
      {
        id: "2",
        name: "Emily Johnson",
        party: "Student Unity",
        symbol: "🎓",
        votes: 150,
        percentage: 33.33,
        isWinner: false,
      },
      {
        id: "3",
        name: "Michael Brown",
        party: "Campus Alliance",
        symbol: "📚",
        votes: 120,
        percentage: 26.67,
        isWinner: false,
      },
    ],
  },
};

const ElectionResultView = () => {
  const { id } = useParams<{ id: string }>();
  //@ts-ignore
  const [election, setElection] = useState<ElectionData | null>(
    id && mockElectionData[id] ? mockElectionData[id] : null
  );

  const winner = election?.candidates.find((candidate) => candidate.isWinner);

  const chartOptions = {
    chart: {
      type: "pie" as const,
      fontFamily: "Outfit, sans-serif",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 800 },
      },
      toolbar: {
        show: true,
        offsetX: -50,
        offsetY: -45,
      },
    },
    labels: election?.candidates.map((c) => c.name) || [],
    colors: ["#4F46E5", "#14B8A6", "#FACC15", "#EF4444"],
    legend: {
      show: true,
      position: "bottom" as const,
      fontSize: "12px",
      itemMargin: { horizontal: 10, vertical: 10 },
      fontWeight: 300,
      offsetY: 20,
      labels: {
        colors: ["#6B7280"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: "light" as const,
      style: {
        fontSize: "12px",
      },
    },
    stroke: {
      width: 0,
      colors: ["#fff"],
    },
    fill: {
      type: "color" as const,
    },
  };

  if (!election) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Election not found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl dark:text-white font-semibold">
            {election.name}
          </h1>
          <button
            onClick={() => alert("Downloading results...")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <Download size={18} className="mr-2" />
            Download Results
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-white/[0.02] p-4 rounded-lg shadow">
            <div className="text-sm mb-4 ml-1 dark:text-white text-gray-500">
              Status
            </div>
            <Badge
              size="sm"
              color={election.status === "Completed" ? "success" : "info"}
            >
              {election.status}
            </Badge>
          </div>
          <div className="bg-white dark:bg-white/[0.02] p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 dark:text-yellow-500">
              Total Votes Cast
            </div>
            <div className="mt-1 dark:text-white text-xl font-semibold">
              {election.totalVotes}
            </div>
          </div>
          <div className="bg-white dark:bg-white/[0.02] p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 dark:text-yellow-500">
              Start Date
            </div>
            <div className="mt-1 dark:text-white text-sm">
              {new Date(election.startDate).toLocaleDateString()}
            </div>
          </div>
          <div className="bg-white dark:bg-white/[0.02] p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 dark:text-yellow-500">
              End Date
            </div>
            <div className="mt-1 dark:text-white text-sm">
              {new Date(election.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        {winner && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">Winner</h2>
                <div className="text-2xl font-bold mb-2">{winner.name}</div>
                <div className="text-sm opacity-90 mb-1">{winner.party}</div>
                <div className="text-3xl mb-4">{winner.symbol}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm opacity-75">Votes Secured</div>
                    <div className="text-xl font-semibold">{winner.votes}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Winning Percentage</div>
                    <div className="text-xl font-semibold">
                      {winner.percentage.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-8xl opacity-25">👑</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-white/[0.02] p-6 rounded-lg shadow">
            <h2 className="text-lg dark:text-white font-semibold mb-4">
              Vote Distribution
            </h2>
            <div className="w-full flex flex-col items-center">
              <Chart
                options={chartOptions}
                series={election.candidates.map((c) => c.percentage)}
                type="pie"
                width="400"
              />
            </div>
          </div>
          <div className="bg-white dark:bg-white/[0.02] p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold dark:text-white mb-4">
              Candidate Results
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {election.candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm dark:text-white font-medium text-gray-900">
                          {candidate.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {candidate.votes}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {candidate.percentage.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {candidate.isWinner ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Winner
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Runner-up
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionResultView;
