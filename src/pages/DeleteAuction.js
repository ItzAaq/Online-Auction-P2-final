import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Form } from 'react-bootstrap';
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
  background-color: #dc3545;
  border-color: #dc3545;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
    border-color: #c82333;
  }

  &:disabled {
    background-color: #6c757d;
    border-color: #6c757d;
  }
`;

const DeleteAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch auctions on page load
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('http://localhost:5000/auctions');
        const data = await response.json();
        setAuctions(data);
      } catch (err) {
        console.error('Error fetching auctions:', err);
        setAlertVariant('danger');
        setAlertMessage('Failed to fetch auctions.');
      }
    };
    fetchAuctions();
  }, []);

  // Handle auction selection
  const handleSelectAuction = (auction) => {
    setSelectedAuction(auction);
  };

  // Handle auction deletion
  const handleDeleteAuction = async () => {
    if (selectedAuction) {
      const token = JSON.parse(localStorage.getItem('authenticatedUser'))?.token; // Retrieve token from local storage
      console.log("Token:", token); // Log the token for debugging

      if (!token) {
        setAlertVariant('danger');
        setAlertMessage('You are not logged in!');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/auctions/${selectedAuction._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log("Response Status:", response.status); // Log the response status for debugging

        if (response.ok) {
          setAuctions(auctions.filter((auction) => auction._id !== selectedAuction._id));
          setSelectedAuction(null);
          setAlertVariant('success');
          setAlertMessage('Auction deleted successfully!');
        } else {
          const errorData = await response.json(); // Get error message from response
          console.error("Error Data:", errorData); // Log error data for debugging
          setAlertVariant('danger');
          setAlertMessage(errorData.message || 'Failed to delete auction. Please try again.');
        }
      } catch (err) {
        console.error('Error deleting auction:', err);
        setAlertVariant('danger');
        setAlertMessage('An error occurred while deleting the auction.');
      }
    } else {
      setAlertVariant('danger');
      setAlertMessage('No auction selected.');
    }
  };

  // Filter auctions based on search term
  const filteredAuctions = auctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Delete Auction</h2>

      {/* Success or Error Alert */}
      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
      )}

      <CardStyled>
        <CardBodyStyled>
          <h4>Search and Select Auction to Delete</h4>
          <Form.Control
            type="text"
            placeholder="Search Auctions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          <Row>
            <Col md={12}>
              <CardStyled>
                <CardBodyStyled>
                  <h5>Active Auctions</h5>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Auction Title</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAuctions.length > 0 ? (
                        filteredAuctions.map((auction) => (
                          <tr key={auction._id}>
                            <td>
                              <Button
                                variant="outline-primary"
                                onClick={() => handleSelectAuction(auction)}
                                active={selectedAuction?._id === auction._id}
                              >
                                Select
                              </Button>
                            </td>
                            <td>{auction.title}</td>
                            <td>{auction.description}</td>
                            <td>{new Date(auction.startDate).toLocaleDateString()}</td>
                            <td>{new Date(auction.endDate).toLocaleDateString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No auctions found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBodyStyled>
              </CardStyled>
            </Col>
          </Row>

          {/* Confirm Deletion */}
          {selectedAuction && (
            <div className="mt-4 text-center">
              <h5>Are you sure you want to delete the selected auction?</h5>
              <p>
                <strong>{selectedAuction.title}</strong>
              </p>
              <ButtonStyled onClick={handleDeleteAuction}>Delete Auction</ButtonStyled>
            </div>
          )}
        </CardBodyStyled>
      </CardStyled>
    </Container>
  );
};

export default DeleteAuction;
