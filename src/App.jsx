// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Hero from './components/Hero'; // Import the Hero component
import Backend from './components/Backend'; // Import Backend component
import Footer from './components/Footer'; // Import Footer component
import Navbar from './components/Navbar'; // Import Navbar component
import Register from './components/Register';
import Login from './components/Login';
import Card from './components/Card'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar is outside Routes, so it's visible on all pages */}
        
        <Routes>
          <Route path="/" element={<Hero />} /> {/* Hero route for the homepage */}
          <Route path="/hero" element={<Hero />} /> {/* Hero route for the homepage */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/backend" element={<Backend />} /> {/* Backend route for Sign In */}
        </Routes>
        <Card />
        <Footer /> {/* Footer is displayed at the bottom on all pages */}
      </div>
    </Router>
  );
};

export default App;
