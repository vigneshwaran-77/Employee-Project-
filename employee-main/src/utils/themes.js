export const THEMES = {
  default: {bg:'#071129', panel:'#081226', accent:'#7c3aed', accent2:'#06b6d4'},
  sun: {bg:'#fff7ed', panel:'#fff1e6', accent:'#f97316', accent2:'#f43f5e', text:'#0b1220'},
  ocean: {bg:'#071e3d', panel:'#06203a', accent:'#06b6d4', accent2:'#06b6d4', text:'#e6f7fb'},
  midnight: {bg:'#0b1020', panel:'#071028', accent:'#9b5cff', accent2:'#3b82f6'}
};

export function applyThemeVars(t){
  const theme = t || THEMES.default;
  const root = document.documentElement;
  root.style.setProperty('--bg', theme.bg || '#071129');
  root.style.setProperty('--panel', theme.panel || '#081226');
  root.style.setProperty('--accent', theme.accent || '#7c3aed');
  root.style.setProperty('--accent-2', theme.accent2 || '#06b6d4');
  document.body.style.color = theme.text || '#e6eef8';
}


