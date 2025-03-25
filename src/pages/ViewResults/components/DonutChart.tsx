import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface VoteDistributionChartProps {
  candidates: { name: string; percentage: number }[];
}

const VoteDistributionChart = ({ candidates }: VoteDistributionChartProps) => {
  // Extract names and percentages from the array
  const candidateNames = candidates.map((candidate) => candidate.name);
  const votePercentages = candidates.map((candidate) => candidate.percentage);

  // ApexCharts configuration (Modern & Interactive)
  const options: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Outfit, sans-serif",
      animations: {
        enabled: true,
        speed: 800,
      },
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    labels: candidateNames,
    colors: ["#7366FF", "#FF66A1", "#FF00A1"], // Distinct colors for 3 candidates
    legend: {
      show: true,
      position: "bottom",
      fontSize: "12px",
      itemMargin: { horizontal: 10, vertical: 10 },
      fontWeight: 300,
      labels: {
        colors: ["#6B7280"], // Subtle gray
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: "light",

      style: {
        fontSize: "14px",
      },
    },
    stroke: {
      width: 0,
      colors: ["#fff"],
    },
    fill: {
      type: "color",
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
        Results
      </h4>
      <Chart
        options={options}
        series={votePercentages}
        type="pie"
        width="380"
      />
    </div>
  );
};

export default VoteDistributionChart;
