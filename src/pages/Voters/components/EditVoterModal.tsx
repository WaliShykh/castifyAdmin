import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import InputField from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";

const mockElections = [
  { id: "1", name: "Presidential Election 2023" },
  { id: "2", name: "Local Council Election 2023" },
  { id: "3", name: "Student Union Election 2023" },
];

interface Voter {
  id: string;
  serialNo: string;
  name: string;
  email: string;
  cnic: string;
  electionId: string;
  electionName: string;
  status: string;
}

interface EditVoterModalProps {
  isOpen: boolean;
  onClose: () => void;
  voter: Voter;
  onSave?: (updatedVoter: Voter) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  cnic: Yup.string().required("CNIC/ID is required"),
  electionId: Yup.string().required("Election is required"),
  status: Yup.string().required("Status is required"),
});

const EditVoterModal: React.FC<EditVoterModalProps> = ({
  isOpen,
  onClose,
  voter,
  onSave,
}) => {
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedVoter = {
        ...voter,
        name: values.name,
        email: values.email,
        cnic: values.cnic,
        electionId: values.electionId,
        electionName:
          mockElections.find((e) => e.id === values.electionId)?.name ||
          voter.electionName,
        status: values.status,
      };

      if (onSave) {
        onSave(updatedVoter);
      }

      onClose();
    } catch (error) {
      console.error("Error updating voter:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Edit Voter
          </h5>
        </div>

        <Formik
          initialValues={{
            name: voter.name,
            email: voter.email,
            cnic: voter.cnic,
            electionId: voter.electionId,
            status: voter.status,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col">
              <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
                <div className="mt-7">
                  <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <InputField
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter voter name"
                      className={
                        touched.name && errors.name ? "border-red-500" : ""
                      }
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <InputField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      className={
                        touched.email && errors.email ? "border-red-500" : ""
                      }
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="cnic">CNIC/ID</Label>
                    <InputField
                      id="cnic"
                      name="cnic"
                      type="text"
                      placeholder="Enter CNIC/ID number"
                      className={
                        touched.cnic && errors.cnic ? "border-red-500" : ""
                      }
                    />
                    {touched.cnic && errors.cnic && (
                      <p className="mt-1 text-sm text-red-600">{errors.cnic}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="electionId">Assigned Election</Label>
                    <Select
                      options={mockElections.map((election) => ({
                        value: election.id,
                        label: election.name,
                      }))}
                      placeholder="Select an election"
                      onChange={(value) => setFieldValue("electionId", value)}
                      defaultValue={voter.electionId}
                      className={
                        touched.electionId && errors.electionId
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {touched.electionId && errors.electionId && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.electionId}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                      ]}
                      placeholder="Select status"
                      onChange={(value) => setFieldValue("status", value)}
                      defaultValue={voter.status}
                      className={
                        touched.status && errors.status ? "border-red-500" : ""
                      }
                    />
                    {touched.status && errors.status && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.status}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button size="sm" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Voter"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditVoterModal;
