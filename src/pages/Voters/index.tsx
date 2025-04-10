import { useState } from "react";
import { Search, Filter, Download, Upload } from "lucide-react";
import VoterTable from "./components/VoterTable";
import AddVoterButton from "./components/AddVoterButton";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import InputField from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";

// Define Voter interface
interface Voter {
  id: string;
  serialNo: string;
  name: string;
  email: string;
  cnic: string;
  electionId: string;
  electionName: string;
  status: string;
}

// Mock data for elections
const mockElections = [
  { id: "1", name: "Presidential Election 2023" },
  { id: "2", name: "Local Council Election 2023" },
  { id: "3", name: "Student Union Election 2023" },
];

// Mock data for voters
const mockVoters = [
  {
    id: "1",
    serialNo: "001",
    name: "John Doe",
    email: "john.doe@example.com",
    cnic: "12345-1234567-1",
    electionId: "1",
    electionName: "Presidential Election 2023",
    status: "Active",
  },
  {
    id: "2",
    serialNo: "002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    cnic: "12345-1234567-2",
    electionId: "1",
    electionName: "Presidential Election 2023",
    status: "Active",
  },
  {
    id: "3",
    serialNo: "003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    cnic: "12345-1234567-3",
    electionId: "2",
    electionName: "Local Council Election 2023",
    status: "Inactive",
  },
  {
    id: "4",
    serialNo: "004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    cnic: "12345-1234567-4",
    electionId: "2",
    electionName: "Local Council Election 2023",
    status: "Active",
  },
  {
    id: "5",
    serialNo: "005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    cnic: "12345-1234567-5",
    electionId: "3",
    electionName: "Student Union Election 2023",
    status: "Inactive",
  },
];

const VotersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedElection, setSelectedElection] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [voters, setVoters] = useState(mockVoters);

  // Filter voters based on search term and filters
  const filteredVoters = mockVoters.filter((voter) => {
    const matchesSearch =
      searchTerm === "" ||
      voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.cnic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesElection =
      selectedElection === "" || voter.electionId === selectedElection;

    const matchesStatus =
      selectedStatus === "" || voter.status === selectedStatus;

    return matchesSearch && matchesElection && matchesStatus;
  });

  // Handle bulk actions
  const handleUploadCSV = () => {
    // Implement CSV upload logic
    console.log("Upload CSV");
  };

  const handleDownloadCSV = () => {
    // Implement CSV download logic
    console.log("Download CSV");
  };

  const handleEditVoter = (updatedVoter: Voter) => {
    // Update the voter in the list
    const updatedVoters = mockVoters.map((voter) =>
      voter.id === updatedVoter.id ? updatedVoter : voter
    );
    setVoters(updatedVoters);
  };

  const handleDeleteVoter = (voterId: string) => {
    // Remove the voter from the list
    const updatedVoters = mockVoters.filter((voter) => voter.id !== voterId);
    setVoters(updatedVoters);
  };

  return (
    <div className="overflow-y-auto rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.02] sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Manage Voters
        </h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AddVoterButton />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleUploadCSV}
            >
              <Upload size={16} />
              Upload CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleDownloadCSV}
            >
              <Download size={16} />
              Download CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <InputField
            type="text"
            placeholder="Search by name, email, or CNIC"
            className="pl-10"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Filter size={16} />
              {selectedElection
                ? mockElections.find((e) => e.id === selectedElection)?.name
                : "Filter by Election"}
            </Button>
            {isDropdownOpen && (
              <Dropdown
                isOpen={isDropdownOpen}
                className="absolute right-0 top-full z-10 mt-1 w-64"
                onClose={() => setIsDropdownOpen(false)}
              >
                <div className="p-2">
                  <div
                    className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setSelectedElection("");
                      setIsDropdownOpen(false);
                    }}
                  >
                    All Elections
                  </div>
                  {mockElections.map((election) => (
                    <div
                      key={election.id}
                      className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        setSelectedElection(election.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {election.name}
                    </div>
                  ))}
                </div>
              </Dropdown>
            )}
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
              <Filter size={16} />
              {selectedStatus ? selectedStatus : "Filter by Status"}
            </Button>
            {isStatusDropdownOpen && (
              <Dropdown
                isOpen={isStatusDropdownOpen}
                className="absolute right-0 top-full z-10 mt-1 w-48"
                onClose={() => setIsStatusDropdownOpen(false)}
              >
                <div className="p-2">
                  <div
                    className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setSelectedStatus("");
                      setIsStatusDropdownOpen(false);
                    }}
                  >
                    All Statuses
                  </div>
                  <div
                    className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setSelectedStatus("Active");
                      setIsStatusDropdownOpen(false);
                    }}
                  >
                    Active
                  </div>
                  <div
                    className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setSelectedStatus("Inactive");
                      setIsStatusDropdownOpen(false);
                    }}
                  >
                    Inactive
                  </div>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <VoterTable
          voters={filteredVoters}
          onEdit={handleEditVoter}
          onDelete={handleDeleteVoter}
        />
      </div>
    </div>
  );
};

export default VotersPage;
