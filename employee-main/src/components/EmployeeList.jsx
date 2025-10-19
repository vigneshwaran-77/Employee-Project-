import React from 'react';
import styles from './employeeList.module.css';

function initials(name){
  return name.split(' ').map(s=>s[0]||'').slice(0,2).join('').toUpperCase();
}

export default function EmployeeList({ employees, companies = [], onSelect }){
  if(!employees || employees.length===0){
    return <div className={styles.empty}>No employees match the filter. Try adding one.</div>;
  }
  const companyName = (id)=> companies.find(c=>c.id===id)?.name || '—';
  return (
    <div>
      {employees.map(emp=> (
        <button key={emp.id} className={styles.emp} onClick={()=>onSelect(emp.id)}>
          <div className={styles.avatar}>{initials(emp.name)}</div>
          <div className={styles.meta}>
            <div className={styles.name}>{emp.name}</div>
            <div className={styles.role}>{emp.role} · {companyName(emp.companyId)}</div>
          </div>
        </button>
      ))}
    </div>
  );
}


