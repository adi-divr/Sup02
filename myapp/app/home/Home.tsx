"use client";

import "./home.css";

const Home = () => {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <button className="back-button">←</button>
        <div className="logo">SUP IN KOCHI</div>
      </div>

      {/* Card */}
      <div className="card">
        <div className="slots">12 SLOTS</div>
        <div className="availability">Available Tomorrow</div>
        <div className="info">
          <span>4000+ guests paddled</span>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
        </div>
        <button className="book-now">Book Now</button>
      </div>

      {/* What's Included */}
      <div className="included-section">
        <h3>What’s Included</h3>
        <div className="icons">
          <div className="icon">
            <div className="circle"></div>
            <span>Guided Tour</span>
          </div>
          <div className="icon">
            <div className="circle"></div>
            <span>Parking</span>
          </div>
          <div className="icon">
            <div className="circle"></div>
            <span>Safety Gears</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
