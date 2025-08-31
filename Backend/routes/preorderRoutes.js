const express = require('express');
const router = express.Router();

// POST /api/preorder - submit preorder request
router.post('/', (req, res) => {
  // TODO: Save preorder info or send email
  res.status(200).json({ message: 'Pre-order request received!' });
});

module.exports = router;
