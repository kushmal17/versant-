import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SpeakingTips = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    if (hasSpokenRef.current) return; // Prevent double speaking
    hasSpokenRef.current = true;

    const text = `
    Speaking Tips.
    It is important to speak naturally during the test.
    Here are some tips.
    Speak at a normal speed like you would during a conversation.
    Speak like you are talking to another person on the phone.
    There is no need to speak too slowly or carefully.
    Speak at a normal volume, not too loud or too soft.
    When you are ready, click Next.
    `;

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;

    speech.onend = () => {
      setShowButton(true);
    };

    window.speechSynthesis.cancel(); // clear any duplicate queue
    window.speechSynthesis.speak(speech);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center bg-[#cfcbd1] py-16">
      
      <h1 className="text-4xl font-semibold mb-10 text-black">
        Speaking Tips
      </h1>

      <div className="bg-[#e9e9eb] w-[900px] rounded-xl shadow-md p-12 text-lg leading-8">
        
        <p className="mb-6">
          It is important to <span className="font-bold">speak naturally</span> during the test.
        </p>

        <p className="mb-4">Here are some tips:</p>

        <ul className="list-disc pl-6 space-y-4">
          <li>
            Speak at a <span className="font-bold">normal speed</span> like you would during a conversation.
          </li>
          <li>
            Speak like you are <span className="font-bold">talking to another person</span> on the phone. 
            There is no need to speak too slowly or carefully.
          </li>
          <li>
            Speak at a <span className="font-bold">normal volume</span>, not too loud or too soft.
          </li>
        </ul>

        <p className="mt-8">
          When you are ready, click <span className="font-bold">Next</span>.
        </p>

      </div>

      {showButton && (
        <button
          onClick={() => navigate("/sample-speech-test")}
          className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default SpeakingTips;