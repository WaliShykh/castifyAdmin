import { useState } from "react";
import { Search } from "lucide-react";
import CandidateTable from "./components/CandidateTable";
import CreateCandidateButton from "./components/CreateCandidateButton";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import InputField from "../../components/form/input/InputField";

const mockCandidates = [
  {
    id: 1,
    name: "John Smith",
    election: "Student Council Election 2023",
    votes: 120,
    status: "Active" as const,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Emily Johnson",
    election: "Student Council Election 2023",
    votes: 85,
    status: "Active" as const,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    election: "Employee Union Election",
    votes: 95,
    status: "Inactive" as const,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Sarah Davis",
    election: "Employee Union Election",
    votes: 110,
    status: "Active" as const,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Robert Wilson",
    election: "Department Head Election",
    votes: 75,
    status: "Active" as const,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const mockElections = [
  { id: 1, name: "Student Council Election 2023" },
  { id: 2, name: "Employee Union Election" },
  { id: 3, name: "Department Head Election" },
  { id: 4, name: "Class Representative Election" },
  { id: 5, name: "Faculty Senate Election" },
];

const Candidates = () => {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedElection, setSelectedElection] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesElection =
      selectedElection === "" || candidate.election === selectedElection;
    return matchesSearch && matchesElection;
  });

  const handleCandidateCreated = (newCandidate: any) => {
    setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);
  };

  const handleCandidateUpdated = (updatedCandidate: any) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      )
    );
  };

  const handleCandidateDeleted = (id: number) => {
    setCandidates((prevCandidates) =>
      prevCandidates.filter((candidate) => candidate.id !== id)
    );
  };

  const handleElectionSelect = (electionName: string) => {
    setSelectedElection(electionName);
    setIsDropdownOpen(false);
  };

  return (
    <div className="overflow-y-auto rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.02] sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Manage Candidates
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add, edit, and manage election candidates
          </p>
        </div>
        <CreateCandidateButton onCandidateCreated={handleCandidateCreated} />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <InputField
            type="text"
            placeholder="Search candidates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <div className="relative">
            <button
              className="dropdown-toggle w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-white/[0.02] dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedElection || "Filter by Election"}
            </button>
            <Dropdown
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              className="w-full"
            >
              <DropdownItem
                onClick={() => handleElectionSelect("")}
                className="text-gray-700 dark:text-gray-300"
              >
                All Elections
              </DropdownItem>
              {mockElections.map((election) => (
                <DropdownItem
                  key={election.id}
                  onClick={() => handleElectionSelect(election.name)}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {election.name}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
        </div>
      </div>

      <CandidateTable
        candidates={filteredCandidates}
        onEdit={handleCandidateUpdated}
        onDelete={handleCandidateDeleted}
      />
    </div>
  );
};

export default Candidates;
