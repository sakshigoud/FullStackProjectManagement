const Client = require('../models/Client');

// @desc    Get all clients (Public)
// @route   GET /api/clients
// @access  Public
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all clients (Admin)
// @route   GET /api/admin/clients
// @access  Private/Admin
const getClientsAdmin = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new client
// @route   POST /api/admin/clients
// @access  Private/Admin
const createClient = async (req, res) => {
  try {
    const { clientName, clientDescription, clientDesignation } = req.body;

    // Basic validation
    if (!clientName || !clientDescription || !clientDesignation) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Client image is required' });
    }

    // Generate image URL
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/clients/${req.file.filename}`;

    const client = await Client.create({
      clientImage: imageUrl,
      clientName,
      clientDescription,
      clientDesignation
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update client
// @route   PUT /api/admin/clients/:id
// @access  Private/Admin
const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const updateData = { ...req.body };

    // If new file uploaded, update image URL
    if (req.file) {
      updateData.clientImage = `${req.protocol}://${req.get('host')}/uploads/clients/${req.file.filename}`;
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete client
// @route   DELETE /api/admin/clients/:id
// @access  Private/Admin
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
  getClientsAdmin,
  createClient,
  updateClient,
  deleteClient
};
