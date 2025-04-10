import React from "react";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import AuthImage from "../../assets/images/logo/auth-logo.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Theme toggler */}
        <div className="fixed z-50 top-6 right-6">
          <ThemeTogglerTwo />
        </div>

        {/* Left side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
          <img
            className="w-full h-full object-cover"
            src={AuthImage}
            alt="Authentication background"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Castify Admin</h1>
              <p className="text-lg opacity-90">
                Secure Election Management System
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
