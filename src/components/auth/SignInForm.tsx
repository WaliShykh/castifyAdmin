import { useState } from "react";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../common/Checkbox";
import Button from "../ui/button/Button";
import { toast } from "react-toastify";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      cnic: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        toast.success("Login successful!", {
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
        // Redirect to dashboard or handle login logic
        console.log("Login values:", values);
      }, 1500);
    },
  });

  return (
    <div className="flex flex-col flex-1 p-8 lg:p-12">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to your admin account
            </p>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-5">
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Remember me
                    </span>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                  >
                    Forgot password?
                  </Link>
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
                      "Sign in"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
