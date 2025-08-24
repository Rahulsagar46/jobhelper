import React, { useState } from 'react';
import '../styles/Onboarding.css';
import { companies, jobVerticals } from '../data/dummyData';

const Onboarding = () => {
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [verticals, setVerticals] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [skipped, setSkipped] = useState(false);

  const handleVerticalChange = (vertical) => {
    setVerticals((prev) =>
      prev.includes(vertical)
        ? prev.filter((v) => v !== vertical)
        : [...prev, vertical]
    );
  };

  const handleFavoriteChange = (company) => {
    setFavorites((prev) => {
      if (prev.includes(company)) {
        return prev.filter((c) => c !== company);
      } else if (prev.length < 5) {
        return [...prev, company];
      } else {
        return prev;
      }
    });
  };

  if (skipped) {
    return (
      <div className="onboarding-container">
        <h2>Onboarding Skipped</h2>
        <p>You can update your preferences later in your profile.</p>
      </div>
    );
  }

  return (
    <div className="onboarding-container">
      <h2>Onboarding</h2>
      <form className="onboarding-form">
        <label>
          Location:
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="input-field" />
        </label>
        <label>
          Experience Level in VLSI:
          <select value={experience} onChange={e => setExperience(e.target.value)} className="input-field">
            <option value="">Select</option>
            <option value="Fresher">Fresher</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
        </label>
        <label>
          Interested Verticals in VLSI:
          <div className="verticals-list">
            {jobVerticals.map((vertical) => (
              <span key={vertical} className={`vertical-chip${verticals.includes(vertical) ? ' selected' : ''}`} onClick={() => handleVerticalChange(vertical)}>
                {vertical}
              </span>
            ))}
          </div>
        </label>
        <label>
          Choose up to 5 favorite companies:
          <div className="companies-list">
            {companies.map((company) => (
              <span key={company.name} className={`company-chip${favorites.includes(company.name) ? ' selected' : ''}`} onClick={() => handleFavoriteChange(company.name)}>
                <img src={company.logo} alt={company.name} className="company-logo" /> {company.name}
              </span>
            ))}
          </div>
        </label>
        <div className="onboarding-actions">
          <button type="submit" className="submit-btn">Save Preferences</button>
          <button type="button" className="skip-btn" onClick={() => setSkipped(true)}>Skip</button>
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
