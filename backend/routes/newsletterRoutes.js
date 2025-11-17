const express = require('express');
const router = express.Router();
const {
  subscribeNewsletter,
  getNewsletterSubscribers
} = require('../controllers/newsletterController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Public route (only works when mounted at /api/newsletter)
router.post('/', subscribeNewsletter);

// Admin route (works when mounted at /api/admin/newsletter)
router.get('/', authMiddleware, adminMiddleware, getNewsletterSubscribers);

module.exports = router;
