import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api, { authConfig, getApiError } from '../lib/api';

const EMPTY_STATS = { totalUsers: 0, totalFarms: 0, totalProducts: 0, recentUsers: [], recentProducts: [] };
const COLORS = ['#7c3aed', '#dc2626', '#0f766e'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/dashboard', authConfig(token))
      .then(({ data }) => setStats({ ...EMPTY_STATS, ...data }))
      .catch(err => setError(getApiError(err, 'Could not load dashboard data.')))
      .finally(() => setLoading(false));
  }, [token]);

  const chartData = [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Farms', value: stats.totalFarms },
    { name: 'Products', value: stats.totalProducts },
  ];

  return (
    <div>
      <AdminNavbar />
      <div className="admin-page">
        <h2 className="page-title">Admin Dashboard</h2>
        <p className="page-subtitle">Overview of your agricultural management system</p>
        {loading && <p className="dashboard-status">Loading dashboard data...</p>}
        {error && <div className="alert-msg dashboard-error" role="alert">{error}<button onClick={() => window.location.reload()}>Retry</button></div>}

        <div className="stats-cards-grid">
          <button className="stat-info-card stat-info-action" onClick={() => navigate('/admin/users')}>
            <div><div className="stat-label">Total Users</div><div className="stat-val">{stats.totalUsers}</div></div>
            <div className="stat-icon icon-purple">👥</div>
          </button>
          <div className="stat-info-card">
            <div><div className="stat-label">Total Farms</div><div className="stat-val">{stats.totalFarms}</div></div>
            <div className="stat-icon icon-red">🌐</div>
          </div>
          <button className="stat-info-card stat-info-action" onClick={() => navigate('/admin/products')}>
            <div><div className="stat-label">Total Products</div><div className="stat-val">{stats.totalProducts}</div></div>
            <div className="stat-icon icon-teal">📦</div>
          </button>
        </div>

        <div className="chart-card">
          <h3>System Overview</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={value => [value, 'Total']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((item, index) => <Cell key={item.name} fill={COLORS[index]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="recent-grid">
          <div className="recent-card">
            <div className="recent-card-heading">
              <h3>Recent Users</h3>
              <button onClick={() => navigate('/admin/users')}>View all</button>
            </div>
            {stats.recentUsers.map(user => (
              <button className="recent-item recent-item-action" key={user._id} onClick={() => navigate('/admin/users')}>
                <div className="recent-avatar avatar-purple">👤</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>{user.email}</div>
                </div>
              </button>
            ))}
            {stats.recentUsers.length === 0 && <p className="recent-empty">No users yet</p>}
          </div>
          <div className="recent-card">
            <div className="recent-card-heading">
              <h3>Recent Products</h3>
              <button onClick={() => navigate('/admin/products')}>View all</button>
            </div>
            {stats.recentProducts.map(product => (
              <button className="recent-item recent-item-action" key={product._id} onClick={() => navigate('/admin/products')}>
                <div className="recent-avatar avatar-teal">📦</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{product.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>{product.category}</div>
                </div>
              </button>
            ))}
            {stats.recentProducts.length === 0 && <p className="recent-empty">No products yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
