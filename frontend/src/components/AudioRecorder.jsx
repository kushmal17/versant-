import { useState, useRef } from "react";

const AudioRecorder = ({ onRecordingStart, onRecordingComplete }) => {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

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
      setRecording(true);
      if (onRecordingStart) onRecordingStart();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onRecordingComplete) onRecordingComplete(transcript);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.onerror = () => {
      setRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <button
      onClick={startRecording}
      disabled={recording}
      className="btn-primary"
    >
      {recording ? "Recording..." : "🎤 Start Recording"}
    </button>
  );
};

export default AudioRecorder;
