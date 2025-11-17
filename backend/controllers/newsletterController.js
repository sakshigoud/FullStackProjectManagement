const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email' });
    }

    // Check if email already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscriber = await Newsletter.create({ email });
    res.status(201).json({ message: 'Successfully subscribed to newsletter', subscriber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all newsletter subscribers
// @route   GET /api/admin/newsletter
// @access  Private/Admin
const getNewsletterSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  subscribeNewsletter,
  getNewsletterSubscribers
};
