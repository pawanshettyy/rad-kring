// Backend/controllers/contactController.js
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, message });
  await contact.save();
  await sendContactEmail({ name, email, message });
  res.status(201).json({ message: 'Contact form submitted successfully and emailed.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
