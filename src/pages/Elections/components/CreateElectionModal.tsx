import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Select from "../../../components/form/Select";
import MultiSelect from "../../../components/form/MultiSelect";
import InputField from "../../../components/form/input/InputField";
import FileInput from "../../../components/form/input/FileInput";
import Button from "../../../components/ui/button/Button";
import { Plus } from "lucide-react";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import ElectionTypePopup from "./ElectionTypePopup";

interface CreateElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (electionData: any) => void;
}

const defaultElectionTypes = [
  { value: "student_council", label: "Student Council" },
  { value: "company_poll", label: "Company Poll" },
  { value: "department_head", label: "Department Head" },
  { value: "faculty_senate", label: "Faculty Senate" },
  { value: "class_representative", label: "Class Representative" },
];

const mockUsers = [
  { value: "user1", text: "John Doe" },
  { value: "user2", text: "Jane Smith" },
  { value: "user3", text: "Robert Johnson" },
  { value: "user4", text: "Emily Davis" },
  { value: "user5", text: "Michael Wilson" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Election name is required")
    .min(3, "Election name must be at least 3 characters"),
  type: Yup.string().required("Election type is required"),
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
  voters: Yup.array().min(1, "At least one voter must be selected"),
  candidates: Yup.array().min(1, "At least one candidate must be selected"),
});

const CreateElectionModal: React.FC<CreateElectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [candidatesFile, setCandidatesFile] = useState<File | null>(null);
  const [electionTypes, setElectionTypes] = useState(defaultElectionTypes);
  const [showTypePopup, setShowTypePopup] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCandidatesFile(e.target.files[0]);
    }
  };

  const handleAddType = (newType: { value: string; label: string }) => {
    setElectionTypes((prev) => [...prev, newType]);
  };

  const initialValues = {
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    voters: [] as string[],
    candidates: [] as string[],
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const submissionData = {
              ...values,
              status: "Upcoming",
              startDate: values.startDate
                ? new Date(values.startDate).toISOString().split("T")[0]
                : "",
              endDate: values.endDate
                ? new Date(values.endDate).toISOString().split("T")[0]
                : "",
            };

            onSave(submissionData);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
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
                  <div className="mt-1 text-sm text-red-500">{errors.name}</div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Type
                  </label>
                  <div
                    onClick={() => setShowTypePopup(true)}
                    className="flex items-center gap-1 text-xs text-yellow-500 cursor-pointer"
                  >
                    <Plus size={14} />
                    Add Type
                  </div>
                </div>
                <Select
                  options={electionTypes}
                  placeholder="Select election type"
                  onChange={(value: string) => setFieldValue("type", value)}
                  defaultValue={values.type}
                />
                {errors.type && touched.type && (
                  <div className="mt-1 text-sm text-red-500">{errors.type}</div>
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
                  <Field as={InputField} type="datetime-local" name="endDate" />
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
                  <MultiSelect
                    label=""
                    options={mockUsers}
                    defaultSelected={values.candidates}
                    onChange={(selected: string[]) =>
                      setFieldValue("candidates", selected)
                    }
                  />
                  {errors.candidates && touched.candidates && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.candidates}
                    </div>
                  )}
                  <div className="mt-2">
                    <p className="mb-1.5 text-xs text-gray-500 dark:text-gray-400">
                      Or upload a CSV file with candidate names
                    </p>
                    <FileInput onChange={handleFileChange} />
                  </div>
                </div>
              </div>

              <div>
                <MultiSelect
                  label="Assign Voters"
                  options={mockUsers}
                  defaultSelected={values.voters}
                  onChange={(selected: string[]) =>
                    setFieldValue("voters", selected)
                  }
                />
                {errors.voters && touched.voters && (
                  <div className="mt-1 text-sm text-red-500">
                    {errors.voters}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Create Election</Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal>

      <ElectionTypePopup
        isOpen={showTypePopup}
        onClose={() => setShowTypePopup(false)}
        onAddType={handleAddType}
      />
    </>
  );
};

export default CreateElectionModal;
