import { useState, useMemo, useEffect } from "react";
import { X, Eye, Trash2 } from "lucide-react";
import { Modal } from "../../components/ui/modal";

interface Election {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  country: string;
  gender: string;
  role: string;
  agreedToTerms: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AssignedVoter {
  _id: string;
  name: string;
  email: string;
  votedAt: string | null;
  status: "voted" | "pending";
}

export default function VotersTab() {
  const [elections, setElections] = useState<Election[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //@ts-ignore
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  //@ts-ignore
  const [isLoadingVoters, setIsLoadingVoters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedElection, setSelectedElection] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [assignedVoters, setAssignedVoters] = useState<AssignedVoter[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState<AssignedVoter | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchElections = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5174/api/voters/elections",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setElections(data);
      } catch (error) {
        console.error("Error fetching elections:", error);
        setError("Failed to load elections. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5174/api/user/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchElections();
    fetchUsers();
  }, []);

  // Fetch voter status when election changes
  const fetchVoterStatus = async () => {
    if (!selectedElection) {
      setAssignedVoters([]);
      return;
    }

    try {
      setIsLoadingVoters(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5174/api/voters/voters/${selectedElection}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAssignedVoters(data);
    } catch (error) {
      console.error("Error fetching voter status:", error);
      setError("Failed to load voter status. Please try again later.");
    } finally {
      setIsLoadingVoters(false);
    }
  };

  useEffect(() => {
    fetchVoterStatus();
  }, [selectedElection]);

  const handleRevoke = async (id: string) => {
    if (!selectedElection) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5174/api/voters/voters/${selectedElection}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the voter list after successful deletion
      await fetchVoterStatus();
    } catch (error) {
      console.error("Error revoking voter:", error);
      setError("Failed to revoke voter. Please try again later.");
    }
  };

  const handleAssign = async () => {
    if (!selectedElection) {
      setError("Please select an election first");
      return;
    }

    if (selectedUsers.length === 0) {
      setError("Please select at least one voter");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Selected Election:", selectedElection);
      console.log("Selected Users:", selectedUsers);

      const response = await fetch(
        `http://localhost:5174/api/voters/assign/${selectedElection}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voterIds: selectedUsers,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error Response:", errorData);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Success Response:", data);

      // Refresh the voter list after successful assignment
      await fetchVoterStatus();

      setSelectedUsers([]);
      setSearchQuery("");
      setError(null);
    } catch (error) {
      console.error("Error assigning voters:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to assign voters. Please try again later."
      );
    }
  };

  const handleElectionChange = (electionId: string) => {
    setSelectedElection(electionId);
    setSelectedUsers([]); // Clear selected users when election changes
  };

  const filteredVoters = assignedVoters.filter(() => selectedElection);

  const assignedUserIds = useMemo(() => {
    return assignedVoters.map((voter) => voter._id);
  }, [assignedVoters]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        fullName.includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const isNotAssigned = !assignedUserIds.includes(user._id);

      return matchesSearch && isNotAssigned;
    });
  }, [users, searchQuery, assignedUserIds]);

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900">
      <div>
        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
          Select Election
        </label>
        <select
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          value={selectedElection}
          onChange={(e) => handleElectionChange(e.target.value)}
          disabled={isLoading}
        >
          <option value="">-- Choose an election --</option>
          {!isLoading &&
            !error &&
            elections.map((el) => (
              <option key={el._id} value={el._id}>
                {el.name}
              </option>
            ))}
        </select>
        {isLoading && (
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Loading elections...
          </div>
        )}
        {error && (
          <div className="mt-2 text-sm text-error-500 dark:text-error-400">
            {error}
          </div>
        )}
      </div>

      {selectedElection && (
        <div className="space-y-4">
          <label className="block font-semibold text-gray-700 dark:text-gray-300">
            Assign Eligible Voters
          </label>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* User List */}
          <div className="border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {isLoadingVoters
                  ? "Loading voters..."
                  : `${filteredUsers.length} eligible users found`}
              </div>
            </div>
            <div className="max-h-[144px] overflow-y-auto">
              {" "}
              {/* 3 users * 48px height */}
              {filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? "No matching users found"
                    : "No eligible users available"}
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <label
                      key={user._id}
                      className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer h-12"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user._id]);
                          } else {
                            setSelectedUsers(
                              selectedUsers.filter((id) => id !== user._id)
                            );
                          }
                        }}
                        className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAssign}
            disabled={selectedUsers.length === 0}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Selected Users ({selectedUsers.length})
          </button>
        </div>
      )}

      {selectedElection && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
              Voter Status
            </h2>
            <button
              onClick={() => {
                const csv = filteredVoters
                  .map(
                    (v) => `${v.name},${v.email},${v.status},${v.votedAt || ""}`
                  )
                  .join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "voters.csv";
                a.click();
              }}
              className="bg-success-500 text-white px-4 py-2 rounded-lg hover:bg-success-600 transition-colors"
            >
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Email
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Voted At
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                {assignedVoters.map((voter) => (
                  <tr
                    key={voter._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      {voter.name}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      {voter.email}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      {voter.votedAt
                        ? new Date(voter.votedAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      {voter.status === "voted" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                          Voted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 space-x-2">
                      <button
                        onClick={() => {
                          setModalUser(voter);
                          setShowModal(true);
                        }}
                        className="text-blue-light-500 hover:text-blue-light-600 dark:text-blue-light-400 dark:hover:text-blue-light-300"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleRevoke(voter._id)}
                        disabled={voter.status === "voted"}
                        className={`text-error-500 hover:text-error-600 dark:text-error-400 dark:hover:text-error-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-error-500 dark:disabled:hover:text-error-400`}
                        title={
                          voter.status === "voted"
                            ? "Cannot revoke a voter who has already voted"
                            : "Revoke voter"
                        }
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        className="max-w-md p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Voter Details
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
              {modalUser?.name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
              {modalUser?.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assigned Election
            </label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
              {elections.find((el) => el._id === selectedElection)?.name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <div className="p-2">
              {modalUser?.status === "voted" ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                  Voted
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500">
                  Pending
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Voted At
            </label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
              {modalUser?.votedAt
                ? new Date(modalUser.votedAt).toLocaleString()
                : "—"}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
