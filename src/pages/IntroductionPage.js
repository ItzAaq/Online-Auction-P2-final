import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const IntroductionPage = () => {
  const navigate = useNavigate();

  // Navigate to Sign In page
  const handleSignIn = () => {
    navigate("/signin");
  };

  // Navigate to Sign Up page
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcomeText}>
        <h1>Welcome to AuctoEssence</h1>
        <p style={styles.description}>
          AuctoEssence is an innovative online auction platform where users can
          browse, bid, and win exciting items. Whether you're a buyer looking
          for great deals or a seller looking to offer unique products, our
          platform offers a secure, seamless, and engaging auction experience.
        </p>
      </div>

      <div style={styles.buttonContainer}>
        <Button variant="primary" onClick={handleSignIn} style={styles.button}>
          Sign In
        </Button>
        <Button
          variant="secondary"
          onClick={handleSignUp}
          style={styles.button}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f8f9fa", // Light background color for the start page
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
  },
  welcomeText: {
    textAlign: "center",
    color: "#000", // High contrast color for text
    fontWeight: "bold",
    fontSize: "3rem",
    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)", // Text shadow to make it stand out
    marginBottom: "20px",
  },
  description: {
    color: "#333", // Slightly lighter text for description
    fontSize: "1.2rem",
    marginBottom: "30px",
    maxWidth: "600px",
    textAlign: "center", // Center the paragraph
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button: {
    fontSize: "1.1rem",
    padding: "12px 24px",
    borderRadius: "5px",
  },
};

export default IntroductionPage;

