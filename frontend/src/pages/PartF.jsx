import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  "Do you think social media has a positive or negative impact on society?",
  "Should students be required to wear uniforms at school?"
];

const PartF = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  /* ---------------- SPEAK FUNCTION ---------------- */
  const speak = (text) =>
    new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = resolve;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });

  /* ---------------- TIMER ---------------- */
  const startTimer = () => {
    let seconds = 30;
    setTimeLeft(seconds);
    setIsTimeUp(false);

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      seconds--;
      setTimeLeft(seconds);

      if (seconds <= 0) {
        clearInterval(timerRef.current);
        setIsTimeUp(true);
      }
    }, 1000);
  };

  /* ---------------- NEXT QUESTION ---------------- */
  const handleNext = async () => {
    setAnswer("");
    setQuestionVisible(false);

    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);

      await new Promise((res) => setTimeout(res, 800));
      await speak(questions[nextIndex]);

      setQuestionVisible(true);
      startTimer();
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    navigate("/completion-page", { replace: true });
  };

  /* ---------------- INITIAL FLOW ---------------- */
  useEffect(() => {
    const runFlow = async () => {
      await speak("Part F. Give your opinion.");
      await speak(
        "You will hear a question. Answer the question with as much detail as you can."
      );

      await new Promise((res) => setTimeout(res, 1000));

      await speak(questions[0]);

      setQuestionVisible(true);
      startTimer();
    };

    runFlow();

    return () => {
      window.speechSynthesis.cancel();
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          minHeight: "350px",
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Part F: Give your opinion
        </h2>

        {questionVisible && (
          <>
            {/* TIMER */}
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "15px",
                color: "#1f2d3d",
              }}
            >
              ⏱ {timeLeft} sec
            </div>

            {/* QUESTION */}
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              {questions[currentIndex]}
            </p>

            {/* TEXTAREA */}
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isTimeUp}
              rows="6"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "none",
                backgroundColor: isTimeUp ? "#f2f2f2" : "white",
              }}
            />

            {/* NEXT BUTTON */}
            {isTimeUp && currentIndex === 0 && (
              <button
                onClick={handleNext}
                style={{
                  marginTop: "25px",
                  padding: "12px 25px",
                  backgroundColor: "#1f2d3d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            )}

            {/* SUBMIT BUTTON */}
            {isTimeUp && currentIndex === 1 && (
              <button
                onClick={handleSubmit}
                style={{
                  marginTop: "25px",
                  padding: "12px 25px",
                  backgroundColor: "#1f2d3d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PartF;