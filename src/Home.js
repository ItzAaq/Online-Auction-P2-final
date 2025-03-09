// src/components/Home.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToBidderDashboard = () => {
    navigate('/bidder-dashboard');
  };

  const goToAuctioneerDashboard = () => {
    navigate('/auctioneer-dashboard');
  };

  return (
    <Container style={{ marginTop: '100px', textAlign: 'center' }}>
      <h1>Welcome to AuctoEssence</h1>
      <p>Choose your role to continue:</p>
      <Button onClick={goToBidderDashboard} style={{ margin: '20px' }}>
        I'm a Bidder
      </Button>
      <Button onClick={goToAuctioneerDashboard} style={{ margin: '20px' }}>
        I'm an Auctioneer
      </Button>
    </Container>
  );
};

export default Home;
