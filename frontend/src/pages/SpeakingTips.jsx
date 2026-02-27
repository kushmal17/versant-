import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpeakingTips = () => {
  const navigate = useNavigate();
  const [voiceFinished, setVoiceFinished] = useState(false);

  const fullText = `
  It is important to speak naturally during the test.
  Here are some tips.
  Speak at a normal speed like you would during a conversation.
  Speak like you are talking to another person on the phone.
  There is no need to speak too slowly or carefully.
  Speak at a normal volume, not too loud or too soft.
  When you are ready, click Next.
  `;

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.95;

    utterance.onend = () => {
      setVoiceFinished(true);
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center"
      }}
    >
      {/* Heading */}
      <h1
        style={{
          fontSize: "26px",
          marginBottom: "30px",
          fontWeight: "600"
        }}
      >
        Speaking Tips
      </h1>

      {/* Content Box */}
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          textAlign: "left",
          lineHeight: "1.7",
          fontSize: "18px"
        }}
      >
        <p>
          It is important to <strong>speak naturally</strong> during the test.
        </p>

        <p style={{ marginTop: "15px" }}>
          Here are some tips:
        </p>

        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          <li>
            Speak at a <strong>normal speed</strong> like you would during a conversation.
          </li>
          <li>
            Speak like you are <strong>talking to another person</strong> on the phone.
            There is no need to speak too slowly or carefully.
          </li>
          <li>
            Speak at a <strong>normal volume</strong>, not too loud or too soft.
          </li>
        </ul>

        <p style={{ marginTop: "20px" }}>
          When you are ready, click <strong>Next</strong>.
        </p>
      </div>

      {/* Next Button (After AI finishes) */}
      {voiceFinished && (
        <button
          onClick={() => navigate("/sample")}
          style={{
            marginTop: "40px",
            padding: "12px 40px",
            backgroundColor: "#1f2d3d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default SpeakingTips;