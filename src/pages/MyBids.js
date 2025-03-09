import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyBids() {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('/my-bids'); // Ensure this API endpoint is correct
        setBids(response.data);
      } catch (error) {
        setError('Error fetching bids: ' + error.message);
        console.error('Error fetching bids:', error);
      }
    };

    fetchBids();
  }, []);

  return (
    <div>
      <h1>My Bids</h1>
      {error && <p className="error-message">{error}</p>} {/* Displaying error message if any */}
      <ul>
        {bids.length > 0 ? (
          bids.map((bid) => (
            <li key={bid.id}>
              <h3>{bid.item}</h3>
              <p>Amount: ${bid.amount}</p>
            </li>
          ))
        ) : (
          <p>No bids placed yet.</p>
        )}
      </ul>
    </div>
  );
}

export default MyBids;
