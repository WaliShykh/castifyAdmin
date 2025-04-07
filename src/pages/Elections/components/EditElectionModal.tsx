import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Select from "../../../components/form/Select";
import MultiSelect from "../../../components/form/MultiSelect";
import InputField from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";

interface Election {
  id: number;
  name: string;
  type: string;
  status: "Upcoming" | "Ongoing" | "Ended";
  totalCandidates: number;
  totalVoters: number;
  startDate: string;
  endDate: string;
  voters?: { id: string; name: string }[];
  candidates?: { id: string; name: string }[];
}

interface EditElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (electionData: any) => void;
  election: Election | null;
}

const mockUsers = [
  { value: "user1", text: "John Doe" },
  { value: "user2", text: "Jane Smith" },
  { value: "user3", text: "Robert Johnson" },
  { value: "user4", text: "Emily Davis" },
  { value: "user5", text: "Michael Wilson" },
  { value: "user6", text: "Sarah Johnson" },
  { value: "user7", text: "David Williams" },
  { value: "user8", text: "Lisa Anderson" },
];

const mockCandidates = [
  { value: "c1", text: "Alice Brown" },
  { value: "c2", text: "Bob Green" },
  { value: "c3", text: "Carol White" },
  { value: "c4", text: "David Black" },
  { value: "c5", text: "Eve Wilson" },
  { value: "c6", text: "Frank Miller" },
];

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
  voters: Yup.array().min(1, "At least one voter must be selected"),
  candidates: Yup.array().min(1, "At least one candidate must be selected"),
});

const EditElectionModal: React.FC<EditElectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  election,
}) => {
  const [electionTypes] = useState([
    { value: "student_council", label: "Student Council" },
    { value: "company_poll", label: "Company Poll" },
    { value: "department_head", label: "Department Head" },
    { value: "faculty_senate", label: "Faculty Senate" },
    { value: "class_representative", label: "Class Representative" },
  ]);

  if (!election) return null;

  const canEdit = election.status === "Upcoming";

  const initialValues = {
    name: election.name,
    type: election.type,
    startDate: election.startDate
      ? new Date(election.startDate).toISOString().slice(0, 16)
      : "",
    endDate: election.endDate
      ? new Date(election.endDate).toISOString().slice(0, 16)
      : "",
    voters: election.voters?.map((v) => v.id) || [],
    candidates: election.candidates?.map((c) => c.id) || [],
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

      {canEdit ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const submissionData = {
              ...election,
              ...values,
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
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Type
                </label>
                <Select
                  options={electionTypes}
                  placeholder="Select election type"
                  onChange={(value: string) => setFieldValue("type", value)}
                  defaultValue={values.type}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Election type cannot be changed after creation
                </p>
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

              <div>
                <MultiSelect
                  label="Candidates"
                  options={mockCandidates}
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
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            This election cannot be edited because it has already started or
            ended.
          </p>
        </div>
      )}
    </Modal>
  );
};

export default EditElectionModal;
