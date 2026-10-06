import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page-container">
      <main className="home-main">
        {/* Hero Section */}
        <div className="hero-banner">
          <div className="hero-badge">⚡ Real-Time Railway Telemetry</div>
          <h1 className="hero-title">Live Train Tracker & Transit Schedules</h1>
          <p className="hero-subtitle">
            High-precision delay tracking, live departure metrics, and station schedules powered by
            high-reliability Railway APIs and real-time Firebase synchronization.
          </p>

          {/* Key Metric Highlights */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-circle">👥</div>
              <div className="metric-val">1,000+</div>
              <div className="metric-label">Daily Active Users</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon-circle">⚡</div>
              <div className="metric-val">+35%</div>
              <div className="metric-label">Query Reliability</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon-circle">🔥</div>
              <div className="metric-val">-70%</div>
              <div className="metric-label">Client Latency</div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="feature-cards-grid">
          <div
            className="feature-card"
            onClick={() => navigate("/track")}
          >
            <div className="feature-icon-wrapper loc">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="feature-title">Spot My Train</h3>
            <p className="feature-desc">
              Track live location, real-time delays, upcoming stations, platform numbers, and voice
              delay announcements.
            </p>
            <button className="feature-btn">Track Live Status &rarr;</button>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/tbstns")}
          >
            <div className="feature-icon-wrapper route">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
            </div>
            <h3 className="feature-title">Trains Between Stations</h3>
            <p className="feature-desc">
              Find all connecting trains between any two stations with travel duration, running days,
              and departure timings.
            </p>
            <button className="feature-btn">Find Routes &rarr;</button>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/tschedule")}
          >
            <div className="feature-icon-wrapper sched">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="feature-title">Train's Schedule</h3>
            <p className="feature-desc">
              View full route timetable with station halt times, distances covered, platform numbers,
              and weekly operational days.
            </p>
            <button className="feature-btn">View Timetable &rarr;</button>
          </div>
        </div>
      </main>
    </div>
  );
}
