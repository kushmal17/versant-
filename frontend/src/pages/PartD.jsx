import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartD = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const [phase, setPhase] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showRecord, setShowRecord] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const storyAudio = "/audio/audio2.mp3";

  const questions = [
    "Where did the boy go on vacation?",
    "What did he lose at the beach?",
    "How did he feel at the end of the day?"
  ];

  /* ---------- SPEAK ---------- */
  const speak = (text) =>
    new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = resolve;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });

  /* ---------- INTRO FLOW ---------- */
  useEffect(() => {
    const runIntro = async () => {
      await speak("Part D. Answer questions about a passage.");
      await speak(
        "Listen to a story followed by three questions. Answer with a few words or a short sentence."
      );

      setPhase("audio");

      // autoplay (works after speech)
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 800);
    };

    runIntro();

    return () => {
      window.speechSynthesis.cancel();
      clearInterval(timerRef.current);
    };
  }, []);

  /* ---------- AUDIO END ---------- */
  const handleAudioEnd = () => {
    setPhase("question");
    askQuestion(0);
  };

  /* ---------- ASK QUESTION ---------- */
  const askQuestion = async (index) => {
    if (index >= questions.length) {
      navigate("/part-e-intro", { replace: true });
      return;
    }

    setCurrentQuestion(index);
    setShowRecord(false);
    setIsRecording(false);

    await speak(`Question ${index + 1}. ${questions[index]}`);
    setShowRecord(true);
  };

  /* ---------- RECORD ---------- */
  const startRecording = () => {
    setShowRecord(false);
    setIsRecording(true);
    startTimer();
  };

  /* ---------- TIMER ---------- */
  const startTimer = () => {
    let seconds = 10;
    setTimeLeft(seconds);

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      seconds--;
      setTimeLeft(seconds);

      if (seconds <= 0) {
        clearInterval(timerRef.current);
        setIsRecording(false);
        askQuestion(currentQuestion + 1);
      }
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "500px",
          height:"300px",
          background: "#fff",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h2>Part D</h2>
        <br />
        <p>Answer questions about a passage. Listen to a story followed by three questions. Answer with a few words or a short sentence.</p>

        {phase === "audio" && (
          <>
            <p style={{ marginTop: "15px" }}>
              Please listen carefully. You will not be able to replay. 
            </p>

            <audio
              ref={audioRef}
              src={storyAudio}
              controls
              controlsList="nodownload noplaybackrate"
              onEnded={handleAudioEnd}
              style={{
                width: "100%",
                marginTop: "20px",
                borderRadius: "40px"
              }}
            />
          </>
        )}

        {phase === "question" && (
          <div style={{ marginTop: "25px" }}>
            <p>
             <b> Question {currentQuestion + 1} of {questions.length}</b>
            </p>

            {showRecord && (
              <button
                onClick={startRecording}
                style={{
                  marginTop: "15px",
                  padding: "10px 25px",
                  backgroundColor: "#1f2d3d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                🎙 Record Answer
              </button>
            )}

            {isRecording && (
              <h3 style={{ marginTop: "20px" }}>
                ⏱ {timeLeft} sec
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartD;