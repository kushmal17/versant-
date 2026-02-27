import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PartA = () => {
  const navigate = useNavigate();
  const hasSpokenRef = useRef(false);

  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRecording, setIsRecording] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const question = "What color is the sky on a clear day?";


  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    if (!("speechSynthesis" in window)) {
      setShowRecordBtn(true);
      return;
    }

    const speakSequence = async () => {
      const speak = (text) =>
        new Promise((resolve) => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.95;
          utterance.onend = resolve;
          window.speechSynthesis.speak(utterance);
        });

      window.speechSynthesis.cancel();

      await speak("Part A.");
      await speak("Give a short answer to the question.");
      await speak(
        "Listen to a question. Answer the question with one word or a few words."
      );
      await new Promise((res) => setTimeout(res, 800));
      await speak(question);

      setShowRecordBtn(true);
    };

    const timer = setTimeout(() => {
      speakSequence();
    }, 300);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [question]);

  
  useEffect(() => {
    let timer;

    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRecording) {
      navigate("/part-B-intro");
    }

    return () => clearInterval(timer);
  }, [isRecording, timeLeft, navigate]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const handleComplete = () => {
    setIsRecording(false);
    setShowNext(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">

        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Part A</h2>

        <p className="text-gray-700 text-sm sm:text-base mb-6">
          Listen to a question. Answer the question with one word or a few words.
        </p>

        
        {showRecordBtn && !isRecording && !showNext && (
          <button
            onClick={startRecording}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg text-base font-medium transition-all duration-200"
          >
            🎙 Record Answer
          </button>
        )}

        
        {isRecording && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="text-lg font-semibold">⏱ {timeLeft} sec</div>

            <button
              onClick={handleComplete}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg text-base font-medium transition-all duration-200"
            >
              Complete
            </button>
          </div>
        )}

        
        {showNext && (
          <button
            onClick={() => navigate("/part-B-intro")}
            className="w-full mt-6 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg text-base font-medium transition-all duration-200"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default PartA;