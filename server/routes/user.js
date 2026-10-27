const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/', adminAuth, getAllUsers);
router.put('/:id', adminAuth, updateUser);
router.delete('/:id', adminAuth, deleteUser);

module.exports = router;
