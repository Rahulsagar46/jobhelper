import React, { useState } from 'react';
import ApplicationDocumentsSection from '../components/ApplicationDocumentsSection';
import '../styles/Home.css';
import JobCard from '../components/JobCard';
import ProgressMeter from '../components/ProgressMeter';
import ChatLLMSection from '../components/ChatLLMSection';
import RightPanel from '../components/RightPanel';
import Pagination from '../components/Pagination';
import { jobs } from '../data/dummyData';
import JobFilterPreferences from '../components/JobFilterPreferences';
import FavoritesSection from '../components/FavoritesSection';
import SavedJobsSection from '../components/SavedJobsSection';
import AppliedJobsSection from '../components/AppliedJobsSection';
import NotesSection from '../components/NotesSection';



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
  <ApplicationDocumentsSection />
  <JobFilterPreferences />
  <FavoritesSection />
  <SavedJobsSection onJobClick={handleJobClick} />
  <AppliedJobsSection onJobClick={handleJobClick} />
  <NotesSection />
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
              <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'right', marginBottom: '0.5rem', gap: '0.5rem'}}>
                <div className="layout-selector" style={{width: '100%', marginTop: '0.2rem', marginBottom: '0rem', display: 'flex', gap: '0.1rem'}}>
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
  <RightPanel />
    </div>
  );
};

export default Home;
