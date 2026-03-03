import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[600px] rounded-xl shadow-md p-12 text-center">
        
        <h1 className="text-3xl font-bold text-black mb-6">
          Welcome to Versant Alike Application
        </h1>

        <p className="text-gray-700 mb-8 text-lg">
          Click below to start your English speaking assessment.
        </p>

        <button
          onClick={() => navigate("/overview")}
          className="bg-[#1f2f3f] text-white px-10 py-3 rounded-md hover:opacity-90 transition"
        >
          Go to Test Overview
        </button>
      </div>
    </div>
  );
};

export default Dashboard;