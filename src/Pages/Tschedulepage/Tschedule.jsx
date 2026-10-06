import React, { useState, useEffect } from "react";
import "./Tschedule.css";
import trainsData from "../../Data/Trains_dict.json";
import schedulesData from "../../Data/Schedules_dict.json";
import railwayService from "../../services/railwayService";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";

const Tschedule = () => {
  const [trainQuery, setTrainQuery] = useState("");
  const [selectedTrainNo, setSelectedTrainNo] = useState("12723");
  const [suggestions, setSuggestions] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [trainInfo, setTrainInfo] = useState(null);
  const [liveTelemetry, setLiveTelemetry] = useState(null);
  const [loading, setLoading] = useState(false);
  const { speak, isSpeaking, cancelSpeech } = useSpeechSynthesis();

  // Search autocomplete
  const handleQueryChange = (e) => {
    const val = e.target.value;
    setTrainQuery(val);
    if (!val || val.trim().length < 1) {
      setSuggestions([]);
      return;
    }
    const term = val.toLowerCase().trim();
    const matches = Object.entries(trainsData)
      .filter(([num, data]) => 
        num.includes(term) || (data.trainName && data.trainName.toLowerCase().includes(term))
      )
      .slice(0, 6)
      .map(([num, data]) => ({ number: num, name: data.trainName }));
    setSuggestions(matches);
  };

  const selectTrain = (trainNo) => {
    setSelectedTrainNo(trainNo);
    const meta = trainsData[trainNo];
    setTrainQuery(meta ? `${trainNo} - ${meta.trainName}` : trainNo);
    setSuggestions([]);
    loadSchedule(trainNo);
  };

  const loadSchedule = async (trainNo) => {
    setLoading(true);
    try {
      const info = trainsData[trainNo] || {
        trainName: "Express Service",
        source: "Source",
        destination: "Destination",
        runningDays: "Daily"
      };
      setTrainInfo({ number: trainNo, ...info });

      const stnSchedule = schedulesData[trainNo] || [];
      setSchedule(stnSchedule);

      // Fetch live delay & telemetry
      const telemetry = await railwayService.getLiveTrainStatus(trainNo);
      setLiveTelemetry(telemetry);

      if (stnSchedule.length > 0) {
        speak(`Schedule loaded for train ${trainNo} ${info.trainName}. It has ${stnSchedule.length} scheduled stops.`);
      }
    } catch (err) {
      console.error("Error loading schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadSchedule("12723");
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!trainQuery) return;
    const cleanNo = trainQuery.split(" ")[0].trim();
    selectTrain(cleanNo);
  };

  return (
    <div className="tschedule-container">
      <div className="tschedule-header">
        <div className="badge-pill">Transit Schedules & Departure Metrics</div>
        <h1 className="tschedule-title">Train Schedule & Timetable</h1>
        <p className="tschedule-subtitle">
          Comprehensive station-by-station schedule with platform predictions and live delay offsets.
        </p>
      </div>

      <div className="tschedule-search-card">
        <form onSubmit={handleSearchSubmit} className="schedule-form">
          <div className="autocomplete-wrapper">
            <input
              type="text"
              placeholder="Search train by number or name (e.g. 12723, Telangana Express, Rajdhani)..."
              value={trainQuery}
              onChange={handleQueryChange}
            />
            {suggestions.length > 0 && (
              <ul className="schedule-suggestions">
                {suggestions.map((item) => (
                  <li key={item.number} onClick={() => selectTrain(item.number)}>
                    <span className="sugg-no">#{item.number}</span>
                    <span className="sugg-name">{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" className="schedule-search-btn" disabled={loading}>
            {loading ? "Loading..." : "View Timetable"}
          </button>
        </form>
      </div>

      {trainInfo && (
        <div className="train-info-overview">
          <div className="info-main">
            <div className="train-title-row">
              <span className="hero-number">#{trainInfo.number}</span>
              <h2>{trainInfo.trainName}</h2>
            </div>
            <div className="meta-badges">
              <span className="meta-pill">Days: {trainInfo.runningDays || "Daily"}</span>
              <span className="meta-pill">Stops: {schedule.length} Stations</span>
              {liveTelemetry && (
                <span className={`meta-pill status-${liveTelemetry.delay === 0 ? "good" : "warning"}`}>
                  Live: {liveTelemetry.status} ({liveTelemetry.delay}m delay)
                </span>
              )}
            </div>
          </div>

          <div className="info-actions">
            {isSpeaking && (
              <button className="voice-btn" onClick={cancelSpeech}>
                🔇 Stop Voice
              </button>
            )}
            <a href={`/track?train=${trainInfo.number}`} className="live-spot-btn">
              Track Live Location &rarr;
            </a>
          </div>
        </div>
      )}

      <div className="timetable-wrapper">
        {loading ? (
          <div className="timetable-loading">
            <div className="spinner"></div>
            <p>Querying high-reliability timetable data...</p>
          </div>
        ) : schedule.length === 0 ? (
          <div className="timetable-empty">
            <p>No timetable data available for this train number.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="timetable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Station Name</th>
                  <th>Code</th>
                  <th>Arrive</th>
                  <th>Depart</th>
                  <th>Halt</th>
                  <th>Distance</th>
                  <th>Day</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, idx) => {
                  const isCurrent = liveTelemetry && liveTelemetry.currentStationCode === row.stationCode;
                  return (
                    <tr key={`${row.stationCode}-${idx}`} className={isCurrent ? "current-stop-row" : ""}>
                      <td>
                        <span className="serial-badge">{row.serialNo || idx + 1}</span>
                      </td>
                      <td className="station-name-cell">
                        <strong>{row.stationName}</strong>
                        {isCurrent && <span className="live-radar-badge">Current Position</span>}
                      </td>
                      <td>
                        <span className="code-chip">{row.stationCode}</span>
                      </td>
                      <td className="time-cell">{row.arrivalTime || "Source"}</td>
                      <td className="time-cell">{row.departureTime || "Destination"}</td>
                      <td>{row.haltTime || "-"}</td>
                      <td>{row.distance || "0"} km</td>
                      <td>Day {row.day || "1"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tschedule;
