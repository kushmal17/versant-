import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartD = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const hasStartedRef = useRef(false);

  const [showAudio, setShowAudio] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const questions = [
    "Question 1: Where was the story taking place?",
    "Question 2: What was the main problem in the story?",
    "Question 3: How was the problem solved?"
  ];

  
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    window.speechSynthesis.cancel();

    const intro = new SpeechSynthesisUtterance(
      "Part D. Answer questions about a passage. Listen to a story followed by three questions. Answer with a few words or a short sentence."
    );

    intro.rate = 0.9;

    intro.onend = () => {
      setTimeout(() => {
        setShowAudio(true);
      }, 1000); // 1 sec pause before audio
    };

    window.speechSynthesis.speak(intro);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // ✅ Auto Play Audio
  useEffect(() => {
    if (showAudio && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [showAudio]);

  // ✅ After Audio → 1 sec pause → Start Questions
  const handleAudioEnd = () => {
    setTimeout(() => {
      askQuestion(0);
    }, 1000); // 1 sec pause after audio
  };

  const askQuestion = (index) => {
    if (index >= questions.length) {
      navigate("/part-e");
      return;
    }

    setCurrentQuestion(index);

    const questionSpeech = new SpeechSynthesisUtterance(
      questions[index]
    );

    questionSpeech.rate = 0.9;

    questionSpeech.onend = () => {
      setShowRecordBtn(true);
    };

    window.speechSynthesis.speak(questionSpeech);
  };

  // ✅ Timer
  useEffect(() => {
    let timer;

    if (isRecording && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    if (timeLeft === 0 && isRecording) {
      stopRecording();
      setShowRecordBtn(false);
      setTimeLeft(10);
      askQuestion(currentQuestion + 1);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isRecording, currentQuestion]);

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

        <h1 className="text-3xl font-bold mb-6">Part D</h1>

        <p className="text-lg mb-6">
          Answer questions about a passage. Listen to a story followed by three questions.
        </p>

        {showAudio && (
          <div className="mb-6">
            <audio
              ref={audioRef}
              src="/audio/audio2.mp3"
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

export default PartD;