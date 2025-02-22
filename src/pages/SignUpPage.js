import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Ensure passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify({ email, password }));

    alert("Sign-up successful! Please sign in.");
    navigate('/signin'); // Redirect to sign-in page instead of auction page
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign Up</h2>
        <Form onSubmit={handleSignUp}>
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

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={styles.button}>
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.4))', // Glossy effect
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    textAlign: 'center',
    padding: '20px',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Matte effect
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '1.2rem',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
};

export default SignUpPage;
