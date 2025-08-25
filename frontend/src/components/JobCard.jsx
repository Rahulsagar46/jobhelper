import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({ job, onClick }) => (
  <div className="job-card" onClick={onClick}>
    <div className="job-card-header">
      <h4>{job.title}</h4>
      {job.companyLogoUrl ? (
        <img src={job.companyLogoUrl} alt={job.company} className="job-company-logo" />
      ) : (
        <span className="job-company">{job.company}</span>
      )}
    </div>
    <div className="job-card-body">
      <span>{job.location}</span>
      <span>{job.experience}</span>
      <span>{job.type}</span>
    </div>
    <div className="job-card-footer">
      <span>{job.postedDate}</span>
      <span className="job-tags">{job.tags.join(', ')}</span>
    </div>
  </div>
);

export default JobCard;
