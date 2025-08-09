import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
    createMaintenanceRecord,
    getAllMaintenanceRecords,
    deleteMaintenance,
    getMaintenanceById,
    getRecentMaintenances,
    updateMaintenance
} from '../controllers/maintenanceController.js';

import Maintenance from '../models/MaintenanceRecord.js';

const router = express.Router();

// OPTIONAL: Inline GET route (e.g. for testing or special route)
router.get('/populated', async (req, res) => {
    try {
        const records = await Maintenance.find().populate("vehicleId");
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protect all maintenance routes
router.use(authMiddleware);

// Main routes
router.post('/', authMiddleware, createMaintenanceRecord);
router.get('/', authMiddleware, getAllMaintenanceRecords);
router.get('/recent', authMiddleware, getRecentMaintenances);
router.get("/:id", getMaintenanceById);
router.put("/:id", updateMaintenance);
router.delete('/:id', deleteMaintenance);

export default router;
