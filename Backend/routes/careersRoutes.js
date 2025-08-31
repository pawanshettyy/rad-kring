const express = require('express');
const router = express.Router();

const { submitCareerApplication } = require('../controllers/careersController');

// POST /api/careers - submit career application
router.post('/', submitCareerApplication);

module.exports = router;
