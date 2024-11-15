import React, { useState } from 'react';
import '../css/BettingHistory.css';

const BettingHistory = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="betting-history-container">
      {/* Filters Section */}
      <div className="filters-header">
        <button className="hamburger-icon" onClick={toggleFilters}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
      <div className={`filters-section ${!isFilterOpen ? 'hidden' : ''}`}>
        <div className="filter-dropdown">
          <label>Sport:</label>
          <select>
            <option value="afl">AFL</option>
            <option value="nrl">NRL</option>
            <option value="nba">NBA</option>
          </select>
        </div>
        <div className="filter-game">
          <label>Game:</label>
          <select>
            <option value="teamA-vs-teamB">Team A vs Team B</option>
            <option value="teamC-vs-teamD">Team C vs Team D</option>
            <option value="teamE-vs-teamF">Team E vs Team F</option>
          </select>
        </div>
        <div className="filter-date">
          <label>Date:</label>
          <input type="date" />
        </div>
        <div className="filter-probability">
          <label>Probability:</label>
          <select>
            <option value="30">30%+</option>
            <option value="40">40%+</option>
            <option value="50">50%+</option>
            <option value="60">60%+</option>
            <option value="70">70%+</option>
            <option value="80">80%+</option>
          </select>
        </div>
      </div>

      {/* Bet History Table */}
      <table className="betting-history-table">
        <thead>
          <tr>
            <th>Bet ID</th>
            <th>Sport</th>
            <th>Game</th>
            <th>Odds</th>
            <th>Probability</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr key={index}>
              <td>BET-{index + 1}</td>
              <td>AFL</td>
              <td>Team A vs Team B</td>
              <td>2.5</td>
              <td>70%</td>
              <td>{index % 2 === 0 ? 'Win' : 'Loss'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BettingHistory;
