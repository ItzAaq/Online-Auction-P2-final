import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignInPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("user");
    if (!storedUserData) {
      setError("No registered user found. Please sign up first.");
      return;
    }

    try {
      const storedUser = JSON.parse(storedUserData);
      if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("authenticatedUser", JSON.stringify({ email }));
        setIsAuthenticated(true); // Update authentication state
        navigate("/auction"); // Redirect to auction page
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
      setError("Something went wrong. Please try signing up again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign In</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSignIn}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
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
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "400px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "1.2rem",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
};

export default SignInPage;
