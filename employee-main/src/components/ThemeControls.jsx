import React from 'react';
import { THEMES } from '../utils/themes.js';
import styles from './themeControls.module.css';

export default function ThemeControls({ themeKey, setThemeKey, cycling, setCycling, onReset }){
  return (
    <div className={styles.wrap}>
      <hr className={styles.hr} />
      <div className={styles.small}>Theme preview & quick actions</div>
      <div className={styles.row}>
        {Object.keys(THEMES).map(key => (
          <button key={key} className={styles.btn} data-theme={key} onClick={()=>setThemeKey(key)}>{key[0].toUpperCase()+key.slice(1)}</button>
        ))}
        <button className={styles.btn} onClick={onReset}>Reset Storage</button>
      </div>
      <div className={styles.controls}>
        <button className={`${styles.btn} ${styles.ghost}`} onClick={()=> setCycling(v=>!v)}>{cycling ? 'Stop Theme Cycle' : 'Start Theme Cycle'}</button>
      </div>
    </div>
  );
}


