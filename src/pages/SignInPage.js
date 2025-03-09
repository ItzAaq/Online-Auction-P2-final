import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignInPage = ({ handleSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignInClick = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/login", {  // <-- Change here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.token && data.userType) {
          const userData = {
            token: data.token,
            userType: data.userType,
          };

          localStorage.setItem("authenticatedUser", JSON.stringify(userData));
          handleSignIn(userData);  // Call the handleSignIn function passed from parent

          setEmail("");
          setPassword("");

          // Redirect to the appropriate dashboard
          if (data.userType === "bidder") {
            navigate("/bidder-dashboard");
          } else if (data.userType === "auctioneer") {
            navigate("/auctioneer-dashboard");
          }
        } else {
          setError("Invalid response from server.");
        }
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Error signing in. Please try again.");
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Clear the error after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSignInClick}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={styles.button}>
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('https://source.unsplash.com/random/1920x1080?tech,city')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    zIndex: 2,
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    fontSize: "1.1rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default SignInPage;
