const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully!'))
  .catch(err => console.log('MongoDB Error:', err));

// Routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const farmRoutes = require('./routes/farm');
const cropRoutes = require('./routes/crop');
const productRoutes = require('./routes/product');
const bookingRoutes = require('./routes/booking');

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
