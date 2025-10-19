import React from 'react';
import EmployeeList from './EmployeeList.jsx';
import styles from './sidebar.module.css';

export default function Sidebar({ companies, employees, totalCount, query, onQueryChange, onAddClick, onSelect }){
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <div className={styles.badge}>ED</div>
        <div>
          <h1>Employee Directory</h1>
          <p>Fast, animated & user-friendly</p>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <input
            id="search-input"
            placeholder="Search employee by name..."
            value={query}
            onChange={e=>onQueryChange(e.target.value)}
          />
          <div className={styles.count}>{totalCount} result{totalCount!==1?'s':''}</div>
        </div>

        <div className={styles.controls}>
          <button className={`${styles.btn} ${styles.primary}`} onClick={onAddClick}>+ Add Employee</button>
        </div>

        <div className={styles.list}>
          <EmployeeList employees={employees} companies={companies} onSelect={onSelect} />
        </div>

        <div className={styles.footer}>Tip: start typing a name to see instant results. Click an employee to view or edit.</div>
      </div>
    </div>
  );
}


