import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SampleSpeechTest = () => {
  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const navigate = useNavigate();
  const mediaRecorderRef = useRef(null);
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    const text = `
    Sample Speech Test.
    Record a speech sample.
    How do you like to spend your weekend time?
    Explain in detail.
    `;

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;

    speech.onend = () => {
      setShowRecordBtn(true);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }, []);

  // Countdown + Auto Navigation
  useEffect(() => {
    let timer;

    if (isRecording && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (isRecording && timeLeft === 0) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      navigate("/part-a-example");
    }

    return () => clearTimeout(timer);
  }, [isRecording, timeLeft, navigate]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.start();
    setIsRecording(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[800px] rounded-xl shadow-md p-12 text-center">

        <h1 className="text-3xl font-bold underline mb-6">
          Sample Speech Test:
        </h1>

        <h2 className="text-2xl font-semibold mb-6">
          Record a speech sample
        </h2>

        <p className="text-xl">
          How do you like to spend your weekend time? Explain in detail.
        </p>

        {showRecordBtn && !isRecording && (
          <button
            onClick={startRecording}
            className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
          >
            Record Answer
          </button>
        )}

        {isRecording && (
          <p className="mt-6 text-red-600 font-semibold text-xl">
            Time Left: {timeLeft}s
          </p>
        )}

      </div>
    </div>
  );
};

export default SampleSpeechTest;