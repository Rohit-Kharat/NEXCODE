// Hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Timepass = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSignIn = () => {
    navigate('/backend'); // Navigate to the Backend page
  };

  return (
    <div className="hero">
      <h1>Welcome to the Hero Section</h1>
      <button onClick={handleSignIn}>Sign In</button> {/* Call the handleSignIn on click */}
    </div>
  );
};

export default Timepass;
