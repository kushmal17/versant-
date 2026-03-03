import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartC = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [showAudio, setShowAudio] = useState(false);
  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showComplete, setShowComplete] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const hasStartedRef = useRef(false);

  
  useEffect(() => {
    if (hasStartedRef.current) return;   
    hasStartedRef.current = true;

    window.speechSynthesis.cancel();

    const intro = new SpeechSynthesisUtterance(
      "Part C. Listen to two people have a conversation. Then answer a question about the conversation."
    );

    intro.rate = 0.9;

    intro.onend = () => {
      setTimeout(() => {
        setShowAudio(true);
      }, 1000); 
    };

    window.speechSynthesis.speak(intro);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  
  useEffect(() => {
    if (showAudio && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [showAudio]);

  
  const handleAudioEnd = () => {
    setTimeout(() => {
      const question = new SpeechSynthesisUtterance(
        "What is the conclusion of the story?"
      );

      question.rate = 0.9;

      question.onend = () => {
        setShowRecordBtn(true);
      };

      window.speechSynthesis.speak(question);
    }, 1000); 
  };

  
  useEffect(() => {
    let timer;

    if (isRecording && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    if (timeLeft === 0 && isRecording) {
      stopRecording();
      navigate("/part-d");
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
      <div className="bg-[#e9e9eb] w-[900px] rounded-2xl shadow-md p-12 text-center">

        <h1 className="text-3xl font-bold mb-6">Part C</h1>

        <p className="text-lg mb-6">
          Listen to 2 people have a conversation. Then answer a question about the conversation.
        </p>

        {showAudio && (
          <div className="mb-6">
            <audio
              ref={audioRef}
              src="/audio/audio1.mp3"
              onEnded={handleAudioEnd}
              controls={false}
            />
            <p className="mt-4 text-gray-600">
              Please listen carefully. You will not be able to replay.
            </p>
          </div>
        )}

        {showRecordBtn && !isRecording && !showNext && (
          <button
            onClick={startRecording}
            className="mt-6 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg"
          >
            Record Answer
          </button>
        )}

        {isRecording && (
          <p className="mt-6 text-red-600 text-xl font-semibold">
            Time Left: {timeLeft}s
          </p>
        )}

        {showComplete && !showNext && (
          <button
            onClick={handleComplete}
            className="mt-4 bg-[#1f2f3f] text-white px-8 py-2 rounded-lg"
          >
            Complete
          </button>
        )}

        {showNext && (
          <button
            onClick={() => navigate("/part-d")}
            className="mt-6 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default PartC;