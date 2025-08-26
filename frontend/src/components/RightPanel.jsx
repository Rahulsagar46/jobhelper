import React, { useState } from 'react';
import ChatLLMSection from './ChatLLMSection';

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState('resources');
  return (
    <aside className="home-right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
        <div
          style={{
            background: activeTab === 'resources' ? '#1976d2' : '#90caf9',
            color: '#fff',
            borderRadius: '6px 0 0 0',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            flex: 1,
            margin: 0,
            padding: 0,
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            userSelect: 'none',
            borderBottom: activeTab === 'resources' ? '3px ridge #1565c0' : '3px solid transparent',
          }}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </div>
        <div style={{ width: '2px', height: '28px', background: '#e0e0e0' }}></div>
        <div
          style={{
            background: activeTab === 'community' ? '#1976d2' : '#90caf9',
            color: '#fff',
            borderRadius: '0 6px 0 0',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            flex: 1,
            margin: 0,
            padding: 0,
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            userSelect: 'none',
            borderBottom: activeTab === 'community' ? '3px ridge #1565c0' : '3px solid transparent',
          }}
          onClick={() => setActiveTab('community')}
        >
          Community
        </div>
      </div>
    {activeTab === 'resources' ? (
      <>
        <div className="right-section" style={{ background: '#f5f6fa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1rem', marginBottom: 0 }}>
          <h3 style={{ color: '#2196f3', fontWeight: 600, marginBottom: '0.75rem' }}>Comparative Analysis</h3>
          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#333', fontSize: '1rem' }}>
            <li>Resume matches 80% of job requirements</li>
            <li>Cover letter matches 70%</li>
            <li>Portfolio matches 75%</li>
          </ul>
        </div>
        <div className="right-section" style={{ background: '#f5f6fa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1rem', marginBottom: 0 }}>
          <h3 style={{ color: '#2196f3', fontWeight: 600, marginBottom: '0.75rem' }}>Interview Process & Tips</h3>
          <p style={{ margin: 0, color: '#444', fontWeight: 500 }}>Interview rounds: HR, Technical, Managerial</p>
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1rem', color: '#333', fontSize: '1rem' }}>
            <li>Prepare for behavioral questions</li>
            <li>Review VLSI fundamentals</li>
            <li>Practice coding and design problems</li>
          </ul>
        </div>
        <div>
          <ChatLLMSection />
        </div>
      </>
    ) : (
      <>
        <div className="right-section" style={{ background: '#f5f6fa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1rem', marginBottom: 0 }}>
          <h3 style={{ color: '#2196f3', fontWeight: 600, marginBottom: '0.75rem' }}>Community</h3>
          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#333', fontSize: '1rem' }}>
            <li>Join discussions with other job seekers</li>
            <li>Share interview experiences</li>
            <li>Get advice from the community</li>
          </ul>
        </div>
        <div className="right-section" style={{ background: '#f5f6fa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1rem', marginBottom: 0 }}>
          <h3 style={{ color: '#2196f3', fontWeight: 600, marginBottom: '0.75rem' }}>Community Chat</h3>
          <p style={{ margin: 0, color: '#444', fontWeight: 500 }}>Connect and chat with peers in real time.</p>
        </div>
      </>
    )}
  </aside>
);

}
export default RightPanel;
