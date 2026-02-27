import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartEIntro = () => {
  const navigate = useNavigate();
  const hasSpokenRef = useRef(false);
  const [voiceFinished, setVoiceFinished] = useState(false);

  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    if (!("speechSynthesis" in window)) {
      setVoiceFinished(true);                                                                             
      return;
    }

    const speakText =
      "Example for Part E. Retell a passage. Listen to a short passage. Then retell as much of the passage as you can. You will have thirty seconds to answer.";

    const utterance = new SpeechSynthesisUtterance(speakText);

    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    
    utterance.onend = () => {
      setVoiceFinished(true);
    };

    window.speechSynthesis.cancel();

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 300);
  }, []);

  return (
    <div>
      
      <div
        style={{
          width: "450px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>
          Example for Part E
        </h3>

        <p style={{ fontWeight: "600", marginBottom: "20px" }}>
          Retell a passage
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            color: "#444",
            marginBottom: "30px"
          }}
        >
          Listen to a short passage. Then, retell as much of the passage
          as you can. You will have 30 seconds to answer.
        </p>
       
        {voiceFinished && (
          <button
            onClick={() => navigate("/part-e")}
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
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PartEIntro;