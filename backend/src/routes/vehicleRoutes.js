import express from 'express';
import {
    getAllVehicles,
    createVehicle,
    getVehicleById,
    updateVehicle,
    deleteVehicle
} from '../controllers/vehicleController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes below require authentication
router.use(authMiddleware);

// GET all vehicles
router.get("/", authMiddleware, getAllVehicles);

// POST create vehicle
router.post("/", authMiddleware, createVehicle);

// GET one vehicle
router.get('/:id', getVehicleById);

// PUT update vehicle
router.put('/:id', updateVehicle);

// DELETE vehicle
router.delete('/:id', deleteVehicle);

export default router;

