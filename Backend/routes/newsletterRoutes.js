const express = require('express');
const router = express.Router();
const {
  subscribeNewsletter,
  unsubscribeNewsletter,
  updatePreferences,
  getAllSubscribers,
  getNewsletterStats,
  exportSubscribers
} = require('../controllers/newsletterController');

// Public routes
router.post('/subscribe', subscribeNewsletter);
router.post('/unsubscribe', unsubscribeNewsletter);
router.put('/preferences', updatePreferences);

// Admin routes (add authentication middleware here)
router.get('/admin', getAllSubscribers);
router.get('/admin/stats', getNewsletterStats);
router.get('/admin/export', exportSubscribers);

module.exports = router;
