const express = require('express');
const router = express.Router();
const { login, register, getDashboardStats } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', register);
router.get('/dashboard', adminAuth, getDashboardStats);

module.exports = router;
