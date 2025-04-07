import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/form/input/InputField";
import Select from "../../../components/auth/components/Select";
import Button from "../../../components/ui/button/Button";
import { X } from "lucide-react";

const mockElections = [
  { id: 1, name: "Student Council Election 2023" },
  { id: 2, name: "Employee Union Election" },
  { id: 3, name: "Department Head Election" },
  { id: 4, name: "Class Representative Election" },
  { id: 5, name: "Faculty Senate Election" },
];

interface CreateCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (candidate: any) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  election: Yup.string().required("Election is required"),
  image: Yup.string().required("Image URL is required"),
  status: Yup.string().required("Status is required"),
});

const CreateCandidateModal: React.FC<CreateCandidateModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
  };

  const handleSubmit = (values: any) => {
    const newCandidate = {
      id: Math.floor(Math.random() * 10000) + 1,
      ...values,
      votes: 0,
    };
    onSave(newCandidate);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Add New Candidate
        </h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>
      </div>

      <Formik
        initialValues={{
          name: "",
          election: "",
          image: "",
          status: "Active",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Candidate Name
              </label>
              <Field
                as={InputField}
                id="name"
                name="name"
                placeholder="Enter candidate name"
                className={errors.name && touched.name ? "border-red-500" : ""}
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="election"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Election
              </label>
              <Select
                options={[
                  { value: "", label: "Select an election" },
                  ...mockElections.map((election) => ({
                    value: election.name,
                    label: election.name,
                  })),
                ]}
                placeholder="Select an election"
                onChange={(value: string) => setFieldValue("election", value)}
                className={
                  errors.election && touched.election ? "border-red-500" : ""
                }
              />
              {errors.election && touched.election && (
                <p className="mt-1 text-xs text-red-500">{errors.election}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="image"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Image URL
              </label>
              <Field
                as={InputField}
                id="image"
                name="image"
                placeholder="Enter image URL"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("image", e.target.value);
                  handleImageChange(e);
                }}
                className={
                  errors.image && touched.image ? "border-red-500" : ""
                }
              />
              {errors.image && touched.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image}</p>
              )}
              {imagePreview && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Status
              </label>
              <Select
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
                placeholder="Select status"
                onChange={(value: string) => setFieldValue("status", value)}
                className={
                  errors.status && touched.status ? "border-red-500" : ""
                }
              />
              {errors.status && touched.status && (
                <p className="mt-1 text-xs text-red-500">{errors.status}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button type="submit" className="px-4 py-2">
                Save Candidate
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateCandidateModal;
