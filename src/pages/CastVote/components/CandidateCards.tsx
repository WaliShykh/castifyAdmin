import { useState } from "react";
import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal";
import { toast } from "react-toastify";
import Alert from "../../../components/ui/alert/Alert";
import { candidates } from "../data/candidates";

export default function CandidateCards() {
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationOption, setConfirmationOption] = useState<string>("");

  const handleVoteClick = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleConfirmVote = () => {
    if (confirmationOption === "yes") {
      console.log(`Vote confirmed for ${selectedCandidate?.user.name}`);
      setIsModalOpen(false);
      setConfirmationOption("");
      setTimeout(() => {
        toast.success(
          `Vote Casted for ${selectedCandidate?.user.name} successfully`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          }
        );
      }, 100);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white dark:bg-white/[0.02] rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-primary flex-shrink-0">
                <img
                  width={128}
                  height={128}
                  src={candidate.user.image}
                  alt={candidate.user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                    {candidate.user.name}
                  </h3>
                  <div className="mb-4">
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      Votes: {candidate.votesReceived.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-3">
                  {candidate.partyName}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {candidate.description}
                </p>

                <div className="flex justify-end">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleVoteClick(candidate)}
                  >
                    Vote Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="max-w-[500px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Confirm Your Vote
            </h5>
            <div className="mb-5">
              <Alert
                variant="warning"
                title="Warning Message"
                message="Your vote is final and cannot be changed."
                showLink={false}
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-primary flex-shrink-0">
                  <img
                    width={64}
                    height={64}
                    src={selectedCandidate?.user.image}
                    alt={selectedCandidate?.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-base font-medium text-gray-800 dark:text-white/90">
                    {selectedCandidate?.user.name}
                  </h6>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedCandidate?.partyName}
                  </p>
                </div>
              </div>

              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Please confirm your choice by selecting one of the options
                below:
              </p>

              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                  <input
                    type="radio"
                    name="confirmation"
                    value="yes"
                    checked={confirmationOption === "yes"}
                    onChange={(e) => setConfirmationOption(e.target.value)}
                    className="mr-3 text-primary"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      Yes, confirm my vote
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I want to vote for {selectedCandidate?.user.name}
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                  <input
                    type="radio"
                    name="confirmation"
                    value="no"
                    checked={confirmationOption === "no"}
                    onChange={(e) => setConfirmationOption(e.target.value)}
                    className="mr-3 text-primary"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      No, I want to change
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I want to select a different candidate
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmVote}
              disabled={confirmationOption !== "yes"}
            >
              Submit Vote
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
