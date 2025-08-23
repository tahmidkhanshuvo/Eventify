import React, { useState } from "react";

// SVG Icon for the logo
const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_1_2)" />
    <defs>
      <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFC700" />
        <stop offset="1" stopColor="#A259FF" />
      </linearGradient>
    </defs>
  </svg>
);

// SVG Icon for Google
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5.03,16.48 5.03,12.55C5.03,8.62 8.36,5.82 12.19,5.82C14.04,5.82 15.33,6.57 16.18,7.38L18.23,5.49C16.5,4 14.47,3 12.19,3C7.38,3 3.37,7.03 3.37,12.55C3.37,18.07 7.38,22.1 12.19,22.1C17.01,22.1 21.54,18.49 21.54,12.79C21.54,12.03 21.48,11.53 21.35,11.1Z"
    />
  </svg>
);

// SVG Icon for the eye (password visibility)
const EyeIcon = ({ visible }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-gray-400 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {visible ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-1.292-1.292"
      />
    )}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5.5A6.5 6.5 0 0118.5 12 6.5 6.5 0 0112 18.5 6.5 6.5 0 015.5 12 6.5 6.5 0 0112 5.5z"
    />
  </svg>
);

export default function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Function to toggle the visibility of the main password field.
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to toggle the visibility of the confirm password field.
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    // Main container using Flexbox for a two-column layout on large screens.
    // min-h-screen to ensure it takes at least the full viewport height.
    <div className="w-full min-h-screen flex flex-col lg:flex-row font-sans">
      
      {/* Image Section: Takes half width on large screens and grows. */}
      {/* h-64 on mobile, but flex-grow on large screens to fill vertical space. */}
      <div className="w-full lg:w-1/2 h-64 lg:h-screen relative overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src="https://media.istockphoto.com/id/1465441739/photo/romantic-night-scene.jpg?s=612x612&w=0&k=20&c=gt2thGqqfyvlEd4BkvFfG7ca8Jq_rUeFZhTg_bOh6cU="
          alt="A sailboat on the water near a lighthouse"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/1000x1200/a7d8de/ffffff?text=Scenic+View";
          }}
        />
        <div className="absolute bottom-2 left-2 text-[10px] sm:text-xs bg-black bg-opacity-30 p-1 rounded">
          Photo by Alexandr Popadin
        </div>
      </div>

      {/* Form Section: Takes half width on large screens. */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-2">
        <div className="w-full max-w-lg px-6">
          {/* Header */}
          <div className="flex items-center gap-1 mb-2 sm:mb-3">
            <LogoIcon />
            <span className="text-sm sm:text-base font-medium text-gray-800">
              UI Unicorn
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
            Nice to see you again
          </h2>

          {/* Form with a responsive grid layout */}
          <form className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-x-3">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email or phone number"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-x-3">
              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Password
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-1 flex items-center top-3"
                  onClick={togglePasswordVisibility}
                >
                  <EyeIcon visible={passwordVisible} />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Confirm Password
                </label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Enter password"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-1 flex items-center top-3"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <EyeIcon visible={confirmPasswordVisible} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-x-3">
              {/* University */}
              <div>
                <label htmlFor="university" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  University
                </label>
                <input
                  type="text"
                  id="university"
                  placeholder="University Name"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              
              {/* Student ID */}
              <div>
                <label htmlFor="studentId" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  placeholder="Student ID"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-x-3">
              {/* Academic Year */}
              <div>
                <label htmlFor="academicYear" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Academic Year
                </label>
                <input
                  type="text"
                  id="academicYear"
                  placeholder="Academic Year"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  placeholder="Department Name"
                  className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Home Address (spanning full width) */}
            <div>
              <label htmlFor="homeAddress" className="px-2 block text-[10px] font-medium text-gray-700 mb-0.5">
                Home Address
              </label>
              <input
                type="text"
                id="homeAddress"
                placeholder="Home Address"
                className="w-full px-2 py-1 bg-gray-100 text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] gap-2 sm:gap-0">
              <div className="flex items-center gap-1">
                {/* Checkbox for "Remember me" */}
                <input 
                  type="checkbox" 
                  id="remember-me" 
                  className="rounded text-blue-500 focus:ring-blue-500" 
                />
                <label htmlFor="remember-me" className="text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            
            {/* Submit Buttons */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-1.5 px-3 rounded-lg text-xs hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Sign Up
            </button>

            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300"/>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
            >
              <GoogleIcon />
              Sign in with Google
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-[10px] text-gray-600 mt-3">
            Already have an account?{" "}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in now
            </a>
          </p>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-3 text-[10px] text-gray-500 gap-2 sm:gap-0">
            <div className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_footer)" />
                <defs>
                  <linearGradient id="paint0_linear_footer" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFC700" />
                    <stop offset="1" stopColor="#A259FF" />
                  </linearGradient>
                </defs>
              </svg>
              <span>uiunicorn.com</span>
            </div>
            <span>© Perfect Login 2021</span>
          </div>
        </div>
      </div>
    </div>
  );
}
