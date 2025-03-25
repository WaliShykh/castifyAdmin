import WinnerCard from "./components/WinnerCard";
import RunnerUpCard from "./components/RunnerUpCard";
import VoteDistributionChart from "./components/DonutChart";

const ViewResults = () => {
  return (
    <div className="grid grid-cols-3 gap-x-5">
      <WinnerCard
        candidateName="Shiekh Wali Ahmad"
        party="Pakistan Tareekh e Insaaf"
        country="Pakistan"
        position="1st"
        Badgecolor="success"
        positionWon="Secretary"
        electionDate="2025-09-20"
        totalVotes="20,022"
        votePercentage="62.9%"
      />
      <div className="grid grid-cols-1 gap-y-4">
        <RunnerUpCard
          candidateName="Shiekh Wali Ahmad"
          position="2nd"
          party="Pakistan Tareekh e Insaaf"
          totalVotes="20,022"
          Badgecolor="info"
          votePercentage="62.9%"
        />
        <RunnerUpCard
          candidateName="Shiekh Wali Ahmad"
          position="3rd"
          party="Pakistan Tareekh e Insaaf"
          totalVotes="20,022"
          Badgecolor="warning"
          votePercentage="62.9%"
        />
      </div>
      <div className="mt-10">
        <VoteDistributionChart
          candidates={[
            { name: "Candidate A", percentage: 45 },
            { name: "Candidate B", percentage: 35 },
            { name: "Candidate C", percentage: 20 },
          ]}
        />
      </div>
    </div>
  );
};

export default ViewResults;
