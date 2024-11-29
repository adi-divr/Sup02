"use client";

import Image from "next/image";
import logo from "../../public/assets/logo.png";
import paddleimage from "../../public/assets/Paddle.png";
import gearsimage from "../../public/assets/gears.png";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <button className="back-button">←</button>
        <Image src={logo} alt="Logo" className="logo" />
      </div>

      {/* Paddle Section */}
      <div className="paddle-card">
        <div className="paddle-info">
          <h2>12</h2>
          <p>Available Tomorrow</p>
        </div>
        <Image src={paddleimage} alt="Paddle" className="paddle-image" />
        <div className="guest-info">
          <p>4000+ guests paddled</p>
          <div className="stars">★★★★★</div>
        </div>
      </div>

      {/* Book Now Button */}
      <button className="book-now">Book Now</button>

      {/* What's Included Section */}
      <div className="included-section">
        <h3>What’s Included</h3>
        <div className="included-icons">
          <div className="icon">
            <Image src={gearsimage} alt="Guided Tour" />
            <p>Guided Tour</p>
          </div>
          <div className="icon">
            <Image src={gearsimage} alt="Parking" />
            <p>Parking</p>
          </div>
          <div className="icon">
            <Image src={gearsimage} alt="Safety Gears" />
            <p>Safety Gears</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
