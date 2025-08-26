import React, { useState } from 'react';
import '../styles/Home.css';

const ChatLLMSection = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: 'user', text: message }]);
      setMessage('');
      // Simulate LLM response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { sender: 'llm', text: 'This is a sample response from LLM.' }]);
      }, 500);
    }
  };

  return (
    <div
      className={`chat-llm-widget${expanded ? ' expanded' : ' minimized'}`}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        borderRadius: '12px',
        background: '#fff',
  width: expanded ? '340px' : '130px',
        height: expanded ? '400px' : '60px',
        transition: 'width 0.3s, height 0.3s',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        cursor: expanded ? 'default' : 'pointer',
      }}
      onClick={() => !expanded && setExpanded(true)}
    >
      {/* Header bar for expand/collapse */}
      <div
        style={{
          background: '#2196f3',
          color: '#fff',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={e => {
          e.stopPropagation();
          setExpanded(exp => !exp);
        }}
      >
        {expanded ? (
          <span style={{ fontWeight: 600 }}>Ask AI</span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span style={{fontSize:'1.5rem'}}>💬</span>
            <span>Ask AI</span>
          </span>
        )}
        {expanded && (
          <button
            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); setExpanded(false); }}
            aria-label="Minimize chat"
          >
            &minus;
          </button>
        )}
      </div>
      {/* Chat content */}
      {expanded && (
        <>
          <div className="chat-llm-history" style={{ flex: 1, overflowY: 'auto', margin: '0.5rem', background: '#f5f6fa', borderRadius: '6px', padding: '0.5rem' }}>
            {chatHistory.length === 0 ? (
              <div className="chat-llm-placeholder" style={{ color: '#aaa', fontStyle: 'italic' }}>Ask anything about the job or company...</div>
            ) : (
              chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-llm-msg chat-llm-msg-${msg.sender}`} style={{ marginBottom: '0.25rem', color: msg.sender === 'user' ? '#2196f3' : '#333' }}>
                  <strong>{msg.sender === 'user' ? 'You' : 'LLM'}:</strong> {msg.text}
                </div>
              ))
            )}
          </div>
          <div className="chat-llm-input-row" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem' }}>
            <textarea
              rows={2}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your question..."
              className="panel-notes"
              style={{ flex: 1, resize: 'none', borderRadius: '4px', border: '1px solid #e0e0e0', padding: '0.5rem' }}
            />
            <button
              className="panel-btn"
              style={{ minWidth: '70px', background: '#2196f3', color: '#fff', borderRadius: '4px', border: 'none', fontWeight: 500, cursor: 'pointer' }}
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatLLMSection;
