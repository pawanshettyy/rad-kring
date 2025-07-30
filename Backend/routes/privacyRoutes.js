const express = require('express');
const router = express.Router();
const {
  getPrivacyPolicy,
  getPrivacyPolicyByVersion,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
  getAllPrivacyPoliciesAdmin,
  setActivePrivacyPolicy
} = require('../controllers/privacyController');

// Public routes
router.get('/', getPrivacyPolicy);
router.get('/:version', getPrivacyPolicyByVersion);

// Admin routes (add authentication middleware here)
router.get('/admin/all', getAllPrivacyPoliciesAdmin);
router.post('/admin', createPrivacyPolicy);
router.put('/admin/:version', updatePrivacyPolicy);
router.put('/admin/:version/activate', setActivePrivacyPolicy);
router.delete('/admin/:version', deletePrivacyPolicy);

module.exports = router;
