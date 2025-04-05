// Define the Candidate interface
export interface Candidate {
  id: number;
  user: {
    image: string;
    name: string;
  };
  partyName: string;
  description: string;
  votesReceived: number;
}

// This would come from an API in a real implementation
export const candidates: Candidate[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-18.jpg",
      name: "John Doe",
    },
    partyName: "Democratic Alliance",
    description:
      "Experienced leader with a vision for economic growth and social justice.",
    votesReceived: 120000,
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Jane Smith",
    },
    partyName: "People's Party",
    description: "Advocating for healthcare reform and education improvements.",
    votesReceived: 95000,
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-27.jpg",
      name: "Michael Brown",
    },
    partyName: "National Front",
    description: "Focused on national security and infrastructure development.",
    votesReceived: 15000,
  },
];

// Generate monthly data based on current votes
// In a real app, this would come from an API
export const generateMonthlyData = (candidates: Candidate[]) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return candidates.map((candidate) => {
    // Generate a progression of votes over the year
    // This is just for visualization - in a real app, this would be historical data
    const baseVotes = candidate.votesReceived;
    const monthlyData = months.map((_, index) => {
      // Create a progression that ends at the current votesReceived value
      const progressionFactor = (index + 1) / 12;
      return Math.round(baseVotes * progressionFactor);
    });

    return {
      name: candidate.user.name,
      data: monthlyData,
    };
  });
};
