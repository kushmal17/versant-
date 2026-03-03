import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartE = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const hasStartedRef = useRef(false);

  const [showAudio, setShowAudio] = useState(false);
  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);


  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    window.speechSynthesis.cancel();

    const intro = new SpeechSynthesisUtterance(
      "Part E. Retell a passage. Listen to a short passage. Then retell as much of the passage as you can. You will have 30 seconds to answer."
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
        "Now retell the passage. Try to include as many details as possible."
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
      navigate("/part-f");
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isRecording, navigate]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.start();
    setIsRecording(true);
    setShowRecordBtn(false);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[900px] rounded-2xl shadow-md p-12 text-center">

        <h1 className="text-3xl font-bold mb-6">
          Part E: Retell a passage
        </h1>

        <p className="text-lg mb-6">
          Listen to a short passage. Then retell as much of the passage as you can.
          You will have 30 seconds to answer.
        </p>

        {showAudio && (
          <div className="mb-6">
            <audio
              ref={audioRef}
              src="/audio/audio3.mp3"
              onEnded={handleAudioEnd}
              controls={false}
            />
            <p className="mt-4 text-gray-600">
              Please listen carefully. You will not be able to replay.
            </p>
          </div>
        )}

        {showRecordBtn && !isRecording && (
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

      </div>
    </div>
  );
};

export default PartE;