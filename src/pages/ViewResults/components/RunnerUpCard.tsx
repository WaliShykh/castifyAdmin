import UserImage from "../../../assets/images/user/owner.jpg";
import Badge from "../../../components/ui/badge/Badge";

type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface RunnerUpCardProps {
  candidateName: string;
  party: string;
  position: string;
  totalVotes: string;
  votePercentage: string;
  Badgecolor: BadgeColor;
  image?: string;
}

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <h4 className="text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
      {value}
    </h4>
  </div>
);

const RunnerUpCard = ({
  candidateName,
  party,
  position,
  totalVotes,
  votePercentage,
  image,
  Badgecolor,
}: RunnerUpCardProps) => {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
      <div className="flex justify-end">
        <Badge size="sm" color={Badgecolor}>
          {position} Place
        </Badge>
      </div>
      {/* <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {position} Place
      </p> */}
      <div className="flex mt-2 items-center mb-4">
        <div className="flex flex-row gap-x-4 justify-between items-center">
          <div className="w-16 h-16 border border-gray-200 rounded-full dark:border-gray-800 overflow-hidden">
            <img
              src={image || UserImage}
              alt="candidate"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden h-9.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

          <InfoBlock label="Candidate Name" value={candidateName} />
        </div>
      </div>
      <div>
        <InfoBlock label="Party" value={party} />
        <div className="grid grid-col-1 xl:grid-cols-2 mt-2">
          <InfoBlock label="Total Votes" value={totalVotes} />
          <InfoBlock label="Vote Percentage" value={votePercentage} />
        </div>
      </div>
    </div>
  );
};

export default RunnerUpCard;
