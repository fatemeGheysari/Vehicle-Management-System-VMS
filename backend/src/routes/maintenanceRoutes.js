const express = require('express');
const router = express.Router();

const maintenanceController = require('../controllers/maintenanceController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect all maintenance routes with authentication middleware
router.use(authMiddleware);

// Create a new maintenance record
router.post('/', maintenanceController.createMaintenanceRecord);

// Get all maintenance records
router.get('/', maintenanceController.getAllRecords);

module.exports = router;
