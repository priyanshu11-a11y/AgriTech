const Booking = require('../models/Booking');
const Product = require('../models/Product');

exports.create = async (req, res) => {
  try {
    const { productId, name, email, phone, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const convenienceFee = 45;
    const totalAmount = product.price * quantity + convenienceFee;
    const booking = await Booking.create({
      userId: req.user.id,
      productId,
      productName: product.name,
      name,
      email,
      phone,
      quantity,
      price: product.price,
      convenienceFee,
      totalAmount
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email').sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
