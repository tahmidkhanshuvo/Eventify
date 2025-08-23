import React, { useState } from "react";
import { Switch } from "@mui/material";
// SVG Icon for the logo
const LogoIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_1_2)" />
    <defs>
      <linearGradient
        id="paint0_linear_1_2"
        x1="0"
        y1="0"
        x2="40"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC700" />
        <stop offset="1" stopColor="#A259FF" />
      </linearGradient>
    </defs>
  </svg>
);

// SVG Icon for Google
const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path
      fill="white"
      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5.03,16.48 5.03,12.55C5.03,8.62 8.36,5.82 12.19,5.82C14.04,5.82 15.33,6.57 16.18,7.38L18.23,5.49C16.5,4 14.47,3 12.19,3C7.38,3 3.37,7.03 3.37,12.55C3.37,18.07 7.38,22.1 12.19,22.1C17.01,22.1 21.54,18.49 21.54,12.79C21.54,12.03 21.48,11.53 21.35,11.1Z"
    />
  </svg>
);

// SVG Icon for the eye (password visibility)
const EyeIcon = ({ visible }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-400 cursor-pointer"
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

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    // Main container: Column layout on mobile, row on large screens
    <div className="w-full min-h-screen flex flex-col lg:flex-row font-sans">
      
      {/* Image Section: Takes full width on mobile, half on large screens */}
      <div className="w-full lg:w-1/2 h-64 lg:h-screen relative">
        <img
          className="object-cover w-full h-full"
          src="https://media.istockphoto.com/id/1465441739/photo/romantic-night-scene.jpg?s=612x612&w=0&k=20&c=gt2thGqqfyvlEd4BkvFfG7ca8Jq_rUeFZhTg_bOh6cU="
          alt="A sailboat on the water near a lighthouse"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1000x1200/a7d8de/ffffff?text=Scenic+View";
          }}
        />
        <div className="absolute bottom-4 left-4 text-white text-xs sm:text-sm bg-black bg-opacity-30 p-2 rounded">
          Photo by Alexandr Popadin
        </div>
      </div>

      {/* Form Section: Takes full width on mobile, half on large screens */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <LogoIcon />
            <span className="text-lg sm:text-xl font-sora-300 text-gray-800">
              UI Unicorn
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-sora-500 text-gray-900 mb-6 sm:mb-8">
            Nice to see you again
          </h2>

          {/* Form */}
          <form className="space-y-5 sm:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="px-2 block text-sm font-medium text-gray-700 mb-1"
              >
                Login
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email or phone number"
                className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="px-2 block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center top-7"
                onClick={togglePasswordVisibility}
              >
                <EyeIcon visible={passwordVisible} />
              </div>
            </div>
            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-3 sm:gap-0">
            <div className="flex items-center gap-2">
            <Switch
              size="sm"
              color="primary"
              variant="outlined"
              id="remember-me"
              slotProps={{ input: { 'aria-label': 'Remember me' } }}
              />
            <label htmlFor="remember-me" className="text-gray-900 font-sora">
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
              className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Sign in
            </button>

            <hr class="h-px  bg-gray-200 border-0 dark:bg-gray-300"/>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
            >
              <GoogleIcon />
               sign in with Google
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up now
            </a>
          </p>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-10 sm:mt-12 text-xs text-gray-500 gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  fill="url(#paint0_linear_footer)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_footer"
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                  >
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
