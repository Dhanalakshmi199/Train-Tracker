import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { firebaseService } from "../services/firebaseService";
import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar({ curpage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLive = location.pathname === "/livelocation";
  const isBetween = location.pathname === "/trainsbetweenstations";
  const isSchedule = location.pathname === "/trainschedule";

  const handleLogout = async () => {
    await firebaseService.logoutUser();
    navigate("/");
  };

  const navTo = (path, name) => {
    setMobileMenuOpen(false);
    navigate(path, { state: { curpage: name } });
  };

  return (
    <header className="navbar-header">
      <div className="topbarcontainer">
        {/* Brand Section */}
        <div className="brand-section" onClick={() => navigate("/home")}>
          <div className="logo-badge">🚆</div>
          <div className="title">Find My Train</div>
        </div>

        {/* Live sync pill badge */}
        <div className="live-sync-indicator" title="Firebase Real-time Data Sync Active">
          <span className="sync-pulse"></span>
          <span className="sync-label">1,000+ DAU • Real-Time Sync</span>
        </div>

        {/* Mobile toggle button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Desktop Navigation Links */}
        <nav className={`nav-links-wrapper ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <button
            className={`navbuttons ${isLive ? "changecolour active" : ""}`}
            onClick={() => navTo("/livelocation", "track")}
          >
            Spot My Train
          </button>

          <button
            className={`navbuttons ${isBetween ? "changecolour active" : ""}`}
            onClick={() => navTo("/trainsbetweenstations", "tbstsns")}
          >
            Trains between Stations
          </button>

          <button
            className={`navbuttons ${isSchedule ? "changecolour active" : ""}`}
            onClick={() => navTo("/trainschedule", "tschedule")}
          >
            Train's Schedule
          </button>

          <div className="id logout-btn" onClick={handleLogout} title="Log Out">
            <Logout id="logouticon" fontSize="medium" />
            <span id="logouttxt">LOG OUT</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
