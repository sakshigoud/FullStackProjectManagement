const Project = require('../models/Project');

// @desc    Get all projects (Public)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects (Admin)
// @route   GET /api/admin/projects
// @access  Private/Admin
const getProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/admin/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const { projectName, projectDescription } = req.body;

    // Basic validation
    if (!projectName || !projectDescription) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Project image is required' });
    }

    // Generate image URL
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/projects/${req.file.filename}`;

    const project = await Project.create({
      projectImage: imageUrl,
      projectName,
      projectDescription
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updateData = { ...req.body };

    // If new file uploaded, update image URL
    if (req.file) {
      updateData.projectImage = `${req.protocol}://${req.get('host')}/uploads/projects/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectsAdmin,
  createProject,
  updateProject,
  deleteProject
};
