import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartC = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const [showAudio, setShowAudio] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);
  const [questionSpoken, setQuestionSpoken] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showNext, setShowNext] = useState(false);

  const conversationAudio = "/audio/audio1.mp3";

  
  const speak = (text) =>
    new Promise((resolve) => {
      if (!window.speechSynthesis) return resolve();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = resolve;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });

  const waitForVoices = () =>
    new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length !== 0) resolve();
      else window.speechSynthesis.onvoiceschanged = () => resolve();
    });

  
  useEffect(() => {
    const startFlow = async () => {
      await waitForVoices();
      await speak("Part C.");
      await speak(
        "Listen to two people having a conversation. Then answer a question about the conversation."
      );
      await new Promise((res) => setTimeout(res, 1000));

      setShowAudio(true);
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 500);
    };

    startFlow();

    return () => {
      window.speechSynthesis.cancel();
      clearInterval(timerRef.current);
    };
  }, []);

  const handleAudioEnd = async () => {
    setAudioFinished(true);
    await speak("Now answer the question.");
    await speak("What time are they leaving for the airport?");
    setQuestionSpoken(true);
  };

  const startRecording = () => {
    setIsRecording(true);
    setShowNext(false);
    let seconds = 20;
    setTimeLeft(seconds);

    timerRef.current = setInterval(() => {
      seconds--;
      setTimeLeft(seconds);
      if (seconds <= 0) {
        clearInterval(timerRef.current);
        navigate("/part-d-intro", { replace: true });
      }
    }, 1000);
  };

  const handleComplete = () => {
    clearInterval(timerRef.current);
    setIsRecording(false);
    setShowNext(true);
  };

  const handleNext = () => {
    navigate("/part-d-intro", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">

        
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Part C</h2>

        <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
          Listen to two people having a conversation. Then, answer a question about the conversation. Answer with a few words or a short sentence.
        </p>

        
        {showAudio && !audioFinished && (
          <>
            <audio
              ref={audioRef}
              src={conversationAudio}
              controls
              controlsList="nodownload noplaybackrate"
              onEnded={handleAudioEnd}
              className="w-full mb-3 rounded"
            />
            <p className="text-gray-500 text-sm mb-4">
              Please listen carefully. You will not be able to replay.
            </p>
          </>
        )}

        
        {questionSpoken && !isRecording && !showNext && (
          <button
            onClick={startRecording}
            className="w-full bg-slate-800 hover:bg-slate-900 transition text-white py-3 rounded-full text-base font-medium mb-4"
          >
            🎙 Record Answer
          </button>
        )}

        
        {isRecording && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="text-lg font-semibold">⏱ {timeLeft} sec</div>
            <button
              onClick={handleComplete}
              className="w-full bg-slate-800 hover:bg-slate-900 transition text-white py-3 rounded-lg text-base font-medium"
            >
              Complete
            </button>
          </div>
        )}

        
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

export default PartC;