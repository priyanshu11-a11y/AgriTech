import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('adminToken'); localStorage.removeItem('admin'); navigate('/'); };
  return (
    <nav className="navbar-agri navbar-admin" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <span className="navbar-brand">Agri-Tech</span>
      <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/admin/dashboard')}>Dashboard</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/admin/users')}>Users</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/admin/products')}>Products</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/admin/add-product')}>Add Product</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
