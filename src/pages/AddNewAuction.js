import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Container, Alert } from 'react-bootstrap';
import styled from 'styled-components';

const CardStyled = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const CardBodyStyled = styled(Card.Body)`
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  padding: 30px;
`;

const ButtonStyled = styled(Button)`
  font-size: 1.2rem;
  padding: 12px;
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

const AddNewAuction = () => {
  const [auctionTitle, setAuctionTitle] = useState('');
  const [auctionDescription, setAuctionDescription] = useState('');
  const [auctionStartDate, setAuctionStartDate] = useState('');
  const [auctionEndDate, setAuctionEndDate] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemStartingBid, setItemStartingBid] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!auctionTitle || !auctionDescription || !auctionStartDate || !auctionEndDate || !itemName || !itemDescription || !itemStartingBid) {
      setAlertVariant('danger');
      setAlertMessage('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auctionTitle,
          auctionDescription,
          auctionStartDate,
          auctionEndDate,
          itemName,
          itemDescription,
          itemStartingBid,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlertVariant('success');
        setAlertMessage(data.message);
      } else {
        setAlertVariant('danger');
        setAlertMessage(data.message);
      }
    } catch (err) {
      setAlertVariant('danger');
      setAlertMessage('An error occurred while adding the auction.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add New Auction</h2>
      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Row>
        <Col md={8} className="mx-auto">
          <CardStyled>
            <CardBodyStyled>
              <Form onSubmit={handleFormSubmit}>
                <h4>Auction Details</h4>
                <Form.Group className="mb-3">
                  <Form.Label>Auction Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter auction title"
                    value={auctionTitle}
                    onChange={(e) => setAuctionTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Auction Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter auction description"
                    value={auctionDescription}
                    onChange={(e) => setAuctionDescription(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Auction Start Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={auctionStartDate}
                        onChange={(e) => setAuctionStartDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Auction End Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={auctionEndDate}
                        onChange={(e) => setAuctionEndDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h4 className="mt-4">Item Information</h4>
                <Form.Group className="mb-3">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter item description"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Item Starting Bid</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter starting bid"
                    value={itemStartingBid}
                    onChange={(e) => setItemStartingBid(e.target.value)}
                  />
                </Form.Group>

                <ButtonStyled variant="primary" type="submit" className="w-100">
                  Create Auction
                </ButtonStyled>
              </Form>
            </CardBodyStyled>
          </CardStyled>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewAuction;
