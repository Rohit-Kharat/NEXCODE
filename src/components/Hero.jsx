import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="allmaincontent">
      <div className="Info">
        <h1 className="heading">NEXCODE Web</h1>
        <h2 className="heading2">Elevate Your Development: Smart Tools for Smart Code</h2>
        <p className="heading3">
          The NEXCODE that makes development a more productive and enjoyable
          experience
        </p>
        <button className="button1">Download</button>
      </div>
      <div className="imageofinfo">
        <img src="./Images/download.svg" width="1000px" alt="Download" />
      </div>

      <div className="imageofnice">
        <img
          className="imageofcode"
          src="./Images/overview-heading-screenshot.jpg"
          alt="Overview Screenshot"
        />
      </div>

      <div className="textSize">
        <h2 className="whytouse">Why NEXCODE</h2>
        <div className="displayflex">
          <div className="size">
            <img className="imageicon" src="./Images/code-review.png" alt="Code Review" />
            <div className="bestthing">
              <h2 className="Topics">Decentralized platform</h2>
              <p className="paragraph">
                INEXCODE stands out with unrivaled IPFS. Stay
                ahead of the curve with cutting-edge language features supported from
                the get-go.
              </p>
            </div>
          </div>

          <div className="size">
            <img className="code-png" src="./Images/code.png" alt="Code" />
            <div className="bestthing">
              <h2 className="Topics">Deep Code Understanding</h2>
              <p className="paragraph">
               NEXCODE knows everything about your code and uses this knowledge to offer blazing fast navigation and an intelligent experience by providing relevant suggestions in every context.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="align">
        <div className="displayflex"> 
          <div className="size">
            <img className="outofthebook" src="./Images/images.png" alt="Out of the Box" />
            <div className="bestthing">
              <h2 className="Topics">A seamless experience right out of the box</h2>
              <p className="paragraph">
                Enjoy an unbeatable toolset right from the first launch. Essential tools and a wide variety of supported languages and frameworks are at your fingertips – no plugin hassle required.
              </p>
            </div>
          </div>

          <div className="size">
            <img className="roadmap" src="./Images/roadmap.png" alt="Roadmap" />
            <div className="bestthing">
              <h2 className="Topics">Enchanced Security</h2>
              <p className="paragraph">
                We meet the needs of enterprises at every stage, from design and development, to testing, and all the way through to deployment.
              </p>
            </div>
          </div>
        </div>
        </div>
      

      <div className="image-container">
        <img className="companyimage" src="./Images/adobe.png" alt="Adobe" />
        <img className="companyimage" src="./Images/atlassian.png" alt="Atlassian" />
        <img className="companyimage" src="./Images/intel.webp" alt="Intel" />
        <img className="companyimage" src="./Images/microsoft.webp" alt="Microsoft" />
        <img className="companyimage" src="./Images/shopify.webp" alt="Shopify" />
        <img className="companyimage" src="./Images/uber.png" alt="Uber" />
        <img className="companyimage" src="./Images/nvidia.webp" alt="Nvidia" />
      </div>

    </div>
  );
};

export default Hero;
