// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
<div className="landing-container shared-background">
      <header className="landing-header">
        <h1 className="fancy">Your Health, Your Control</h1>
        <p>
          Manage your healthcare journey with ease. Find nearby hospitals, set
          medicine reminders, and keep track of your health information all in
          one place.
        </p>
      </header>
      <button className="Btn-Container" onClick={handleGetStarted}>
        <span className="text">Get Started</span>
        <span className="icon-Container">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
              fill="#4CAF50"
            />
          </svg>
        </span>
      </button>
      <section className="landing-features">
        <h2>Our Services</h2>
        <div className="features">
          <div className="feature">
            <svg
              className="feature-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="#4CAF50"
              />
            </svg>
            <h3>Find Hospitals</h3>
            <p>
              Locate nearby hospitals and healthcare facilities with detailed
              information and directions.
            </p>
          </div>
          <div className="feature">
            <svg
              className="feature-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
                fill="#4CAF50"
              />
            </svg>
            <h3>Medicine Reminders</h3>
            <p>
              Never miss your medications with personalized reminders and
              scheduling.
            </p>
          </div>
          <div className="feature">
            <svg
              className="feature-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                fill="#4CAF50"
              />
            </svg>
            <h3>Personal Profile</h3>
            <p>
              Maintain your health records and personal information securely in
              one place.
            </p>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <p>© 2024 Our Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
