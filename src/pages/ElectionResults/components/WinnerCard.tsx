interface WinnerCardProps {
  winner: {
    name: string;
    party: string;
    symbol: string;
    votes: number;
    percentage: number;
  };
  totalVotes: number;
}

const WinnerCard: React.FC<WinnerCardProps> = ({ winner }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Winner</h2>
          <div className="text-2xl font-bold mb-2">{winner.name}</div>
          <div className="text-sm opacity-90 mb-1">{winner.party}</div>
          <div className="text-3xl mb-4">{winner.symbol}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm opacity-75">Votes Secured</div>
              <div className="text-xl font-semibold">{winner.votes}</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Winning Percentage</div>
              <div className="text-xl font-semibold">
                {winner.percentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
        <div className="text-8xl opacity-25">👑</div>
      </div>
    </div>
  );
};

export default WinnerCard;
