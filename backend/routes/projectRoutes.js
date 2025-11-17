const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectsAdmin,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public route (only works when mounted at /api/projects)
router.get('/', getProjects);

// Admin routes (work when mounted at /api/admin/projects)
router.post('/', authMiddleware, adminMiddleware, upload.single('projectImage'), createProject);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('projectImage'), updateProject);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProject);

module.exports = router;
