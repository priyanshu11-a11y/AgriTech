import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import api, { authConfig, getApiError } from '../lib/api';

const EMPTY_FORM = { name: '', category: '', price: '', description: '', imgUrl: '' };

export default function AddProduct() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('edit');
  const editing = Boolean(productId);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    api.get(`/products/${productId}`)
      .then(({ data }) => setForm({
        name: data.name || '',
        category: data.category || '',
        price: String(data.price ?? ''),
        description: data.description || '',
        imgUrl: data.imgUrl || '',
      }))
      .catch(err => setError(getApiError(err, 'Could not load this product for editing.')))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMsg('');
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price) };
      if (editing) {
        await api.put(`/products/${productId}`, payload, authConfig(token));
      } else {
        await api.post('/products', payload, authConfig(token));
      }
      setMsg(editing ? 'Product updated successfully!' : 'Product added successfully!');
      setTimeout(() => navigate('/admin/products'), 1200);
    } catch (err) {
      setError(getApiError(err, editing ? 'Failed to update product.' : 'Failed to add product.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="form-page">
        <div className="form-container form-container-wide">
          <h2>{editing ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="subtitle">Fill in the details of your new agricultural product</div>
          {error && <div className="alert-msg" role="alert">{error}</div>}
          {msg && <div className="success-msg" role="status">{msg}</div>}
          {loading && editing && !form.name ? <p className="form-status">Loading product details...</p> : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="product-name">Product Name <span>*</span></label>
                <input id="product-name" className="form-input" placeholder="e.g., Organic Wheat Flour" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="product-category">Category <span>*</span></label>
                  <select id="product-category" className="form-input" value={form.category} onChange={event => setForm({ ...form, category: event.target.value })} required>
                    <option value="">Select a category</option>
                    <option value="seeds">Seeds</option>
                    <option value="fertilizers">Fertilizers</option>
                    <option value="pesticides">Pesticides</option>
                    <option value="tools">Tools</option>
                    <option value="equipment">Equipment</option>
                    <option value="veg">Vegetables</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="product-price">Price (₹) <span>*</span></label>
                  <input id="product-price" className="form-input" type="number" min="0" step="0.01" placeholder="e.g., 199.99" value={form.price} onChange={event => setForm({ ...form, price: event.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-description">Description <span>*</span></label>
                <textarea id="product-description" className="form-input" rows={4} placeholder="Describe the product features and benefits" value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} required style={{ resize: 'vertical' }} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-image">Image URL <span>*</span></label>
                <input id="product-image" className="form-input" type="url" placeholder="https://example.com/image.jpg" value={form.imgUrl} onChange={event => setForm({ ...form, imgUrl: event.target.value })} required />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => navigate('/admin/products')}>Cancel</button>
                <button type="submit" className="btn-primary-green" disabled={loading}>{loading ? 'Saving...' : editing ? 'Save Changes' : 'Add Product'}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
