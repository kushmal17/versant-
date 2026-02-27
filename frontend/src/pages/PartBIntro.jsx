import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartBIntro = () => {
  const navigate = useNavigate();
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const speak = (text) =>
      new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      });

    const runVoice = async () => {
      await speak("Example for Part B.");
      await speak("Repeat the sentence.");
      await speak("Repeat each sentence that you hear.");
      await speak("For example, you hear.");
      await speak("My flight was just cancelled.");
      await speak("then you have to say the same sentence.");
      await speak("you will say.");
      await speak("My flight was just cancelled.");

      setShowNext(true);
    };

    runVoice();

    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">

       
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Example for Part B</h2>

        <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
          Repeat each sentence that you hear.
        </p>

        <p className="text-gray-500 mb-2">For example, you hear:</p>
        <div className="bg-yellow-200 text-gray-800 rounded-lg inline-block px-4 py-3 mb-6 text-base">
          My flight was just cancelled.
        </div>

        <p className="text-gray-500 mb-2">You say:</p>
        <div className="bg-green-200 text-gray-800 rounded-lg inline-block px-4 py-3 mb-6 text-base">
          My flight was just cancelled.
        </div>

        
        {showNext && (
          <button
            onClick={() => navigate("/part-b")}
            className="w-full bg-slate-800 hover:bg-slate-900 transition text-white py-3 rounded-lg text-base font-medium mt-6"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default PartBIntro;