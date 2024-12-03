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
    <div className="landing-container medical-theme">
      <div className="medical-overlay"></div>
      <header className="landing-header">
        <h1 className="medical-title">Welcome to HealthCare Plus</h1>
        <p className="medical-subtitle">
          Your Trusted Partner in Health and Wellness. Experience world-class
          healthcare services with our state-of-the-art facilities and expert medical team.
        </p>
      </header>
      
      <button className="shared-button primary-button" onClick={handleGetStarted}>
        <span className="button-text">Begin Your Health Journey</span>
        <span className="button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
          </svg>
        </span>
      </button>

      <section className="landing-features">
        <h2 className="services-title">Our Medical Services</h2>
        <div className="features">
          <div className="feature medical-card">
            <svg className="feature-icon" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" fill="#0070c0"/>
            </svg>
            <h3>24/7 Emergency Care</h3>
            <p>Round-the-clock emergency medical services with expert healthcare professionals.</p>
          </div>
          
          <div className="feature medical-card">
            <svg className="feature-icon" viewBox="0 0 24 24">
              <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="#0070c0"/>
            </svg>
            <h3>Specialized Departments</h3>
            <p>Access to multiple specialized medical departments and expert consultants.</p>
          </div>

          <div className="feature medical-card">
            <svg className="feature-icon" viewBox="0 0 24 24">
              <path d="M19 3h-4.18C14.25 1.44 12.53.64 11 1.2c-.88.3-1.58 1-1.88 1.88L4 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 2h6v2h-6V5zM4 19V5h3v14H4zm13 0H9V5h2v3h7v11z" fill="#0070c0"/>
            </svg>
            <h3>Digital Health Records</h3>
            <p>Secure electronic health records and seamless appointment management.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer medical-footer">
        <p>© 2024 HealthCare Plus - Committed to Your Well-being</p>
      </footer>
    </div>
  );
};

export default LandingPage;
