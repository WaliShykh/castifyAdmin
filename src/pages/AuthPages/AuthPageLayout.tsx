import React from "react";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import AuthImage from "../../assets/images/logo/auth-logo.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative px-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <div className="fixed z-50 hidden top-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>

        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <img
            className="h-screenw-screen h-screen object-cover"
            src={AuthImage}
            alt="Logo"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
