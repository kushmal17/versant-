import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartE = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);
  const hasSpokenRef = useRef(false);

  const [showAudio, setShowAudio] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordStarted, setRecordStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const passageAudio = "/audio/audio3.mp3";

  /* -------- AI INTRO -------- */
  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    const speakText =
      "Part E. Retell a passage. Listen to a short passage. Then retell as much of the passage as you can. You will have thirty seconds to answer.";

    const utterance = new SpeechSynthesisUtterance(speakText);
    utterance.rate = 0.95;

    utterance.onend = () => {
      setShowAudio(true);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  /* -------- AUDIO END -------- */
  const handleAudioEnd = () => {
    setAudioFinished(true);
  };

  /* -------- START RECORDING -------- */
  const startRecording = () => {
    setRecordStarted(true);   
    setIsRecording(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognitionRef.current = recognition;
      recognition.start();
    }

    startTimer();
  };

  /* -------- TIMER -------- */
  const startTimer = () => {
    let seconds = 30;
    setTimeLeft(seconds);

    const interval = setInterval(() => {
      seconds--;
      setTimeLeft(seconds);

      if (seconds <= 0) {
        clearInterval(interval);
        recognitionRef.current?.stop();
        navigate("/part-f-intro");
      }
    }, 1000);
  };

  return (
    <div>
      <div
        style={{
          width: "520px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h3>Part E: Retell a passage</h3>
        <br />
        <p style={{ marginBottom: "20px", color: "#444" }}>
          Listen to a short passage. Then retell as much of the passage as you can.
          You will have 30 seconds to answer.
        </p>

        {/* AUDIO */}
        {showAudio && !audioFinished && (
          <audio
            ref={audioRef}
            src={passageAudio}
            controls
            controlsList="nodownload noplaybackrate"
            style={{ width: "100%", marginBottom: "20px" }}
            onEnded={handleAudioEnd}
          />
        )}

        {/* RECORD BUTTON (ONLY ONCE) */}
        {audioFinished && !recordStarted && (
          <button
            onClick={startRecording}
            style={{
              padding: "12px 30px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#1f2d3d",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            🎙 Record Answer
          </button>
        )}

        {/* TIMER ONLY */}
        {isRecording && (
          <div
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "600"
            }}
          >
            ⏱ {timeLeft} sec
          </div>
        )}
      </div>
    </div>
  );
};

export default PartE;