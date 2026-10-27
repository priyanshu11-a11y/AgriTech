import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import api, { getApiError } from '../lib/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      setError(getApiError(err, 'Could not load products. Please try again.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  return (
    <div>
      <UserNavbar />
      <div className="products-page">
        <h2 className="products-title">Products List</h2>
        {loading && <p className="products-message">Loading products...</p>}
        {error && <div className="products-message products-error" role="alert">{error}<button onClick={loadProducts}>Retry</button></div>}
        {!loading && !error && products.length === 0 && <p className="products-message">No products available yet.</p>}
        <div className="products-grid">
          {products.map(p => (
            <div className="product-card" key={p._id}>
              <img src={p.imgUrl || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'} alt={p.name} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'; }} />
              <div className="product-card-body">
                <h4>{p.name}</h4>
                <p>Category: <strong>{p.category}</strong></p>
                <p>Price: <strong>₹{Number(p.price).toLocaleString('en-IN')}</strong></p>
                <p>Description: <strong>{p.description}</strong></p>
                <button className="btn-buy" onClick={() => navigate(`/order/${p._id}`)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
