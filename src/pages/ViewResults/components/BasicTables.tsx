import ComponentCard from "../../../components/common/ComponentCard";
import ElectionResultsTable from "./ElectionResultsTable";

export default function BasicTables() {
  return (
    <>
      <div className="mt-5 space-y-6">
        <ComponentCard title="Candidate Result">
          <ElectionResultsTable />
        </ComponentCard>
      </div>
    </>
  );
}
