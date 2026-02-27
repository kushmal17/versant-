import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const sentences = [
  "Modern technology has transformed communication by breaking geographical barriers."
];

const PartB = () => {
  const navigate = useNavigate();
  const hasSpokenRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRecording, setIsRecording] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const currentSentence = sentences[currentIndex];

  const speak = (text) =>
    new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = resolve;
      window.speechSynthesis.speak(utterance);
    });

  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    const runFlow = async () => {
      window.speechSynthesis.cancel();
      setShowRecordBtn(false);

      await speak("Part B. Listen to the question.");
      await speak(
        "Answer the question with one word or a few words. And your sentence is"
      );
      await new Promise((res) => setTimeout(res, 800));
      await speak(currentSentence);

      setShowRecordBtn(true);
    };

    const timer = setTimeout(runFlow, 300);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [currentIndex]);

  useEffect(() => {
    let timer;

    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRecording) {
      handleNext();
    }

    return () => clearInterval(timer);
  }, [isRecording, timeLeft]);

  const startRecording = () => {
    setIsRecording(true);
    setShowNext(false);
  };

  const handleComplete = () => {
    setIsRecording(false);
    setShowNext(true);
  };

  const handleNext = () => {
    setIsRecording(false);

    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(20);
      setShowNext(false);
      setShowRecordBtn(false);
      hasSpokenRef.current = false;
    } else {
      navigate("/part-C-intro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">

        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Part B
        </h2>

        <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
          Listen to the question. Answer the question with one word or a few words.
        </p>

        {/* Record Button */}
        {showRecordBtn && !isRecording && !showNext && (
          <button
            onClick={startRecording}
            className="w-full bg-slate-800 hover:bg-slate-900 transition text-white py-3 rounded-full text-base font-medium"
          >
            🎙 Record Answer
          </button>
        )}

        {/* Recording Section */}
        {isRecording && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="text-lg font-semibold">
              ⏱ {timeLeft} sec
            </div>

            <button
              onClick={handleComplete}
              className="w-full bg-slate-800 hover:bg-slate-900 transition text-white py-3 rounded-lg text-sm font-medium"
            >
              Complete
            </button>
          </div>
        )}

        {/* Next Button */}
        {showNext && (
          <button
            onClick={handleNext}
            className="w-full mt-6 bg-slate-800 hover:bg-slate-900 transition text-white py-3 rounded-lg text-base font-medium"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PartB;