import { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import InputField from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import CandidateSelectionModal from "./CandidateSelectionModal";
import axios from "axios";

interface Candidate {
  _id: string;
  name: string;
}

interface Election {
  _id: string;
  name: string;
  type: string;
  status: "Upcoming" | "Ongoing" | "Ended";
  totalCandidates: number;
  totalVoters: number;
  startDate: string;
  endDate: string;
  voters?: { id: string; name: string }[];
  candidates: string[];
}

interface EditElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (electionData: any) => void;
  election: Election | null;
}

// MongoDB ObjectId validation regex
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Election name is required")
    .min(3, "Election name must be at least 3 characters"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) > new Date(startDate);
      }
    ),
  candidates: Yup.array()
    .min(1, "At least one candidate must be selected")
    .of(
      Yup.string()
        .required("Candidate ID is required")
        .matches(objectIdRegex, "Invalid candidate ID format")
    ),
});

const EditElectionModal: React.FC<EditElectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  election,
}) => {
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //@ts-ignore
  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
  //@ts-ignore
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const fetchCandidates = async () => {
    try {
      setIsLoadingCandidates(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5174/api/candidate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filter out any candidates with invalid ObjectIds
      const validCandidates = response.data.filter((candidate: Candidate) =>
        objectIdRegex.test(candidate._id)
      );
      setAllCandidates(validCandidates);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch candidates");
    } finally {
      setIsLoadingCandidates(false);
    }
  };

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      fetchCandidates();
      if (election?.candidates) {
        const validCandidates = election.candidates.filter((c) =>
          objectIdRegex.test(c)
        );
        setSelectedCandidates(validCandidates);
      } else {
        setSelectedCandidates([]);
      }
    } else {
      // Reset states when main modal closes
      setIsCandidateModalOpen(false);
      setError(null);
      setSelectedCandidates([]);
    }
  }, [isOpen, election]);

  const handleCandidateModalClose = () => {
    setIsCandidateModalOpen(false);
    setError(null);
  };

  const handleCandidateModalSave = (
    newSelectedCandidates: string[],
    setFieldValue: (field: string, value: any) => void
  ) => {
    // Filter out any invalid ObjectIds before saving
    const validCandidates = newSelectedCandidates.filter((id) =>
      objectIdRegex.test(id)
    );
    if (validCandidates.length !== newSelectedCandidates.length) {
      setError("All candidate IDs must be valid MongoDB ObjectIds");
    } else {
      setError(null);
      setFieldValue("candidates", validCandidates);
      setSelectedCandidates(validCandidates);
    }
  };

  if (!election) return null;

  const canEdit = election.status === "Upcoming";

  // Filter out any candidates with invalid ObjectIds from the initial values
  const initialValues = {
    name: election.name,
    type: election.type,
    startDate: election.startDate
      ? new Date(election.startDate).toISOString().slice(0, 16)
      : "",
    endDate: election.endDate
      ? new Date(election.endDate).toISOString().slice(0, 16)
      : "",
    candidates: selectedCandidates,
  };

  const handleSubmit = async (values: any) => {
    if (!election?._id) {
      setError("Invalid election ID");
      return;
    }

    const token = localStorage.getItem("token");
    const formattedData = {
      name: values.name,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      candidates: values.candidates,
      status: election.status.toLowerCase(),
    };

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.put(
        `http://localhost:5174/api/elections/${election._id}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onSave(response.data);
      onClose();
    } catch (err: any) {
      console.error("Update error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        electionId: election._id,
        data: formattedData,
      });

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to update election"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Edit Election
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {canEdit
            ? "Update the election details below"
            : "This election cannot be edited because it has already started or ended"}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {canEdit ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <>
              <FormikForm className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Election Name
                  </label>
                  <Field
                    as={InputField}
                    type="text"
                    name="name"
                    placeholder="Enter election name"
                  />
                  {errors.name && touched.name && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Start Date/Time
                    </label>
                    <Field
                      as={InputField}
                      type="datetime-local"
                      name="startDate"
                    />
                    {errors.startDate && touched.startDate && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.startDate}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      End Date/Time
                    </label>
                    <Field
                      as={InputField}
                      type="datetime-local"
                      name="endDate"
                    />
                    {errors.endDate && touched.endDate && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.endDate}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Candidates
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {values.candidates.length > 0 ? (
                          values.candidates.map((candidateId) => {
                            const candidate = allCandidates.find(
                              (c) => c._id === candidateId
                            );
                            return (
                              <div
                                key={candidateId}
                                className="flex items-center gap-2 px-2 py-1 text-sm bg-gray-100 rounded-full dark:bg-gray-800"
                              >
                                <span>{candidate?.name}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newCandidates =
                                      values.candidates.filter(
                                        (id) => id !== candidateId
                                      );
                                    setFieldValue("candidates", newCandidates);
                                    setSelectedCandidates(newCandidates);
                                  }}
                                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">
                            No candidates selected
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCandidateModalOpen(true)}
                      >
                        Select Candidates
                      </Button>
                    </div>
                    {errors.candidates && touched.candidates && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.candidates}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </FormikForm>

              <CandidateSelectionModal
                isOpen={isCandidateModalOpen}
                onClose={handleCandidateModalClose}
                onSave={(candidates) =>
                  handleCandidateModalSave(candidates, setFieldValue)
                }
                candidates={allCandidates.map((c) => ({
                  value: c._id,
                  text: c.name,
                }))}
                defaultSelected={values.candidates}
              />
            </>
          )}
        </Formik>
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            This election cannot be edited because it has already started or
            ended
          </p>
        </div>
      )}
    </Modal>
  );
};

export default EditElectionModal;
