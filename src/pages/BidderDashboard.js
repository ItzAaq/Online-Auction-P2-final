import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const BidderDashboard = ({ user, handleSignOut }) => {
  const navigate = useNavigate();  // Initialize navigate function
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user) {
      setShowAlert(true);
    }

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [user]);

  const handleHomeClick = () => {
    navigate('/bidder-home'); // Programmatically navigate to BidderHomePage
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container style={{ backgroundColor: 'transparent' }}>
          <Navbar.Brand href="#home" style={{ color: '#fff', fontWeight: 'bold' }}>
            Bidder Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto">
              {/* Update Home link to use navigate */}
              <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link onClick={handleSignOut} style={{ color: '#fff', fontWeight: 'bold' }}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={styles.container}>
        <h2 style={styles.heading}>Welcome to Your Bidder Dashboard</h2>

        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Successfully Signed In!</Alert.Heading>
            <p>Welcome back! You can now place bids on live auctions and track your bids.</p>
          </Alert>
        )}

        <p style={styles.introText}>
          As a Bidder, you can participate in ongoing auctions, place bids on items, and view auction results here.
        </p>

        <div style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Body>
              <Card.Title>Place New Bid</Card.Title>
              <Card.Text>Participate in live auctions by placing bids on your favorite items.</Card.Text>
              <Button variant="success" as={Link} to="/place-new-bid">
                Place New Bid
              </Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Body>
              <Card.Title>View Ongoing Auctions</Card.Title>
              <Card.Text>Browse through ongoing auctions and track the items you are interested in.</Card.Text>
              <Button variant="primary" as={Link} to="/ongoing-auctions">
                View Ongoing Auctions
              </Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Body>
              <Card.Title>My Bids</Card.Title>
              <Card.Text>View all the bids you've placed and track their status.</Card.Text>
              <Button variant="info" as={Link} to="/my-bids">
                View My Bids
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div style={styles.cancelBidContainer}>
          <Button variant="danger" as={Link} to="/cancel-bid">
            Cancel Bid
          </Button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#343a40',
  },
  introText: {
    fontSize: '1.2rem',
    color: '#495057',
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },
  card: {
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  cancelBidContainer: {
    marginTop: '30px',
  },
};

export default BidderDashboard;
