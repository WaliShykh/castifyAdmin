import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

interface Candidate {
  id: number;
  user: {
    image: string;
    name: string;
  };
  partyName: string;
  rank: number;
  votesReceived: number;
  votePercentage: string;
}

const candidates: Candidate[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-18.jpg",
      name: "John Doe",
    },
    partyName: "Democratic Alliance",
    rank: 1,
    votesReceived: 120000,
    votePercentage: "55%",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Jane Smith",
    },
    partyName: "People's Party",
    rank: 2,
    votesReceived: 95000,
    votePercentage: "40%",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-27.jpg",
      name: "Michael Brown",
    },
    partyName: "National Front",
    rank: 3,
    votesReceived: 15000,
    votePercentage: "5%",
  },
];

export default function ElectionResultsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.02]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Candidate Name
              </TableCell>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Rank
              </TableCell>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Party Name
              </TableCell>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Votes Received
              </TableCell>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Vote Percentage
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={candidate.user.image}
                        alt={candidate.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {candidate.user.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {candidate.rank}
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {candidate.partyName}
                </TableCell>
                <TableCell className="px-6 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {candidate.votesReceived.toLocaleString()}
                </TableCell>
                <TableCell className="px-6 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {candidate.votePercentage}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
