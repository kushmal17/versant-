import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartCIntro = () => {
  const navigate = useNavigate();
  const [voiceDone, setVoiceDone] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = "auto";

    if (!("speechSynthesis" in window)) {
      setVoiceDone(true);
      return;
    }

    const speak = (text) =>
      new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      });

    const runVoice = async () => {
      await speak("Example for Part C. Answer a question about a conversation.");
      await new Promise((res) => setTimeout(res, 800));
      await speak(
        "Listen to two people have a conversation. Then answer a question about the conversation. Answer with a few words or a short sentence."
      );
      await new Promise((res) => setTimeout(res, 800));
      await speak(
        "For example. William. What time should we leave for the airport? John. let's see... The flight is at ten so we should leave at seven. William. Yes, that sounds right. I'll call for a taxi soon. So the Question for you is that. At what time are they leaving?"
      );
      await new Promise((res) => setTimeout(res, 500));
      await speak("You say. Seven. or. at seven O' clock");

      setVoiceDone(true);
    };

    runVoice();

    return () => {
      window.speechSynthesis.cancel();
      document.body.style.overflowY = "hidden";
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">

        
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Example for Part C</h2>

       
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
          Listen to 2 people have a conversation. Then answer a question about the conversation. Answer with a few words or a short sentence.
        </p>

        <p className="text-gray-500 mb-2 text-sm sm:text-base">For example, you hear:</p>

        
        <div className="bg-yellow-200 p-4 sm:p-5 rounded-xl text-left mb-6 leading-relaxed text-sm sm:text-base">
          <strong>William says:</strong> <br />
          What time should we leave for the airport? <br />
          <strong>John replies:</strong> <br />
          The flight is at 10, so we should leave at 7. <br />
          <strong>William says:</strong> <br />
          Yes, that sounds right. I'll call for a taxi soon. <br />
          <strong>Question:</strong> <br />
          What time are they leaving for the airport?
        </div>

        <p className="text-gray-500 mb-2 text-sm sm:text-base">You say:</p>

        
        <div className="bg-green-200 p-3 sm:p-4 rounded-xl font-medium leading-relaxed text-sm sm:text-base mb-6">
          seven <br />
          or <br />
          at seven O' clock
        </div>

        
        {voiceDone && (
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/part-c")}
              className="bg-slate-800 hover:bg-slate-900 text-white py-3 px-8 sm:px-10 rounded-full text-base sm:text-lg font-medium transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartCIntro;