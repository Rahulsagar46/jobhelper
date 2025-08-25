
import '../styles/Pagination.css';
import React from 'react';


const Pagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
  itemsPerPage,
  onItemsPerPageChange,
  startIdx,
  endIdx,
  totalJobs,
  className = '',
  style = {}
}) => (
  <div className={`pagination ${className}`} style={style}>
    <span className="pagination-info">
      Showing {startIdx + 1}-{endIdx} of {totalJobs} jobs
    </span>
    <button onClick={onPrev} disabled={page === 1}>
      Prev
    </button>
    <span>
      Page {page} of {totalPages}
    </span>
    <button onClick={onNext} disabled={page === totalPages}>
      Next
    </button>
    <span style={{ marginLeft: '1rem' }}>
      Items per page:
      <select
        value={itemsPerPage}
        onChange={e => onItemsPerPageChange(Number(e.target.value))}
        style={{ marginLeft: '0.5rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}
      >
        {[5, 10, 20, 50].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </span>
  </div>
);

export default Pagination;
