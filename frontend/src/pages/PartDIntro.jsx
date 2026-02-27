import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartDIntro = () => {
  const navigate = useNavigate();
  const [voiceDone, setVoiceDone] = useState(false);

  
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setVoiceDone(true);
      return;
    }

    const speak = (text) =>
      new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      });

    const runVoice = async () => {
      await speak("Part D.");
      await speak("Answer questions about a passage.");
      await new Promise((res) => setTimeout(res, 1000));
      await speak(
        "Listen to a story followed by a question about the story. Answer the questions with a few words or a short sentence."
      );

      setVoiceDone(true);
    };

    runVoice();

    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          backgroundColor: "#ffffff",
          padding: "50px 40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Part D: Answer questions about a passage
        </h2>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "28px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Listen to a story followed by a question about the story.
          Answer the questions with a few words or a short sentence.
        </p>

       
        {voiceDone && (
          <button
            onClick={() => navigate("/part-d")}
            style={{
              marginTop: "20px",
              padding: "12px 35px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#1f2d3d",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PartDIntro;
