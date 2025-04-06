import MyElections from "../Dashboard/components/RecentElections";
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
