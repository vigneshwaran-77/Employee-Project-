import React from 'react';
import styles from './employeeDetails.module.css';

function initials(name){
  return name.split(' ').map(s=>s[0]||'').slice(0,2).join('').toUpperCase();
}

export default function EmployeeDetails({ employee, company, onEdit, onDelete }){
  if(!employee){
    return null;
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.profile}>
        <div className={styles.big}>{initials(employee.name)}</div>
        <div>
          <h2 className={styles.h2}>{employee.name}</h2>
          <p className={styles.small}>{employee.role}</p>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.row}><div className={styles.left}>Email</div><div className={styles.right}>{employee.email || '—'}</div></div>
        <div className={styles.row}><div className={styles.left}>Phone</div><div className={styles.right}>{employee.phone || '—'}</div></div>
        <div className={styles.row}><div className={styles.left}>Location</div><div className={styles.right}>{employee.location || '—'}</div></div>
      </div>

      <div className={styles.company}>
        <h3 className={styles.h3}>{company.name}</h3>
        <p className={styles.small}>{company.desc}</p>
        <p className={styles.small}>{company.details}</p>
      </div>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.primary}`} onClick={onEdit}>Edit</button>
        <button className={`${styles.btn} ${styles.ghost}`} onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}


