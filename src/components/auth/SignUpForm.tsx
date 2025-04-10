import { useState } from "react";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      cnic: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Full name is required"),
      cnic: Yup.string()
        .matches(
          /^\d{13}$/,
          "CNIC must be exactly 13 digits and no characters."
        )
        .required("CNIC is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        // Redirect to dashboard or handle signup logic
        console.log("Signup values:", values);
      }, 1500);
    },
  });

  return (
    <div className="flex flex-col flex-1 p-8 lg:p-12">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
              Create an Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign up to get started with your admin account
            </p>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-5">
                <div>
                  <Label>
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full"
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.fullName}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label>
                    CNIC <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="cnic"
                    placeholder="1234567890123"
                    maxLength={13}
                    value={formik.values.cnic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full"
                  />
                  {formik.touched.cnic && formik.errors.cnic ? (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.cnic}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label>
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="admin@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label>
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label>
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Button
                    className="w-full flex items-center justify-center"
                    size="md"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
