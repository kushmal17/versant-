import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartFIntro = () => {
  const navigate = useNavigate();
  const hasSpokenRef = useRef(false);
  const [voiceDone, setVoiceDone] = useState(false);

 
  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    if (!("speechSynthesis" in window)) {
      setVoiceDone(true);                                                     
      return;
    }

    const speakText =
      "Example for Part F. Give your opinion. Listen to a question, and give your opinions or ideas. You will have thirty seconds to answer.";

    const utterance = new SpeechSynthesisUtterance(speakText);
    utterance.rate = 0.95;

    utterance.onend = () => {
      setVoiceDone(true); 
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
          width: "520px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          Example for Part F: Give your opinion
        </h2>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "26px",
            color: "#444",
            marginBottom: "15px"
          }}
        >
          Listen to a question, and give your opinions or ideas.
          Answer the question with as much detail as you can.
        </p>

        
        {voiceDone && (
          <button
            onClick={() => navigate("/part-f")}
            style={{
              padding: "12px 35px",
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

export default PartFIntro;