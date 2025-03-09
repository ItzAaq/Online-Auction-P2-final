import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AuctionDetails = () => {
    const { id } = useParams(); // Extract the auction ID from the URL
    const navigate = useNavigate(); // Replaces useHistory in react-router-dom v6
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/auction-details/${id}`);
                if (!response.ok) {
                    throw new Error('Auction not found');
                }
                const data = await response.json();
                setAuctionDetails(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching auction details:', error);
            }
        };

        fetchAuctionDetails();
    }, [id]);

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    if (!auctionDetails) {
        return (
            <div style={styles.loadingContainer}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>{auctionDetails.title}</h1>
                <p style={styles.description}>{auctionDetails.description}</p>

                <div style={styles.details}>
                    <div style={styles.detail}>
                        <strong>Start Date:</strong> {new Date(auctionDetails.startDate).toLocaleDateString()}
                    </div>
                    <div style={styles.detail}>
                        <strong>End Date:</strong> {new Date(auctionDetails.endDate).toLocaleDateString()}
                    </div>
                    <div style={styles.detail}>
                        <strong>Item Name:</strong> {auctionDetails.itemName}
                    </div>
                    <div style={styles.detail}>
                        <strong>Item Description:</strong> {auctionDetails.itemDescription}
                    </div>
                    <div style={styles.detail}>
                        <strong>Starting Bid:</strong> ${auctionDetails.itemStartingBid.toFixed(2)}
                    </div>
                </div>

                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={handleBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

// Styling for the component
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
        backgroundColor: '#f4f4f9',
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '800px',
        textAlign: 'center',
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '2.2rem',
        marginBottom: '15px',
        color: '#333',
    },
    description: {
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '20px',
    },
    details: {
        textAlign: 'left',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #ddd',
    },
    detail: {
        fontSize: '1rem',
        color: '#555',
        marginBottom: '10px',
        paddingBottom: '5px',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    button: {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '20px',
    },
    loadingContainer: {
        textAlign: 'center',
        marginTop: '50px',
    },
};

export default AuctionDetails;
