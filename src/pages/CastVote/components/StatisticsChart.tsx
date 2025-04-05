import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import { candidates, generateMonthlyData } from "../data/candidates";

export default function StatisticsChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const monthlyData = generateMonthlyData(candidates);
      setChartData(monthlyData);
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    legend: {
      show: false,
    },
    colors: [
      "#4F46E5",
      "#14B8A6",
      "#EF4444",
      "#FACC15",

      "#6366F1",
      "#2DD4BF",
      "#F87171",
      "#FDE047",

      "#4338CA",
      "#0F766E",
      "#B91C1C",
      "#CA8A04",
    ],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 4,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val.toLocaleString() + " votes";
        },
      },
    },
    xaxis: {
      title: {
        text: "Vote Count",
        style: {
          fontSize: "14px",
          fontWeight: 500,
        },
      },

      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: function (val) {
          return val.toLocaleString();
        },
      },
      title: {
        text: "Votes",
        style: {
          fontSize: "14px",
          fontWeight: 500,
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Candidate Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Vote distribution for each candidate
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          {chartData.length > 0 ? (
            <Chart
              options={options}
              series={chartData}
              type="area"
              height={310}
            />
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
              <div className="flex flex-col mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                  <div className="flex gap-x-4 justify-center items-center">
                    <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#4F46E5] border-r-[#14B8A6] border-b-[#FACC15] border-l-[#EF4444] animate-spin bg-transparent duration-700 ease-linear"></div>
                    <p className="text-gray-500">Loading chart data...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
