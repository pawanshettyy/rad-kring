// Backend/controllers/careersController.js
const CareerApplication = require('../models/CareerApplication');
const { sendCareerApplicationEmail } = require('../utils/emailService');

// @desc    Submit a career application
// @route   POST /api/careers
// @access  Public
exports.submitCareerApplication = async (req, res) => {
  try {
    const { name, email, phone, position, resumeUrl, message } = req.body;
    if (!name || !email || !phone || !position || !resumeUrl) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }
    const application = new CareerApplication({ name, email, phone, position, resumeUrl, message });
    await application.save();
    await sendCareerApplicationEmail({ name, email, phone, position, resumeUrl, message });
    res.status(201).json({ message: 'Application submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
