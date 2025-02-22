import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button, Dropdown, Row, Col, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuctionPage = ({ isAuthenticated, user }) => {
  const [showModal, setShowModal] = useState(true); // Set to true for testing purposes
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        setShowModal(false); // Hide modal after 5 seconds
      }, 5000);
    }
  }, [isAuthenticated]);

  const handleLogOut = () => {
    // Reset authentication status and redirect to Welcome page
    localStorage.removeItem('user'); // Clear stored user data
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Online Auction</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#auction-items">Auction Items</Nav.Link>
            <Nav.Link href="#bids">Bids</Nav.Link>
          </Nav>

          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-profile">
              Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#settings">User Settings</Dropdown.Item>
              <Dropdown.Item href="#profile">{user ? user.name : "User Profile"}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Separate Logout Button */}
          <Button variant="danger" onClick={handleLogOut} style={styles.logoutButton}>
            Log Out
          </Button>
        </Container>
      </Navbar>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <p style={styles.modalText}>You have successfully logged in!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} style={styles.modalButton}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Auction Items Section */}
      <div style={styles.content}>
        <h2 style={styles.welcomeText}>Welcome to the Auction!</h2>
        <p style={styles.welcomeText}>Place your bids on exciting items below.</p>

        {/* Auction Item Cards */}
        <Row>
          <Col sm={12} md={6} lg={4}>
            <Card style={styles.card}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Auction Item 1</Card.Title>
                <Card.Text>
                  Description of the auction item goes here. Start bidding!
                </Card.Text>
                <Button variant="primary">Bid Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <Card style={styles.card}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Auction Item 2</Card.Title>
                <Card.Text>
                  Description of the auction item goes here. Start bidding!
                </Card.Text>
                <Button variant="primary">Bid Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <Card style={styles.card}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Auction Item 3</Card.Title>
                <Card.Text>
                  Description of the auction item goes here. Start bidding!
                </Card.Text>
                <Button variant="primary">Bid Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#e9ecef',
    height: '100vh',
    padding: '20px',
  },
  content: {
    marginTop: '50px',
    textAlign: 'center',
  },
  card: {
    borderRadius: '15px',
    marginBottom: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logoutButton: {
    marginLeft: '10px',
  },
  welcomeText: {
    color: '#000', // Dark text for high contrast
    fontWeight: 'bold',
    fontSize: '2rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', // Adding subtle shadow for better visibility
    marginBottom: '20px',
  },

  // Modal Styles
  modalHeader: {
    backgroundColor: '#28a745', // Green background
    color: '#fff',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  modalBody: {
    backgroundColor: '#e2f4e1', // Light green background for better contrast
    textAlign: 'center',
  },
  modalText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#28a745',
  },
  modalButton: {
    backgroundColor: '#28a745', // Green button
    borderColor: '#28a745',
  },
};

export default AuctionPage;
