// ActiveAuctions.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardStyled = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CardBodyStyled = styled(Card.Body)`
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  padding: 25px;
`;

const ActiveAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('http://localhost:5000/auctions');
        const data = await response.json();
        setAuctions(data);
      } catch (err) {
        console.error('Error fetching auctions:', err);
      }
    };
    fetchAuctions();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAuctions = auctions.filter(auction =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle "View Details" button click
  const handleViewDetails = (auctionId) => {
    navigate(`/auction-details/${auctionId}`);  // Navigate to auction details page with auction ID
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Active Auctions</h2>

      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Control
            type="text"
            placeholder="Search Auctions"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ borderRadius: '20px', padding: '10px 20px' }}
          />
        </Col>
      </Row>

      <Row>
        {filteredAuctions.map((auction) => (
          <Col key={auction._id} md={4}>
            <CardStyled>
              <CardBodyStyled>
                <Card.Title>{auction.title}</Card.Title>
                <Card.Text>{auction.description}</Card.Text>
                <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={() => handleViewDetails(auction._id)} // Call to navigate to details page
                >
                  View Details
                </Button>
              </CardBodyStyled>
            </CardStyled>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ActiveAuctions;
