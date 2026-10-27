import { useNavigate } from 'react-router-dom';

export default function UserNavbar() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('userToken'); localStorage.removeItem('user'); navigate('/'); };
  return (
    <nav className="navbar-agri navbar-user" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <span className="navbar-brand">Agri-Tech</span>
      <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/uhome')}>Home</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/products')}>Products</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/farms')}>Farms</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/crops')}>Crops</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>navigate('/my-bookings')}>MyBookings</button>
        <button className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}} onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
