import { useCallback, useEffect, useState } from 'react';
import UserNavbar from '../components/UserNavbar';
import api, { authConfig, getApiError } from '../lib/api';

const EMPTY_FORM = { cropName: '', variety: '', quantity: '', plantedDate: '', harvestDate: '' };

export default function Crops() {
  const [crops, setCrops] = useState([]);
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
      const { data } = await api.get('/crops', authConfig(token));
      setCrops(data);
    } catch (err) {
      setError(getApiError(err, 'Could not load your crops.'));
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
      const payload = { ...form, quantity: form.quantity ? Number(form.quantity) : undefined };
      const { data } = await api.post('/crops', payload, authConfig(token));
      setCrops(current => [...current, data]);
      setShowForm(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(getApiError(err, 'Could not add this crop.'));
    } finally {
      setSubmitting(false);
    }
  };

  const deleteCrop = async crop => {
    if (!window.confirm(`Delete ${crop.cropName}? This cannot be undone.`)) return;
    setError('');
    try {
      await api.delete(`/crops/${crop._id}`, authConfig(token));
      setCrops(current => current.filter(item => item._id !== crop._id));
    } catch (err) {
      setError(getApiError(err, 'Could not delete this crop.'));
    }
  };

  return (
    <div>
      <UserNavbar />
      {showForm ? (
        <div className="form-page">
          <div className="form-container">
            <h2>Add New Crop</h2>
            <div className="subtitle">Fill in the details of your new crop planting</div>
            {error && <div className="alert-msg" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="crop-name">Crop Name</label>
                <input id="crop-name" className="form-input" placeholder="e.g., Wheat, Rice, Corn" value={form.cropName} onChange={event => setForm({ ...form, cropName: event.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="crop-variety">Variety</label>
                <input id="crop-variety" className="form-input" placeholder="e.g., Golden, Hybrid" value={form.variety} onChange={event => setForm({ ...form, variety: event.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="crop-quantity">Quantity (acres/kg)</label>
                <input id="crop-quantity" className="form-input" type="number" min="0" step="any" placeholder="Enter quantity" value={form.quantity} onChange={event => setForm({ ...form, quantity: event.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="crop-planted">Planted Date</label>
                  <input id="crop-planted" className="form-input" type="date" value={form.plantedDate} onChange={event => setForm({ ...form, plantedDate: event.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="crop-harvest">Harvest Date</label>
                  <input id="crop-harvest" className="form-input" type="date" value={form.harvestDate} onChange={event => setForm({ ...form, harvestDate: event.target.value })} />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => { setShowForm(false); setError(''); }}>Cancel</button>
                <button type="submit" className="btn-primary-green" disabled={submitting}>{submitting ? 'Adding...' : 'Add Crop'}</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="farm-page">
          <div className="farm-list">
            <div className="farm-list-heading">
              <h2 className="products-title">My Crops</h2>
              <button className="btn-primary-green" onClick={() => { setError(''); setShowForm(true); }}>+ Add Crop</button>
            </div>
            {error && <div className="alert-msg" role="alert">{error}<button onClick={load}>Retry</button></div>}
            {loading && <div className="farm-empty">Loading your crops...</div>}
            {!loading && !error && crops.length === 0 && <div className="farm-empty">No crops added yet.</div>}
            {crops.map(crop => (
              <article className="farm-card" key={crop._id}>
                <div className="farm-card-content">
                  <div>
                    <h4>{crop.cropName} {crop.variety && <span>({crop.variety})</span>}</h4>
                    {crop.quantity !== undefined && crop.quantity !== null && <p>📦 Quantity: {crop.quantity}</p>}
                    {crop.plantedDate && <p>🌱 Planted: {new Date(crop.plantedDate).toLocaleDateString()}</p>}
                    {crop.harvestDate && <p>🌾 Harvest: {new Date(crop.harvestDate).toLocaleDateString()}</p>}
                  </div>
                  <button className="danger-action" onClick={() => deleteCrop(crop)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
