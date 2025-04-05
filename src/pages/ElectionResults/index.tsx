import ElectionResults from "../Dashboard/components/ElectionResults";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const index = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Election Results" />

      <ElectionResults />
    </div>
  );
};

export default index;
