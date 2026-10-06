import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Homepage/Home";
import Track from "./Pages/Trackpage/Track";
import Tbstns from "./Pages/Tbstationpage/Tbstns";
import Tschedule from "./Pages/Tschedulepage/Tschedule";
import Login from "./Pages/Loginpage/Login";
import Register from "./Pages/Registerpage/Register";
import "./App.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || ""}>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            
            {/* Live Train Tracking */}
            <Route path="/track" element={<Track />} />
            <Route path="/livelocation" element={<Track />} />
            
            {/* Trains Between Stations */}
            <Route path="/tbstns" element={<Tbstns />} />
            <Route path="/trainsbetweenstations" element={<Tbstns />} />
            
            {/* Train Schedules */}
            <Route path="/tschedule" element={<Tschedule />} />
            <Route path="/trainschedule" element={<Tschedule />} />
            
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-left">
              <span className="footer-logo">🚆 TrainTracker</span>
              <p>Next-Generation Indian Railways Transit Telemetry & Live Tracking</p>
            </div>
            <div className="footer-metrics">
              <div className="f-metric">
                <span className="f-metric-val">1,000+</span>
                <span className="f-metric-lbl">Daily Active Users</span>
              </div>
              <div className="f-metric">
                <span className="f-metric-val">+35%</span>
                <span className="f-metric-lbl">Query Reliability</span>
              </div>
              <div className="f-metric">
                <span className="f-metric-val">-70%</span>
                <span className="f-metric-lbl">Client Latency</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Powered by High-Reliability Railway APIs & Firebase Real-Time Data Sync</span>
            <span>&copy; {new Date().getFullYear()} TrainTracker. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
