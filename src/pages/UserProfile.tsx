import React, { useState } from "react";
import userLogo from "/userLogo.png";
import { ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { useAppSelector } from "../app/hook";

export const UserProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error } = useAppSelector((state) => state.userData);
  const handleBackClick = () => {
    navigate(-1); // Goes back to previous page
    // Alternatively use navigate('/') to go to home page
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 max-w-[1200px] w-full mx-auto">
      {/* Left Sidebar - Hidden on mobile when profile is open */}
      <div
        className={`col-span-12 lg:col-span-4 bg-[#F7F7F7] py-6 px-4 sm:px-7 ${
          isProfileOpen ? "hidden md:block" : ""
        }`}
      >
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Account
          </h3>
          <span className="text-gray-500/80 text-sm sm:text-base opacity-90">
            Manage your account info
          </span>

          <div
            className="flex items-center gap-3 bg-[#E9E9E9] rounded-lg transition-colors duration-200 cursor-pointer my-5 p-3 hover:bg-gray-200"
            onClick={() => setIsProfileOpen(true)}
          >
            <img
              src={userLogo}
              alt="User profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <h3 className="font-bold text-gray-700">Profile</h3>
            <ChevronRight className="w-5 h-5 ml-auto text-gray-500 md:hidden" />
          </div>
        </div>
      </div>

      {/* Right Content - Collapsible on mobile */}
      <div
        className={`col-span-12 lg:col-span-8 bg-white py-6 px-4 sm:px-7 ${
          !isProfileOpen ? "hidden md:block" : ""
        }`}
      >
        <div className="space-y-6">
          {/* Profile Details Header with Close Button */}
          <div className="flex justify-between items-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Profile details
            </h3>
            <button
              onClick={handleBackClick}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close profile"
            >
              <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <hr className="border-gray-200" />

          {/* Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4">
            <div className="md:col-span-4">
              <h3 className="font-bold text-gray-700">Profile</h3>
            </div>
            <div className="md:col-span-8 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={userLogo}
                alt="Profile"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-lg">
                  {data ? data.firstName.toUpperCase() : loading}
                </h3>
                <p className="text-gray-600 text-sm">Member since 2025</p>
              </div>
            </div>
          </div>
          <hr className="border-gray-200" />

          {/* Email Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4">
            <div className="md:col-span-4">
              <h3 className="font-bold text-gray-700">Email address</h3>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="text-gray-700">
                  {data ? data.email : loading}
                </span>
              </div>
            </div>
          </div>
          <hr className="border-gray-200" />
        </div>
      </div>
    </div>
  );
};
