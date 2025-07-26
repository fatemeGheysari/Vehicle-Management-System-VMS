const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all vehicles
router.get('/', vehicleController.getAllVehicles);

// POST create vehicle
router.post('/', vehicleController.createVehicle);

// GET one vehicle
router.get('/:id', vehicleController.getVehicleById);

// PUT update vehicle
router.put('/:id', vehicleController.updateVehicle);

// DELETE vehicle
router.delete('/:id', vehicleController.deleteVehicle);

// Protect all vehicle routes
router.use(authMiddleware);

// All routes below require authentication
router.get('/', vehicleController.getAllVehicles);
router.post('/', vehicleController.createVehicle);
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
