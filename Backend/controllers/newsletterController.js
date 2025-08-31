// Backend/controllers/newsletterController.js
const Newsletter = require('../models/Newsletter');
const { sendNewsletterEmail } = require('../utils/emailService');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    // Save to DB
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already subscribed.' });
    }
    const subscriber = new Newsletter({ email });
    await subscriber.save();
    // Send notification email
    await sendNewsletterEmail(email);
    res.status(201).json({ message: 'Subscribed to newsletter.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
