import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock, FaRegUserCircle } from 'react-icons/fa';

// Reusable Input Component
const InputField = ({ label, type, value, onChange, placeholder, icon }) => (
  <Form.Group controlId={label} className="mb-3">
    <Form.Label>{label}</Form.Label>
    <div className="input-icon-container">
      <span className="input-icon">{icon}</span>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  </Form.Group>
);

// Styled Components for Styling
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #f8f9fa, #e9ecef);
  position: relative;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 1.5rem;  /* Reduced padding */
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
  margin: 15px;  /* Reduced margin */
  border: 1px solid #e0e0e0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 15px;  /* Reduced margin */
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 12px;  /* Reduced padding */
  margin-top: 15px;  /* Reduced margin */
  font-size: 1rem;  /* Smaller font size */
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const RoleDescription = styled.p`
  font-size: 13px;  /* Smaller font size */
  color: #555;
  text-align: center;
  margin-top: 20px;  /* Reduced margin */
  margin-bottom: 0;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 25px;
  color: #007bff;
`;

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("bidder");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle sign-up button click
  const handleSignUpClick = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUserType("bidder");
        alert("User created successfully! You can now sign in.");
        navigate("/signin");  // Redirect to the sign-in page
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Container>
      <FormContainer>
        <IconContainer>
          <FaRegUserCircle />
        </IconContainer>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSignUpClick}>
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            icon={<FaEnvelope />}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            icon={<FaLock />}
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            icon={<FaLock />}
          />
          <Form.Group controlId="userType" className="mb-3">
            <Form.Label>User Type</Form.Label>
            <Form.Control
              as="select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="bidder">Bidder</option>
              <option value="auctioneer">Auctioneer</option>
            </Form.Control>
          </Form.Group>

          {/* Show error message if present */}
          {error && <Alert variant="danger">{error}</Alert>}

          <SubmitButton variant="primary" type="submit">
            Sign Up
          </SubmitButton>
        </Form>

        <RoleDescription>
          Already have an account? <a href="/signin" style={{ color: '#007bff' }}>Sign In</a>
        </RoleDescription>
      </FormContainer>
    </Container>
  );
};

export default SignUpPage;
