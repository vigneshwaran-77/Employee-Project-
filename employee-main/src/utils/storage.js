const sampleCompanies = [
  {id: 'c1', name:'Apex Innovations', desc:'Product engineering & cloud services', details:'Founded 2016 · 340 employees · Mumbai'},
  {id: 'c2', name:'BlueWave Media', desc:'Creative studio for digital campaigns', details:'Founded 2012 · 85 employees · Remote-first'},
  {id: 'c3', name:'Civic Labs', desc:'Urban tech & data analytics', details:'Founded 2018 · 120 employees · Bengaluru'}
];

const sampleEmployees = [
  {id:'e1', name:'Asha Bhaskar', role:'Frontend Developer', email:'asha@apex.com', phone:'+91 98765 43210', location:'Mumbai, India', companyId:'c1', notes:'React specialist'},
  {id:'e2', name:'Rahul Mehta', role:'Product Manager', email:'rahul@bluewave.co', phone:'+91 91234 56789', location:'Remote', companyId:'c2', notes:'5 years PM experience'},
  {id:'e3', name:'Sneha Rao', role:'Data Scientist', email:'sneha@civic.ai', phone:'+91 99876 54321', location:'Bengaluru', companyId:'c3', notes:'ML & GIS work'}
];

const KEYS = {
  companies: 'ed_companies',
  employees: 'ed_employees',
  theme: 'ed_theme'
};

export function loadCompanies(){
  try{
    const v = localStorage.getItem(KEYS.companies);
    return v ? JSON.parse(v) : sampleCompanies;
  }catch{
    return sampleCompanies;
  }
}

export function saveCompanies(value){
  try{ localStorage.setItem(KEYS.companies, JSON.stringify(value)); }catch{}
}

export function loadEmployees(){
  try{
    const v = localStorage.getItem(KEYS.employees);
    return v ? JSON.parse(v) : sampleEmployees;
  }catch{
    return sampleEmployees;
  }
}

export function saveEmployees(value){
  try{ localStorage.setItem(KEYS.employees, JSON.stringify(value)); }catch{}
}

export function loadTheme(){
  try{ return localStorage.getItem(KEYS.theme); }catch{ return 'default'; }
}

export function saveTheme(value){
  try{ localStorage.setItem(KEYS.theme, value); }catch{}
}

export function resetStorage(){
  try{
    localStorage.removeItem(KEYS.companies);
    localStorage.removeItem(KEYS.employees);
  }catch{}
}


