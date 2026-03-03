import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[450px] rounded-xl shadow-md p-10">
        
        <h2 className="text-3xl font-semibold text-center text-[#1f2f3f] mb-8">
          Start Your Test
        </h2>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md px-4 py-3 bg-[#f3f3f3] focus:outline-none"
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-4 py-3 bg-[#f3f3f3] focus:outline-none"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 bg-[#f3f3f3] focus:outline-none"
          />

          <button
            onClick={handleContinue}
            className="w-full bg-[#1f2f3f] text-white py-3 rounded-md mt-4 hover:opacity-90 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;