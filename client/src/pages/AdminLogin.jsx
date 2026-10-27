import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getApiError } from '../lib/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/admin/login', form);
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(getApiError(err, 'Admin login failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Admin Login</h2>
        <div className="subtitle">Access the Agri-Tech admin panel</div>
        {error && <div className="alert-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <input className="form-input" type="email" placeholder="admin@agritech.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary-green" style={{width:'100%',padding:'13px'}} disabled={loading}>{loading ? 'Signing in...' : 'Login as Admin'}</button>
        </form>
        <div className="auth-link" style={{marginTop:16}}>
          <a href="#" onClick={async(e)=>{
            e.preventDefault();
            try { await api.post('/admin/register',{name:'Admin',email:'admin@agritech.com',password:'admin123'}); alert('Admin account created.'); } catch(err){ alert(getApiError(err, 'Could not set up the admin account.')); }
          }} style={{color:'#888',fontSize:'0.8rem'}}>Setup Admin Account</a>
        </div>
      </div>
    </div>
  );
}
