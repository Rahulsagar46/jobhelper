import React, { useState } from 'react';
import ChatLLMSection from './ChatLLMSection';

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [fade, setFade] = useState(true);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setFade(false);
      setTimeout(() => {
        setActiveTab(tab);
        setFade(true);
      }, 180);
    }
  };
  return (
    <aside className="home-right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
        <div
          style={{
            background: activeTab === 'resources' ? '#f0eeeeff' : '#2C3E50',
            color: activeTab === 'resources' ? '#2C3E50' : '#cfcdcdff',
            borderRadius: '6px 0 0 0',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 2px 2px #f7b74eff',
            flex: 1,
            margin: 0,
            padding: 0,
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            userSelect: 'none',
            borderBottom: activeTab === 'resources' ? '3px ridge #f7b74eff' : '3px solid transparent',
          }}
          onClick={() => handleTabChange('resources')}
        >
          Resources
        </div>
        <div style={{ width: '2px', height: '28px', background: '#e0e0e0' }}></div>
        <div
          style={{
            background: activeTab === 'community' ? '#f0eeeeff' : '#2C3E50',
            color: activeTab === 'community' ? '#2C3E50' : '#cfcdcdff',
            borderRadius: '0 6px 0 0',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 2px 2px #f7b74eff',
            flex: 1,
            margin: 0,
            padding: 0,
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            userSelect: 'none',
            borderBottom: activeTab === 'community' ? '3px ridge #f7b74eff' : '3px solid transparent',
          }}
          onClick={() => handleTabChange('community')}
        >
          Community
        </div>
      </div>
    <div
      style={{
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.18s cubic-bezier(.4,0,.2,1)',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginTop : '0rem',
        paddingTop : '0rem'
      }}
    >
      {activeTab === 'resources' ? (
        <>
          <div className="right-section" style={{ background: '#f5f6fa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1rem', marginBottom: '0rem', marginTop: '0rem', height: '400px', overflow:'auto'}}>
            <h3 style={{ color: '#2196f3', fontWeight: 600, marginBottom: '0.75rem', marginTop: '0rem' }}>Comparative Analysis</h3>
            <ul style={{ margin: 0, paddingLeft: '1rem', color: '#333', fontSize: '1rem' }}>
              <li>Resume matches 80% of job requirements</li>
              <li>Cover letter matches 70%</li>
              <li>Portfolio matches 75%</li>
            </ul>
          </div>
          <div className="right-section" style={{ background: '#f5f6fa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1rem', marginBottom: '0rem', marginTop: '0rem', paddingTop: '0rem', height: '800px', overflow: 'auto'}}>
            <h3 style={{ color: '#2196f3', fontWeight: 600, marginBottom: '0.75rem' }}>Interview Process & Tips</h3>
            <p style={{ margin: 0, color: '#444', fontWeight: 500 }}>Interview rounds: HR, Technical, Managerial</p>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1rem', color: '#333', fontSize: '1rem' }}>
              <li>Prepare for behavioral questions</li>
              <li>Review VLSI fundamentals</li>
              <li>Practice coding and design problems</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="community-chat" style={{ background: '#f5f6fa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', paddingLeft: '1rem', marginBottom: 0, marginTop: '0rem', paddingTop: '0rem', height: '1200px'}}>
          </div>
          
        </>
      )}
    </div>
    <div>
        <ChatLLMSection />
    </div>
  </aside>
);

}
export default RightPanel;
