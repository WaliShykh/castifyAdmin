import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import CandidateTable from "./components/CandidateTable";
import CreateCandidateButton from "./components/CreateCandidateButton";
import InputField from "../../components/form/input/InputField";

interface Candidate {
  _id: string;
  name: string;
  party: string;
  image: string;
  status: string;
  recentElection: string;
}

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:5174/api/candidate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch candidates");
      }

      const data = await response.json();
      setCandidates(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch candidates"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name
      ? candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    return matchesSearch;
  });

  const handleCandidateCreated = async (newCandidate: Candidate) => {
    try {
      // Ensure the new candidate has all required fields
      const candidateWithDefaults: Candidate = {
        _id: newCandidate._id,
        name: newCandidate.name || "",
        party: newCandidate.party || "",
        image: newCandidate.image || "",
        status: newCandidate.status || "active",
        recentElection: newCandidate.recentElection || "N/A",
      };

      // Refresh the entire list after creation
      await fetchCandidates();
    } catch (error) {
      console.error("Error handling new candidate:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to handle new candidate"
      );
    }
  };

  const handleCandidateUpdated = async (updatedCandidate: Candidate) => {
    try {
      // Refresh the entire list after update
      await fetchCandidates();
    } catch (error) {
      console.error("Error handling updated candidate:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to handle updated candidate"
      );
    }
  };

  const handleCandidateDeleted = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `http://localhost:5174/api/candidate/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete candidate");
      }

      // Refresh the entire list after deletion
      await fetchCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete candidate"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading candidates...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 rounded-full bg-red-100 p-4 dark:bg-red-900/30">
            <svg
              className="h-8 w-8 text-red-500 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-medium text-gray-800 dark:text-white">
            Error Loading Candidates
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
          <button
            onClick={fetchCandidates}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

      <div className="mb-6">
        <div className="relative">
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
