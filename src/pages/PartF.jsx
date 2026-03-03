import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartF = () => {
  const navigate = useNavigate();
  const hasStartedRef = useRef(false);

  const questions = [
    "Do you think social media has a positive or negative impact on society?",
    "Do you believe technology makes people more connected or more isolated?"
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerStarted, setTimerStarted] = useState(false);
  const [typingDisabled, setTypingDisabled] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    window.speechSynthesis.cancel();

    const intro = new SpeechSynthesisUtterance(
      "Part F. Give your opinion. Listen to a question and give your opinions or ideas. Answer the question with as much detail as you can."
    );

    intro.rate = 0.9;

    intro.onend = () => {
      setTimeout(() => {
        speakQuestion(0);
      }, 1000);
    };

    window.speechSynthesis.speak(intro);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakQuestion = (index) => {
    const speech = new SpeechSynthesisUtterance(questions[index]);

    speech.rate = 0.9;

    speech.onend = () => {
      setTypingDisabled(false);
    };

    window.speechSynthesis.speak(speech);
  };

  
  useEffect(() => {
    let timer;

    if (timerStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    if (timeLeft === 0 && timerStarted) {
      setTypingDisabled(true);
      setTimerStarted(false);

      if (questionIndex === 0) {
        setShowNext(true);
      } else {
        setShowSubmit(true);
      }
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerStarted, questionIndex]);

  const handleTyping = (e) => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
    setAnswer(e.target.value);
  };

  const handleNext = () => {
    setQuestionIndex(1);
    setAnswer("");
    setTimeLeft(30);
    setTypingDisabled(true);
    setShowNext(false);

    speakQuestion(1);
  };

  const handleSubmit = () => {
    navigate("/completion");
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[900px] rounded-2xl shadow-md p-12 text-center">

        <h1 className="text-3xl font-bold mb-4">
          Part F: Give your opinion
        </h1>

        <p className="mb-6">
          Listen to a question and give your opinions or ideas.
          Answer the question with as much detail as you can.
        </p>

        <div className="text-lg font-semibold mb-4">
          ⏱ {timeLeft} sec
        </div>

        <p className="text-lg mb-6">
          {questions[questionIndex]}
        </p>

        <textarea
          value={answer}
          onChange={handleTyping}
          disabled={typingDisabled}
          className="w-full h-40 p-4 rounded-lg border border-gray-400"
        />

        {showNext && (
          <button
            onClick={handleNext}
            className="mt-6 bg-[#1f2f3f] text-white px-8 py-3 rounded-lg"
          >
            Next
          </button>
        )}

        {showSubmit && (
          <button
            onClick={handleSubmit}
            className="mt-6 bg-[#1f2f3f] text-white px-8 py-3 rounded-lg"
          >
            Submit
          </button>
        )}

      </div>
    </div>
  );
};

export default PartF;