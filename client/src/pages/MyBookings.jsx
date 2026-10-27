import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import api, { authConfig, getApiError } from '../lib/api';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('userToken');
  const location = useLocation();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/bookings/my', authConfig(token));
      setBookings(data);
    } catch (err) {
      setError(getApiError(err, 'Could not load your bookings.'));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <UserNavbar />
      <div className="bookings-page">
        <h2 className="bookings-title">My Bookings</h2>
        {location.state?.bookingConfirmed && <p className="booking-confirmation" role="status">Your booking is confirmed.</p>}
        {loading && <p className="booking-status">Loading your orders...</p>}
        {error && <div className="booking-status booking-error" role="alert">{error}<button onClick={load}>Retry</button></div>}
        {!loading && !error && bookings.length === 0 && (
          <div className="booking-empty">
            <h3>No orders yet</h3>
            <p>Your product bookings will appear here after you place an order.</p>
            <a href="/products">Browse products</a>
          </div>
        )}
        {!loading && !error && bookings.map(booking => (
          <article className="booking-row" key={booking._id}>
            <div><div className="booking-label">BookingId:</div><div className="booking-val">{booking._id?.slice(-10)}</div></div>
            <div><div className="booking-label">Product Name:</div><div className="booking-val">{booking.productName}</div></div>
            <div><div className="booking-label">BookingDate:</div><div className="booking-val">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : '—'}</div></div>
            <div><div className="booking-label">Quantity:</div><div className="booking-val">{booking.quantity}</div></div>
            <div><div className="booking-label">Price:</div><div className="booking-val">₹{Number(booking.totalAmount).toLocaleString('en-IN')}</div></div>
            <div><div className="booking-label">Status:</div><div className={`booking-status-pill status-${booking.status?.replaceAll(' ', '-')}`}>{booking.status}</div></div>
          </article>
        ))}
      </div>
    </div>
  );
}
