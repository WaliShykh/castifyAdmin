import ComponentCard from "../../../components/common/ComponentCard";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <div className="mt-5 space-y-6">
        <ComponentCard title="Candidate Result">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
