import MyElections from "../Dashboard/components/MyElections";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const index = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="My Elections" />

      <MyElections />
    </div>
  );
};

export default index;
