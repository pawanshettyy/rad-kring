const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  updateContactStatus,
  getContactStats
} = require('../controllers/contactController');

// Public routes
router.post('/', submitContact);

// Admin routes (add authentication middleware here)
router.get('/admin', getAllContacts);
router.put('/admin/:id', updateContactStatus);
router.get('/admin/stats', getContactStats);

module.exports = router;
