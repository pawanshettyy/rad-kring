const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  refreshToken
} = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const {
  validateRegister,
  validateLogin
} = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);
router.post('/refresh', authenticate, refreshToken);

module.exports = router;