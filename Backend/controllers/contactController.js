const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, contactNo, preferredTime, message } = req.body;

    // Basic validation
    if (!name || !email || !contactNo || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if email already exists (to prevent spam)
    const existingContact = await Contact.findOne({ 
      email: email.toLowerCase(),
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Within last 24 hours
    });

    if (existingContact) {
      return res.status(409).json({
        success: false,
        message: 'A contact request from this email already exists within the last 24 hours'
      });
    }

    // Create new contact
    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      contactNo: contactNo.trim(),
      preferredTime,
      message: message ? message.trim() : ''
    });

    // Send notification email to admin (don't block response if email fails)
    sendContactNotification(contact).catch(err => 
      console.error('Email notification failed:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact/admin
// @access  Private
const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const isRead = req.query.isRead;

    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: contacts.length,
          totalRecords: total
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/admin/:id
// @access  Private
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isRead, responseNotes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (isRead !== undefined) updateData.isRead = isRead;
    if (responseNotes !== undefined) updateData.responseNotes = responseNotes;

    const contact = await Contact.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact'
    });
  }
};

// @desc    Get contact statistics (Admin only)
// @route   GET /api/contact/admin/stats
// @access  Private
const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalContacts = await Contact.countDocuments();
    const unreadContacts = await Contact.countDocuments({ isRead: false });
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    res.json({
      success: true,
      data: {
        totalContacts,
        unreadContacts,
        todayContacts,
        statusBreakdown: stats,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics'
    });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  updateContactStatus,
  getContactStats
};
