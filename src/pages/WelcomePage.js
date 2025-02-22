import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirect to the sign-in page
  };

  const handleSignUp = () => {
    navigate('/signup'); // Redirect to the sign-up page
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcomeText}>
        <h1>Welcome to the Online Auction Platform</h1>
        <p style={styles.description}>
          Browse through exciting items, place your bids, and win amazing products!
        </p>
      </div>
      <p style={styles.description}>
          (Make Sure to Sign Up at first)
        </p>


      <div style={styles.buttonContainer}>
        <Button variant="primary" onClick={handleLogin} style={styles.button}>Sign In</Button>
        <Button variant="secondary" onClick={handleSignUp} style={styles.button}>Sign Up</Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa', // Light background color for the start page
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
  welcomeText: {
    textAlign: 'center',
    color: '#000', // High contrast color for text
    fontWeight: 'bold',
    fontSize: '3rem',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Text shadow to make it stand out
    marginBottom: '20px',
  },
  description: {
    color: '#333', // Slightly lighter text for description
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    fontSize: '1.1rem',
    padding: '12px 24px',
    borderRadius: '5px',
  },
};

export default WelcomePage;
