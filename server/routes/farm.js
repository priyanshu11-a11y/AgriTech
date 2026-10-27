const express = require('express');
const router = express.Router();
const { getAll, getAllAdmin, create, update, remove } = require('../controllers/farmController');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, getAll);
router.get('/all', adminAuth, getAllAdmin);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
