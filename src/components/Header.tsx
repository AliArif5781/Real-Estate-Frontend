import { useState, useEffect, useRef } from "react";
import { data, Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import { User } from "lucide-react";
import userLogo from "/userLogo.png";
import { getUserData } from "../features/property/UserData";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { unwrapResult } from "@reduxjs/toolkit";
import { logoutUser } from "../features/property/LogoutUser/logoutUser";
// import { Skeleton } from "@/components/ui/skeleton"; // Replace with your skeleton component

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux hooks

  const {
    data: userData,
    loading,
    error,
  } = useAppSelector((state) => state.userData);
  // console.log(userData, "userData Header");

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const userDropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  // Header.tsx
  const handleUserClick = async () => {
    setIsUserDropdownOpen(true);
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutUser()).unwrap();
      setIsUserDropdownOpen(false);
      toast.success("user logout successfully", {
        duration: 2000,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error("Logout failed:", error);
    }
  };

  return (
    <nav className="relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to={"/"}>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-2xl font-bold text-gray-800">
                BrandName
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative py-2 px-1 text-gray-700 font-medium transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-600"
                }`
              }
              end
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                      layoutId="desktopActiveIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative py-2 px-1 text-gray-700 font-medium transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                      layoutId="desktopActiveIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>

            {/* <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative py-2 px-1 text-gray-700 font-medium transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact Us
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                      layoutId="desktopActiveIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink> */}

            {/* User Profile Section */}
            <div className="relative" ref={dropdownRef}>
              <motion.div
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={handleUserClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <User className="h-6 w-6 text-gray-700" /> */}
                <img src={userLogo} alt="" className="h-[2.7rem]" />
              </motion.div>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={userDropdownVariants}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      {loading || !userData ? (
                        <>
                          <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-900">
                            {userData?.firstName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {userData?.email}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="py-1">
                      {loading ? (
                        <>
                          <div className="animate-pulse space-y-1">
                            <div className="h-8 bg-gray-200 rounded mx-2"></div>
                            <div className="h-8 bg-gray-200 rounded mx-2"></div>
                            <div className="h-8 bg-gray-200 rounded mx-2"></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <NavLink
                            to="/userProfile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Your Profile
                          </NavLink>
                          <NavLink
                            to="/postPage"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Create Post
                          </NavLink>
                          {/* <NavLink
                            to="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Settings
                          </NavLink> */}
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleLogout}
                          >
                            Sign out
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              <motion.div
                className="space-y-2 py-2"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.div variants={navItemVariants}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-indigo-600 font-semibold bg-indigo-50"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    end
                  >
                    Home
                  </NavLink>
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-indigo-600 font-semibold bg-indigo-50"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </NavLink>
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-indigo-600 font-semibold bg-indigo-50"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </NavLink>
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <NavLink
                    to="/userProfile"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-indigo-600 font-semibold bg-indigo-50"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    User Profile
                  </NavLink>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
