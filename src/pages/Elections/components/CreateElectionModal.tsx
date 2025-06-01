import { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import InputField from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import CandidateSelectionModal from "./CandidateSelectionModal";
import axios from "axios";

interface CreateElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (electionData: any) => void;
}

interface Candidate {
  _id: string;
  name: string;
}

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
    .of(Yup.string().required("Candidate ID is required")),
});

const CreateElectionModal: React.FC<CreateElectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  //@ts-ignore
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);

  const initialValues = {
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    candidates: [] as string[],
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoadingCandidates(true);
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get(
          "http://localhost:5174/api/candidate",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidates(response.data);
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
        setError("Failed to load candidates");
      } finally {
        setIsLoadingCandidates(false);
      }
    };

    if (isOpen) {
      fetchCandidates();
    }
  }, [isOpen]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const token = localStorage.getItem("token"); // Get token from localStorage
      const submissionData = {
        name: values.name,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
        candidates: values.candidates,
      };

      const response = await axios.post(
        "http://localhost:5174/api/elections",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSave(response.data);
      setSubmitting(false);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create election");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Create New Election
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fill in the election details below
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values, isSubmitting }) => (
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
                    Add Candidates
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {values.candidates.length > 0 ? (
                          values.candidates.map((candidateId) => {
                            const candidate = candidates.find(
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
                                    setFieldValue(
                                      "candidates",
                                      values.candidates.filter(
                                        (id) => id !== candidateId
                                      )
                                    );
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
                        disabled={isLoadingCandidates}
                      >
                        {isLoadingCandidates
                          ? "Loading..."
                          : "Select Candidates"}
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
                    {isSubmitting ? "Creating..." : "Create Election"}
                  </Button>
                </div>
              </FormikForm>

              <CandidateSelectionModal
                isOpen={isCandidateModalOpen}
                onClose={() => setIsCandidateModalOpen(false)}
                onSave={(selectedCandidates) => {
                  setFieldValue("candidates", selectedCandidates);
                  setIsCandidateModalOpen(false);
                }}
                candidates={candidates.map((c) => ({
                  value: c._id,
                  text: c.name,
                }))}
                defaultSelected={values.candidates}
              />
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateElectionModal;
