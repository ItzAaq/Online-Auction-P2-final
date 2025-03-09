import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/introduction'); // Redirect to Introduction page
  };

  return (
    <div style={styles.container}>
      {/* Main Text Section */}
      <div style={styles.welcomeText}>
        <h1>AuctoEssence</h1>
        <p style={styles.tagline}>
          Discover exciting items, place your bids, and win amazing products!
        </p>
      </div>

      {/* Get Started Button */}
      <div style={styles.buttonContainer}>
        <Button 
          variant="primary" 
          onClick={handleGetStarted} 
          style={styles.button}
        >
          Get Started
        </Button>
      </div>

      {/* Footer Section */}
      <div style={styles.footer}>
        <p style={styles.footerText}>© 2025 AuctoEssence. All rights reserved.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f0f8ff', // Light background for the page
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
  },
  welcomeText: {
    color: '#1f3c5c', // Dark blue for the main heading
    fontWeight: 'bold',
    fontSize: '3rem',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)', // Subtle text shadow for emphasis
    marginBottom: '20px',
  },
  tagline: {
    color: '#555', // Lighter color for the tagline
    fontSize: '1.3rem',
    marginBottom: '25px',
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  infoText: {
    color: '#333',
    fontSize: '1.1rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  button: {
    fontSize: '1.1rem',
    padding: '12px 24px',
    borderRadius: '8px',
    width: '180px',
  },
  footer: {
    position: 'absolute',
    bottom: '20px',
    color: '#333',
    fontSize: '1rem',
  },
  footerText: {
    margin: 0,
  },
};

export default WelcomePage;


