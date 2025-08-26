import React, { useState } from 'react';
import '../styles/Home.css';

const appliedJobs = [
  { id: 3, title: 'Analog Design Engineer' },
];

const AppliedJobsSection = ({ onJobClick }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="panel-section applied-jobs-section">
      <div className="panel-header" onClick={() => setExpanded(e => !e)} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'0.5rem'}}>
        <span className="expand-icon" style={{fontSize:'1.2rem'}}>{expanded ? '▼' : '▶'}</span>
        <h3 style={{margin:0}}>Applied Jobs</h3>
      </div>
      <div
        className={`panel-content${expanded ? ' expanded' : ' collapsed'}`}
        style={{
          maxHeight: expanded ? '80px' : '0',
          overflow: 'hidden',
          transition:
            'max-height 0.3s cubic-bezier(0.4,0,0.2,1), margin 0.3s cubic-bezier(0.4,0,0.2,1), padding 0.3s cubic-bezier(0.4,0,0.2,1)',
          margin: expanded ? '0.5rem 0' : '0',
          padding: expanded ? '0.5rem 0' : '0',
        }}
      >
        {expanded && (
          <ul className="applied-jobs-list" style={{margin:'0.5rem 0 0.5rem 0',paddingLeft:'0'}}>
            {appliedJobs.map(job => (
              <li
                key={job.id}
                className="applied-job-item"
                onClick={() => onJobClick && onJobClick(job)}
                tabIndex={0}
                style={{cursor:'pointer'}}
              >
                {job.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppliedJobsSection;
