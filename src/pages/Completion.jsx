import React from "react";
import { useNavigate } from "react-router-dom";

const Completion = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[800px] rounded-2xl shadow-md p-12 text-center">

        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
          🎉 Test Completed Successfully
        </h1>

        <p className="text-lg mb-8">
          Thank you for completing the Versant Alike Test.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
        >
          Go to Login
        </button>

      </div>
    </div>
  );
};

export default Completion;