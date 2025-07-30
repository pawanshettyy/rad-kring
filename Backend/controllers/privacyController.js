const PrivacyPolicy = require('../models/PrivacyPolicy');

// @desc    Get current active privacy policy
// @route   GET /api/privacy-policy
// @access  Public
const getPrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findOne({ isActive: true })
      .sort({ version: -1 })
      .select('-__v');

    if (!privacyPolicy) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy not found'
      });
    }

    res.json({
      success: true,
      data: privacyPolicy
    });

  } catch (error) {
    console.error('Get privacy policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching privacy policy'
    });
  }
};

// @desc    Get privacy policy by version
// @route   GET /api/privacy-policy/:version
// @access  Public
const getPrivacyPolicyByVersion = async (req, res) => {
  try {
    const { version } = req.params;

    const privacyPolicy = await PrivacyPolicy.findOne({ version })
      .select('-__v');

    if (!privacyPolicy) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy version not found'
      });
    }

    res.json({
      success: true,
      data: privacyPolicy
    });

  } catch (error) {
    console.error('Get privacy policy by version error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching privacy policy'
    });
  }
};

// @desc    Create new privacy policy version (Admin only)
// @route   POST /api/privacy-policy/admin
// @access  Private
const createPrivacyPolicy = async (req, res) => {
  try {
    const policyData = req.body;

    // Check if version already exists
    const existingPolicy = await PrivacyPolicy.findOne({ 
      version: policyData.version 
    });

    if (existingPolicy) {
      return res.status(409).json({
        success: false,
        message: 'Privacy policy version already exists'
      });
    }

    // If this is set as active, deactivate all others
    if (policyData.isActive) {
      await PrivacyPolicy.updateMany({}, { isActive: false });
    }

    const privacyPolicy = await PrivacyPolicy.create(policyData);

    res.status(201).json({
      success: true,
      message: 'Privacy policy created successfully',
      data: privacyPolicy
    });

  } catch (error) {
    console.error('Create privacy policy error:', error);
    
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
      message: 'Error creating privacy policy'
    });
  }
};

// @desc    Update privacy policy (Admin only)
// @route   PUT /api/privacy-policy/admin/:version
// @access  Private
const updatePrivacyPolicy = async (req, res) => {
  try {
    const { version } = req.params;
    const updateData = req.body;

    // If setting this as active, deactivate others
    if (updateData.isActive) {
      await PrivacyPolicy.updateMany(
        { version: { $ne: version } }, 
        { isActive: false }
      );
    }

    const privacyPolicy = await PrivacyPolicy.findOneAndUpdate(
      { version },
      updateData,
      { new: true, runValidators: true }
    );

    if (!privacyPolicy) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy version not found'
      });
    }

    res.json({
      success: true,
      message: 'Privacy policy updated successfully',
      data: privacyPolicy
    });

  } catch (error) {
    console.error('Update privacy policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating privacy policy'
    });
  }
};

// @desc    Delete privacy policy version (Admin only)
// @route   DELETE /api/privacy-policy/admin/:version
// @access  Private
const deletePrivacyPolicy = async (req, res) => {
  try {
    const { version } = req.params;

    const privacyPolicy = await PrivacyPolicy.findOneAndDelete({ version });

    if (!privacyPolicy) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy version not found'
      });
    }

    // If deleted policy was active, make the latest one active
    if (privacyPolicy.isActive) {
      const latestPolicy = await PrivacyPolicy.findOne()
        .sort({ effectiveDate: -1 });
      
      if (latestPolicy) {
        latestPolicy.isActive = true;
        await latestPolicy.save();
      }
    }

    res.json({
      success: true,
      message: 'Privacy policy version deleted successfully'
    });

  } catch (error) {
    console.error('Delete privacy policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting privacy policy'
    });
  }
};

// @desc    Get all privacy policy versions (Admin only)
// @route   GET /api/privacy-policy/admin
// @access  Private
const getAllPrivacyPoliciesAdmin = async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find()
      .sort({ effectiveDate: -1 })
      .select('-sections.content'); // Exclude large content for listing

    res.json({
      success: true,
      data: policies
    });

  } catch (error) {
    console.error('Get admin privacy policies error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching privacy policies'
    });
  }
};

// @desc    Set active privacy policy version (Admin only)
// @route   PUT /api/privacy-policy/admin/:version/activate
// @access  Private
const setActivePrivacyPolicy = async (req, res) => {
  try {
    const { version } = req.params;

    // Deactivate all policies
    await PrivacyPolicy.updateMany({}, { isActive: false });

    // Activate the specified version
    const privacyPolicy = await PrivacyPolicy.findOneAndUpdate(
      { version },
      { isActive: true },
      { new: true }
    );

    if (!privacyPolicy) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy version not found'
      });
    }

    res.json({
      success: true,
      message: 'Privacy policy version activated successfully',
      data: privacyPolicy
    });

  } catch (error) {
    console.error('Set active privacy policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Error setting active privacy policy'
    });
  }
};

module.exports = {
  getPrivacyPolicy,
  getPrivacyPolicyByVersion,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
  getAllPrivacyPoliciesAdmin,
  setActivePrivacyPolicy
};
