import { useState } from "react";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { differenceInYears } from "date-fns";
import { CalenderIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Select from "./components/Select";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../common/Checkbox";
import Button from "../ui/button/Button";
import { countriesName } from "../../utils/constants";
import Flatpickr from "react-flatpickr";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      country: "",
      cnic: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      agreeToTerms: false,
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("First Name is required"),
      lname: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      country: Yup.string().required("Country is required"),
      cnic: Yup.string()
        .matches(
          /^\d{13}$/,
          "CNIC must be exactly 13 digits and no characters."
        )
        .required("CNIC is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      dateOfBirth: Yup.string()
        .required("Date of Birth is required")
        .test("is-18+", "You must be at least 18 years old", (value) => {
          if (!value) return false;
          return differenceInYears(new Date(), new Date(value)) >= 18;
        }),
      agreeToTerms: Yup.boolean()
        .oneOf([true], "You must agree to the Terms and Conditions")
        .required("You must agree to the Terms and Conditions"),
    }),
    onSubmit: (values) => {
      toast.success("Verification Email sent", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(JSON.stringify(values, null, 2));
      }, 2000);
    },
  });

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto p-10 lg:w-1/2  no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Sign Up
        </h1>
        <p className="text-sm text-gray-500 mb-8 dark:text-gray-400">
          Enter your information to sign up!
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label>First Name</Label>
              <Input {...formik.getFieldProps("fname")} placeholder="Wali" />
              {formik.touched.fname && formik.errors.fname && (
                <p className="text-red-500 text-sm">{formik.errors.fname}</p>
              )}
            </div>
            <div>
              <Label>Last Name</Label>
              <Input {...formik.getFieldProps("lname")} placeholder="Ahmad" />
              {formik.touched.lname && formik.errors.lname && (
                <p className="text-red-500 text-sm">{formik.errors.lname}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label>Email</Label>
              <Input
                {...formik.getFieldProps("email")}
                type="email"
                placeholder="walishykh@gmail.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <Label>Enter D.O.B</Label>
              <div className="relative w-full flatpickr-wrapper">
                <Flatpickr
                  value={formik.values.dateOfBirth}
                  onChange={(selectedDates) => {
                    if (selectedDates.length > 0) {
                      formik.setFieldValue(
                        "dateOfBirth",
                        selectedDates[0].toISOString().split("T")[0]
                      );
                    }
                  }}
                  options={{ dateFormat: "Y-m-d" }}
                  placeholder="2003-09-15"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-yellow-300 focus:ring-yellow-500/20 dark:border-gray-700  dark:focus:border-yellow-800"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <CalenderIcon className="size-6" />
                </span>
              </div>
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <p className="text-red-500 text-sm">
                  {formik.errors.dateOfBirth}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Select Country</Label>
            <Select
              options={countriesName}
              placeholder="Select your country"
              onChange={(value) => formik.setFieldValue("country", value)}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-sm">{formik.errors.country}</p>
            )}
          </div>
          <div>
            <Label>CNIC</Label>
            <Input
              {...formik.getFieldProps("cnic")}
              maxLength={13}
              placeholder="Enter your CNIC"
            />
            {formik.touched.cnic && formik.errors.cnic && (
              <p className="text-red-500 text-sm">{formik.errors.cnic}</p>
            )}
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <div>
            <Label>
              Confirm Password <span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...formik.getFieldProps("confirmPassword")}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showConfirmPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
            {formik.touched.password && formik.errors.confirmPassword ? (
              <p className="text-error-500 text-sm">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>

          <Checkbox
            checked={formik.values.agreeToTerms}
            onChange={() =>
              formik.setFieldValue("agreeToTerms", !formik.values.agreeToTerms)
            }
            label="Agree to Terms and Conditions"
          />
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
            <p className="text-red-500 text-sm">{formik.errors.agreeToTerms}</p>
          )}

          <div>
            <Button
              className="w-full flex items-center justify-center"
              size="sm"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
