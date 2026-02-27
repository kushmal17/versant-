import { useEffect, useState } from "react";

const Timer = ({ duration = 30, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div
      style={{
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "600"
      }}
    >
      ⏱ {timeLeft}s
    </div>
  );
};

export default Timer;
