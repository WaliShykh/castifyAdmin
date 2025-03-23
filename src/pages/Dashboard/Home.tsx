import EcommerceMetrics from "./components/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";
import MyElections from "./components/MyElections";
import ElectionResults from "./components/ElectionResults";

import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import DemographicCard from "../../components/ecommerce/DemographicCard";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white/90 mb-6">
          Hey Wali &#128075;
        </h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <EcommerceMetrics />
        </div>
        <MyElections />
        <ElectionResults />
      </div>
      {/* 
        <div className="col-span-12 xl:col-span-5">
        <MonthlySalesChart />
        </div>
        
        <div className="col-span-12">
        <StatisticsChart />
        </div>
        
        <div className="col-span-12 xl:col-span-5">
        <DemographicCard /> 
        </div>
        
        <div className="col-span-12 xl:col-span-7">
        <MonthlyTarget />
        </div> */}
    </>
  );
}
