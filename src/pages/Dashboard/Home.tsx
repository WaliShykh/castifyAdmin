import ElectionMetrics from "./components/ElectionMetrics";
import PageMeta from "../../components/common/PageMeta";
import RecentElections from "./components/RecentElections";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Castify - Online Voting Platform"
        description="Castify - A secure and efficient online voting platform"
      />
      <PageBreadcrumb pageTitle="Admin Dashboard" />

      <div>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white/90 mb-6">
          Hey Admin &#128075;
        </h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <ElectionMetrics />
        </div>
        <RecentElections />
      </div>
    </>
  );
}
