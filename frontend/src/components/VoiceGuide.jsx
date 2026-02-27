import { useEffect } from "react";

const VoiceGuide = ({ text, onStart, onEnd }) => {
  useEffect(() => {
    if (!text || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);

  return null;
};

export default VoiceGuide;
