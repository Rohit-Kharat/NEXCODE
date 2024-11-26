import React from 'react';
import './Navbar.css';  // Importing the CSS file
import { Link } from 'react-router-dom'; 


const Navbar = () => {
  return (
    <>
      <nav className="navbar">
      <div className="logo2">
      <img className="logoofthepage" src="Images\logoofthepage.png"  alt="" />
        <h1>NEXCODE</h1>
      </div>
      <ul className="nav-links2">
        <li><Link to="/Hero">Home</Link></li>
        <li><a href="#about">Team Tools</a></li>
        <li><a href="#services">Education</a></li>
        <li><a href="#contact">Solution</a></li>
        <li><a href="#contact">Support</a></li>
        <li><a href="#contact">Store</a></li>
        <li className='connect'><Link to="/Backend">Connect to Wallet</Link></li>{/* Sign Up button */}
      </ul>
      <div className="hamburger">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
    </>
  );
};

export default Navbar;