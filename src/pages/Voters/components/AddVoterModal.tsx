import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import InputField from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";

// Mock data for elections
const mockElections = [
  { id: "1", name: "Presidential Election 2023" },
  { id: "2", name: "Local Council Election 2023" },
  { id: "3", name: "Student Union Election 2023" },
];

interface AddVoterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  cnic: Yup.string().required("CNIC/ID is required"),
  electionId: Yup.string().required("Election is required"),
  status: Yup.string().required("Status is required"),
});

const AddVoterModal: React.FC<AddVoterModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      // Add your voter creation logic here
      console.log("Creating voter:", values);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating voter:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-2 pr-14">
        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
          Add New Voter
        </h5>
      </div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          cnic: "",
          electionId: "",
          status: "active",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="mb-4">
                  <Label>Name</Label>
                  <InputField
                    name="name"
                    className={
                      touched.name && errors.name ? "border-red-500" : ""
                    }
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <Label>Email</Label>
                  <InputField
                    name="email"
                    type="email"
                    className={
                      touched.email && errors.email ? "border-red-500" : ""
                    }
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <Label>CNIC/ID</Label>
                  <InputField
                    name="cnic"
                    className={
                      touched.cnic && errors.cnic ? "border-red-500" : ""
                    }
                  />
                  {touched.cnic && errors.cnic && (
                    <p className="mt-1 text-sm text-red-600">{errors.cnic}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="electionId">Assign to Election</Label>
                  <Select
                    options={mockElections.map((election) => ({
                      value: election.id,
                      label: election.name,
                    }))}
                    placeholder="Select an election"
                    onChange={(value) => setFieldValue("electionId", value)}
                  />
                  {errors.electionId && touched.electionId && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.electionId}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    options={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                    placeholder="Select status"
                    onChange={(value) => setFieldValue("status", value)}
                  />
                  {errors.status && touched.status && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.status}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={
                  touched.name ||
                  touched.email ||
                  touched.cnic ||
                  touched.electionId ||
                  touched.status
                }
              >
                Add Voter
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddVoterModal;
