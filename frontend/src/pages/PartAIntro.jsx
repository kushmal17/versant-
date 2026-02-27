import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartAIntro = () => {
  const navigate = useNavigate();
  const [voiceFinished, setVoiceFinished] = useState(false);

  useEffect(() => {
    const speak = (text) =>
      new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      });

    const runVoiceSequence = async () => {
      await speak("Example for Part A.");
      await speak(
        "Listen to a question. Answer the question with one word or a few words."
      );

      await new Promise((res) => setTimeout(res, 1000));

      await speak("For example, when you hear:");
      await speak("What would a person use to open a locked door?");
      await speak("You say:");
      await speak("key");
      await speak("or");
      await speak("a key");

      await new Promise((res) => setTimeout(res, 1000));

      await speak("Click next to continue.");

      setVoiceFinished(true);
    };

    runVoiceSequence();

    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 py-10">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">

        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Example for Part A</h2>

        <p className="text-gray-700 text-sm sm:text-base mb-4">
          Listen to a question. Answer the question with one word or a few words.
        </p>

        <p className="font-medium mb-2">For example, when you hear:</p>

        <div className="bg-yellow-300 text-gray-800 rounded-lg p-4 mb-4">
          What would a person use to open a locked door?
        </div>

        <p className="mb-2">You say:</p>

        <div className="bg-green-300 text-gray-800 rounded-lg p-3 mb-2">
          key
        </div>

        <p className="my-1">or</p>

        <div className="bg-green-300 text-gray-800 rounded-lg p-3 mb-4">
          a key
        </div>

        {voiceFinished && (
          <button
            onClick={() => navigate("/part-a")}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg text-base font-medium transition-all duration-200 mt-6"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default PartAIntro;