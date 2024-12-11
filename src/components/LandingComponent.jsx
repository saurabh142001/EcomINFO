import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import profileImage from "../assets/img1.jpg"; // Corrected image import path

const Profile = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100); // Delay to allow CSS animations to take effect
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <section
      id="profile"
      className={`profile-section ${loaded ? "loaded" : ""}`}
    >
      <div className="profile-container">
        <img
          src={profileImage}
          alt="Profile"
          className={`profile-picture ${loaded ? "animate" : ""}`}
        />
        <div className={`profile-content ${loaded ? "animate" : ""}`}>
          <h1 className={`profile-title ${loaded ? "animate" : ""}`}>
            Elevate Your Style, One <span className="color-black">Click</span>{" "}
            at a Time
          </h1>

          <h4
            className={` color-black profile-text ${loaded ? "animate" : ""}`}
          >
            Welcome to your ultimate shopping destination! Explore the latest
            trends, discover exclusive deals, and find everything you need to
            express your unique style. Shop now and transform your wardrobe!
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Profile;
