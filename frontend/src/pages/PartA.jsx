import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartA = () => {
  const navigate = useNavigate();
  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRecording, setIsRecording] = useState(false);

  // 🔊 AI Voice Sequence
  useEffect(() => {
    const speak = (text) =>
      new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      });

    const runVoice = async () => {
      await speak("Part A.");
      await speak("Give a short answer to the question.");
      await speak(
        "Listen to a question. Answer the question with one word or a few words."
      );

      await new Promise((res) => setTimeout(res, 1000));

      await speak("What color is the sky on a clear day?");

      // Show record button after question
      setShowRecordBtn(true);
    };

    runVoice();

    return () => window.speechSynthesis.cancel();
  }, []);

  // ⏱ Timer Logic
  useEffect(() => {
    let timer;

    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (isRecording && timeLeft === 0) {
      navigate("/part-B-intro"); // ✅ Correct navigation
    }

    return () => clearInterval(timer);
  }, [isRecording, timeLeft, navigate]);

  const startRecording = () => {
    setIsRecording(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#ffffff",
          padding: "50px 40px",
          borderRadius: "16px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Heading */}
        <h2 style={{ marginBottom: "20px" }}>Part A</h2>

        <p style={{ marginBottom: "20px", fontSize: "18px" }}>
          Listen carefully and answer in one word.
        </p>

        {/* Record Button */}
        {showRecordBtn && !isRecording && (
          <button
            onClick={startRecording}
            style={{
              padding: "12px 28px",
              backgroundColor: "#1f2d3d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            🎙 Record Answer
          </button>
        )}

        {/* Timer */}
        {isRecording && (
          <div
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "500",
              color: "#1f2d3d",
            }}
          >
            ⏱ {timeLeft} sec
          </div>
        )}
      </div>
    </div>
  );
};

export default PartA;