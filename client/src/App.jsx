import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import UserHome from './pages/UserHome';
import Products from './pages/Products';
import Farms from './pages/Farms';
import Crops from './pages/Crops';
import MyBookings from './pages/MyBookings';
import CropInfo from './pages/CropInfo';
import OrderProduct from './pages/OrderProduct';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';

// Protected Route for User
const UserRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  return token ? children : <Navigate to="/login" />;
};

// Protected Route for Admin
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* User Protected Routes */}
        <Route path="/uhome" element={<UserRoute><UserHome /></UserRoute>} />
        <Route path="/products" element={<UserRoute><Products /></UserRoute>} />
        <Route path="/farms" element={<UserRoute><Farms /></UserRoute>} />
        <Route path="/crops" element={<UserRoute><Crops /></UserRoute>} />
        <Route path="/my-bookings" element={<UserRoute><MyBookings /></UserRoute>} />
        <Route path="/crop-info/:id" element={<UserRoute><CropInfo /></UserRoute>} />
        <Route path="/order/:productId" element={<UserRoute><OrderProduct /></UserRoute>} />

        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
