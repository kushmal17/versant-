import React from "react";
import { useNavigate } from "react-router-dom";

const Complete = () => {
  const navigate = useNavigate();

  
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: "2rem 1rem",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#ffffff",
    borderRadius: "2rem",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    padding: "2rem",
    textAlign: "center",
  };

  const heading1Style = {
    fontSize: "1.25rem", 
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "0.75rem",
  };

  const heading2Style = {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#16a34a",
    marginBottom: "1rem",
  };

  const paragraphStyle = {
    fontSize: "0.875rem", 
    color: "#4b5563",
    lineHeight: 1.5,
    marginBottom: "2.5rem",
    padding: "0 0.25rem",
  };

  const buttonStyle = {
    width: "100%",
    maxWidth: "220px",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#111827",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={heading1Style}>🎉 Congratulations!</h1>
        <h2 style={heading2Style}>Test Completed Successfully</h2>
        <p style={paragraphStyle}>
          Thank you for completing the Versant Alike Test.
          <br />
          Your responses have been recorded.
        </p>
        <button
          style={buttonStyle}
          onClick={() => navigate("/", { replace: true })}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#111827")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1e293b")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          Back to Login Page
        </button>
      </div>
    </div>
  );
};

export default Complete;