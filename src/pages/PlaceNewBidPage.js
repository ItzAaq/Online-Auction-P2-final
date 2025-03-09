import React, { useState, useEffect } from 'react';
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
    marginBottom: '40px',
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
    borderRadius: '15px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    padding: '20px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '400px',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
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
    minHeight: '50px',
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
  loadingText: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#007BFF',
    textAlign: 'center',
    marginTop: '20px',
  },
  errorText: {
    color: 'red',
    fontSize: '18px',
    marginTop: '20px',
    fontWeight: '600',
  },
};

const PlaceNewBidPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Fetch ongoing auctions from the backend
  const fetchOngoingAuctions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auctions');
      setAuctions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching ongoing auctions');
      setLoading(false);
    }
  };

  // Handle placing a bid
  const placeBid = async (auctionId, bidAmount) => {
    if (!bidAmount || bidAmount <= 0) {
      alert('Please enter a valid bid amount');
      return;
    }
    
    const token = localStorage.getItem('token');  // Assuming JWT is stored in localStorage
    try {
      const response = await axios.post('http://localhost:5000/place-bid', {
        auctionItem: auctionId,
        bidAmount,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert('Bid placed successfully!');
      setBidAmount('');  // Reset bid input after success
    } catch (error) {
      alert('Failed to place bid. Please try again.');
    }
  };

  // Fetch auctions on component mount
  useEffect(() => {
    fetchOngoingAuctions();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Place Your Bid</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading Auctions...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <div style={styles.auctionGrid}>
          {auctions.map((auction) => (
            <div
              key={auction._id}
              style={{
                ...styles.auctionCard,
                transform: hoveredCard === auction._id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: hoveredCard === auction._id ? '0 12px 24px rgba(0, 0, 0, 0.15)' : '0 8px 15px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={() => setHoveredCard(auction._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {auction.itemImage && (
                <img src={`http://localhost:5000/${auction.itemImage}`} alt={auction.itemName} style={styles.image} />
              )}
              <h3 style={styles.titleText}>{auction.itemName}</h3>
              <p style={styles.description}>{auction.itemDescription}</p>

              <input
                type="number"
                placeholder="Enter bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                style={{ marginBottom: '10px', padding: '10px', width: '80%', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <button
                style={styles.bidButton}
                onClick={() => placeBid(auction._id, bidAmount)}
              >
                Place Bid
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaceNewBidPage;
