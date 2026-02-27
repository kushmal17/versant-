import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-10 text-center">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-snug">
          Welcome {userName || "User"} 👋
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10 leading-relaxed">
          Click below to start your English speaking assessment.
        </p>

        <button
          onClick={() => navigate("/overview")}
          className="w-full bg-slate-800 hover:bg-slate-900 active:scale-95 transition-all duration-200 text-white py-3 px-6 rounded-lg text-sm sm:text-base font-medium"
        >
          Go to Test Overview
        </button>

      </div>
    </div>
  );
};

export default Dashboard;