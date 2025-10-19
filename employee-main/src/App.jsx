import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import EmployeeDetails from './components/EmployeeDetails.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';
import ThemeControls from './components/ThemeControls.jsx';
import {
  loadCompanies,
  loadEmployees,
  saveCompanies,
  saveEmployees,
  loadTheme,
  saveTheme,
  resetStorage,
} from './utils/storage.js';
import { THEMES, applyThemeVars } from './utils/themes.js';
import styles from './app.module.css';

export default function App(){
  const [companies, setCompanies] = useState(loadCompanies());
  const [employees, setEmployees] = useState(loadEmployees());
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(false);
  const [themeKey, setThemeKey] = useState(loadTheme() || 'default');
  const [cycling, setCycling] = useState(false);

  useEffect(()=>{
    saveCompanies(companies);
  },[companies]);
  useEffect(()=>{
    saveEmployees(employees);
  },[employees]);
  useEffect(()=>{
    saveTheme(themeKey);
    applyThemeVars(THEMES[themeKey] || THEMES.default);
  },[themeKey]);

  useEffect(()=>{
    applyThemeVars(THEMES[themeKey] || THEMES.default);
  },[]);

  // theme cycling
  useEffect(()=>{
    if(!cycling) return;
    const keys = Object.keys(THEMES);
    let idx = Math.max(0, keys.indexOf(themeKey));
    const id = setInterval(()=>{
      idx = (idx + 1) % keys.length;
      setThemeKey(keys[idx]);
    }, 10000);
    return ()=> clearInterval(id);
  },[cycling, themeKey]);

  const filteredEmployees = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return employees
      .filter(e => e.name.toLowerCase().includes(q))
      .sort((a,b)=> a.name.localeCompare(b.name));
  }, [employees, query]);

  const selected = useMemo(()=> employees.find(e=>e.id===selectedId) || null, [employees, selectedId]);

  function handleSaveEmployee(data){
    if(editing && selected){
      setEmployees(prev => prev.map(e => e.id===selected.id ? {...data, id: selected.id} : e));
    } else {
      setEmployees(prev => [{...data, id: data.id || genId('e')}, ...prev]);
    }
    setEditing(false);
  }

  function handleDeleteSelected(){
    if(!selected) return;
    if(!window.confirm('Delete this employee?')) return;
    setEmployees(prev => prev.filter(e => e.id !== selected.id));
    setSelectedId(null);
    setEditing(false);
  }

  function openAdd(){
    setEditing(false);
    setSelectedId(null);
    document.getElementById('emp-name')?.focus();
  }

  function openEdit(){
    if(!selected) return;
    setEditing(true);
    document.getElementById('emp-name')?.focus();
  }

  function genId(prefix='x'){ return prefix + Math.random().toString(36).slice(2,9); }

  // keyboard shortcuts
  useEffect(()=>{
    function onKey(e){
      if(e.key === '/'){
        e.preventDefault();
        const el = document.getElementById('search-input');
        el?.focus();
      } else if(e.key === 'Enter'){
        const q = query.trim().toLowerCase();
        if(!q) return;
        const found = employees.find(emp => emp.name.toLowerCase()===q);
        if(found){ setSelectedId(found.id); }
      }
    }
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [query, employees]);

  function companyName(id){
    const c = companies.find(c=>c.id===id);
    return c ? c.name : '—';
  }

  function handleReset(){
    if(!window.confirm('Clear saved data?')) return;
    resetStorage();
    setCompanies(loadCompanies());
    setEmployees(loadEmployees());
    setSelectedId(null);
    setEditing(false);
    setQuery('');
  }

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <Sidebar
          companies={companies}
          employees={filteredEmployees}
          totalCount={filteredEmployees.length}
          query={query}
          onQueryChange={setQuery}
          onAddClick={openAdd}
          onSelect={setSelectedId}
        />

        <ThemeControls
          themeKey={themeKey}
          setThemeKey={setThemeKey}
          cycling={cycling}
          setCycling={setCycling}
          onReset={handleReset}
        />
      </aside>

      <main className={styles.main}>
        <div className={styles.detailsGrid}>
          <div className={`${styles.card} animateFade`}>
            {!selected ? (
              <div>
                <h2>Welcome 👋</h2>
                <p className={styles.small}>Select an employee to see full profile. You can add, edit or delete records. Search is live.</p>
              </div>
            ) : (
              <EmployeeDetails
                employee={selected}
                company={companies.find(c=>c.id===selected.companyId) || {name:'—',desc:'—',details:'—'}}
                onEdit={openEdit}
                onDelete={handleDeleteSelected}
              />
            )}
          </div>

          <div>
            <div className={`${styles.card} animateFade`}>
              <EmployeeForm
                key={selected ? selected.id + (editing?'-edit':'-view') : 'new'}
                companies={companies}
                editing={editing}
                initial={editing && selected ? selected : null}
                onCancel={()=>setEditing(false)}
                onSave={handleSaveEmployee}
              />
            </div>

            <div style={{height:12}} />
            <div className={`${styles.card} ${styles.small} animateFade`}>
              <strong>How it works</strong>
              <p className={styles.small}>Live search filters employees as you type. Add/update/delete changes persist in browser localStorage. Theme cycling changes colors every 10s when enabled.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


