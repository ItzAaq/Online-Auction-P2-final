import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import styled from 'styled-components'; // Import styled-components

const CardStyled = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 30px;
`;

const CardBodyStyled = styled(Card.Body)`
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  padding: 25px;
`;

const ButtonStyled = styled(Button)`
  font-size: 1.2rem;
  padding: 15px;
  background-color: #007bff;
  border-color: #007bff;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    border-color: #6c757d;
  }
`;

const FormControlStyled = styled(Form.Control)`
  border-radius: 10px;
  font-size: 1.1rem;
  padding: 12px;
`;

const AlertStyled = styled(Alert)`
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 1rem;
  padding: 15px;
`;

const ButtonOutlineInfoStyled = styled(Button)`
  border: 2px solid #007bff;
  color: #007bff;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const ButtonOutlineDangerStyled = styled(Button)`
  border: 2px solid #dc3545;
  color: #dc3545;

  &:hover {
    background-color: #dc3545;
    color: #fff;
  }
`;

const CancelBidPage = () => {
  const [auctionItem, setAuctionItem] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [placedBid, setPlacedBid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelBid = () => {
    setSuccess(false); // Reset success state
    setAuctionItem('');
    setBidAmount('');
    setPlacedBid(null);
    setError('Your bid has been successfully canceled.');
  };

  const handlePlaceAnotherBid = () => {
    setSuccess(false); // Reset success state
    setAuctionItem('');
    setBidAmount('');
    setPlacedBid(null);
    setError('Feel free to place a new bid.');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={6} md={8} sm={12}>
          <CardStyled className="shadow-lg rounded">
            <CardBodyStyled className="p-4">
              <Card.Title className="text-center mb-4">
                <h3 className="text-danger">Cancel a Bid</h3>
                <p className="text-muted">You can cancel a placed bid here.</p>
              </Card.Title>

              {/* Show Error or Success Alert */}
              {error && <AlertStyled variant="danger" className="p-2">{error}</AlertStyled>}
              {success && <AlertStyled variant="success" className="p-2">Your bid has been canceled successfully!</AlertStyled>}

              {/* Cancel Bid Section */}
              {placedBid && (
                <Row className="mt-5 text-center">
                  <Col>
                    <CardStyled className="shadow-lg rounded">
                      <CardBodyStyled>
                        <h5 className="text-danger">Cancel Your Bid</h5>
                        <p className="text-muted">You have placed a bid on the following item:</p>
                        <h4>{placedBid.item}</h4>
                        <p className="text-primary">Amount: ${placedBid.amount}</p>

                        {/* Cancel Bid Button */}
                        <ButtonOutlineDangerStyled variant="outline-danger" className="w-100 mt-3" onClick={handleCancelBid}>
                          Cancel Bid
                        </ButtonOutlineDangerStyled>

                        {/* Place Another Bid Button */}
                        <ButtonOutlineInfoStyled variant="outline-info" className="w-100 mt-3" onClick={handlePlaceAnotherBid}>
                          Place Another Bid
                        </ButtonOutlineInfoStyled>
                      </CardBodyStyled>
                    </CardStyled>
                  </Col>
                </Row>
              )}
            </CardBodyStyled>
          </CardStyled>
        </Col>
      </Row>
    </Container>
  );
};

export default CancelBidPage;
