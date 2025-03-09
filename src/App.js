import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import IntroductionPage from './pages/IntroductionPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import BidderDashboard from './pages/BidderDashboard';
import AuctioneerDashboard from './pages/AuctioneerDashboard';
import PlaceNewBidPage from './pages/PlaceNewBidPage';
import CancelBidPage from './pages/CancelBidPage';
import MyBids from './pages/MyBids'; // Import the MyBids page

// Auctioneer Dashboard pages
import ActiveAuctions from './pages/ActiveAuctions';
import AddNewAuction from './pages/AddNewAuction';
import DeleteAuction from './pages/DeleteAuction';
import OngoingAuctions from './pages/OngoingAuctions'; 

// New Auctioneer Home page
import AuctioneerHomePage from './pages/AuctioneerHomePage';
import BidderHomePage from './pages/BidderHomePage';

// Import the AuctionDetails page
import AuctionDetails from './pages/AuctionDetails';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for stored user authentication data when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.userType) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Sign In handler to store the authenticated user
  const handleSignIn = (userData) => {
    localStorage.setItem('authenticatedUser', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Sign Out handler to clear the authenticated user
  const handleSignOut = () => {
    localStorage.removeItem('authenticatedUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/signin" element={<SignInPage handleSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUpPage handleSignIn={handleSignIn} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated && user ? (
              user.userType === 'bidder' ? (
                <Navigate to="/bidder-home" />
              ) : user.userType === 'auctioneer' ? (
                <Navigate to="/auctioneer-home" />
              ) : (
                <Navigate to="/signin" />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* Dashboard Routes */}
        <Route
          path="/bidder-dashboard"
          element={
            isAuthenticated && user && user.userType === 'bidder' ? (
              <BidderDashboard user={user} handleSignOut={handleSignOut} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/auctioneer-dashboard"
          element={
            isAuthenticated && user && user.userType === 'auctioneer' ? (
              <AuctioneerDashboard user={user} handleSignOut={handleSignOut} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* Home Pages for Bidder and Auctioneer */}
        <Route
          path="/bidder-home"
          element={
            isAuthenticated && user && user.userType === 'bidder' ? (
              <BidderHomePage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/auctioneer-home"
          element={
            isAuthenticated && user && user.userType === 'auctioneer' ? (
              <AuctioneerHomePage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* New Routes for Bidder */}
        <Route
          path="/place-new-bid"
          element={
            isAuthenticated && user && user.userType === 'bidder' ? (
              <PlaceNewBidPage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/cancel-bid"
          element={
            isAuthenticated && user && user.userType === 'bidder' ? (
              <CancelBidPage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* New Route for My Bids */}
        <Route
          path="/my-bids"
          element={
            isAuthenticated && user && user.userType === 'bidder' ? (
              <MyBids />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* New Route for Ongoing Auctions */}
        <Route
          path="/ongoing-auctions"
          element={
            isAuthenticated && user && user.userType === 'bidder' ? (
              <OngoingAuctions />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* Auctioneer Dashboard Pages */}
        <Route
          path="/active-auctions"
          element={
            isAuthenticated && user && user.userType === 'auctioneer' ? (
              <ActiveAuctions />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/add-new-auction"
          element={
            isAuthenticated && user && user.userType === 'auctioneer' ? (
              <AddNewAuction />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/delete-auction"
          element={
            isAuthenticated && user && user.userType === 'auctioneer' ? (
              <DeleteAuction />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* Add the AuctionDetails Route */}
        <Route
          path="/auction-details/:id"
          element={<AuctionDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
