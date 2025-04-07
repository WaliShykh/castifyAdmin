import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface Candidate {
  name: string;
  votes: number;
  percentage: number;
}

interface ResultsChartProps {
  candidates: Candidate[];
}

const ResultsChart: React.FC<ResultsChartProps> = ({ candidates }) => {
  const candidateNames = candidates.map((candidate) => candidate.name);
  const votePercentages = candidates.map((candidate) => candidate.percentage);

  const options: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Outfit, sans-serif",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 800 },
      },
      toolbar: {
        show: true,
        offsetX: -50,
        offsetY: -105,
      },
    },
    labels: candidateNames,
    colors: ["#4F46E5", "#7C3AED", "#EC4899", "#8B5CF6"],
    legend: {
      show: true,
      position: "bottom",
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
      theme: "light",
      style: {
        fontSize: "12px",
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
      <Chart
        options={options}
        series={votePercentages}
        type="pie"
        width="400"
      />
    </div>
  );
};

export default ResultsChart;
