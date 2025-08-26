import React from 'react';
import '../styles/Home.css';

const favoriteCompanies = [
  'Apple',
  'Google',
  'Meta',
  'Micron',
  'Microsoft',
];

const FavoritesSection = () => {
  return (
    <div className="panel-section favorites-section">
      <h3>Favorites</h3>
      <div className="favorite-companies-list">
        {favoriteCompanies.slice(0, 4).map((company) => (
          <button className="company-shortcut" key={company} title={company}>
            {company}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;
