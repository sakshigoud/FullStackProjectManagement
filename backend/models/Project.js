const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectImage: {
    type: String,
    required: [true, 'Project image is required']
  },
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  projectDescription: {
    type: String,
    required: [true, 'Project description is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
