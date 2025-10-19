import React, { useEffect, useMemo, useState } from 'react';
import styles from './employeeForm.module.css';

function genId(prefix='x'){ return prefix + Math.random().toString(36).slice(2,9); }

export default function EmployeeForm({ companies, editing, initial, onSave, onCancel }){
  const [form, setForm] = useState(()=> ({
    id: initial?.id || genId('e'),
    name: initial?.name || '',
    role: initial?.role || '',
    email: initial?.email || '',
    phone: initial?.phone || '',
    location: initial?.location || '',
    companyId: initial?.companyId || (companies?.[0]?.id || ''),
    notes: initial?.notes || '',
  }));

  useEffect(()=>{
    setForm({
      id: initial?.id || genId('e'),
      name: initial?.name || '',
      role: initial?.role || '',
      email: initial?.email || '',
      phone: initial?.phone || '',
      location: initial?.location || '',
      companyId: initial?.companyId || (companies?.[0]?.id || ''),
      notes: initial?.notes || '',
    });
  }, [initial, companies]);

  function update(field, value){
    setForm(prev => ({...prev, [field]: value}));
  }

  function submit(e){
    e.preventDefault();
    if(!form.name.trim() || !form.role.trim()) return;
    onSave({...form});
  }

  return (
    <div>
      <h3 className={styles.h3}>{editing ? 'Edit Employee' : 'Add Employee'}</h3>
      <form onSubmit={submit}>
        <div className={styles.row}><input id="emp-name" placeholder="Full name" required value={form.name} onChange={e=>update('name', e.target.value)} /></div>
        <div className={styles.row}><input placeholder="Role / Designation" required value={form.role} onChange={e=>update('role', e.target.value)} /></div>
        <div className={styles.row}><input placeholder="Email" value={form.email} onChange={e=>update('email', e.target.value)} /></div>
        <div className={styles.row}><input placeholder="Phone" value={form.phone} onChange={e=>update('phone', e.target.value)} /></div>
        <div className={styles.row}><input placeholder="Location" value={form.location} onChange={e=>update('location', e.target.value)} /></div>
        <div className={styles.row}>
          <select value={form.companyId} onChange={e=>update('companyId', e.target.value)}>
            {companies?.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.row}><textarea placeholder="Notes / Additional info" value={form.notes} onChange={e=>update('notes', e.target.value)} /></div>

        <div className={styles.actions}>
          <button type="submit" className={`${styles.btn} ${styles.primary}`}>Save</button>
          <button type="button" className={`${styles.btn} ${styles.ghost}`} onClick={onCancel}>Cancel</button>
        </div>

        <div className={styles.small}>You can edit an existing employee by selecting them and clicking Edit.</div>
      </form>
    </div>
  );
}


