import React from 'react';
import '../styles/ProgressMeter.css';

const ProgressMeter = ({ label, value }) => (
  <div className="progress-meter">
    <svg viewBox="0 0 36 36" className="circular-chart">
      <path
        className="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#eee"
        strokeWidth="2"
      />
      <path
        className="circle"
        strokeDasharray={`${value}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#18BC9C"
        strokeWidth="2"
      />
      <text x="18" y="20.35" className="percentage" textAnchor="middle" fontSize="8">{value}%</text>
    </svg>
    <div className="meter-label">{label}</div>
  </div>
);

export default ProgressMeter;
