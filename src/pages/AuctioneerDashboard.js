import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Card, Row, Col, Alert, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AuctioneerDashboard = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState(null); // State to store user information
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by checking localStorage
    const userData = localStorage.getItem("authenticatedUser");

    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.token && parsedData.userType) {
        // Display alert only on the first visit after sign-in
        setShowAlert(true);

        // Set user information
        setUser(parsedData);

        // Hide the alert after 5 seconds
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer
      }
    } else {
      navigate("/signin"); // Redirect to sign-in if no user data found
    }
  }, [navigate]);

  const handleSignOut = () => {
    // Clear the user data from localStorage and redirect to sign-in page
    localStorage.removeItem("authenticatedUser");
    navigate("/signin");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container style={{ backgroundColor: "transparent" }}>
          <Navbar.Brand href="/auctioneer-home" style={{ color: "#fff", fontWeight: "bold" }}>
            Auctioneer Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto">
              {/* Update the Home link */}
              <Nav.Link as={Link} to="/auctioneer-home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ms-auto">
            {/* Profile Dropdown */}
            {user && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-profile" style={{ color: "#fff", fontWeight: "bold" }}>
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>Email: {user.email}</Dropdown.Item>
                  <Dropdown.Item disabled>Role: {user.userType}</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {/* Sign Out Tab */}
            <Nav.Link onClick={handleSignOut} style={{ color: "#fff", fontWeight: "bold" }}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={styles.container}>
        <h2 style={styles.heading}>Welcome to Your Auctioneer Dashboard</h2>

        {/* Show alert only after successful sign-in */}
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Successfully Signed In!</Alert.Heading>
            <p>Welcome back! You can now manage your auctions, add new ones, and control your auction house.</p>
          </Alert>
        )}

        <p style={styles.introText}>
          As an Auctioneer, you can manage and create auctions, and control your auction house here.
        </p>

        <Row style={styles.row}>
          <Col md={6}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title>Active Auctions</Card.Title>
                <Card.Text>View and manage all your ongoing auctions.</Card.Text>
                <Link to="/active-auctions">
                  <Button variant="primary">View Active Auctions</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title>Add New Auction</Card.Title>
                <Card.Text>Start a new auction with custom details and items.</Card.Text>
                <Link to="/add-new-auction">
                  <Button variant="success">Add New Auction</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div style={styles.actionsContainer}>
          <Link to="/delete-auction">
            <Button variant="danger" style={styles.actionButton}>
              Delete Auction
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#343a40",
  },
  introText: {
    fontSize: "1.2rem",
    color: "#495057",
    marginBottom: "30px",
  },
  row: {
    marginBottom: "30px",
  },
  card: {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  actionsContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  actionButton: {
    width: "200px",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "5px",
  },
};

export default AuctioneerDashboard;
