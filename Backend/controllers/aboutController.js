const AboutContent = require('../models/AboutContent');

// @desc    Get all about content sections
// @route   GET /api/about
// @access  Public
const getAboutContent = async (req, res) => {
  try {
    const content = await AboutContent.find({ isActive: true })
      .sort({ order: 1 })
      .select('-__v');

    res.json({
      success: true,
      data: content
    });

  } catch (error) {
    console.error('Get about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching about content'
    });
  }
};

// @desc    Get specific about section
// @route   GET /api/about/:section
// @access  Public
const getAboutSection = async (req, res) => {
  try {
    const { section } = req.params;

    const content = await AboutContent.findOne({ 
      section: section.toLowerCase(),
      isActive: true 
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      data: content
    });

  } catch (error) {
    console.error('Get about section error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching about section'
    });
  }
};

// @desc    Create about content section (Admin only)
// @route   POST /api/about/admin
// @access  Private
const createAboutContent = async (req, res) => {
  try {
    const contentData = req.body;

    // Check if section already exists
    const existingSection = await AboutContent.findOne({ 
      section: contentData.section 
    });

    if (existingSection) {
      return res.status(409).json({
        success: false,
        message: 'Section already exists. Use update instead.'
      });
    }

    const content = await AboutContent.create(contentData);

    res.status(201).json({
      success: true,
      message: 'About content section created successfully',
      data: content
    });

  } catch (error) {
    console.error('Create about content error:', error);
    
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
      message: 'Error creating about content'
    });
  }
};

// @desc    Update about content section (Admin only)
// @route   PUT /api/about/admin/:section
// @access  Private
const updateAboutContent = async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = req.body;

    const content = await AboutContent.findOneAndUpdate(
      { section: section.toLowerCase() },
      updateData,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      message: 'About content updated successfully',
      data: content
    });

  } catch (error) {
    console.error('Update about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating about content'
    });
  }
};

// @desc    Delete about content section (Admin only)
// @route   DELETE /api/about/admin/:section
// @access  Private
const deleteAboutContent = async (req, res) => {
  try {
    const { section } = req.params;

    const content = await AboutContent.findOneAndDelete({ 
      section: section.toLowerCase() 
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      message: 'About content section deleted successfully'
    });

  } catch (error) {
    console.error('Delete about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting about content'
    });
  }
};

// @desc    Get all about content for admin (including inactive)
// @route   GET /api/about/admin
// @access  Private
const getAllAboutContentAdmin = async (req, res) => {
  try {
    const content = await AboutContent.find()
      .sort({ order: 1 });

    res.json({
      success: true,
      data: content
    });

  } catch (error) {
    console.error('Get admin about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching about content'
    });
  }
};

// @desc    Reorder about content sections (Admin only)
// @route   PUT /api/about/admin/reorder
// @access  Private
const reorderAboutContent = async (req, res) => {
  try {
    const { sections } = req.body; // Array of {section, order}

    if (!Array.isArray(sections)) {
      return res.status(400).json({
        success: false,
        message: 'Sections must be an array'
      });
    }

    // Update order for each section
    const updatePromises = sections.map(({ section, order }) =>
      AboutContent.findOneAndUpdate(
        { section },
        { order },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'About content sections reordered successfully'
    });

  } catch (error) {
    console.error('Reorder about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering about content'
    });
  }
};

module.exports = {
  getAboutContent,
  getAboutSection,
  createAboutContent,
  updateAboutContent,
  deleteAboutContent,
  getAllAboutContentAdmin,
  reorderAboutContent
};
