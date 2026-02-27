import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

const Sample = () => {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const question =
    "How do you like to spend your weekend time? Explain in detail.";

  const [readyToRecord, setReadyToRecord] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // 🔊 AI Voice Sequence
  useEffect(() => {
    const speak = (text) =>
      new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      });

    const runSequence = async () => {
      await speak("Record a speech sample.");
      await new Promise((res) => setTimeout(res, 1000));

      await speak("You have 30 seconds to answer.");
      await new Promise((res) => setTimeout(res, 1000));

      await speak(question);

      setReadyToRecord(true);
    };

    runSequence();

    return () => window.speechSynthesis.cancel();
  }, []);

  // 🎙 Start Recording
  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
      setTimerActive(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // ⏱ When Timer Ends
  const handleTimeUp = () => {
    setTimerActive(false);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    navigate("/part-A-intro");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center"
      }}
    >
      {/* Content Box */}
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Record a speech sample
        </h2>

        <p style={{ fontSize: "18px" }}>
          {question}
        </p>

        {/* Timer */}
        {timerActive && (
          <div style={{ marginTop: "20px" }}>
            <Timer duration={30} onTimeUp={handleTimeUp} />
          </div>
        )}

        {/* Recording Button */}
        {readyToRecord && !timerActive && (
          <button
            onClick={startRecording}
            disabled={isRecording}
            style={{
              marginTop: "30px",
              padding: "12px 30px",
              backgroundColor: "#1f2d3d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            {isRecording ? "Recording..." : "🎤 Start Recording"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Sample;