import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartB = () => {
  const navigate = useNavigate();
  const mediaRecorderRef = useRef(null);

  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showComplete, setShowComplete] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    window.speechSynthesis.cancel(); 

    const speech = new SpeechSynthesisUtterance(
      "Part B. Listen to the sentence and repeat each sentence that you hear. And your sentence is: my name is John and I want to play badminton."
    );

    speech.rate = 0.9;

    speech.onend = () => {
      setShowRecordBtn(true);
    };

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;

    if (isRecording && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    if (timeLeft === 0 && isRecording) {
      stopRecording();
      navigate("/part-c-example");
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isRecording, navigate]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.start();
    setIsRecording(true);
    setShowComplete(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleComplete = () => {
    stopRecording();
    setShowNext(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[850px] rounded-2xl shadow-md p-14 text-center">

        <h1 className="text-3xl font-bold mb-6">
          Part B
        </h1>

        <p className="text-lg">
          Listen to the sentence and repeat it exactly.
        </p>

        {showRecordBtn && !isRecording && !showNext && (
          <button
            onClick={startRecording}
            className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
          >
            Record Answer
          </button>
        )}

        {isRecording && (
          <div className="mt-6">
            <p className="text-red-600 font-semibold text-xl">
              Time Left: {timeLeft}s
            </p>
          </div>
        )}

        {showComplete && !showNext && (
          <button
            onClick={handleComplete}
            className="mt-6 bg-[#1f2f3f] text-white px-8 py-2 rounded-lg hover:opacity-90 transition"
          >
            Complete
          </button>
        )}

        {showNext && (
          <button
            onClick={() => navigate("/part-c-example")}
            className="mt-6 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default PartB;