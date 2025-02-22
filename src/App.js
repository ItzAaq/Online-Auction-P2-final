import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import AuctionPage from "./pages/AuctionPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("authenticatedUser"); // Check if user is authenticated
    setIsAuthenticated(!!user); // Convert value to boolean (true if user exists)
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signin" element={<SignInPage setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Redirect to SignIn if not authenticated */}
        <Route 
          path="/auction" 
          element={isAuthenticated ? <AuctionPage /> : <Navigate to="/signin" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
