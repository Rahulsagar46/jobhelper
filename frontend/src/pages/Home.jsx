import React, { useState } from 'react';
import '../styles/Home.css';
import JobCard from '../components/JobCard';
import ProgressMeter from '../components/ProgressMeter';
import Pagination from '../components/Pagination';
import { jobs } from '../data/dummyData';



const Home = ({ testUser }) => {

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [openTabs, setOpenTabs] = useState([]); // Array of job ids
  const [activeTab, setActiveTab] = useState(null);

  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalJobs);
  const jobsToShow = jobs.slice(startIdx, endIdx);

  const handleJobClick = (job) => {
    if (!openTabs.includes(job.id)) {
      if (openTabs.length < 5) {
        setOpenTabs([...openTabs, job.id]);
        setActiveTab(job.id);
      } else {
        // Replace the oldest tab
        const newTabs = [...openTabs.slice(1), job.id];
        setOpenTabs(newTabs);
        setActiveTab(job.id);
      }
    } else {
      setActiveTab(job.id);
    }
  };

  const handleCloseTab = (jobId) => {
    const newTabs = openTabs.filter((id) => id !== jobId);
    setOpenTabs(newTabs);
    if (activeTab === jobId) {
      setActiveTab(newTabs.length ? newTabs[newTabs.length - 1] : null);
    }
  };

  const getJobById = (id) => jobs.find((j) => j.id === id);

  return (
  <div className="home-layout">
      {/* Left Panel */}
      <aside className="home-left-panel">
        <div className="panel-section">
          <h3>Application Documents</h3>
          <ul>
            <li>Resume.pdf</li>
            <li>CoverLetter.docx</li>
            <li>Portfolio.zip</li>
          </ul>
          <button className="panel-btn">Upload Document</button>
        </div>
        <div className="panel-section">
          <h3>Job Filter Preferences</h3>
          <label>
            <input type="checkbox" /> Remote Only
          </label>
          <label>
            <input type="checkbox" /> Full-time
          </label>
          <label>
            <input type="checkbox" /> Internship
          </label>
        </div>
        <div className="panel-section">
          <h3>Notes</h3>
          <textarea rows="2" placeholder="Add a note..." className="panel-notes"></textarea>
        </div>
        <div className="panel-section">
          <h3>Shortcuts to Favorite Companies</h3>
          <div className="favorite-companies">
            <button className="company-shortcut">Apple</button>
            <button className="company-shortcut">Google</button>
            <button className="company-shortcut">Meta</button>
            <button className="company-shortcut">Micron</button>
            <button className="company-shortcut">Microsoft</button>
          </div>
        </div>
        <div className="panel-section">
          <h3>Saved Jobs</h3>
          <ul>
            <li>Physical Design Engineer</li>
            <li>Verification Engineer</li>
          </ul>
        </div>
        <div className="panel-section">
          <h3>Applied Jobs</h3>
          <ul>
            <li>Analog Design Engineer</li>
          </ul>
        </div>
      </aside>

      {/* Middle Panel */}
      <main className="home-main-panel">
        {/* Tabs at the top of the main panel */}
        <div className="job-tabs">
          {/* First tab: Job Listings */}
          <div
            className={`job-tab${activeTab === null ? ' active' : ''}`}
            onClick={() => setActiveTab(null)}
          >
            Job Listings
          </div>
          {/* Other tabs: Opened job descriptions */}
          {openTabs.map((id) => {
            const job = getJobById(id);
            return (
              <div
                key={id}
                className={`job-tab${activeTab === id ? ' active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                {job.title} <span className="tab-close" onClick={e => {e.stopPropagation(); handleCloseTab(id);}}>&times;</span>
              </div>
            );
          })}
        </div>

        {/* Active tab content */}
        {activeTab === null ? (
          <>
            <div className="job-list-header">
              <div><h2>Job Listings</h2></div>
              <div style={{width: '100%'}}>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPrev={() => setPage(page - 1)}
                  onNext={() => setPage(page + 1)}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={n => { setItemsPerPage(n); setPage(1); }}
                  startIdx={startIdx}
                  endIdx={endIdx}
                  totalJobs={totalJobs}
                />
              </div>
              <div className="layout-selector" style={{width: '100%', marginTop: '0.5rem', display: 'flex', gap: '0.5rem'}}>
                <button
                  className={view === 'grid' ? 'active' : ''}
                  onClick={() => setView('grid')}
                >
                  Grid
                </button>
                <button
                  className={view === 'list' ? 'active' : ''}
                  onClick={() => setView('list')}
                >
                  List
                </button>
              </div>
            </div>
            <div className={`job-list-content ${view}`}>
              {jobsToShow.map((job) => (
                <JobCard key={job.id} job={job} onClick={() => handleJobClick(job)} />
              ))}
            </div>
            {/* Pagination block at bottom inside main panel */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage(page - 1)}
              onNext={() => setPage(page + 1)}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={n => { setItemsPerPage(n); setPage(1); }}
              startIdx={startIdx}
              endIdx={endIdx}
              totalJobs={totalJobs}
              style={{marginTop: '1rem'}}
            />
          </>
        ) : (
          <div className="job-description">
            <h3>{getJobById(activeTab).title}</h3>
            <div className="progress-meters">
              <ProgressMeter label="Experience Match" value={80} />
              <ProgressMeter label="Skill Match" value={70} />
              <ProgressMeter label="Overall Match" value={75} />
            </div>
            <p><strong>Company:</strong> {getJobById(activeTab).company}</p>
            <p><strong>Location:</strong> {getJobById(activeTab).location}</p>
            <p><strong>Type:</strong> {getJobById(activeTab).type}</p>
            <p><strong>Posted:</strong> {getJobById(activeTab).postedDate}</p>
            <p><strong>Tags:</strong> {getJobById(activeTab).tags.join(', ')}</p>
            <p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Job details and requirements go here.</p>
          </div>
        )}
      </main>

      {/* Right Panel */}
      <aside className="home-right-panel">
        <div className="right-section">
          <h3>Comparative Analysis</h3>
          <ul>
            <li>Resume matches 80% of job requirements</li>
            <li>Cover letter matches 70%</li>
            <li>Portfolio matches 75%</li>
          </ul>
        </div>
        <div className="right-section">
          <h3>Interview Process & Tips</h3>
          <p>Interview rounds: HR, Technical, Managerial</p>
          <ul>
            <li>Prepare for behavioral questions</li>
            <li>Review VLSI fundamentals</li>
            <li>Practice coding and design problems</li>
          </ul>
        </div>
        <div className="right-section">
          <h3>Chat with LLM</h3>
          <textarea rows="2" placeholder="Ask anything about the job or company..." className="panel-notes"></textarea>
          <button className="panel-btn">Send</button>
        </div>
      </aside>
    </div>
  );
};

export default Home;
