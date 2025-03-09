import React from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BidderHomePage = () => {
  return (
    <div style={styles.container}>
      <Container>
        <h2 style={styles.heading}>About AuctoEssence</h2>

        <Row style={styles.row}>
          <Col md={6}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title>About Bidders</Card.Title>
                <Card.Text>
                  As a bidder, you have access to a wide variety of auctions. You can place bids, track ongoing auctions, and manage your bids effectively. 
                </Card.Text>
                <Link to="/bidder-dashboard">
                  <Button variant="primary">Go to Dashboard</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title>Terms and Conditions</Card.Title>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Terms of Service</Accordion.Header>
                    <Accordion.Body>
                      By using this platform as a bidder, you agree to the following terms:
                      <ul>
                        <li>Participate in auctions with respect to other bidders.</li>
                        <li>Ensure timely payment if your bid is successful.</li>
                        <li>Comply with the auction rules and regulations.</li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Privacy Policy</Accordion.Header>
                    <Accordion.Body>
                      We respect your privacy. Your personal information will be kept secure and will only be used to facilitate your participation in auctions.
                      For more details, please refer to our full privacy policy.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div style={styles.actionsContainer}>
          <Link to="/bidder-dashboard">
            <Button variant="secondary" style={styles.actionButton}>Back to Dashboard</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

// Styles for the BidderHomePage
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#343a40',
    textAlign: 'center',
  },
  row: {
    marginBottom: '30px',
  },
  card: {
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  actionsContainer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  actionButton: {
    width: '200px',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '5px',
  },
};

export default BidderHomePage;
