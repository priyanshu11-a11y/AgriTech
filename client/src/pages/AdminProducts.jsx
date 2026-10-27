import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import api, { authConfig, getApiError } from '../lib/api';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      setError(getApiError(err, 'Could not load products.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`, authConfig(token));
      setProducts(current => current.filter(product => product._id !== id));
    } catch (err) {
      setError(getApiError(err, 'Could not delete this product.'));
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="products-page">
        <h2 className="products-title">Products List</h2>
        <div className="admin-products-toolbar">
          <span>{products.length} product{products.length === 1 ? '' : 's'}</span>
          <button className="btn-primary-green" onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
        </div>
        {loading && <p className="products-message">Loading products...</p>}
        {error && <div className="products-message products-error" role="alert">{error}<button onClick={load}>Retry</button></div>}
        {!loading && !error && products.length === 0 && <p className="products-message">No products yet. Add your first product to make it available to farmers.</p>}
        <div className="products-grid">
          {products.map(product => (
            <article className="product-card" key={product._id}>
              <img
                src={product.imgUrl || FALLBACK_IMAGE}
                alt={product.name}
                onError={event => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
              <div className="product-card-body">
                <h4>{product.name}</h4>
                <p>Category: <strong>{product.category}</strong></p>
                <p>Price: <strong>₹{Number(product.price).toLocaleString('en-IN')}</strong></p>
                <p>Description: <strong>{product.description}</strong></p>
                <div className="admin-product-actions">
                  <button onClick={() => navigate(`/admin/add-product?edit=${product._id}`)}>Edit</button>
                  <button onClick={() => deleteProduct(product._id)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
