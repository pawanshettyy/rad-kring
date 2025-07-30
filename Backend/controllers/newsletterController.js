const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
const subscribeNewsletter = async (req, res) => {
  try {
    const { email, firstName, lastName, interests, source } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ 
      email: email.toLowerCase() 
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(409).json({
          success: false,
          message: 'Email is already subscribed to our newsletter'
        });
      } else {
        // Reactivate existing subscription
        existingSubscription.isActive = true;
        existingSubscription.firstName = firstName || existingSubscription.firstName;
        existingSubscription.lastName = lastName || existingSubscription.lastName;
        existingSubscription.interests = interests || existingSubscription.interests;
        existingSubscription.subscriptionSource = source || existingSubscription.subscriptionSource;
        
        await existingSubscription.save();

        return res.json({
          success: true,
          message: 'Newsletter subscription reactivated successfully!',
          data: {
            id: existingSubscription._id,
            email: existingSubscription.email
          }
        });
      }
    }

    // Create new subscription
    const subscription = await Newsletter.create({
      email: email.toLowerCase().trim(),
      firstName: firstName ? firstName.trim() : '',
      lastName: lastName ? lastName.trim() : '',
      interests: interests || [],
      subscriptionSource: source || 'footer'
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter! Welcome aboard!',
      data: {
        id: subscription._id,
        email: subscription.email,
        subscribedAt: subscription.createdAt
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
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

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email, token } = req.body;

    let query = {};
    if (token) {
      query.unsubscribeToken = token;
    } else if (email) {
      query.email = email.toLowerCase();
    } else {
      return res.status(400).json({
        success: false,
        message: 'Email or unsubscribe token is required'
      });
    }

    const subscription = await Newsletter.findOne(query);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    subscription.isActive = false;
    await subscription.save();

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing unsubscribe request'
    });
  }
};

// @desc    Update newsletter preferences
// @route   PUT /api/newsletter/preferences
// @access  Public
const updatePreferences = async (req, res) => {
  try {
    const { email, interests, firstName, lastName } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscription = await Newsletter.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Active subscription not found'
      });
    }

    // Update preferences
    if (interests !== undefined) subscription.interests = interests;
    if (firstName !== undefined) subscription.firstName = firstName;
    if (lastName !== undefined) subscription.lastName = lastName;

    await subscription.save();

    res.json({
      success: true,
      message: 'Newsletter preferences updated successfully',
      data: {
        email: subscription.email,
        interests: subscription.interests,
        firstName: subscription.firstName,
        lastName: subscription.lastName
      }
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating preferences'
    });
  }
};

// @desc    Get all newsletter subscribers (Admin only)
// @route   GET /api/newsletter/admin
// @access  Private
const getAllSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const isActive = req.query.isActive;
    const source = req.query.source;

    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (source) filter.subscriptionSource = source;

    const subscribers = await Newsletter.find(filter)
      .select('-unsubscribeToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Newsletter.countDocuments(filter);

    res.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: subscribers.length,
          totalRecords: total
        }
      }
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subscribers'
    });
  }
};

// @desc    Get newsletter statistics (Admin only)
// @route   GET /api/newsletter/admin/stats
// @access  Private
const getNewsletterStats = async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments({ isActive: true });
    const totalUnsubscribed = await Newsletter.countDocuments({ isActive: false });
    const todaySubscribers = await Newsletter.countDocuments({
      isActive: true,
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    // Get subscription sources breakdown
    const sourceStats = await Newsletter.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$subscriptionSource', count: { $sum: 1 } } }
    ]);

    // Get interests breakdown
    const interestStats = await Newsletter.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$interests' },
      { $group: { _id: '$interests', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalSubscribers,
        totalUnsubscribed,
        todaySubscribers,
        sourceBreakdown: sourceStats,
        interestBreakdown: interestStats,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Get newsletter stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching newsletter statistics'
    });
  }
};

// @desc    Export subscribers (Admin only)
// @route   GET /api/newsletter/admin/export
// @access  Private
const exportSubscribers = async (req, res) => {
  try {
    const isActive = req.query.isActive !== 'false'; // Default to active only

    const subscribers = await Newsletter.find({ isActive })
      .select('email firstName lastName interests subscriptionSource createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: subscribers,
      exportedAt: new Date(),
      totalCount: subscribers.length
    });

  } catch (error) {
    console.error('Export subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error exporting subscribers'
    });
  }
};

module.exports = {
  subscribeNewsletter,
  unsubscribeNewsletter,
  updatePreferences,
  getAllSubscribers,
  getNewsletterStats,
  exportSubscribers
};
