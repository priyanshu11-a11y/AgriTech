const express = require('express');
const router = express.Router();
const { create, getMyBookings, getAllBookings } = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/', auth, create);
router.get('/my', auth, getMyBookings);
router.get('/all', adminAuth, getAllBookings);

module.exports = router;
