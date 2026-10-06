import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { firebaseService } from "../services/firebaseService";

export default function Navbar({ curpage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLive = location.pathname === "/track" || location.pathname === "/livelocation";
  const isBetween = location.pathname === "/tbstns" || location.pathname === "/trainsbetweenstations";
  const isSchedule = location.pathname === "/tschedule" || location.pathname === "/trainschedule";

  const handleLogout = async () => {
    try {
      await firebaseService.logoutUser();
    } catch (e) {}
    navigate("/login");
  };

  const navTo = (path, name) => {
    setMobileMenuOpen(false);
    navigate(path, { state: { curpage: name } });
  };

  return (
    <header className="tt-navbar-header">
      <div className="tt-navbar-container">
        {/* Brand */}
        <div className="tt-brand-section" onClick={() => navTo("/home", "home")}>
          <span className="tt-brand-logo">🚆</span>
          <div className="tt-brand-text">
            <span className="tt-brand-title">TrainTracker</span>
            <span className="tt-brand-badge">LIVE TELEMETRY</span>
          </div>
        </div>

        {/* Sync Status Pulse */}
        <div className="tt-sync-badge">
          <span className="tt-pulse-dot"></span>
          <span>Firebase Sync Active</span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="tt-nav-links">
          <button
            className={`tt-nav-btn ${location.pathname === "/home" ? "active" : ""}`}
            onClick={() => navTo("/home", "home")}
          >
            Home
          </button>
          <button
            className={`tt-nav-btn ${isLive ? "active" : ""}`}
            onClick={() => navTo("/track", "track")}
          >
            Spot My Train
          </button>
          <button
            className={`tt-nav-btn ${isBetween ? "active" : ""}`}
            onClick={() => navTo("/tbstns", "tbstns")}
          >
            Trains Between Stations
          </button>
          <button
            className={`tt-nav-btn ${isSchedule ? "active" : ""}`}
            onClick={() => navTo("/tschedule", "tschedule")}
          >
            Train Schedule
          </button>
          <button className="tt-logout-btn" onClick={handleLogout} title="Log Out">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="tt-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="tt-mobile-menu">
          <button onClick={() => navTo("/home", "home")}>Home</button>
          <button onClick={() => navTo("/track", "track")}>Spot My Train</button>
          <button onClick={() => navTo("/tbstns", "tbstns")}>Trains Between Stations</button>
          <button onClick={() => navTo("/tschedule", "tschedule")}>Train Schedule</button>
          <button className="tt-mobile-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}
