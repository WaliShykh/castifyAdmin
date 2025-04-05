import Alert from "../../components/ui/alert/Alert";
import ComponentCard from "../../components/common/ComponentCard";
import CandidateCards from "./components/CandidateCards";
import StatisticsChart from "./components/StatisticsChart";
const CastVote = () => {
  return (
    <div>
      <Alert
        variant="info"
        title="Cast Your Vote"
        message="Select your preferred candidate and confirm your choice."
        showLink={false}
      />
      <div className="mt-5">
        <StatisticsChart />
      </div>
      <div className="mt-5">
        <ComponentCard title="General Elections">
          <CandidateCards />
        </ComponentCard>
      </div>
    </div>
  );
};

export default CastVote;
