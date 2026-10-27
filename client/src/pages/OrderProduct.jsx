import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import api, { authConfig, getApiError } from '../lib/api';

const CONVENIENCE_FEE = 45;

export default function OrderProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    api.get(`/products/${productId}`)
      .then(({ data }) => { if (active) setProduct(data); })
      .catch(err => { if (active) setError(getApiError(err, 'Could not load this product.')); })
      .finally(() => { if (active) setLoading(false); });
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setForm(current => ({ ...current, name: user.name || '', email: user.email || '' }));
    } catch {
      setError('Your saved profile could not be read. Please sign in again.');
    }
    return () => { active = false; };
  }, [productId]);

  const handleBook = async event => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const token = localStorage.getItem('userToken');
      await api.post('/bookings', { productId, ...form, quantity }, authConfig(token));
      navigate('/my-bookings', { state: { bookingConfirmed: true } });
    } catch (err) {
      setError(getApiError(err, 'Booking failed. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div><UserNavbar /><p className="order-status">Loading product...</p></div>;
  if (error && !product) return <div><UserNavbar /><div className="order-status order-error" role="alert">{error}<button onClick={() => navigate('/products')}>Back to products</button></div></div>;
  if (!product) return <div><UserNavbar /><p className="order-status">Product not found. <button onClick={() => navigate('/products')}>Back to products</button></p></div>;

  const total = Number(product.price) * quantity + CONVENIENCE_FEE;

  return (
    <div className="order-page">
      <UserNavbar />
      <form className="order-card" onSubmit={handleBook}>
        <h3>Your Booking is almost Done!</h3>
        <div className="details-label">Details:</div>
        <p className="order-product-name">{product.name}</p>
        {error && <div className="alert-msg" role="alert">{error}</div>}
        <div className="form-group">
          <label className="sr-only" htmlFor="booking-name">Name</label>
          <input id="booking-name" className="form-input" placeholder="Name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} required />
        </div>
        <div className="form-row">
          <div>
            <label className="sr-only" htmlFor="booking-email">Email</label>
            <input id="booking-email" className="form-input" type="email" placeholder="Email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} required />
          </div>
          <div>
            <label className="sr-only" htmlFor="booking-phone">Phone Number</label>
            <input id="booking-phone" className="form-input" type="tel" placeholder="Phone Number" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} required />
          </div>
        </div>
        <div className="order-summary">
          <div className="order-row">
            <span>Quantity:</span>
            <div className="qty-control">
              <button type="button" className="qty-btn" aria-label="Decrease quantity" onClick={() => setQuantity(value => Math.max(1, value - 1))}>-</button>
              <span>{quantity}</span>
              <button type="button" className="qty-btn" aria-label="Increase quantity" onClick={() => setQuantity(value => value + 1)}>+</button>
            </div>
          </div>
          <div className="order-row"><span>Price:</span><span>₹ {Number(product.price) * quantity}</span></div>
          <div className="order-row"><span>Convenience Fee:</span><span>₹ {CONVENIENCE_FEE}</span></div>
          <div className="order-row total"><span>Total Amount:</span><span>₹ {total}</span></div>
        </div>
        <button type="submit" className="btn-book" disabled={submitting}>{submitting ? 'Booking...' : 'Book'}</button>
      </form>
    </div>
  );
}
