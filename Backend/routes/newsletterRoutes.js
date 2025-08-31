// Backend/routes/newsletterRoutes.js
const express = require('express');
const router = express.Router();
const { subscribeNewsletter } = require('../controllers/newsletterController');

// POST /api/newsletter - subscribe to newsletter
router.post('/', subscribeNewsletter);

module.exports = router;
