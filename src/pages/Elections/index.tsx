import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ElectionTable from "./components/ElectionTable";

const Elections = () => {
  return (
    <div>
      <PageMeta
        title="Castify - Online Voting Platform"
        description="Castify - A secure and efficient online voting platform"
      />
      <PageBreadcrumb pageTitle="Elections" />
      <div className="mt-5">
        <ElectionTable />
      </div>
    </div>
  );
};

export default Elections;
