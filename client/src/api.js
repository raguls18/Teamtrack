const API=import.meta.env.VITE_API_URL||'http://localhost:5001/api';
export function getToken(){return localStorage.getItem('token')||''}
export function saveSession(data){localStorage.setItem('token',data.token);localStorage.setItem('user',JSON.stringify(data.user))}
export function clearSession(){localStorage.removeItem('token');localStorage.removeItem('user')}
export async function api(path,options={}){const headers={'Content-Type':'application/json',...(options.headers||{})};if(getToken())headers.Authorization=`Bearer ${getToken()}`;const response=await fetch(`${API}${path}`,{...options,headers});const data=await response.json().catch(()=>({message:'Invalid server response'}));if(!response.ok)throw new Error(data.message||'Request failed');return data}
