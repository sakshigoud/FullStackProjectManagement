const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientImage: {
    type: String,
    required: [true, 'Client image is required']
  },
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  clientDescription: {
    type: String,
    required: [true, 'Client description is required']
  },
  clientDesignation: {
    type: String,
    required: [true, 'Client designation is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', clientSchema);
