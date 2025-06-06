import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/form/input/InputField";
import Select from "../../../components/auth/components/Select";
import Button from "../../../components/ui/button/Button";
import { X } from "lucide-react";

interface CreateCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (candidate: any) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  party: Yup.string().required("Party is required"),
  image: Yup.string().required("Image URL is required"),
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

  const handleSubmit = async (values: any) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:5174/api/candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
          party: values.party,
          image: values.image,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please login again.");
        }
        throw new Error("Failed to create candidate");
      }

      const newCandidate = await response.json();
      onSave(newCandidate);
      onClose();
    } catch (error) {
      console.error("Error creating candidate:", error);
      alert(
        error instanceof Error ? error.message : "Failed to create candidate"
      );
    }
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
          party: "",
          image: "",
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
                htmlFor="party"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Party
              </label>
              <Field
                as={InputField}
                id="party"
                name="party"
                placeholder="Enter party name"
                className={
                  errors.party && touched.party ? "border-red-500" : ""
                }
              />
              {errors.party && touched.party && (
                <p className="mt-1 text-xs text-red-500">{errors.party}</p>
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
