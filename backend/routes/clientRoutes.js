const express = require('express');
const router = express.Router();
const {
  getClients,
  getClientsAdmin,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const uploadClient = require('../middleware/uploadClient');

// Public route (only works when mounted at /api/clients)
router.get('/', getClients);

// Admin routes (work when mounted at /api/admin/clients)
router.post('/', authMiddleware, adminMiddleware, uploadClient.single('clientImage'), createClient);
router.put('/:id', authMiddleware, adminMiddleware, uploadClient.single('clientImage'), updateClient);
router.delete('/:id', authMiddleware, adminMiddleware, deleteClient);

module.exports = router;
