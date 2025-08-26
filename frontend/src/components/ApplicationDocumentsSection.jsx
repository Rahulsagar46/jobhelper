import React, { useState } from 'react';
import '../styles/Home.css';

const ApplicationDocumentsSection = () => {
  const [expanded, setExpanded] = useState(false);
  // Dummy documents for now
  const documents = [
  'Resume.pdf',
  'CoverLetter.docx',
  'Portfolio.zip',
  'Transcript.pdf',
  'ReferenceLetter.docx',
  'OfferLetter.pdf',
  'IDProof.jpg',
  'WorkSample1.pdf',
  'WorkSample2.pdf',
  'WorkSample3.pdf',
  ];
  return (
    <div className="panel-section application-documents-section">
      <div className="panel-header" onClick={() => setExpanded((e) => !e)} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'0.5rem'}}>
        <span className="expand-icon" style={{fontSize:'1.2rem'}}>{expanded ? '▼' : '▶'}</span>
        <h3 style={{margin:0}}>Documents</h3>
      </div>
      <div
        className={`panel-content${expanded ? ' expanded' : ' collapsed'}`}
        style={{
          maxHeight: expanded ? '500px' : '0',
          overflow: 'hidden',
          transition:
            'max-height 0.3s cubic-bezier(0.4,0,0.2,1), margin 0.3s cubic-bezier(0.4,0,0.2,1), padding 0.3s cubic-bezier(0.4,0,0.2,1)',
          margin: expanded ? '0.5rem 0' : '0',
          padding: expanded ? '0.5rem 0' : '0',
        }}
      >
        {expanded && (
          <>
            <ul
              style={{
                margin: '0.5rem 0 0.5rem 0',
                paddingLeft: '1rem',
                maxHeight: '180px', // approx 5 items
                overflowY: 'auto',
              }}
            >
              {documents.map((doc) => (
                <li
                  key={doc}
                  className="document-item"
                  title={doc}
                >
                  {doc}
                </li>
              ))}
            </ul>
            <button className="panel-btn">Upload Document</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationDocumentsSection;
