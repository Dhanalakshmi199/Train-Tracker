import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpeedIcon from "@mui/icons-material/Speed";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import GroupIcon from "@mui/icons-material/Group";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page-container">
      <Navbar curpage="home" />

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
              <GroupIcon className="metric-icon" />
              <div className="metric-val">1,000+</div>
              <div className="metric-label">Daily Active Users</div>
            </div>
            <div className="metric-card">
              <SpeedIcon className="metric-icon" />
              <div className="metric-val">+35%</div>
              <div className="metric-label">Query Reliability</div>
            </div>
            <div className="metric-card">
              <CloudDoneIcon className="metric-icon" />
              <div className="metric-val">-70%</div>
              <div className="metric-label">Client Latency</div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="feature-cards-grid">
          <div
            className="feature-card"
            onClick={() => navigate("/livelocation", { state: { curpage: "track" } })}
          >
            <div className="feature-icon-wrapper loc">
              <LocationOnIcon fontSize="large" />
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
            onClick={() =>
              navigate("/trainsbetweenstations", { state: { curpage: "tbstsns" } })
            }
          >
            <div className="feature-icon-wrapper route">
              <AltRouteIcon fontSize="large" />
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
            onClick={() => navigate("/trainschedule", { state: { curpage: "tschedule" } })}
          >
            <div className="feature-icon-wrapper sched">
              <CalendarMonthIcon fontSize="large" />
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
