import React from 'react';

const Header = () => (
  <header style={{ boxShadow: '0 2px 8px rgba(44, 62, 80, 0.15)', padding: '16px', background: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <img src="/vite.svg" alt="Company Logo" style={{ width: '48px', height: '48px' }} />
      <h1 style={{ margin: 0 }}>JobHelper</h1>
    </div>
  </header>
);

export default Header;