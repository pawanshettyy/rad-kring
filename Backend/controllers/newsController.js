const News = require('../models/News');

// @desc    Get all published news articles
// @route   GET /api/news
// @access  Public
const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;
    const featured = req.query.featured;

    const skip = (page - 1) * limit;

    // Build filter
    const filter = { status: 'published' };
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';
    
    // Add text search if provided
    if (search) {
      filter.$text = { $search: search };
    }

    const sortOption = search ? { score: { $meta: 'textScore' } } : { publishedAt: -1 };

    const news = await News.find(filter)
      .select('title excerpt featuredImage category tags author publishedAt views featured seoTitle seoDescription')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await News.countDocuments(filter);

    res.json({
      success: true,
      data: {
        news,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: news.length,
          totalRecords: total
        }
      }
    });

  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching news articles'
    });
  }
};

// @desc    Get single news article by ID
// @route   GET /api/news/:id
// @access  Public
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findOne({ _id: id, status: 'published' });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    // Increment view count
    await News.findByIdAndUpdate(id, { $inc: { views: 1 } });

    res.json({
      success: true,
      data: news
    });

  } catch (error) {
    console.error('Get news by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching news article'
    });
  }
};

// @desc    Get featured news articles
// @route   GET /api/news/featured
// @access  Public
const getFeaturedNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const news = await News.find({ 
      status: 'published', 
      featured: true 
    })
      .select('title excerpt featuredImage category publishedAt views')
      .sort({ publishedAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: news
    });

  } catch (error) {
    console.error('Get featured news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured news'
    });
  }
};

// @desc    Get news categories
// @route   GET /api/news/categories
// @access  Public
const getNewsCategories = async (req, res) => {
  try {
    const categories = await News.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Get news categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching news categories'
    });
  }
};

// @desc    Create news article (Admin only)
// @route   POST /api/news/admin
// @access  Private
const createNews = async (req, res) => {
  try {
    const newsData = req.body;

    // Generate SEO fields if not provided
    if (!newsData.seoTitle) {
      newsData.seoTitle = newsData.title.substring(0, 60);
    }
    if (!newsData.seoDescription) {
      newsData.seoDescription = newsData.excerpt.substring(0, 160);
    }

    const news = await News.create(newsData);

    res.status(201).json({
      success: true,
      message: 'News article created successfully',
      data: news
    });

  } catch (error) {
    console.error('Create news error:', error);
    
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
      message: 'Error creating news article'
    });
  }
};

// @desc    Update news article (Admin only)
// @route   PUT /api/news/admin/:id
// @access  Private
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const news = await News.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.json({
      success: true,
      message: 'News article updated successfully',
      data: news
    });

  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating news article'
    });
  }
};

// @desc    Delete news article (Admin only)
// @route   DELETE /api/news/admin/:id
// @access  Private
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.json({
      success: true,
      message: 'News article deleted successfully'
    });

  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting news article'
    });
  }
};

// @desc    Get all news for admin (including drafts)
// @route   GET /api/news/admin
// @access  Private
const getAllNewsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const category = req.query.category;

    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const news = await News.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await News.countDocuments(filter);

    res.json({
      success: true,
      data: {
        news,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: news.length,
          totalRecords: total
        }
      }
    });

  } catch (error) {
    console.error('Get admin news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching news articles'
    });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  getFeaturedNews,
  getNewsCategories,
  createNews,
  updateNews,
  deleteNews,
  getAllNewsAdmin
};
