import React from 'react';
import './Footer.css';  // Assuming you will move the CSS to an external file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Footer Heading and Columns Wrapper */}
        <div className="footer-header-columns">
          {/* Footer Heading */}
          <div className="footer-heading">
          
            <div className='foot-img'>
            <img className="logoofthepage" src="Images\logoofthepage.png"  alt="" />
            <h2>NEXCODE</h2>
            </div>

            {/* Subscription Section */}
            <div className="footer-subscribe">
              <h4>Subscribe to our developer newsletter</h4>
              <p>Get tips, technical guides, and best practices. Twice a month. Right in your inbox.</p>
              <button className="subscribe-btn">Sign Up</button>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="footer-columns">
            <div className="footer-column">
              <h2>About Us</h2>
              <ul>
                <li><a href="#company">Company</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#partners">Partners</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Services</h2>
              <ul>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#product">Product</a></li>
                <li><a href="#skill">Skill</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Support</h2>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#docs">Docs</a></li>
                <li><a href="#premium-support">Premium Support</a></li>
                <li><a href="#status">Status</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom" style={{ height: '10px' }}>
        <div className="footer-copy">
          <p>&copy; 2024 NEXCODE. All rights reserved.</p>
          <a href="#">Terms</a>
          <a href="#">Privacy (Updated 08/2024)</a>
          <a href="#">Manage cookies</a>
          <a href="#">Do not share my personal information</a>
        </div>

        <div className="logo">
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-linkedin"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-tiktok"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
