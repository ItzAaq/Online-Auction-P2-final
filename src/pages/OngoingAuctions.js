import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Inline Styles (CSS)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '30px',
  },
  auctionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '20px',
  },
  auctionCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    padding: '20px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  auctionCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  titleText: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  description: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
    minHeight: '50px', // To make the text block uniform
  },
  startDate: {
    fontSize: '12px',
    color: '#777',
    marginBottom: '20px',
  },
  bidButton: {
    padding: '12px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  bidButtonHover: {
    backgroundColor: '#0056b3',
  },
};

const OngoingAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const fetchOngoingAuctions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auctions');
      setAuctions(response.data);
    } catch (error) {
      console.error('Error fetching ongoing auctions:', error);
    }
  };

  useEffect(() => {
    fetchOngoingAuctions();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ongoing Auctions</h1>
      <div style={styles.auctionGrid}>
        {auctions.map((auction) => (
          <div
            key={auction._id}
            style={{
              ...styles.auctionCard,
              ...(hoveredCard === auction._id ? styles.auctionCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(auction._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {auction.itemImage && (
              <img
                src={`http://localhost:5000/${auction.itemImage}`}
                alt={auction.itemName}
                style={styles.image}
              />
            )}
            <h2 style={styles.titleText}>{auction.itemName}</h2>
            <p style={styles.description}>{auction.itemDescription}</p>
            <p style={styles.startDate}>Starts on: {new Date(auction.startDate).toLocaleDateString()}</p>
            <button
              style={{
                ...styles.bidButton,
                ...(hoveredButton === auction._id ? styles.bidButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton(auction._id)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Place Bid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingAuctions;
