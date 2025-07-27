const express = require('express');
const {
  getUsers,
  getUser,
  updateProfile,
  changePassword,
  updateUser,
  deleteUser,
  toggleUserStatus
} = require('../controllers/userController');
const {
  authenticate,
  requireAdmin,
  requireOwnershipOrAdmin
} = require('../middleware/authMiddleware');
const {
  validateProfileUpdate,
  validatePasswordChange
} = require('../middleware/validationMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// User profile routes
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user
    }
  });
});

router.put('/profile', validateProfileUpdate, updateProfile);
router.put('/change-password', validatePasswordChange, changePassword);

// Admin routes
router.get('/', requireAdmin, getUsers);
router.get('/:id', requireOwnershipOrAdmin('id'), getUser);
router.put('/:id', requireAdmin, updateUser);
router.delete('/:id', requireAdmin, deleteUser);
router.put('/:id/status', requireAdmin, toggleUserStatus);

module.exports = router;