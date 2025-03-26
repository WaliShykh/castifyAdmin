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

interface WinnerCardProps {
  candidateName: string;
  party: string;
  country: string;
  positionWon: string;
  position: string;
  electionDate: string;
  Badgecolor: BadgeColor;
  totalVotes: string;
  votePercentage: string;
}

const InfoBlock = ({ label, value }: { label?: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <h4 className="text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
      {value}
    </h4>
  </div>
);

const WinnerCard = ({
  candidateName,
  party,
  country,
  positionWon,
  electionDate,
  totalVotes,
  votePercentage,
  Badgecolor,
  position,
}: WinnerCardProps) => {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
        <div className="flex justify-end">
          <Badge size="sm" color={Badgecolor}>
            {position} Place
          </Badge>
        </div>
        <div className="flex items-center justify-center mb-2">
          <div>
            <div className="border border-gray-200 dark:border-gray-800 rounded-full p-2 mb-2">
              <div className="items-center justify-center overflow-hidden rounded-full">
                <img src={UserImage} alt="user" />
              </div>
            </div>

            <div className="flex justify-center mt-5 items-center flex-row gap-3 text-left">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {party}
              </p>
              <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {country}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <InfoBlock value={candidateName} />
        </div>
      </div>

      <div className="order-3 xl:order-2">
        <div className="grid grid-cols-2 mt-4">
          <InfoBlock label="Position Won" value={positionWon} />
          <InfoBlock label="Election Date" value={electionDate} />
        </div>
        <div className="grid grid-cols-2 mt-2">
          <InfoBlock label="Total Votes Received" value={totalVotes} />
          <InfoBlock label="Percentage of Votes" value={votePercentage} />
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
