import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Download } from "lucide-react";
import Badge from "../../../components/ui/badge/Badge";
import Chart from "react-apexcharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Candidate {
  candidateId: string;
  name: string;
  party: string;
  image: string;
  votesSecured: number;
  percentage: number;
  status: string;
}

interface Winner {
  name: string;
  party: string;
  image: string;
  votesSecured: number;
  winningPercentage: number;
  status: string;
}

interface RunnerUp {
  name: string;
  party: string;
  image: string;
  votesSecured: number;
  percentage: number;
  status: string;
}

interface ElectionData {
  election: {
    id: string;
    name: string;
    status: "pending" | "active" | "completed";
    startDate: string;
    endDate: string;
    totalVotesCast: number;
  };
  winner: Winner;
  runnerUp: RunnerUp;
  candidates: Candidate[];
}

const ElectionResultView = () => {
  const { id } = useParams<{ id: string }>();
  const [electionData, setElectionData] = useState<ElectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchElectionResults = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `http://localhost:5174/api/admin/elections/${id}/results`,
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
          throw new Error("Failed to fetch election results");
        }

        const data = await response.json();
        setElectionData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchElectionResults();
    }
  }, [id]);

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
    labels: electionData?.candidates.map((c) => c.name) || [],
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

  const handleDownloadPDF = async () => {
    if (!contentRef.current || !electionData) return;

    try {
      setDownloading(true);

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Add title
      pdf.setFontSize(20);
      pdf.text("Election Results", pageWidth / 2, 20, { align: "center" });

      // Add election name
      pdf.setFontSize(16);
      pdf.text(electionData.election.name, pageWidth / 2, 30, {
        align: "center",
      });

      // Add election details
      pdf.setFontSize(12);
      const details = [
        `Status: ${
          electionData.election.status.charAt(0).toUpperCase() +
          electionData.election.status.slice(1)
        }`,
        `Total Votes Cast: ${electionData.election.totalVotesCast}`,
        `Start Date: ${new Date(
          electionData.election.startDate
        ).toLocaleDateString()}`,
        `End Date: ${new Date(
          electionData.election.endDate
        ).toLocaleDateString()}`,
      ];

      details.forEach((detail, index) => {
        pdf.text(detail, 20, 45 + index * 10);
      });

      // Add winner information
      if (electionData.winner) {
        pdf.setFontSize(14);
        pdf.text("Winner", 20, 90);
        pdf.setFontSize(12);

        // Add winner image if available
        try {
          const img = new Image();
          img.src = electionData.winner.image;
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails to load
          });

          if (img.complete) {
            const imgWidth = 30;
            const imgHeight = 30;
            pdf.addImage(img, "JPEG", 20, 95, imgWidth, imgHeight);
          }
        } catch (err) {
          console.error("Error loading winner image:", err);
        }

        const winnerDetails = [
          `Name: ${electionData.winner.name}`,
          `Party: ${electionData.winner.party}`,
          `Votes Secured: ${electionData.winner.votesSecured}`,
          `Winning Percentage: ${electionData.winner.winningPercentage.toFixed(
            2
          )}%`,
        ];

        winnerDetails.forEach((detail, index) => {
          pdf.text(detail, 60, 100 + index * 10);
        });
      }

      // Add candidate results table
      pdf.setFontSize(14);
      pdf.text("Candidate Results", 20, 140);

      // Table headers
      const headers = ["Candidate", "Party", "Votes", "Percentage", "Status"];
      const startX = 20;
      let startY = 150;
      const colWidth = 38;

      // Add headers
      pdf.setFontSize(12);
      headers.forEach((header, i) => {
        pdf.text(header, startX + i * colWidth, startY);
      });

      // Add candidate data
      startY += 10;
      pdf.setFontSize(10);
      electionData.candidates.forEach((candidate) => {
        // Check if we need a new page
        if (startY > 270) {
          pdf.addPage();
          startY = 20;
        }

        pdf.text(candidate.name, startX, startY);
        pdf.text(candidate.party, startX + colWidth, startY);
        pdf.text(
          candidate.votesSecured.toString(),
          startX + colWidth * 2,
          startY
        );
        pdf.text(
          `${candidate.percentage.toFixed(2)}%`,
          startX + colWidth * 3,
          startY
        );
        pdf.text(candidate.status, startX + colWidth * 4, startY);
        startY += 10;
      });

      // Add pie chart
      try {
        const chartElement = document.querySelector(".apexcharts-canvas");
        if (chartElement) {
          const canvas = await html2canvas(chartElement as HTMLElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
          });

          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 100;
          const imgHeight = 100;

          // Add chart on a new page
          pdf.addPage();
          pdf.text("Vote Distribution", pageWidth / 2, 20, { align: "center" });
          pdf.addImage(
            imgData,
            "PNG",
            (pageWidth - imgWidth) / 2,
            30,
            imgWidth,
            imgHeight
          );
        }
      } catch (err) {
        console.error("Error adding chart to PDF:", err);
      }

      // Save the PDF
      pdf.save(
        `${electionData.election.name.replace(/\s+/g, "_")}_results.pdf`
      );
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">
          Loading election results...
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

  if (!electionData) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Election not found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6" ref={contentRef}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl dark:text-white font-semibold">
            {electionData.election.name}
          </h1>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} className="mr-2" />
            {downloading ? "Generating PDF..." : "Download Results"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-white/[0.02] p-4 rounded-lg shadow">
            <div className="text-sm mb-4 ml-1 dark:text-white text-gray-500">
              Status
            </div>
            <Badge
              size="sm"
              color={
                electionData.election.status === "completed"
                  ? "success"
                  : "info"
              }
            >
              {electionData.election.status.charAt(0).toUpperCase() +
                electionData.election.status.slice(1)}
            </Badge>
          </div>
          <div className="bg-white dark:bg-white/[0.02] p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 dark:text-yellow-500">
              Total Votes Cast
            </div>
            <div className="mt-1 dark:text-white text-xl font-semibold">
              {electionData.election.totalVotesCast}
            </div>
          </div>
          <div className="bg-white dark:bg-white/[0.02] p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 dark:text-yellow-500">
              Start Date
            </div>
            <div className="mt-1 dark:text-white text-sm">
              {new Date(electionData.election.startDate).toLocaleDateString()}
            </div>
          </div>
          <div className="bg-white dark:bg-white/[0.02] p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 dark:text-yellow-500">
              End Date
            </div>
            <div className="mt-1 dark:text-white text-sm">
              {new Date(electionData.election.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        {electionData.winner && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">Winner</h2>
                <div className="text-2xl font-bold mb-2">
                  {electionData.winner.name}
                </div>
                <div className="text-sm opacity-90 mb-1">
                  {electionData.winner.party}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm opacity-75">Votes Secured</div>
                    <div className="text-xl font-semibold">
                      {electionData.winner.votesSecured}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Winning Percentage</div>
                    <div className="text-xl font-semibold">
                      {electionData.winner.winningPercentage.toFixed(2)}%
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
                series={electionData.candidates.map((c) => c.percentage)}
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
                      Party
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
                  {electionData.candidates.map((candidate) => (
                    <tr key={candidate.candidateId}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={candidate.image}
                              alt={candidate.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {candidate.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {candidate.party}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {candidate.votesSecured}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {candidate.percentage.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          size="sm"
                          color={
                            candidate.status === "Winner" ? "success" : "info"
                          }
                        >
                          {candidate.status}
                        </Badge>
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
