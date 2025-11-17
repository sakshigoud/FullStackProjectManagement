require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const adminProjectRoutes = require('./routes/projectRoutes');
const adminClientRoutes = require('./routes/clientRoutes');
const adminNewsletterRoutes = require('./routes/newsletterRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);

// Public routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Admin routes
app.use('/api/admin/projects', adminProjectRoutes);
app.use('/api/admin/clients', adminClientRoutes);
app.use('/api/admin/newsletter', adminNewsletterRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Flipr Assignment API' });
});

// Multer error handler
app.use((err, req, res, next) => {
  if (err instanceof require('multer').MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
