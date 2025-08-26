import React from 'react';
import '../styles/Home.css';

const JobFilterPreferences = () => {
  return (
    <div className="panel-section job-filter-preferences">
      <h3>Job filter</h3>
      <div className="filter-options">
        <label>
          <input type="checkbox" /> Remote Only
        </label>
        <label>
          <input type="checkbox" /> Full-time
        </label>
        <label>
          <input type="checkbox" /> Internship
        </label>
        <label>
          <input type="checkbox" /> Senior
        </label>
        <label>
          <input type="checkbox" /> Manager
        </label>
      </div>
    </div>
  );
};

export default JobFilterPreferences;
