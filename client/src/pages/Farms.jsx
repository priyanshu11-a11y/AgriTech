import { useCallback, useEffect, useState } from 'react';
import UserNavbar from '../components/UserNavbar';
import api, { authConfig, getApiError } from '../lib/api';

const EMPTY_FORM = { farmName: '', location: '', areaSize: '', establishedDate: '', primaryCropType: '' };

export default function Farms() {
  const [farms, setFarms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('userToken');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/farms', authConfig(token));
      setFarms(data);
    } catch (err) {
      setError(getApiError(err, 'Could not load your farms.'));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const { data } = await api.post('/farms', { ...form, areaSize: Number(form.areaSize) }, authConfig(token));
      setFarms(current => [...current, data]);
      setShowForm(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(getApiError(err, 'Could not register this farm.'));
    } finally {
      setSubmitting(false);
    }
  };

  const deleteFarm = async farm => {
    if (!window.confirm(`Delete ${farm.farmName}? This cannot be undone.`)) return;
    setError('');
    try {
      await api.delete(`/farms/${farm._id}`, authConfig(token));
      setFarms(current => current.filter(item => item._id !== farm._id));
    } catch (err) {
      setError(getApiError(err, 'Could not delete this farm.'));
    }
  };

  return (
    <div>
      <UserNavbar />
      {showForm ? (
        <div className="form-page">
          <div className="form-container">
            <h2>Register New Farm</h2>
            <div className="subtitle">Provide details about your agricultural land</div>
            {error && <div className="alert-msg" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="farm-name">Farm Name <span>*</span></label>
                <input id="farm-name" className="form-input" placeholder="e.g., Green Valley Farm" value={form.farmName} onChange={event => setForm({ ...form, farmName: event.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="farm-location">Location <span>*</span></label>
                <input id="farm-location" className="form-input" placeholder="e.g., County, State" value={form.location} onChange={event => setForm({ ...form, location: event.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="farm-area">Area Size (acres) <span>*</span></label>
                  <input id="farm-area" className="form-input" type="number" min="0.01" step="0.01" placeholder="e.g., 5.2" value={form.areaSize} onChange={event => setForm({ ...form, areaSize: event.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="farm-date">Established Date</label>
                  <input id="farm-date" className="form-input" type="date" value={form.establishedDate} onChange={event => setForm({ ...form, establishedDate: event.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="farm-crop">Primary Crop Type <span>*</span></label>
                <input id="farm-crop" className="form-input" placeholder="e.g., Wheat, Corn, Soybeans" value={form.primaryCropType} onChange={event => setForm({ ...form, primaryCropType: event.target.value })} required />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => { setShowForm(false); setError(''); }}>Cancel</button>
                <button type="submit" className="btn-primary-green" disabled={submitting}>{submitting ? 'Registering...' : 'Register Farm'}</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="farm-page">
          <div className="farm-list">
            <div className="farm-list-heading">
              <h2 className="products-title">My Farms</h2>
              <button className="btn-primary-green" onClick={() => { setError(''); setShowForm(true); }}>+ Add Farm</button>
            </div>
            {error && <div className="alert-msg" role="alert">{error}<button onClick={load}>Retry</button></div>}
            {loading && <div className="farm-empty">Loading your farms...</div>}
            {!loading && !error && farms.length === 0 && <div className="farm-empty">No farms registered yet. Click "Add Farm" to start.</div>}
            {farms.map(farm => (
              <article className="farm-card" key={farm._id}>
                <div className="farm-card-content">
                  <div>
                    <h4>{farm.farmName}</h4>
                    <p>📍 {farm.location}</p>
                    <p>📐 {farm.areaSize} acres &nbsp;|&nbsp; 🌱 {farm.primaryCropType}</p>
                    {farm.establishedDate && <p>Established: {new Date(farm.establishedDate).toLocaleDateString()}</p>}
                  </div>
                  <button className="danger-action" onClick={() => deleteFarm(farm)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
