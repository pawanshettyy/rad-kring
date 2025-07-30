const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getNewsById,
  getFeaturedNews,
  getNewsCategories,
  createNews,
  updateNews,
  deleteNews,
  getAllNewsAdmin
} = require('../controllers/newsController');

// Public routes
router.get('/', getAllNews);
router.get('/featured', getFeaturedNews);
router.get('/categories', getNewsCategories);
router.get('/:id', getNewsById);

// Admin routes (add authentication middleware here)
router.get('/admin/all', getAllNewsAdmin);
router.post('/admin', createNews);
router.put('/admin/:id', updateNews);
router.delete('/admin/:id', deleteNews);

module.exports = router;
