import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const DashboardPage = () => {
  return (
    <Container>
      <h2 className="mt-4">Welcome to Your Dashboard</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Your Active Bids</Card.Title>
              <Card.Text>
                You have 3 active bids on different auctions.
              </Card.Text>
              <Button variant="primary">View My Bids</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Auctions</Card.Title>
              <Card.Text>
                Check out the latest auctions happening soon.
              </Card.Text>
              <Button variant="primary">Explore Auctions</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
