import { useCallback, useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import api, { authConfig, getApiError } from '../lib/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const token = localStorage.getItem('adminToken');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/users', authConfig(token));
      setUsers(data);
    } catch (err) {
      setError(getApiError(err, 'Could not load users.'));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const openEdit = user => {
    setEditUser(user);
    setForm({ name: user.name || '', email: user.email || '' });
    setError('');
  };

  const saveUser = async event => {
    event.preventDefault();
    if (!editUser) return;
    setBusy(true);
    setError('');
    try {
      const { data } = await api.put(`/users/${editUser._id}`, form, authConfig(token));
      setUsers(current => current.map(user => user._id === data._id ? data : user));
      setEditUser(null);
    } catch (err) {
      setError(getApiError(err, 'Could not update this user.'));
    } finally {
      setBusy(false);
    }
  };

  const deleteUser = async user => {
    if (!window.confirm(`Delete ${user.name}'s account? This cannot be undone.`)) return;
    setBusy(true);
    setError('');
    try {
      await api.delete(`/users/${user._id}`, authConfig(token));
      setUsers(current => current.filter(item => item._id !== user._id));
      if (viewUser?._id === user._id) setViewUser(null);
    } catch (err) {
      setError(getApiError(err, 'Could not delete this user.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="users-page">
        <div className="table-card">
          <h2>Users</h2>
          {error && <div className="alert-msg" role="alert">{error}</div>}
          {loading ? <p className="table-status">Loading users...</p> : (
            <div className="table-scroll">
              <table className="agri-table">
                <thead>
                  <tr><th>SL/NO</th><th>USERID</th><th>USER NAME</th><th>EMAIL</th><th>OPERATION</th></tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td><span className="user-id">{user._id}</span></td>
                      <td><strong style={{ color: 'var(--green-primary)' }}>{user.name}</strong></td>
                      <td>{user.email}</td>
                      <td>
                        <div className="user-operations">
                          <button aria-label={`Edit ${user.name}`} title="Edit user" disabled={busy} onClick={() => openEdit(user)}>✏️</button>
                          <button aria-label={`Delete ${user.name}`} title="Delete user" disabled={busy} onClick={() => deleteUser(user)}>🗑️</button>
                          <button className="view-user-button" onClick={() => setViewUser(user)}>View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && <tr><td colSpan={5} className="table-status">No users found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
          {!loading && <button className="table-reload" onClick={load}>Refresh users</button>}
        </div>
      </div>
      {(editUser || viewUser) && (
        <div className="modal-backdrop" onMouseDown={event => {
          if (event.target === event.currentTarget) { setEditUser(null); setViewUser(null); }
        }}>
          <section className="user-modal" role="dialog" aria-modal="true" aria-labelledby="user-modal-title">
            {editUser ? (
              <>
                <h3 id="user-modal-title">Edit User</h3>
                {error && <div className="alert-msg" role="alert">{error}</div>}
                <form onSubmit={saveUser}>
                  <label className="form-label" htmlFor="edit-user-name">Name</label>
                  <input id="edit-user-name" className="form-input" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} required />
                  <label className="form-label" htmlFor="edit-user-email">Email</label>
                  <input id="edit-user-email" className="form-input" type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} required />
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => setEditUser(null)}>Cancel</button>
                    <button type="submit" className="btn-primary-green" disabled={busy}>{busy ? 'Saving...' : 'Save Changes'}</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3 id="user-modal-title">User Details</h3>
                <dl className="user-details">
                  <dt>Name</dt><dd>{viewUser.name}</dd>
                  <dt>Email</dt><dd>{viewUser.email}</dd>
                  <dt>User ID</dt><dd>{viewUser._id}</dd>
                </dl>
                <div className="form-actions">
                  <button className="btn-cancel" onClick={() => setViewUser(null)}>Close</button>
                  <button className="btn-primary-green" onClick={() => { const user = viewUser; setViewUser(null); openEdit(user); }}>Edit User</button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
