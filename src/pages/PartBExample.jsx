import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartBExample = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.speechSynthesis.cancel(); 

    const text = `
    Example for Part B.
    Repeat each sentence that you hear.
    For example, you hear:
    My flight was just cancelled.
    Then you have to say:
    My flight was just cancelled.
    click next to continue.
    `;

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;

    speech.onend = () => {
      setShowButton(true);
    };

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel(); 
    };
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[850px] rounded-2xl shadow-md p-14 text-center">

        <h1 className="text-3xl font-bold mb-6">
          Example for Part B
        </h1>

        <p className="text-lg mb-6">
          Repeat each sentence that you hear.
        </p>

        <p className="text-lg mb-4">
          For example, You hear:
        </p>

        <div className="bg-[#e6b97a] rounded-xl py-4 px-6 mb-6 text-lg">
          My flight was just cancelled.
        </div>

        <p className="text-lg mb-4">
          You say:
        </p>

        <div className="bg-[#a8bea0] rounded-xl py-4 px-6 text-lg">
          My flight was just cancelled.
        </div>

        {showButton && (
          <button
            onClick={() => navigate("/part-b")}
            className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default PartBExample;