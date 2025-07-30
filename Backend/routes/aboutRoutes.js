const express = require('express');
const router = express.Router();
const {
  getAboutContent,
  getAboutSection,
  createAboutContent,
  updateAboutContent,
  deleteAboutContent,
  getAllAboutContentAdmin,
  reorderAboutContent
} = require('../controllers/aboutController');

// Public routes
router.get('/', getAboutContent);
router.get('/:section', getAboutSection);

// Admin routes (add authentication middleware here)
router.get('/admin/all', getAllAboutContentAdmin);
router.post('/admin', createAboutContent);
router.put('/admin/:section', updateAboutContent);
router.delete('/admin/:section', deleteAboutContent);
router.put('/admin/reorder', reorderAboutContent);

module.exports = router;
